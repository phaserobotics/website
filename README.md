# Phase Robotics Website

Minimalist black & white site for Phase Robotics — easy-to-use, affordable,
precise, modular robotic actuators. Features a live Conway's Game of Life hero
(the logo is a glider), ASCII/pixel-art accents, and interactive 3D PCB viewers
exported straight from the KiCad sources.

## Project Structure

```
website/
├── public/                    # Static assets (copied to dist on build)
│   ├── .htaccess              # Apache routing rules for SPA
│   ├── glider.svg             # Logo / favicon (Conway glider)
│   ├── phalanx_exploded.png   # Phalanx cycloidal reducer exploded view
│   ├── draco/                 # Draco decoder (for compressed GLB models)
│   └── models/
│       ├── lunar-drive.glb    # Lunar Drive V2.1 PCB (kicad-cli export, Draco-compressed)
│       └── phalanx-drive.glb  # Phalanx Drive PCB (kicad-cli export, Draco-compressed)
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Layout + scroll-reveal observer
│   ├── index.css              # Global styles & CSS variables
│   └── components/
│       ├── Navbar.jsx/css     # Fixed header with glider logo
│       ├── Hero.jsx/css       # Headline over interactive Game of Life
│       ├── GameOfLife.jsx     # Canvas Life sim (hero bg + footer strip)
│       ├── GliderLogo.jsx     # Inline SVG glider mark
│       ├── Ticker.jsx/css     # Scrolling spec marquee
│       ├── Features.jsx/css   # Why Phase (pixel-art icons)
│       ├── PixelIcon.jsx      # 7x7 pixel-grid icons
│       ├── Products.jsx/css   # Lunar Drive V2.1, Phalanx Drive, Atlas teaser
│       ├── ModelViewer.jsx/css# Lazy three.js GLB viewer (Draco)
│       ├── About.jsx/css      # Mission + animated ASCII actuator
│       ├── AsciiActuator.jsx  # ASCII diagram with spinning rotor
│       └── Footer.jsx/css     # Footer with a lone glider orbiting forever
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies
```

## Regenerating the 3D models

The PCB models are exported from the KiCad projects with `kicad-cli`, then
Draco-compressed for the web:

```bash
kicad-cli pcb export glb --force --subst-models --include-tracks --include-pads \
  --include-silkscreen --include-soldermask --no-dnp \
  -o public/models/lunar-drive.glb <path-to>/LunarDriveV2/PCB/LunarDrive.kicad_pcb

kicad-cli pcb export glb --force --subst-models --include-tracks --include-pads \
  --include-silkscreen --include-soldermask --no-dnp \
  -o public/models/phalanx-drive.glb <path-to>/PhalanxDrive/PCB/PhalanxDrive.kicad_pcb

npx @gltf-transform/cli optimize public/models/lunar-drive.glb public/models/lunar-drive.glb --compress draco --texture-compress false
npx @gltf-transform/cli optimize public/models/phalanx-drive.glb public/models/phalanx-drive.glb --compress draco --texture-compress false
```

The Draco decoder in `public/draco/` comes from
`node_modules/three/examples/jsm/libs/draco/gltf/`.

## Development

### Prerequisites
- Node.js 18+
- npm

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
The site will be available at `http://localhost:5173`

### Preview Production Build
```bash
npm run preview
```

## Building for Production

```bash
npm run build
```

This creates a `dist/` folder with all static files ready for deployment.

## Deploying to cPanel

1. `npm run build`
2. Log into cPanel → **File Manager** → `public_html` (or your target directory)
3. Upload ALL contents of `dist/` (including `.htaccess`, `glider.svg`,
   `models/`, and `draco/`)

### Deploying to a Subfolder
If deploying to `yourdomain.com/phase-robotics/` instead of root:

1. Edit `vite.config.js`: `base: '/phase-robotics/',`
2. Rebuild: `npm run build`
3. Upload `dist/` contents to the `phase-robotics/` folder in cPanel

## Tech Stack

- React 18
- Three.js (GLB viewers + Draco decoding)
- Vite
- CSS Variables
