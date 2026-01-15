# Dynamiq Electronics Website

A modern React website for Dynamiq Electronics featuring an interactive pixel art animation hero section.

## Project Structure

```
website/
├── public/                 # Static assets (copied to dist on build)
│   ├── .htaccess          # Apache routing rules for SPA
│   ├── logo.png           # Company logo
│   └── eclipse_drive.png  # Product image
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles & CSS variables
│   └── components/
│       ├── Navbar.jsx/css    # Navigation header
│       ├── Hero.jsx/css      # Hero section with CTA
│       ├── HeroAnimation.jsx # Three.js pixel animation
│       ├── Features.jsx/css  # Service cards section
│       ├── Products.jsx/css  # Eclipse Drive showcase
│       ├── About.jsx/css     # Company values
│       └── Footer.jsx/css    # Footer with newsletter
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

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

### Build the Site
```bash
npm run build
```

This creates a `dist/` folder with all static files ready for deployment.

## Deploying to cPanel

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Upload to cPanel
1. Log into your cPanel account
2. Open **File Manager**
3. Navigate to `public_html` (or your desired directory)
4. Upload ALL contents from the `dist/` folder:
   - `index.html`
   - `assets/` folder (contains JS, CSS)
   - `.htaccess` (important for routing!)
   - `logo.png`
   - `eclipse_drive.png`
   - Any other static files

### Step 3: Verify .htaccess
Make sure the `.htaccess` file is uploaded. It handles:
- SPA routing (all routes serve index.html)
- Security headers
- Caching for better performance
- Gzip compression

### Deploying to a Subfolder
If deploying to `yourdomain.com/dynamiq/` instead of root:

1. Edit `vite.config.js`:
```js
base: '/dynamiq/',
```

2. Rebuild: `npm run build`

3. Upload `dist/` contents to the `dynamiq/` folder in cPanel

## Features

- ⚡ Interactive Three.js pixel art animation
- 📱 Fully responsive design
- 🎨 Modern black & white aesthetic
- 🚀 Optimized production build
- 🔒 Security headers included

## Tech Stack

- React 18
- Three.js
- Vite
- CSS Variables
