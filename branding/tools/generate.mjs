// Phase Robotics branding-kit generator.
// Regenerates the lockup SVGs (JetBrains Mono embedded as base64 woff2) and
// every PNG in the kit from the canonical glider geometry.
//
// Usage (from the repo root, where node_modules lives):
//   npm i --no-save puppeteer-core png-to-ico
//   node branding/tools/generate.mjs [output-dir]
//
// Requires Google Chrome at the path below (only used headlessly as a renderer).
import { writeFileSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer-core'
import pngToIco from 'png-to-ico'
import { MARK_D } from './mark.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// node generate.mjs [output-dir] [--only=<substring>]  e.g. --only=banner
const args = process.argv.slice(2)
const ONLY = (args.find((a) => a.startsWith('--only=')) || '').slice(7)
const outArg = args.find((a) => !a.startsWith('--'))
const OUT = outArg ? path.resolve(outArg) : path.resolve(__dirname, '..')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const INK = '#0a0a0a'
const PAPER = '#ffffff'
const MUTED = '#6b6b6b'
const CELL = '#ebebeb'

// Life glider (for the Game of Life background fields).
const GLIDER = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]

// The logo mark (rounded, fused glider) in a 32x32 box. See mark.mjs.
function gliderRects(color) {
  return `<path d="${MARK_D}" fill="${color}"/>`
}

// ---------------------------------------------------------------- fonts
// Offline fallback: reuse the woff2 data already embedded in a previous lockup.
function fontsFromExistingLockup() {
  const svg = readFileSync(path.join(OUT, 'logo/svg/lockup-black.svg'), 'utf8')
  const fonts = {}
  for (const m of svg.matchAll(/font-weight:(\d+);src:url\(data:font\/woff2;base64,([^)]+)\)/g)) {
    fonts[m[1]] = m[2]
  }
  if (!fonts['400'] || !fonts['700']) throw new Error('no embedded fonts in existing lockup')
  return fonts
}

async function loadJetBrainsMono() {
  try {
    return await fetchJetBrainsMono()
  } catch (err) {
    console.warn('font download failed, reusing fonts embedded in lockup-black.svg')
    return fontsFromExistingLockup()
  }
}

async function fetchJetBrainsMono() {
  const css = await (await fetch(
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap',
    { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36' } }
  )).text()
  const fonts = {}
  for (const m of css.matchAll(/@font-face\s*{([^}]+)}/g)) {
    const body = m[1]
    if (!body.includes('U+0000-00FF')) continue // latin subset only
    const weight = /font-weight:\s*(\d+)/.exec(body)[1]
    const url = /url\((https:[^)]+\.woff2)\)/.exec(body)[1]
    fonts[weight] = Buffer.from(await (await fetch(url)).arrayBuffer()).toString('base64')
  }
  if (!fonts['400'] || !fonts['700']) throw new Error('font download failed')
  return fonts
}

// ---------------------------------------------------------------- lockup svg
// Monospace math: font-size 15, letter-spacing 1.8 -> 10.8/char advance.
// "PHASE " (6) + "ROBOTICS" (8) = 14 chars from x=44 -> ends ~193. Box: 198x32.
function lockupSvg(ink, muted, fonts) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198 32">
  <style>
    @font-face{font-family:'JetBrains Mono';font-style:normal;font-weight:400;src:url(data:font/woff2;base64,${fonts['400']}) format('woff2');}
    @font-face{font-family:'JetBrains Mono';font-style:normal;font-weight:700;src:url(data:font/woff2;base64,${fonts['700']}) format('woff2');}
  </style>
  ${gliderRects(ink)}
  <text x="44" y="21.5" font-family="'JetBrains Mono',monospace" font-size="15" letter-spacing="1.8" fill="${ink}"><tspan font-weight="700">PHASE </tspan><tspan fill="${muted}">ROBOTICS</tspan></text>
</svg>`
}

// ---------------------------------------------------------------- html helpers
const FONTS_LINK = '<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">'

function lifeField(w, h, cell = 14, density = 0.05, seed = 7) {
  let s = seed >>> 0
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
  const cols = Math.ceil(w / cell)
  const rows = Math.ceil(h / cell)
  const on = new Set()
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) if (rnd() < density) on.add(c + ',' + r)
  }
  for (let i = 0; i < 4; i++) {
    const gc = Math.floor(rnd() * (cols - 4))
    const gr = Math.floor(rnd() * (rows - 4))
    for (const [c, r] of GLIDER) on.add((gc + c) + ',' + (gr + r))
  }
  let rects = ''
  for (const key of on) {
    const [c, r] = key.split(',').map(Number)
    rects += `<rect x="${c * cell + 1}" y="${r * cell + 1}" width="${cell - 2}" height="${cell - 2}" rx="${(cell * 0.3).toFixed(1)}" fill="${CELL}"/>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" style="position:absolute;inset:0">${rects}</svg>`
}

