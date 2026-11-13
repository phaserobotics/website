# Phase Robotics — Typography

See `type-specimen.png` for a visual sample.

| Role | Font | Weights | Notes |
|---|---|---|---|
| Headlines | **Sora** | 600, 700 | Tight tracking (−0.02 to −0.03 em) |
| Body | **Inter** | 400, 500 | Default reading text |
| Labels / specs / code / wordmark | **JetBrains Mono** | 400, 700 | UPPERCASE with wide tracking (+0.12 to +0.18 em) |

All three are free Google Fonts (OFL licensed):
<https://fonts.google.com/share?selection.family=Sora:wght@400;600;700|Inter:wght@400;500|JetBrains+Mono:wght@400;700>

## Conventions

- Section labels are mono, uppercase, prefixed with `// ` and numbered: `// 02 — PRODUCTS`
- Spec values are mono: `POSITION / VELOCITY / TORQUE`, `CAN 500K`, `b3/s23`
- The wordmark is JetBrains Mono: **PHASE** at weight 700 in ink, `ROBOTICS` at
  weight 400 in muted, letter-spacing 0.12 em, single space between words
- A blinking block cursor (`▮`, 0.5 em × 0.85 em of the type size) may terminate
  headlines in animated contexts; keep it solid in static assets
