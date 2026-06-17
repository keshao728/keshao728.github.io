import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { sphereSkills } from '../data/content'

// An interactive, futuristic particle sphere for the hero:
// - evenly distributed dim glowing points (Fibonacci sphere)
// - sparse faint constellation lines
// - a handful of bright SKILL NODES that always carry an HTML label and
//   intensify when you hover them
// - DRAG to rotate with inertia; auto-rotates slowly when idle; hover brightens
// Rendered with three.js; labels are HTML overlaid on the canvas.
export default function ParticleSphere() {
  const mountRef = useRef(null)
  const labelLayerRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const labelLayer = labelLayerRef.current
    let W = mount.clientWidth
    let H = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.z = 6.6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const R = 1.9
    const COUNT = 520

    // Fibonacci sphere points
    const verts = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      verts.push(
        new THREE.Vector3(Math.cos(theta) * r * R, y * R, Math.sin(theta) * r * R),
      )
    }

    // background dim points
    const ptsGeo = new THREE.BufferGeometry().setFromPoints(verts)
    const points = new THREE.Points(
      ptsGeo,
      new THREE.PointsMaterial({
        color: 0x9b7ce8,
        size: 0.04,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    group.add(points)

    // sparse constellation lines
    const linePos = []
    const LINK = R * 0.26
    for (let i = 0; i < verts.length; i++) {
      for (let j = i + 1; j < verts.length; j++) {
        if (verts[i].distanceTo(verts[j]) < LINK) {
          linePos.push(verts[i].x, verts[i].y, verts[i].z, verts[j].x, verts[j].y, verts[j].z)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3))
    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: 0x6d4fc4,
        transparent: true,
        opacity: 0.07,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    group.add(lines)

    // --- skill nodes: bright spheres spread around the globe ---------------
    // spread them out by sampling the fibonacci list at even intervals
    const skillNodes = sphereSkills.map((name, k) => {
      const idx = Math.floor(((k + 0.5) / sphereSkills.length) * COUNT)
      const base = verts[idx].clone()
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 16, 16),
        new THREE.MeshBasicMaterial({
          color: 0xc4b5fd,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
        }),
      )
      mesh.position.copy(base)
      group.add(mesh)

      // HTML label
      const elLabel = document.createElement('div')
      elLabel.textContent = name
      elLabel.className =
        'absolute left-0 top-0 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[11px] tracking-wide backdrop-blur-sm will-change-transform'
      // transition color/background/shadow smoothly; transform/opacity are
      // driven per-frame so they must not be transitioned
      elLabel.style.transition = 'color 0.2s, background 0.2s, box-shadow 0.2s'
      labelLayer.appendChild(elLabel)

      return { name, mesh, base, elLabel, hl: 0 }
    })

    // --- interaction -------------------------------------------------------
    const vel = { x: 0, y: 0 }
    let dragging = false
    let hovering = false
    let glow = 0
    let last = { x: 0, y: 0 }
    const el = renderer.domElement
    const raycaster = new THREE.Raycaster()
    raycaster.params.Points = { threshold: 0.12 }
    const ndc = new THREE.Vector2(-2, -2)
    let hoveredNode = null

    function onDown(e) {
      dragging = true
      last = { x: e.clientX, y: e.clientY }
      el.style.cursor = 'grabbing'
    }
    function onUp() {
      dragging = false
      el.style.cursor = 'grab'
    }
    function onEnter() {
      hovering = true
    }
    function onMove(e) {
      hovering = true
      const rect = el.getBoundingClientRect()
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      if (dragging) {
        const dx = e.clientX - last.x
        const dy = e.clientY - last.y
        last = { x: e.clientX, y: e.clientY }
        vel.y = dx * 0.006
        vel.x = dy * 0.006
        group.rotation.y += vel.y
        group.rotation.x += vel.x
      }
    }
    function onLeave() {
      dragging = false
      hovering = false
      ndc.set(-2, -2)
      el.style.cursor = 'grab'
    }
    el.style.cursor = 'grab'
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    const v = new THREE.Vector3()
    let raf
    const clock = new THREE.Clock()

    function animate() {
      const t = clock.getElapsedTime()
      glow += ((hovering ? 1 : 0) - glow) * 0.08

      if (!dragging) {
        group.rotation.y += vel.y
        group.rotation.x += vel.x
        vel.y *= 0.94
        vel.x *= 0.94
        if (Math.abs(vel.y) < 0.0006 && Math.abs(vel.x) < 0.0006) {
          group.rotation.y += 0.0006 + glow * 0.0012
        }
      }

      const pulse = 0.9 + Math.sin(t * 1.6) * 0.1
      points.material.size = (0.04 + glow * 0.015) * pulse
      points.material.opacity = 0.6 + glow * 0.18
      lines.material.opacity = 0.08 + glow * 0.12
      group.scale.setScalar(1 + glow * 0.03)
      group.position.y = Math.sin(t * 0.5) * 0.04

      // raycast against skill nodes to find the hovered one
      raycaster.setFromCamera(ndc, camera)
      const hit = raycaster.intersectObjects(skillNodes.map((s) => s.mesh), false)
      hoveredNode = hit.length ? hit[0].object : null
      const anyFocus = skillNodes.some((s) => s.hl > 0.05)

      // Update each skill node + label with three considered states:
      //  - depth-aware: back-of-sphere labels fade out so they never overlap
      //  - resting: clearly readable, calm
      //  - focus: hovered node grows + its label gets a solid chip; OTHER
      //    labels dim so the focus is unambiguous (not the whole sphere)
      for (const s of skillNodes) {
        const isHover = s.mesh === hoveredNode
        s.hl += ((isHover ? 1 : 0) - s.hl) * 0.18

        // project node to screen + get a front/back depth factor
        v.copy(s.base).applyMatrix4(group.matrixWorld)
        const camDot = v.clone().normalize().z // ~1 front, ~-1 back (sphere centered)
        v.project(camera)
        const sx = (v.x * 0.5 + 0.5) * W
        const sy = (-v.y * 0.5 + 0.5) * H
        // smooth 0..1 facing: fully visible near front, gone past the rim
        const facing = THREE.MathUtils.clamp((camDot + 0.15) / 0.6, 0, 1)

        // node mesh: brighten + grow on hover, scale dot subtly with facing
        s.mesh.scale.setScalar(1 + s.hl * 1.8)
        s.mesh.material.opacity = (0.35 + 0.55 * facing) * (1 + s.hl)

        // label base opacity from facing, then apply focus dimming
        let op = facing
        if (anyFocus) op *= isHover ? 1 : 0.25 // dim non-focused when something is focused
        op = Math.min(1, op)

        s.elLabel.style.left = `${sx}px`
        s.elLabel.style.top = `${sy}px`
        s.elLabel.style.opacity = op.toFixed(3)
        s.elLabel.style.transform =
          `translate(-50%, calc(-50% - ${14 + s.hl * 6}px)) scale(${1 + s.hl * 0.22})`
        s.elLabel.style.zIndex = String(100 + Math.round(camDot * 50) + (isHover ? 200 : 0))
        // resting vs focused chip styling
        if (s.hl > 0.04) {
          s.elLabel.style.color = '#f3efff'
          s.elLabel.style.background = 'rgba(139,92,246,0.9)'
          s.elLabel.style.boxShadow = '0 0 16px rgba(139,92,246,0.6)'
        } else {
          s.elLabel.style.color = '#c4b5fd'
          s.elLabel.style.background = 'rgba(10,10,20,0.55)'
          s.elLabel.style.boxShadow = 'none'
        }
      }
      el.style.cursor = hoveredNode ? 'pointer' : dragging ? 'grabbing' : 'grab'

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    function onResize() {
      W = mount.clientWidth
      H = mount.clientHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      skillNodes.forEach((s) => {
        s.mesh.geometry.dispose()
        s.mesh.material.dispose()
        s.elLabel.remove()
      })
      ptsGeo.dispose()
      lineGeo.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="relative h-full w-full" aria-label="Interactive skill sphere - drag to rotate">
      <div ref={mountRef} className="h-full w-full" />
      <div ref={labelLayerRef} className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  )
}
