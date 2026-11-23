// Phase Robotics branding-kit generator.
// Regenerates the logo SVGs and PNGs, the colour and type sheets, and every
// social image, in the same style as the website: off-white or near-black
// ground, a blurred cobalt and mint colour field, fine grain, Geist type.
//
// Usage, from the repo root (after `npm install`, so the Geist fonts exist):
//   npm i --no-save playwright && npx playwright install chromium
//   node branding/tools/generate.mjs [--only=<substring>]   e.g. --only=banner
//
// Favicons are not touched here: the mark has not changed, so the existing
// files in branding/favicon and public/ stay as they are.
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { MARK_D } from './mark.mjs'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const OUT = path.resolve(__dirname, '..')
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7)

export const COLORS = {
  ink: '#0c0d0c',
  paper: '#f4f3ee',
  night: '#08090a',
  mist: '#f2f3f1',
  muted: '#3f423c',
  mutedOnDark: '#a8aca6',
  cobalt: '#1d3fbb',
  mint: '#5fd0c0',
  sky: '#8fa8ff',
  teal: '#0d4a4f',
  ember: '#c2410c',
  peach: '#ffb07a',
}

const b64 = (file) => readFileSync(path.join(ROOT, file)).toString('base64')
const FONT_DIR = 'node_modules/geist/dist/fonts'
const MONO_500 = b64(`${FONT_DIR}/geist-mono/GeistMono-Medium.woff2`)
const FONT_CSS = `
@font-face{font-family:Geist;font-weight:400;src:url(data:font/woff2;base64,${b64(`${FONT_DIR}/geist-sans/Geist-Regular.woff2`)})}
@font-face{font-family:Geist;font-weight:500;src:url(data:font/woff2;base64,${b64(`${FONT_DIR}/geist-sans/Geist-Medium.woff2`)})}
@font-face{font-family:'Geist Mono';font-weight:500;src:url(data:font/woff2;base64,${MONO_500})}`
const NOISE = { dark: b64('public/noise-dark.png'), light: b64('public/noise-light.png') }

const mark = (color, size) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 32 32"><path d="${MARK_D}" fill="${color}"/></svg>`

// ------------------------------------------------------------------ logo SVGs
function markSvg(background, color) {
  const tile = background ? `<rect width="32" height="32" fill="${background}"/>` : ''
  const inner = background ? `<g transform="translate(6.4 6.4) scale(0.6)"><path d="${MARK_D}" fill="${color}"/></g>` : `<path d="${MARK_D}" fill="${color}"/>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${tile}${inner}</svg>\n`
}

// Mark plus wordmark. Geist Mono Medium is embedded so the file renders anywhere.
const LOCKUP_W = 232
function lockupSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOCKUP_W} 32">
  <style>@font-face{font-family:'Geist Mono';font-weight:500;src:url(data:font/woff2;base64,${MONO_500})}</style>
  <path d="${MARK_D}" fill="${color}"/>
  <text x="46" y="22.4" font-family="'Geist Mono', monospace" font-weight="500" font-size="18" letter-spacing="1.44" fill="${color}">PHASE ROBOTICS</text>
</svg>\n`
}

// ------------------------------------------------------------------ scenes
// A ground with the blurred colour field and grain, as on the site.
function scene({ w, h, dark = false, field = true, body }) {
  const ground = dark ? COLORS.night : COLORS.paper
  const text = dark ? COLORS.mist : COLORS.ink
  const blur = Math.round(Math.min(w, h) * 0.15)
  const strength = dark ? 0.6 : 0.5
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
*{box-sizing:border-box;margin:0}
body{width:${w}px;height:${h}px;overflow:hidden;position:relative;background:${ground};color:${text};font-family:Geist,system-ui,sans-serif;font-weight:500}
.blob{position:absolute;border-radius:50%;filter:blur(${blur}px)}
.grain{position:absolute;inset:0;background:url(data:image/png;base64,${dark ? NOISE.light : NOISE.dark}) 0 0/60px 60px;opacity:${dark ? 0.12 : 0.2}}
.mono{font-family:'Geist Mono',monospace;letter-spacing:0.08em}
.muted{color:${dark ? COLORS.mutedOnDark : COLORS.muted}}
</style></head><body>
${field ? `<div class="blob" style="left:${w * 0.3}px;top:${h * 0.5}px;width:${w * 0.8}px;height:${h * 0.9}px;background:${COLORS.cobalt};opacity:${strength}"></div>
<div class="blob" style="left:${w * 0.64}px;top:${h * 0.58}px;width:${w * 0.5}px;height:${h * 0.75}px;background:${COLORS.mint};opacity:${strength + 0.05}"></div>` : ''}
<div class="grain"></div>
${body({ w, h, text, dark })}
</body></html>`
}

