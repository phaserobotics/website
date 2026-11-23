// Phase Robotics mark: a Conway glider with fused, rounded cells. Drawn in
// currentColor. Path comes from branding/tools/mark.mjs (MARK_D); keep in sync.
const MARK_D =
  'M11 8L11 4A3 3 0 0 1 14 1L18 1A3 3 0 0 1 21 4L21 8A3 3 0 0 0 24 11L28 11A3 3 0 0 1 31 14L31 28A3 3 0 0 1 28 31L4 31A3 3 0 0 1 1 28L1 24A3 3 0 0 1 4 21L18 21A3 3 0 0 0 21 18L21 14A3 3 0 0 0 18 11L14 11A3 3 0 0 1 11 8Z'

export function GliderLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d={MARK_D} fill="currentColor" />
    </svg>
  )
}

export function Brand({ className = '' }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`flex items-center gap-2 whitespace-nowrap font-mono text-xs font-medium tracking-[0.08em] sm:gap-3 sm:text-[13px] ${className}`}
    >
      <GliderLogo />
      <span>PHASE ROBOTICS</span>
    </a>
  )
}
