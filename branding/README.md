# Phase Robotics Branding Kit

The identity matches the website: an off-white or near-black ground, a soft
blurred field of cobalt and mint, fine film grain, and plain Geist type. The
mark is a **Conway's Game of Life glider**, five live cells fused into one
rounded shape.

---

## The mark

The glider is drawn on a 3×3 Life grid in its canonical orientation (heading
down-right). Construction, on a 32-unit box:

```
gapless grid, pitch 10 · margin 1        . X .
cells (col,row):                         . . X
(1,0) (2,1) (0,2) (1,2) (2,2)            X X X
outer corners: radius 3 · inner corners: fillet 3
```

The canonical path is `MARK_D` in `tools/mark.mjs`. The website's
`components/glider-logo.tsx` and `public/glider.svg` embed the same path.

**Rules**

- Never rotate or mirror it. The glider has a canonical heading.
- The mark itself is always one flat colour: Ink on light, Mist or white on
  dark. Colour belongs in the field behind it, never in the mark.
- Clear space: at least one grid cell (10 units) on every side.
- Minimum sizes: 16 px (mark), 110 px wide (lockup).
- Use the path as drawn. Don't redraw it, change the radii, or separate the cells.

## Wordmark and lockup

`PHASE ROBOTICS` in Geist Mono Medium, uppercase, letter-spacing 0.08em, set to
the right of the mark. Use `logo/svg/lockup-*.svg`; the font is embedded, so
they render correctly anywhere.

## Colour

| Token | Hex | Use |
|---|---|---|
| paper | `#f4f3ee` | light ground |
| ink | `#0c0d0c` | text on light, the mark, dark buttons |
| night | `#08090a` | dark ground |
| mist | `#f2f3f1` | text on dark |
| muted | `#3f423c` | secondary text on light |
| muted on dark | `#a8aca6` | secondary text on dark |
| cobalt | `#1d3fbb` | primary colour field |
| mint | `#5fd0c0` | secondary colour field |
| sky, teal, ember, peach | `#8fa8ff` `#0d4a4f` `#c2410c` `#ffb07a` | card accents |

Tokens are in `colors/palette.css` and `colors/palette.json`, with a swatch
sheet in `colors/palette.png`.

**The colour field.** Cobalt and mint appear as large, heavily blurred shapes
low and to the right of a layout, at about half strength, with grain over the
top. Text never sits in the colours as flat fills. Hairlines are Ink at 14% on
light and white at 14% on dark.

## Typography

Geist Medium for headlines, Geist Regular for body, Geist Mono Medium for small
uppercase labels and the wordmark. Details in `typography/typography.md`, sample
in `typography/type-specimen.png`.

## Voice

Short and plain. Headlines are two-beat statements with full stops: "Small
actuators. Precise motion." Say what the thing is and stop. Detailed motor
specifications stay off public-facing material.

---

## Inventory

```
branding/
├── logo/
│   ├── svg/
│   │   ├── glider-black.svg                 mark, Ink on transparent
│   │   ├── glider-white.svg                 mark, white on transparent
│   │   ├── glider-tile-black-on-white.svg   mark on a Paper tile
│   │   ├── glider-tile-white-on-black.svg   mark on a Night tile
│   │   ├── lockup-black.svg                 mark + wordmark (font embedded)
│   │   └── lockup-white.svg                 inverted lockup (font embedded)
│   └── png/
│       ├── glider-{black,white}-1024.png            transparent
│       ├── glider-tile-*-1024.png                   opaque tiles
│       └── lockup-{black,white}-2376w.png           transparent
├── favicon/                                 unchanged; the mark is the same
├── colors/      palette.css · palette.json · palette.png
├── typography/  typography.md · type-specimen.png
├── social/
│   ├── avatar-{light,dark,colour,colour-light}-1024.png
│   ├── banner-linkedin-1584x396{,-dark}.png           personal profile banner
│   ├── banner-linkedin-company-1128x191{,-dark}.png   company page cover
│   ├── banner-x-1500x500{,-dark}.png
│   └── og-image-1200x630.png                copied to public/og-image.png
├── explorations/rounded-glider/             earlier logo variants (A was adopted)
└── tools/
    ├── mark.mjs                             canonical logo path (MARK_D)
    ├── generate.mjs                         regenerates everything above
    └── rounded-glider.mjs                   regenerates the explorations
```

Banners keep the bottom-left empty, because X and LinkedIn place the profile
picture there: the lockup sits top-left and the headline is set to the right.
Each banner comes in a light and a dark version.

## Regenerating

From the repo root, after `npm install` (the Geist fonts come from
`node_modules/geist`, so no network is needed for type):

```bash
npm i --no-save playwright
```

```bash
npx playwright install chromium
```

```bash
node branding/tools/generate.mjs
```

`--only=<name>` re-renders just the matching files, for example
`node branding/tools/generate.mjs --only=banner`. The script also copies the
social card to `public/og-image.png`. If you change the mark, paste the new
`MARK_D` into `components/glider-logo.tsx` and `public/glider.svg` as well.
