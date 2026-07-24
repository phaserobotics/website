import { useEffect, useRef } from 'react'

// Conway's Game of Life on a toroidal grid, drawn on a 2D canvas.
// Used full-bleed behind the hero (interactive) and as the thin strip
// in the footer (a lone glider orbiting forever).

const GLIDER = [
  [1, 0],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2],
]

// The four phases/orientations feel more organic when stamping on click
function orientedGlider(orientation) {
  return GLIDER.map(([c, r]) => {
    switch (orientation) {
      case 1: return [2 - c, r]
      case 2: return [c, 2 - r]
      case 3: return [2 - c, 2 - r]
      default: return [c, r]
    }
  })
}

function GameOfLife({
  cellSize = 14,
  color = '#e9e9e9',
  density = 0.06,
  gliders = 3,
  minPopulation = 0.015,
  stepMs = 110,
  interactive = false,
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let cols = 0
    let rows = 0
    let grid = new Uint8Array(0)
    let next = new Uint8Array(0)
    let animationId = null
    let lastStep = 0

    function stampGlider(cc, rr, orientation) {
      for (const [c, r] of orientedGlider(orientation)) {
        const x = (cc + c + cols) % cols
        const y = (rr + r + rows) % rows
        grid[y * cols + x] = 1
      }
    }

    function seed() {
      grid.fill(0)
      for (let i = 0; i < grid.length; i++) {
        if (Math.random() < density) grid[i] = 1
      }
      for (let g = 0; g < gliders; g++) {
        stampGlider(
          Math.floor(Math.random() * cols),
          Math.floor(Math.random() * rows),
          Math.floor(Math.random() * 4)
        )
      }
    }

    function resize() {
      const parent = canvas.parentElement
      const width = parent ? parent.clientWidth : window.innerWidth
      const height = parent ? parent.clientHeight : window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.max(3, Math.ceil(width / cellSize))
      rows = Math.max(3, Math.ceil(height / cellSize))
      grid = new Uint8Array(cols * rows)
      next = new Uint8Array(cols * rows)
      seed()
      draw()
    }

    function step() {
      for (let r = 0; r < rows; r++) {
        const rUp = ((r - 1 + rows) % rows) * cols
        const rMid = r * cols
        const rDown = ((r + 1) % rows) * cols
        for (let c = 0; c < cols; c++) {
          const cL = (c - 1 + cols) % cols
          const cR = (c + 1) % cols
          const n =
            grid[rUp + cL] + grid[rUp + c] + grid[rUp + cR] +
            grid[rMid + cL] + grid[rMid + cR] +
            grid[rDown + cL] + grid[rDown + c] + grid[rDown + cR]
          const alive = grid[rMid + c]
          next[rMid + c] = n === 3 || (alive && n === 2) ? 1 : 0
        }
      }
      const tmp = grid
      grid = next
      next = tmp

      // Keep the field from dying out completely
      let population = 0
      for (let i = 0; i < grid.length; i++) population += grid[i]
      if (population < grid.length * minPopulation) {
        stampGlider(
          Math.floor(Math.random() * cols),
          Math.floor(Math.random() * rows),
          Math.floor(Math.random() * 4)
        )
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = color
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r * cols + c]) {
            ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2)
          }
        }
      }
    }

    function loop(time) {
      animationId = requestAnimationFrame(loop)
      if (time - lastStep < stepMs) return
      lastStep = time
      step()
      draw()
    }

    function handlePointer(event) {
      const rect = canvas.getBoundingClientRect()
      const c = Math.floor((event.clientX - rect.left) / cellSize)
      const r = Math.floor((event.clientY - rect.top) / cellSize)
      stampGlider(c, r, Math.floor(Math.random() * 4))
      draw()
    }

    resize()
    window.addEventListener('resize', resize)
    if (interactive) canvas.addEventListener('pointerdown', handlePointer)

    if (!reducedMotion) {
      animationId = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (interactive) canvas.removeEventListener('pointerdown', handlePointer)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [cellSize, color, density, gliders, minPopulation, stepMs, interactive])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

export default GameOfLife
