# Phase Robotics — Branding Kit

Monochrome identity built around a **Conway's Game of Life glider**: five live
cells that travel forever under rule b3/s23. Simple rules, emergent motion —
which is also the pitch for the actuators.

---

## The mark

The glider is drawn on a 3×3 Life grid in its canonical orientation (heading
down-right). Construction, on a 32-unit box:

```
grid pitch 10 · cell 8 · margin 2        . X .
cells (col,row):                         . . X
(1,0) (2,1) (0,2) (1,2) (2,2)            X X X
```

**Rules**

- Never rotate or mirror — the glider has a canonical heading; a flipped glider
  is a different spaceship and the nerds will notice.
- Ink on paper or paper on ink only. No colors, gradients, outlines, shadows,
  or container shapes.
- Clear space: at least one grid cell (10 units) on every side.
- Minimum sizes: 16 px (mark), 110 px wide (lockup).
- Cells are always square, gap always 2/10 of the pitch. Don't round corners.

## Wordmark & lockup

JetBrains Mono, letter-spacing 0.12 em: **PHASE** (700, ink) + `ROBOTICS`
(400, muted). The horizontal lockup places the mark at text cap-height scale
with a 12-unit gap. Use `logo/svg/lockup-*.svg` — fonts are embedded, so they
render correctly anywhere.

## Colors

| Token | Hex | Use |
|---|---|---|
| ink | `#0a0a0a` | text, marks, borders, dark surfaces |
| paper | `#ffffff` | background |
| paper-dim | `#fafafa` | raised / hover surfaces |
| muted | `#6b6b6b` | secondary text, labels |
| line | `#e4e4e4` | hairline borders |
| cell | `#ebebeb` | Life cells, decorative pixels |

Tokens in `colors/palette.css` and `colors/palette.json`; swatch sheet in
`colors/palette.png`. On dark surfaces use white at 85/72/55/20 % opacity
(text / secondary / labels / dividers).

## Typography

Sora (headlines) · Inter (body) · JetBrains Mono (labels, specs, code,
wordmark). Details and conventions in `typography/typography.md`, sample in
`typography/type-specimen.png`.

## Voice

Minimalist and technical. Mono labels are uppercase and prefixed `// `.
Spec-sheet energy over marketing energy: say `60 A PEAK`, not "unprecedented
power". The brand keywords are **easy-to-use, affordable, precise, modular**.

---

## Inventory

```
branding/
├── logo/
│   ├── svg/
│   │   ├── glider-black.svg                 mark, ink on transparent
│   │   ├── glider-white.svg                 mark, white on transparent
│   │   ├── glider-tile-black-on-white.svg   mark on square paper tile
│   │   ├── glider-tile-white-on-black.svg   mark on square ink tile
│   │   ├── lockup-black.svg                 mark + wordmark (fonts embedded)
│   │   └── lockup-white.svg                 inverted lockup (fonts embedded)
│   └── png/
│       ├── glider-{black,white}-1024.png            transparent
│       ├── glider-tile-*-1024.png                   opaque tiles
│       └── lockup-{black,white}-2376w.png           transparent, 2376×384
├── favicon/
│   ├── favicon.svg · favicon.ico · favicon-16/32/512.png
│   └── apple-touch-icon-180.png
├── colors/      palette.css · palette.json · palette.png
├── typography/  typography.md · type-specimen.png
├── social/
│   ├── avatar-{white-on-black,black-on-white}-1024.png
│   ├── banner-x-1500x500.png · banner-linkedin-1584x396.png
│   └── og-image-1200x630.png                for <meta property="og:image">
└── tools/generate.mjs                       regenerates everything above
```

## Regenerating

From the repo root (needs Chrome installed):

```bash
npm i --no-save puppeteer-core png-to-ico
node branding/tools/generate.mjs
```

The SVG sources under `logo/svg/` (except the lockups) are hand-written and
canonical; `tools/generate.mjs` derives every PNG, the favicon set, and the
font-embedded lockup SVGs from the same geometry.
