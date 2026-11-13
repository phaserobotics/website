// Rounded / "bubbly" glider logo explorations.
// Writes SVGs + a static preview page (+ PNG) to branding/explorations/rounded-glider/.
//
//   node branding/tools/rounded-glider.mjs
import { writeFileSync, mkdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer-core'
import { roundedPath } from './mark.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '../explorations/rounded-glider')
mkdirSync(OUT, { recursive: true })

const INK = '#0a0a0a'
const PAPER = '#ffffff'

// Glider cells on a gapless 10-unit grid: (1,0) (2,1) (0,2) (1,2) (2,2).
// One outline that passes through the diagonal touch point (20,10) twice,
// so both visits get concave fillets and form a neck between the top cell
// and the L below it.
const BRIDGED = [[10, 0], [20, 0], [20, 10], [30, 10], [30, 30], [0, 30], [0, 20], [20, 20], [20, 10], [10, 10]]
const TOP = [[10, 0], [20, 0], [20, 10], [10, 10]]
const L = [[20, 10], [30, 10], [30, 30], [0, 30], [0, 20], [20, 20]]

const VARIANTS = [
  {
    id: 'A', name: 'A — FUSED',
    why: 'One continuous shape: cells merge like the reference, and a filleted neck joins the diagonal top cell.',
    d: [roundedPath(BRIDGED, 3, 3)],
  },
  {
    id: 'B', name: 'B — FUSED, EXTRA BUBBLY',
    why: 'Same construction with larger radii: softer and more playful.',
    d: [roundedPath(BRIDGED, 4.5, 4)],
  },
  {
    id: 'C', name: 'C — KISSING',
    why: 'The L merges; the top cell stays its own bubble, just kissing the L at the diagonal.',
    d: [roundedPath(TOP, 3, 3), roundedPath(L, 3, 3)],
  },
  {
    id: 'D', name: 'D — SOFT TILES',
    why: 'Current tiled glider with rounded cells: the smallest change from today.',
    d: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]].map(([c, r]) =>
      roundedPath([[c * 10 + 1, r * 10 + 1], [c * 10 + 9, r * 10 + 1], [c * 10 + 9, r * 10 + 9], [c * 10 + 1, r * 10 + 9]], 2.4, 0)),
  },
]

const VIEWBOX = '-1 -1 32 32'
const markSvg = (v, color, size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}" width="${size}" height="${size}" style="display:block">${v.d.map((d) => `<path d="${d}" fill="${color}"/>`).join('')}</svg>`

for (const v of VARIANTS) {
  writeFileSync(path.join(OUT, `rounded-glider-${v.id}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}">\n  ${v.d.map((d) => `<path d="${d}" fill="${INK}"/>`).join('\n  ')}\n</svg>\n`)
}

// Embed JetBrains Mono from the existing lockup so the page works offline.
const lockup = readFileSync(path.resolve(__dirname, '../logo/svg/lockup-black.svg'), 'utf8')
const faces = [...lockup.matchAll(/@font-face\{[^}]+\}/g)].map((m) => m[0]).join('')

const current = { d: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]].map(([c, r]) => `M${c * 10 + 1} ${r * 10 + 1}h8v8h-8z`) }

const card = (v) => `
<div class="card">
  <h2>${v.name}</h2><p class="why">${v.why}</p>
  <div class="stage">${markSvg(v, INK, 150)}</div>
  <div class="row">
    <div class="chip">${markSvg(v, INK, 26)}<span class="wm">PHASE <span>ROBOTICS</span></span></div>
    <div class="chip dark">${markSvg(v, PAPER, 26)}<span class="wm">PHASE <span>ROBOTICS</span></span></div>
    <div class="fav">${markSvg(v, INK, 16)}16px</div>
    <div class="fav">${markSvg(v, INK, 32)}32px</div>
  </div>
</div>`

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Rounded Glider — Logo Exploration</title>
<style>
${faces}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'JetBrains Mono',monospace;background:#fff;color:${INK};padding:48px 40px}
.wrap{max-width:1160px;margin:0 auto}
h1{font-size:14px;letter-spacing:.2em;margin-bottom:8px}
.sub{color:#6b6b6b;font-size:13px;margin-bottom:32px;max-width:720px;line-height:1.6}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.card{border:1px solid ${INK};padding:22px}
.card h2{font-size:12px;letter-spacing:.15em}
.why{font-size:12px;color:#6b6b6b;margin:6px 0 16px;min-height:36px;line-height:1.5}
.stage{display:flex;align-items:center;justify-content:center;height:210px;border:1px solid #e4e4e4;margin-bottom:14px}
.row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.chip{display:flex;align-items:center;gap:9px;border:1px solid #e4e4e4;padding:8px 12px}
.chip.dark{background:${INK};color:#fff;border-color:${INK}}
.wm{font-size:12px;font-weight:700;letter-spacing:.12em}
.wm span{font-weight:400;opacity:.55}
.fav{display:flex;align-items:center;gap:6px;border:1px solid #e4e4e4;padding:8px 10px;font-size:10px;color:#6b6b6b}
.ref{display:flex;align-items:center;gap:16px;margin-bottom:28px;font-size:12px;color:#6b6b6b}
</style></head><body><div class="wrap">
<h1>// ROUNDED GLIDER — LOGO EXPLORATION</h1>
<p class="sub">Bubbly takes on the glider, after the reference mark: cells fused with rounded outer corners and filleted inner corners. Each is shown large, next to the wordmark, inverted, and at favicon sizes.</p>
<div class="ref">CURRENT →${markSvg(current, INK, 40)}</div>
<div class="grid">${VARIANTS.map(card).join('')}</div>
</div></body></html>`
writeFileSync(path.join(OUT, 'preview.html'), html)

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1240, height: 900 })
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: path.join(OUT, 'preview.png'), fullPage: true })
await browser.close()
console.log('done ->', OUT)
