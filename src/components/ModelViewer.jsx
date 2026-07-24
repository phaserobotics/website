import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import './ModelViewer.css'

const BAR_LENGTH = 12

function asciiBar(progress) {
  const filled = Math.round(progress * BAR_LENGTH)
  return `[${'▓'.repeat(filled)}${'░'.repeat(BAR_LENGTH - filled)}] ${Math.round(progress * 100)}%`
}

// Lazy three.js viewer for the KiCad-exported GLB boards.
// Initializes only when scrolled near the viewport, shows an ASCII
// progress bar while the (Draco-compressed) model streams in.
function ModelViewer({ src, label }) {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('idle') // idle | loading | ready | error

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let started = false
    let disposed = false
    let animationId = null
    let cleanupScene = null

    function init() {
      if (started) return
      started = true
      setStatus('loading')

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      container.appendChild(renderer.domElement)

      scene.add(new THREE.HemisphereLight(0xffffff, 0xbfbfbf, 2.2))
      const key = new THREE.DirectionalLight(0xffffff, 2.4)
      key.position.set(4, 8, 6)
      scene.add(key)
      const rim = new THREE.DirectionalLight(0xffffff, 1.2)
      rim.position.set(-6, 4, -8)
      scene.add(rim)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.08
      controls.enablePan = false
      controls.autoRotate = true
      controls.autoRotateSpeed = 1.2

      function resize() {
        const w = container.clientWidth
        const h = container.clientHeight
        if (!w || !h) return
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      resize()
      window.addEventListener('resize', resize)

      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      const loader = new GLTFLoader()
      loader.setDRACOLoader(dracoLoader)

      loader.load(
        src,
        (gltf) => {
          if (disposed) return
          const model = gltf.scene

          // Center the board and lay it flat: the thinnest bounding-box axis
          // (board thickness) becomes vertical, whatever KiCad exported.
          const box = new THREE.Box3().setFromObject(model)
          const size = box.getSize(new THREE.Vector3())
          const center = box.getCenter(new THREE.Vector3())
          model.position.sub(center)

          const pivot = new THREE.Group()
          pivot.add(model)
          if (size.x <= size.y && size.x <= size.z) {
            pivot.rotation.z = -Math.PI / 2
          } else if (size.z <= size.x && size.z <= size.y) {
            pivot.rotation.x = -Math.PI / 2
          }
          scene.add(pivot)

          const radius = Math.max(size.x, size.y, size.z)
          camera.near = radius / 100
          camera.far = radius * 100
          camera.position.set(radius * 1.1, radius * 0.9, radius * 1.5)
          camera.lookAt(0, 0, 0)
          camera.updateProjectionMatrix()
          controls.minDistance = radius * 0.6
          controls.maxDistance = radius * 4
          controls.update()

          setStatus('ready')
        },
        (event) => {
          if (event.total) setProgress(event.loaded / event.total)
        },
        () => {
          if (!disposed) setStatus('error')
        }
      )

      function animate() {
        animationId = requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()

      cleanupScene = () => {
        window.removeEventListener('resize', resize)
        if (animationId) cancelAnimationFrame(animationId)
        controls.dispose()
        dracoLoader.dispose()
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
            mats.forEach((m) => m.dispose())
          }
        })
        renderer.dispose()
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          init()
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(container)

    return () => {
      disposed = true
      observer.disconnect()
      if (cleanupScene) cleanupScene()
    }
  }, [src])

  return (
    <div className="model-viewer">
      <div ref={containerRef} className="model-viewer__canvas" />
      {status !== 'ready' && (
        <div className="model-viewer__overlay">
          {status === 'error' ? (
            <span>ERR: MODEL UNAVAILABLE</span>
          ) : (
            <span>{asciiBar(progress)}</span>
          )}
        </div>
      )}
      <div className="model-viewer__label">
        <span>{label}</span>
        <span className="model-viewer__hint">DRAG TO INSPECT</span>
      </div>
    </div>
  )
}

export default ModelViewer