const page = await (async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })
  globalThis.__browser = browser
  return browser.newPage()
})()

async function render(html, w, h, file, { transparent = false } = {}) {
  if (ONLY && !file.includes(ONLY)) return
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html><meta charset="utf-8">${html}`, { waitUntil: 'load', timeout: 90000 })
  await page.evaluate(() => document.fonts.ready)
  const out = path.join(OUT, file)
  await page.screenshot({ path: out, omitBackground: transparent })
  if (transparent) {
    const colorType = readFileSync(out)[25] // PNG IHDR color type; 6 = RGBA
    if (colorType !== 6) console.warn(`WARN ${file}: color type ${colorType}, expected RGBA(6)`)
  }
  console.log('ok', file)
}

const bare = (body, bg = 'transparent') =>
  `<style>html,body{margin:0;background:${bg};width:100%;height:100%;overflow:hidden}</style>${body}`

const markSvg = (color, size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" style="display:block">${gliderRects(color)}</svg>`

// ================================================================ generate
const fonts = await loadJetBrainsMono()
const MONO_FACE = `<style>
@font-face{font-family:'JetBrains Mono';font-weight:400;src:url(data:font/woff2;base64,${fonts['400']}) format('woff2');}
@font-face{font-family:'JetBrains Mono';font-weight:700;src:url(data:font/woff2;base64,${fonts['700']}) format('woff2');}
</style>`

const lockupBlack = lockupSvg(INK, MUTED, fonts)
const lockupWhite = lockupSvg(PAPER, 'rgba(255,255,255,0.55)', fonts)
if (!ONLY) {
  const plain = (bg, fg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">\n${bg ? `  <rect width="32" height="32" fill="${bg}"/>\n` : ''}  <path fill="${fg}" d="${MARK_D}"/>\n</svg>\n`
  writeFileSync(path.join(OUT, 'logo/svg/glider-black.svg'), plain(null, INK))
  writeFileSync(path.join(OUT, 'logo/svg/glider-white.svg'), plain(null, PAPER))
  writeFileSync(path.join(OUT, 'logo/svg/glider-tile-black-on-white.svg'), plain(PAPER, INK))
  writeFileSync(path.join(OUT, 'logo/svg/glider-tile-white-on-black.svg'), plain(INK, PAPER))
  writeFileSync(path.join(OUT, 'favicon/favicon.svg'), plain('#ffffff', '#000000'))
  console.log('ok mark SVGs')
  writeFileSync(path.join(OUT, 'logo/svg/lockup-black.svg'), lockupBlack)
  writeFileSync(path.join(OUT, 'logo/svg/lockup-white.svg'), lockupWhite)
  console.log('ok lockup SVGs (fonts embedded)')
}

// --- logo PNGs
await render(bare(markSvg(INK, 1024)), 1024, 1024, 'logo/png/glider-black-1024.png', { transparent: true })
await render(bare(markSvg(PAPER, 1024)), 1024, 1024, 'logo/png/glider-white-1024.png', { transparent: true })
await render(bare(markSvg(INK, 1024), PAPER), 1024, 1024, 'logo/png/glider-tile-black-on-white-1024.png')
await render(bare(markSvg(PAPER, 1024), INK), 1024, 1024, 'logo/png/glider-tile-white-on-black-1024.png')

const lockupPng = (svg) => bare(svg.replace('<svg ', '<svg width="2376" height="384" style="display:block" '))
await render(lockupPng(lockupBlack), 2376, 384, 'logo/png/lockup-black-2376w.png', { transparent: true })
await render(lockupPng(lockupWhite), 2376, 384, 'logo/png/lockup-white-2376w.png', { transparent: true })

// --- favicons (pure #000 on white, like public/glider.svg)
const favSvg = (size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" style="display:block"><rect width="32" height="32" fill="#fff"/>${gliderRects('#000')}</svg>`
for (const size of [16, 32, 180, 512]) {
  const name = size === 180 ? 'favicon/apple-touch-icon-180.png' : `favicon/favicon-${size}.png`
  await render(bare(favSvg(size), PAPER), size, size, name)
}
if (!ONLY || 'favicon/favicon.ico'.includes(ONLY)) {
  writeFileSync(path.join(OUT, 'favicon/favicon.ico'),
    await pngToIco([path.join(OUT, 'favicon/favicon-16.png'), path.join(OUT, 'favicon/favicon-32.png')]))
  console.log('ok favicon/favicon.ico')
}

// --- social: avatars
const avatar = (bg, fg) => bare(
  `<div style="width:1024px;height:1024px;background:${bg};display:flex;align-items:center;justify-content:center">${markSvg(fg, 560)}</div>`, bg)
await render(avatar(INK, PAPER), 1024, 1024, 'social/avatar-white-on-black-1024.png')
await render(avatar(PAPER, INK), 1024, 1024, 'social/avatar-black-on-white-1024.png')

// --- social: banners
// Simple stator silhouette (12 T-teeth + yoke, bore cut out) for the pattern.
// Use with fill-rule="evenodd".
function statorIcon(cx, cy, R) {
  const SLOTS = 12
  const Rt0 = R * 0.8
  const Ry = R * 0.55
  const Rb = R * 0.3
  const s = R * 0.11
  const tipA = (Math.PI / SLOTS) * 0.84
  const P = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  const O = (r, a, o) => [cx + r * Math.cos(a) - o * Math.sin(a), cy + r * Math.sin(a) + o * Math.cos(a)]
  const f = ([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`
  const rJoin = Math.sqrt(Ry * Ry - s * s)
  let d = ''
  for (let i = 0; i < SLOTS; i++) {
    const a = (i / SLOTS) * 2 * Math.PI
    const next = ((i + 1) / SLOTS) * 2 * Math.PI
    d += `${i === 0 ? 'M' : 'L'}${f(O(rJoin, a, -s))}`
      + `L${f(O(Rt0, a, -s))}L${f(P(Rt0, a - tipA))}L${f(P(R, a - tipA))}`
      + `A${R} ${R} 0 0 1 ${f(P(R, a + tipA))}L${f(P(Rt0, a + tipA))}`
      + `L${f(O(Rt0, a, s))}L${f(O(rJoin, a, s))}`
      + `A${Ry} ${Ry} 0 0 1 ${f(O(rJoin, next, -s))}`
  }
  d += `ZM${cx + Rb} ${cy}A${Rb} ${Rb} 0 1 0 ${cx - Rb} ${cy}A${Rb} ${Rb} 0 1 0 ${cx + Rb} ${cy}Z`
  return d
}

// Tagline top-left over the Life grid; from the right, a dark gradient with
// a tone-on-tone grid of stator silhouettes fading in.
function banner(w, h) {
  const CELL = 14
  const pad = Math.round(h * 0.11)
  const mono = `font-family:'JetBrains Mono',monospace`

  // Pattern grid, anchored so whole tiles end flush at the right edge.
  const tile = Math.round(h * 0.19)
  const R = tile * 0.37
  const tileX = w % tile

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" style="position:absolute;inset:0">
    <defs>
      <linearGradient id="shade" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0.36" stop-color="${INK}" stop-opacity="0"/>
        <stop offset="0.55" stop-color="${INK}" stop-opacity="0.45"/>
        <stop offset="0.75" stop-color="${INK}" stop-opacity="0.82"/>
        <stop offset="1" stop-color="${INK}" stop-opacity="1"/>
      </linearGradient>
      <linearGradient id="reveal" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0.42" stop-color="#000"/>
        <stop offset="0.8" stop-color="#fff"/>
      </linearGradient>
      <linearGradient id="hide" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0.3" stop-color="#fff"/>
        <stop offset="0.55" stop-color="#000"/>
      </linearGradient>
      <mask id="reveal-mask"><rect width="${w}" height="${h}" fill="url(#reveal)"/></mask>
      <mask id="hide-mask"><rect width="${w}" height="${h}" fill="url(#hide)"/></mask>
      <pattern id="stators" patternUnits="userSpaceOnUse" x="${tileX}" y="${(h % tile) / 2}" width="${tile}" height="${tile}">
        <path d="${statorIcon(tile / 2, tile / 2, R)}" fill="${PAPER}" fill-opacity="0.14" fill-rule="evenodd"/>
      </pattern>
    </defs>
    <g mask="url(#hide-mask)">${lifeField(w, h, CELL, 0.04, 11)}</g>
    <rect width="${w}" height="${h}" fill="url(#shade)"/>
    <rect width="${w}" height="${h}" fill="url(#stators)" mask="url(#reveal-mask)"/>
  </svg>`

  const tagSize = Math.round(h * 0.072)
  return bare(`${MONO_FACE}
  <div style="position:relative;width:${w}px;height:${h}px;background:${PAPER};overflow:hidden">
    ${svg}
    <div style="position:absolute;left:${pad}px;top:${pad}px;${mono};font-weight:700;font-size:${tagSize}px;line-height:1.18;letter-spacing:0.06em">
      <div style="display:inline-block;background:${PAPER};border-radius:8px;padding:0 8px;color:${INK}">PRECISION ACTUATORS</div><br>
      <div style="display:inline-block;background:${PAPER};border-radius:8px;padding:0 8px;color:${MUTED}">MADE IN AMERICA</div>
    </div>
  </div>`, PAPER)
}
await render(banner(1500, 500), 1500, 500, 'social/banner-x-1500x500.png')
await render(banner(1584, 396), 1584, 396, 'social/banner-linkedin-1584x396.png')

// --- social: OG image
const og = bare(`${FONTS_LINK}
<div style="position:relative;width:1200px;height:630px;background:${PAPER};overflow:hidden">
  ${lifeField(1200, 630, 14, 0.05, 23)}
  <div style="position:absolute;inset:0;padding:70px 80px;display:flex;flex-direction:column;justify-content:space-between">
    <div>
      <div style="display:inline-block;background:${PAPER};padding:4px 8px;font-family:'JetBrains Mono',monospace;font-size:19px;letter-spacing:0.18em;color:${MUTED}">// ROBOTIC ACTUATORS &middot; MODULAR BY DESIGN</div>
      <div style="margin-top:26px;font-family:Sora,sans-serif;font-weight:700;font-size:74px;line-height:1.08;letter-spacing:-0.03em;color:${INK}">Precise motion for<br>any robot you can<br>imagine<span style="display:inline-block;width:0.5em;height:0.82em;background:${INK};vertical-align:text-bottom;margin-left:0.1em"></span></div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div style="background:${PAPER};padding:6px 10px">${lockupBlack.replace('<svg ', '<svg width="300" style="display:block" ')}</div>
      <div style="background:${PAPER};padding:4px 8px;font-family:'JetBrains Mono',monospace;font-size:17px;letter-spacing:0.16em;color:${MUTED}">FOC &middot; CAN &middot; 63 NODES &middot; b3/s23</div>
    </div>
  </div>
</div>`, PAPER)
await render(og, 1200, 630, 'social/og-image-1200x630.png')

// --- colors: palette sheet
const swatch = (name, hex) => `
  <div style="flex:1;min-width:0;display:flex;flex-direction:column;border:1px solid ${INK};background:${PAPER}">
    <div style="height:300px;background:${hex};border-bottom:1px solid ${INK}"></div>
    <div style="padding:22px;font-family:'JetBrains Mono',monospace">
      <div style="font-size:19px;font-weight:700;letter-spacing:0.12em;color:${INK}">${name}</div>
      <div style="margin-top:6px;font-size:17px;color:${MUTED}">${hex.toUpperCase()}</div>
    </div>
  </div>`
const palette = bare(`${FONTS_LINK}<style>*{box-sizing:border-box}</style>
<div style="width:1200px;height:675px;background:${PAPER};padding:60px;display:flex;flex-direction:column;gap:36px">
  <div style="font-family:'JetBrains Mono',monospace;font-size:21px;font-weight:700;letter-spacing:0.18em;color:${INK}">// PHASE ROBOTICS — PALETTE</div>
  <div style="display:flex;gap:22px;flex:1">
    ${swatch('INK', INK)}${swatch('PAPER', PAPER)}${swatch('MUTED', MUTED)}${swatch('LINE', '#e4e4e4')}${swatch('CELL', CELL)}
  </div>
</div>`, PAPER)
await render(palette, 1200, 675, 'colors/palette.png')

// --- typography specimen
const typeRow = (label, sample) => `
  <div style="display:flex;align-items:baseline;gap:40px;border-top:1px solid #e4e4e4;padding:26px 0">
    <div style="width:330px;font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:0.12em;color:${MUTED}">${label}</div>
    <div style="flex:1">${sample}</div>
  </div>`
const specimen = bare(`${FONTS_LINK}<style>*{box-sizing:border-box}</style>
<div style="width:1200px;height:675px;background:${PAPER};padding:60px 70px;display:flex;flex-direction:column">
  <div style="font-family:'JetBrains Mono',monospace;font-size:21px;font-weight:700;letter-spacing:0.18em;color:${INK};margin-bottom:30px">// PHASE ROBOTICS — TYPE</div>
  ${typeRow('SORA 700<br>HEADLINES', `<span style="font-family:Sora,sans-serif;font-weight:700;font-size:52px;letter-spacing:-0.03em;color:${INK}">Precise motion, assembled.</span>`)}
  ${typeRow('INTER 400<br>BODY', `<span style="font-family:Inter,sans-serif;font-size:25px;color:${INK}">Easy-to-use, affordable robotic actuators — closed-loop precision that snaps together like building blocks.</span>`)}
  ${typeRow('JETBRAINS MONO<br>LABELS / SPECS / CODE', `<span style="font-family:'JetBrains Mono',monospace;font-size:21px;letter-spacing:0.14em;color:${INK}">// 02 — PRODUCTS &nbsp; POSITION / VELOCITY / TORQUE &nbsp; b3/s23</span>`)}
</div>`, PAPER)
await render(specimen, 1200, 675, 'typography/type-specimen.png')

await globalThis.__browser.close()
console.log('done ->', OUT)
