'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

// Each card has an abstract drawing on a colour field. The two drives also show
// a cut-out product photo in front of it (chip markings covered). Winder-1 uses
// a cut-out of its render, kept small and low resolution.
const WAVES = (
  <svg className="art-lines" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <path d="M0 130H400" opacity="0.5" />
    <g className="waves">
      <path d="M0 130Q50 10 100 130T200 130T300 130T400 130T500 130T600 130" />
      <path d="M-67 130Q-17 10 33 130T133 130T233 130T333 130T433 130T533 130T633 130" />
      <path d="M-133 130Q-83 10 -33 130T67 130T167 130T267 130T367 130T467 130T567 130T667 130" />
    </g>
  </svg>
)

const PLATES = (
  <svg className="art-lines" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <path className="plate-top" d="M200 27L330 75L200 123L70 75Z" />
    <path d="M200 82L330 130L200 178L70 130Z" />
    <path className="plate-bot" d="M200 137L330 185L200 233L70 185Z" />
    <path className="plate-lines" d="M70 75V185M330 75V185M200 123V233" opacity="0.5" />
  </svg>
)

const COIL = (
  <svg className="art-lines" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <path d="M0 130H70M330 130H400" opacity="0.5" />
    <g className="coil">
      {[92, 119, 146, 173, 200, 227, 254, 281, 308].map((cx) => (
        <ellipse key={cx} cx={cx} cy="130" rx="22" ry="72" />
      ))}
    </g>
  </svg>
)

const PROJECTS: {
  name: string
  status: string
  blurb: string
  art: string
  drawing: ReactNode
  photo?: { src: string; alt: string; width: number; height: number; bleed?: boolean }
}[] = [
  {
    name: 'Lunar Drive',
    status: 'In the lab',
    blurb: 'Servo drive. Turns a brushless motor into a smart, chainable servo.',
    art: 'art-1',
    drawing: WAVES,
    photo: { src: '/lunar-drive-cutout.webp', alt: 'Lunar Drive board mounted on a brushless motor, beside a bare stator', width: 662, height: 378 },
  },
  {
    name: 'Phalanx Drive',
    status: 'Taking shape',
    blurb: 'Integrated actuator. Drive, motor and gearing in one package.',
    art: 'art-2',
    drawing: PLATES,
    photo: { src: '/phalanx-drive-cutout.webp', alt: 'Phalanx Drive circular circuit board', width: 620, height: 615 },
  },
  {
    name: 'Winder-1',
    status: 'Running in-house',
    blurb: 'Our own machines for making motors, built so we can iterate, scale and not rely on others.',
    art: 'art-3',
    drawing: COIL,
    // The render is cropped top and bottom, so it runs off the panel edges
    photo: { src: '/winder-1-cutout.webp', alt: 'Render of the Winder-1 motor winding machine', width: 511, height: 640, bleed: true },
  },
]

export function Development() {
  const rowRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean[]>([true, false, false])

  // Track which cards are in view inside the swipeable row, so the phone layout
  // can raise the centred one and touch screens only animate what is visible.
  useEffect(() => {
    const row = rowRef.current
    if (!row || !('IntersectionObserver' in window)) return
    const cards = Array.from(row.children)
    const observer = new IntersectionObserver(
      (entries) => {
        setActive((current) => {
          const next = [...current]
          for (const entry of entries) next[cards.indexOf(entry.target)] = entry.intersectionRatio >= 0.6
          return next
        })
      },
      { root: row, threshold: [0, 0.6, 1] }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="development" className="gutter relative flex flex-col gap-4 pb-8 lg:gap-10 lg:pb-24">
      <div className="reveal flex items-baseline justify-between gap-4">
        <h2 className="text-[clamp(32px,4vw,44px)] leading-none font-medium tracking-[-0.035em]">In development</h2>
        <span className="label-mono lg:hidden">Swipe →</span>
      </div>

      <div ref={rowRef} className="dev-row">
        {PROJECTS.map((project, index) => (
          <article key={project.name} className="dev-card reveal" data-active={active[index]}>
            <div className={`card-art ${project.art}`}>
              {project.drawing}
              <span className="art-grain" aria-hidden="true" />
              {project.photo && (
                <img
                  className={project.photo.bleed ? 'card-cutout card-cutout--bleed' : 'card-cutout'}
                  src={project.photo.src}
                  alt={project.photo.alt}
                  width={project.photo.width}
                  height={project.photo.height}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
            <div className="flex flex-col gap-2.5 p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 className="text-2xl font-medium tracking-[-0.02em]">{project.name}</h3>
                <span className="label-mono">{project.status}</span>
              </div>
              <p className="text-[15px] leading-normal text-muted-foreground">{project.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
