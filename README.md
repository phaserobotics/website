# Phase Robotics Website

Single-page site for Phase Robotics: small precision actuators for robot hands,
and the machines that make them. Off-white (or near-black) ground, blurred
colour, film grain, and three "in development" cards with abstract line
drawings. Light and dark modes.

Page order: hero, in development, vision, early access footer.

## Project Structure

```
website/
├── app/
│   ├── layout.tsx         # Fonts, metadata, structured data, theme provider
│   ├── page.tsx           # The page: nav, hero, development, vision, footer
│   ├── not-found.tsx      # 404 page (exported as 404.html)
│   └── globals.css        # Design tokens (light/dark) and the motion/texture CSS
├── components/
│   ├── site-nav.tsx       # Floating nav, theme button, phone dropdown menu
│   ├── hero.tsx
│   ├── development.tsx    # Swipeable/grid cards and their drawings
│   ├── vision.tsx         # Vision copy; accordion on phones
│   ├── site-footer.tsx    # Early access call to action and footer bar
│   ├── copy-email.tsx     # Email link with copy icon and confirmation
│   ├── theme-toggle.tsx, theme-provider.tsx, glider-logo.tsx
│   └── ui/                # shadcn/ui components (button, accordion, dropdown-menu, tooltip)
├── public/                # Icons, noise tiles, robots.txt, sitemap, _headers
├── branding/              # Brand kit (logo, colours, type)
├── next.config.mjs        # Static export into dist/
└── wrangler.jsonc         # Cloudflare Worker serving dist/ as static assets
```

## Development

Requires Node.js 20+.

```bash
npm install
```

```bash
npm run dev
```

The site runs at `http://localhost:3000`.

## Building and deploying

```bash
npm run build
```

`next build` statically exports the site into `dist/`. Cloudflare serves that
directory as Worker assets (see `wrangler.jsonc`); pushes to a branch get a
preview deployment, and `npm run deploy` builds and deploys by hand.

To add another shadcn/ui component:

```bash
npx shadcn@latest add <component>
```

## Tech Stack

- Next.js (App Router, static export) and React
- Tailwind CSS v4
- shadcn/ui components on Radix UI, lucide-react icons
- next-themes for light and dark mode
- Geist and Geist Mono typefaces
- Cloudflare Workers static assets
