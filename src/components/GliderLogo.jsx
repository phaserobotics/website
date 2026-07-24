// Conway's Game of Life glider — the Phase Robotics mark.
// Cells: (1,0) (2,1) (0,2) (1,2) (2,2) on a 3x3 grid, rendered in currentColor
// so it inverts cleanly on dark sections.
const CELLS = [
  [1, 0],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2],
]

function GliderLogo({ size = 28, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Phase Robotics glider logo"
    >
      {CELLS.map(([c, r]) => (
        <rect
          key={`${c}-${r}`}
          x={2 + c * 10}
          y={2 + r * 10}
          width="8"
          height="8"
          fill="currentColor"
        />
      ))}
    </svg>
  )
}

export default GliderLogo
