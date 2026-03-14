import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function HeroAnimation() {
  const containerRef = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    
    // Get dimensions - use window as fallback
    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || window.innerHeight

    // Configuration
    const GRID_SIZE = 10
    const GRID_GAP = 0
    const BURST_RADIUS = 35
    const CORE_RADIUS_PCT = 0.4
    const WAVE_SPEED = 2.0
    const BURST_LIFETIME = 70
    const GLITCH_INTERVAL = 4
    const BASE_GLITCH_LIFETIME = 200
    const GLITCH_LOAD_SPEED = 100
    const CLUSTER_CHANCE = 0.85
    const LARGE_BLOCK_BONUS = 3.0
    const MAX_LARGE_GROUPS = 100
    const LARGE_BLOCK_THRESHOLD = 48

    const COLOR_ACTIVE = new THREE.Color(0xffffff)
    const COLOR_INACTIVE = new THREE.Color(0x000000)

    // Setup Three.js
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2,
      height / 2, height / -2,
      1, 1000
    )
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Grid generation
    const cols = Math.ceil(width / (GRID_SIZE + GRID_GAP))
    const rows = Math.ceil(height / (GRID_SIZE + GRID_GAP))
    const count = cols * rows

    const geometry = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const mesh = new THREE.InstancedMesh(geometry, material, count)

    const lifetimes = new Int32Array(count).fill(0)
    const startDelays = new Int32Array(count).fill(0)
    const dummy = new THREE.Object3D()

    let activeBlocks = []

    const startX = -(cols * (GRID_SIZE + GRID_GAP)) / 2 + (GRID_SIZE / 2)
    const startY = (rows * (GRID_SIZE + GRID_GAP)) / 2 - (GRID_SIZE / 2)

    let i = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dummy.position.set(
          startX + c * (GRID_SIZE + GRID_GAP),
          startY - r * (GRID_SIZE + GRID_GAP),
          0
        )
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        mesh.setColorAt(i, COLOR_INACTIVE)
        i++
      }
    }
    scene.add(mesh)

    // Helpers
    function getIndex(c, r) {
      if (c < 0 || c >= cols || r < 0 || r >= rows) return -1
      return r * cols + c
    }

    function getCoords(index) {
      return { c: index % cols, r: Math.floor(index / cols) }
    }

    // Block spawner
    function spawnGlitchStructure() {
      let largeBlockCount = 0
      for (const b of activeBlocks) {
        if ((b.w * b.h) >= LARGE_BLOCK_THRESHOLD) largeBlockCount++
      }

      let blockWidth, blockHeight
      if (largeBlockCount >= MAX_LARGE_GROUPS) {
        blockWidth = Math.floor(Math.random() * 4) + 2
        blockHeight = Math.floor(Math.random() * 4) + 2
      } else {
        blockWidth = Math.floor(Math.random() * 10) + 4
        blockHeight = Math.floor(Math.random() * 10) + 4
      }

      let startC, startR, lifetimeMult = 1.0

      if (activeBlocks.length > 0 && Math.random() < CLUSTER_CHANCE) {
        let target = activeBlocks[Math.floor(Math.random() * activeBlocks.length)]
        for (let k = 0; k < 3; k++) {
          const candidate = activeBlocks[Math.floor(Math.random() * activeBlocks.length)]
          if ((candidate.w * candidate.h) > (target.w * target.h)) target = candidate
        }

        const centerX = target.c + (target.w / 2)
        const centerY = target.r + (target.h / 2)
        const maxOffset = Math.max(target.w, target.h) * 1.3
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * maxOffset

        startC = Math.floor(centerX + Math.cos(angle) * dist - (blockWidth / 2))
        startR = Math.floor(centerY + Math.sin(angle) * dist - (blockHeight / 2))
        lifetimeMult = 1.5 + (Math.random() * LARGE_BLOCK_BONUS)
      } else {
        startC = Math.floor(Math.random() * (cols - blockWidth))
        startR = Math.floor(Math.random() * (rows - blockHeight))
      }

      if (startC < 0) startC = 0
      if (startR < 0) startR = 0
      if (startC + blockWidth >= cols) startC = cols - blockWidth
      if (startR + blockHeight >= rows) startR = rows - blockHeight

      const isLarge = (blockWidth * blockHeight) >= LARGE_BLOCK_THRESHOLD
      const patternType = Math.random()

      let blockMaxLife = 0

      for (let r = startR; r < startR + blockHeight; r++) {
        for (let c = startC; c < startC + blockWidth; c++) {
          const idx = getIndex(c, r)
          if (idx === -1 || lifetimes[idx] > BASE_GLITCH_LIFETIME) continue

          let active = false

          if (isLarge) {
            if ((r + c) % 2 === 0 && Math.random() > 0.1) active = true
          } else {
            if (patternType < 0.4) {
              if ((r + c) % 2 === 0 && Math.random() > 0.1) active = true
            } else if (patternType < 0.7) {
              if (Math.random() < 0.7) active = true
            } else {
              if (r % 2 === 0 && Math.random() > 0.1) active = true
            }
          }

          if (active) {
            startDelays[idx] = Math.floor(Math.random() * GLITCH_LOAD_SPEED)
            const totalLife = Math.floor(BASE_GLITCH_LIFETIME * lifetimeMult)
            lifetimes[idx] = totalLife + startDelays[idx]
            if (lifetimes[idx] > blockMaxLife) blockMaxLife = lifetimes[idx]
          }
        }
      }

      activeBlocks.push({ c: startC, r: startR, w: blockWidth, h: blockHeight, life: blockMaxLife })
    }

    // Burst logic
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    function handleMouseDown(event) {
      if (!container) return
      const rect = container.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersection = raycaster.intersectObject(mesh)

      if (intersection.length > 0) createStructuredBurst(intersection[0].instanceId)
    }

    function createStructuredBurst(centerIndex) {
      const center = getCoords(centerIndex)
      const scanSize = BURST_RADIUS

      for (let r = center.r - scanSize; r <= center.r + scanSize; r++) {
        for (let c = center.c - scanSize; c <= center.c + scanSize; c++) {
          const idx = getIndex(c, r)
          if (idx === -1) continue

          const dist = Math.sqrt((r - center.r) ** 2 + (c - center.c) ** 2)
          const normalizedDist = dist / scanSize

          const isCore = normalizedDist < CORE_RADIUS_PCT
          const isChecker = (r + c) % 2 === 0

          let chance = 0

          if (isCore) {
            if (isChecker) chance = 0.9
            else chance = 0.05
          } else {
            if (normalizedDist < 1.0) {
              const falloff = Math.pow(1.0 - normalizedDist, 2.5)
              if (isChecker) chance = falloff * 0.8
              else chance = falloff * 0.1
            }
          }

          if (Math.random() < chance) {
            const waveDelay = Math.floor(dist * WAVE_SPEED)
            startDelays[idx] = waveDelay
            lifetimes[idx] = BURST_LIFETIME + (dist * 2) + waveDelay
          }
        }
      }
    }

    container.addEventListener('mousedown', handleMouseDown)

    // Animation loop
    let frame = 0
    let animationId = null

    function animate() {
      animationId = requestAnimationFrame(animate)
      frame++

      if (frame % GLITCH_INTERVAL === 0) spawnGlitchStructure()

      let needsUpdate = false
      for (let j = 0; j < count; j++) {
        if (startDelays[j] > 0) {
          startDelays[j]--
          mesh.setColorAt(j, COLOR_INACTIVE)
          needsUpdate = true
          if (lifetimes[j] > 0) lifetimes[j]--
        } else if (lifetimes[j] > 0) {
          lifetimes[j]--
          mesh.setColorAt(j, COLOR_ACTIVE)
          needsUpdate = true
        } else {
          mesh.setColorAt(j, COLOR_INACTIVE)
        }
      }

      if (needsUpdate || frame < 100) mesh.instanceColor.needsUpdate = true

      for (let k = activeBlocks.length - 1; k >= 0; k--) {
        activeBlocks[k].life--
        if (activeBlocks[k].life <= 0) activeBlocks.splice(k, 1)
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    function handleResize() {
      if (!container) return
      const newWidth = container.clientWidth || window.innerWidth
      const newHeight = container.clientHeight || window.innerHeight

      camera.left = newWidth / -2
      camera.right = newWidth / 2
      camera.top = newHeight / 2
      camera.bottom = newHeight / -2
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Store cleanup function
    cleanupRef.current = () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousedown', handleMouseDown)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }

    // Cleanup on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%'
      }} 
    />
  )
}

export default HeroAnimation
