# Phase Robotics Website

Minimalist site for Phase Robotics: small precision actuators for robot hands,
and the machines that make them. Paper, ink and one dark green accent; cut
corners, slanted section edges, hairline rules and film grain. The hero runs a
live Conway's Game of Life (the logo is a glider).

Page order: hero and headline specs, products, investor thesis, contact.

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
│       ├── Navbar.jsx/css     # Fixed instrument-bar header
│       ├── Hero.jsx/css       # Headline, Life grid behind a diagonal, spec strip
│       ├── PhalanxMockup.jsx/css # Exploded SVG drawing of the Phalanx actuator
│       ├── GameOfLife.jsx     # Canvas Life sim (hero bg + footer strip)
│       ├── GliderLogo.jsx     # Inline SVG glider mark
│       ├── Products.jsx/css   # Lunar Drive, Phalanx Drive, Winder-1 with specs
│       ├── Thesis.jsx/css     # Investor thesis on the green slanted section
│       ├── Contact.jsx/css    # Early access and investor enquiry
│       ├── Footer.jsx/css     # Footer with a lone glider orbiting forever
│       └── (unused)           # About, Features, Ticker, ModelViewer, AsciiActuator, PixelIcon
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