const brand = (color, size) =>
  `<div class="mono" style="display:flex;align-items:center;gap:${size * 0.5}px;font-size:${size * 0.65}px">${mark(color, size)}PHASE ROBOTICS</div>`

// Profile banners. X and LinkedIn both overlay the avatar bottom-left, so the
// brand sits top-left and the headline is set to the right.
function banner(w, h, dark) {
  return scene({
    w, h, dark,
    body: ({ text }) => {
      const pad = Math.round(h * 0.13)
      const head = Math.round(h * 0.2)
      return `<div style="position:absolute;inset:0;padding:${pad}px ${pad * 1.4}px;display:flex;justify-content:space-between;align-items:flex-start">
        ${brand(text, Math.max(26, Math.round(h * 0.12)))}
        <div style="align-self:center;text-align:right">
          <div style="font-size:${head}px;letter-spacing:-0.045em;line-height:0.95">Small actuators.<br>Precise motion.</div>
          <div class="mono" style="margin-top:${head * 0.38}px;font-size:${Math.max(11, Math.round(h * 0.038))}px">PHASEROBOTICS.CC</div>
        </div>
      </div>`
    },
  })
}

function ogImage() {
  return scene({
    w: 1200, h: 630,
    body: ({ text }) => `<div style="position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between">
      ${brand(text, 34)}
      <div style="font-size:96px;letter-spacing:-0.045em;line-height:0.96">Bringing small, precise<br>actuators to the US.</div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;font-size:26px;font-weight:400">
        <span>Building actuator supply chains for dexterous manipulators.</span>
        <span class="mono" style="font-size:20px;font-weight:500">PHASEROBOTICS.CC</span>
      </div>
    </div>`,
  })
}

function avatar(variant) {
  const dark = variant === 'dark' || variant === 'colour'
  const field = variant.startsWith('colour')
  return scene({
    w: 1024, h: 1024, dark, field,
    body: ({ text }) => `<div style="position:absolute;inset:0;display:grid;place-items:center">${mark(text, 460)}</div>`,
  })
}

function paletteSheet() {
  const swatches = [
    ['Paper', COLORS.paper, 'Light ground', COLORS.ink], ['Ink', COLORS.ink, 'Text on light, dark buttons', COLORS.mist],
    ['Night', COLORS.night, 'Dark ground', COLORS.mist], ['Mist', COLORS.mist, 'Text on dark', COLORS.ink],
    ['Cobalt', COLORS.cobalt, 'Primary colour field', '#ffffff'], ['Mint', COLORS.mint, 'Secondary colour field', COLORS.ink],
    ['Sky', COLORS.sky, 'Card accent, with Cobalt', COLORS.ink], ['Teal', COLORS.teal, 'Card accent, with Mint', '#ffffff'],
    ['Ember', COLORS.ember, 'Card accent', '#ffffff'], ['Peach', COLORS.peach, 'Card accent, with Ember', COLORS.ink],
    ['Muted', COLORS.muted, 'Secondary text on light', '#ffffff'], ['Muted on dark', COLORS.mutedOnDark, 'Secondary text on dark', COLORS.ink],
  ]
  return scene({
    w: 1600, h: 1000, field: false,
    body: ({ text }) => `<div style="position:absolute;inset:0;padding:64px;display:flex;flex-direction:column;gap:40px">
      <div style="display:flex;justify-content:space-between;align-items:center">${brand(text, 30)}<span class="mono muted" style="font-size:16px">COLOUR</span></div>
      <div style="flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:20px">
        ${swatches.map(([name, hex, use, on]) => `<div style="background:${hex};color:${on};border:1px solid rgba(12,13,12,0.14);padding:22px;display:flex;flex-direction:column;justify-content:space-between">
          <span style="font-size:30px;letter-spacing:-0.03em">${name}</span>
          <span><span class="mono" style="font-size:16px;display:block">${hex.toUpperCase()}</span><span style="font-size:15px;font-weight:400;opacity:0.85">${use}</span></span>
        </div>`).join('')}
      </div>
    </div>`,
  })
}

