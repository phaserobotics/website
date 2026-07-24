// Tiny pixel-art icons drawn as cells on a 7x7 grid, in currentColor.
const PATTERNS = {
  // '>' prompt with a cursor underscore
  terminal: [
    [1, 1], [2, 2], [3, 3], [2, 4], [1, 5],
    [5, 5], [6, 5],
  ],
  // a coin: pixel ring with a center dot
  coin: [
    [2, 1], [3, 1], [4, 1],
    [1, 2], [5, 2],
    [1, 3], [3, 3], [5, 3],
    [1, 4], [5, 4],
    [2, 5], [3, 5], [4, 5],
  ],
  // crosshair
  crosshair: [
    [3, 0], [3, 1],
    [0, 3], [1, 3],
    [3, 3],
    [5, 3], [6, 3],
    [3, 5], [3, 6],
    [2, 2], [4, 2], [2, 4], [4, 4],
  ],
  // four 2x2 blocks, one sliding into place
  blocks: [
    [1, 1], [2, 1], [1, 2], [2, 2],
    [4, 1], [5, 1], [4, 2], [5, 2],
    [1, 4], [2, 4], [1, 5], [2, 5],
    [5, 4], [6, 4], [5, 5], [6, 5],
  ],
}

function PixelIcon({ name, size = 42 }) {
  const cells = PATTERNS[name] || []
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" aria-hidden="true">
      {cells.map(([c, r]) => (
        <rect key={`${c}-${r}`} x={c * 10 + 1} y={r * 10 + 1} width="8" height="8" fill="currentColor" />
      ))}
    </svg>
  )
}

export default PixelIcon