function typeSpecimen() {
  return scene({
    w: 1600, h: 1000,
    body: ({ text }) => `<div style="position:absolute;inset:0;padding:64px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="display:flex;justify-content:space-between;align-items:center">${brand(text, 30)}<span class="mono muted" style="font-size:16px">TYPE</span></div>
      <div>
        <div class="mono muted" style="font-size:15px;margin-bottom:18px">GEIST MEDIUM / HEADLINES / -0.045EM</div>
        <div style="font-size:150px;letter-spacing:-0.045em;line-height:0.95">Small actuators.<br>Precise motion.</div>
      </div>
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:64px;align-items:end">
        <div>
          <div class="mono muted" style="font-size:15px;margin-bottom:14px">GEIST REGULAR / BODY</div>
          <div style="font-size:28px;font-weight:400;line-height:1.4">For robot hands and dexterous manipulators, and the machines that make them.</div>
        </div>
        <div>
          <div class="mono muted" style="font-size:15px;margin-bottom:14px">GEIST MONO MEDIUM / LABELS, WORDMARK / +0.08EM</div>
          <div class="mono" style="font-size:28px">IN THE LAB &nbsp; TAKING SHAPE<br>ABCDEFGHIJKLM 0123456789</div>
        </div>
      </div>
    </div>`,
  })
}

// ------------------------------------------------------------------ render
const browser = await chromium.launch()
async function render(html, w, h, file, { transparent = false } = {}) {
  if (ONLY && !file.includes(ONLY)) return
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
  await page.setContent(html)
  await page.evaluate(() => document.fonts.ready)
  mkdirSync(path.dirname(path.join(OUT, file)), { recursive: true })
  await page.screenshot({ path: path.join(OUT, file), omitBackground: transparent })
  await page.close()
  console.log('wrote', file)
}
const svgPage = (svg, w, h) =>
  `<!doctype html><html><body style="margin:0;width:${w}px;height:${h}px">${svg.replace('<svg ', `<svg width="${w}" height="${h}" `)}</body></html>`
function write(file, text) {
  if (ONLY && !file.includes(ONLY)) return
  writeFileSync(path.join(OUT, file), text)
  console.log('wrote', file)
}

// Logo
write('logo/svg/glider-black.svg', markSvg(null, COLORS.ink))
write('logo/svg/glider-white.svg', markSvg(null, '#ffffff'))
write('logo/svg/glider-tile-black-on-white.svg', markSvg(COLORS.paper, COLORS.ink))
write('logo/svg/glider-tile-white-on-black.svg', markSvg(COLORS.night, COLORS.mist))
write('logo/svg/lockup-black.svg', lockupSvg(COLORS.ink))
write('logo/svg/lockup-white.svg', lockupSvg('#ffffff'))
await render(svgPage(markSvg(null, COLORS.ink), 1024, 1024), 1024, 1024, 'logo/png/glider-black-1024.png', { transparent: true })
await render(svgPage(markSvg(null, '#ffffff'), 1024, 1024), 1024, 1024, 'logo/png/glider-white-1024.png', { transparent: true })
await render(svgPage(markSvg(COLORS.paper, COLORS.ink), 1024, 1024), 1024, 1024, 'logo/png/glider-tile-black-on-white-1024.png')
await render(svgPage(markSvg(COLORS.night, COLORS.mist), 1024, 1024), 1024, 1024, 'logo/png/glider-tile-white-on-black-1024.png')
const LOCKUP_PX = 2376
const LOCKUP_H = Math.round((LOCKUP_PX * 32) / LOCKUP_W)
await render(svgPage(lockupSvg(COLORS.ink), LOCKUP_PX, LOCKUP_H), LOCKUP_PX, LOCKUP_H, 'logo/png/lockup-black-2376w.png', { transparent: true })
await render(svgPage(lockupSvg('#ffffff'), LOCKUP_PX, LOCKUP_H), LOCKUP_PX, LOCKUP_H, 'logo/png/lockup-white-2376w.png', { transparent: true })

// Colour and type
await render(paletteSheet(), 1600, 1000, 'colors/palette.png')
await render(typeSpecimen(), 1600, 1000, 'typography/type-specimen.png')

// Social
for (const [name, w, h] of [['linkedin-1584x396', 1584, 396], ['linkedin-company-1128x191', 1128, 191], ['x-1500x500', 1500, 500]]) {
  await render(banner(w, h, false), w, h, `social/banner-${name}.png`)
  await render(banner(w, h, true), w, h, `social/banner-${name}-dark.png`)
}
await render(avatar('light'), 1024, 1024, 'social/avatar-light-1024.png')
await render(avatar('dark'), 1024, 1024, 'social/avatar-dark-1024.png')
await render(avatar('colour'), 1024, 1024, 'social/avatar-colour-1024.png')
await render(avatar('colour-light'), 1024, 1024, 'social/avatar-colour-light-1024.png')
await render(ogImage(), 1200, 630, 'social/og-image-1200x630.png')
if (!ONLY || 'og-image'.includes(ONLY)) copyFileSync(path.join(OUT, 'social/og-image-1200x630.png'), path.join(ROOT, 'public/og-image.png'))

await browser.close()
