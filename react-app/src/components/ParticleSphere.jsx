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

    // shared focus state + helper (used by both label clicks and node clicks).
    // When active, the orb eases from `from` -> `to` over `dur` seconds with an
    // ease-in-out curve for a smooth, weighted swing.
    const focus = { active: false, from: new THREE.Quaternion(), to: new THREE.Quaternion(), t0: 0, dur: 1.1 }
    const FRONT = new THREE.Vector3(0, 0, 1)
    // target orientation that rotates this node's direction to face the camera
    function frontRotationFor(base) {
      return new THREE.Quaternion().setFromUnitVectors(
        base.clone().normalize(),
        FRONT,
      )
    }
    // begin a smooth focus animation toward facing `base`
    function startFocus(base) {
      focus.from.copy(group.quaternion)
      focus.to.copy(frontRotationFor(base))
      focus.t0 = clock.getElapsedTime()
      focus.active = true
      vel.x = vel.y = 0
    }
    const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

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

      // expanding "ping" ring around the dot
      const elRing = document.createElement('div')
      elRing.className =
        'absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-light will-change-transform'
      labelLayer.appendChild(elRing)

      // Large invisible circular HIT AREA centered on the dot - so hovering
      // *near* the dot (not pixel-perfect on it) triggers hover + click.
      const elHit = document.createElement('div')
      elHit.className =
        'pointer-events-auto absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full will-change-transform'
      const HIT = 60 // px diameter
      elHit.style.width = `${HIT}px`
      elHit.style.height = `${HIT}px`
      labelLayer.appendChild(elHit)

      // visible chip, floats just above the dot
      const elChip = document.createElement('div')
      elChip.textContent = name
      elChip.className =
        'pointer-events-none absolute left-0 top-0 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[11px] tracking-wide backdrop-blur-sm will-change-transform'
      elChip.style.transition = 'color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s'
      labelLayer.appendChild(elChip)

      elHit.addEventListener('click', () => startFocus(base))

      // staggered phase so the nodes ping out of sync
      const phase = (k / sphereSkills.length) * Math.PI * 2
      const node = { name, mesh, base, elHit, elChip, elRing, hl: 0, hover: false, phase }
      elHit.addEventListener('pointerenter', () => (node.hover = true))
      elHit.addEventListener('pointerleave', () => (node.hover = false))
      return node
    })

    // --- interaction (quaternion trackball) --------------------------------
    // Apply drag as rotations about the WORLD x/y axes composed onto the
    // group's orientation. This keeps drag-left == spin-left no matter where
    // you grab (Euler angles roll near the poles - this doesn't).
    const SPEED = 0.006
    const vel = { x: 0, y: 0 } // angular velocity about world X (pitch) / Y (yaw)
    let dragging = false
    let hovering = false
    let glow = 0
    let last = { x: 0, y: 0 }
    let downAt = { x: 0, y: 0 } // to tell a click from a drag
    const el = renderer.domElement
    const raycaster = new THREE.Raycaster()
    raycaster.params.Points = { threshold: 0.12 }
    const ndc = new THREE.Vector2(-2, -2)
    let hoveredNode = null

    const X_AXIS = new THREE.Vector3(1, 0, 0)
    const Y_AXIS = new THREE.Vector3(0, 1, 0)
    const qTmp = new THREE.Quaternion()
    // rotate the group about a world axis by `angle`, composed on the left
    function rotateWorld(axis, angle) {
      qTmp.setFromAxisAngle(axis, angle)
      group.quaternion.premultiply(qTmp)
    }

    function onDown(e) {
      dragging = true
      last = { x: e.clientX, y: e.clientY }
      downAt = { x: e.clientX, y: e.clientY }
      focus.active = false // cancel any in-progress focus swing on grab
      el.style.cursor = 'grabbing'
    }
    function onUp(e) {
      dragging = false
      el.style.cursor = 'grab'
      // treat as a click on a node if the pointer barely moved
      const moved = Math.hypot(
        (e?.clientX ?? downAt.x) - downAt.x,
        (e?.clientY ?? downAt.y) - downAt.y,
      )
      if (moved < 5 && hoveredNode) {
        const node = skillNodes.find((s) => s.mesh === hoveredNode)
        if (node) startFocus(node.base)
      }
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
        // drag horizontally -> rotate about world Y; vertically -> world X
        vel.y = dx * SPEED
        vel.x = dy * SPEED
        rotateWorld(Y_AXIS, vel.y)
        rotateWorld(X_AXIS, vel.x)
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

      if (focus.active && !dragging) {
        // smooth, time-based eased swing from start -> target orientation
        const p = Math.min((t - focus.t0) / focus.dur, 1)
        group.quaternion.slerpQuaternions(focus.from, focus.to, easeInOut(p))
        if (p >= 1) focus.active = false
      } else if (!dragging) {
        // inertia about the same world axes, decaying
        rotateWorld(Y_AXIS, vel.y)
        rotateWorld(X_AXIS, vel.x)
        vel.y *= 0.94
        vel.x *= 0.94
        if (Math.abs(vel.y) < 0.0006 && Math.abs(vel.x) < 0.0006) {
          rotateWorld(Y_AXIS, 0.0006 + glow * 0.0012) // gentle idle spin
        }
      }

      const pulse = 0.9 + Math.sin(t * 1.6) * 0.1
      points.material.size = (0.04 + glow * 0.015) * pulse
      points.material.opacity = 0.6 + glow * 0.18
      lines.material.opacity = 0.08 + glow * 0.12
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
        const isHover = s.mesh === hoveredNode || s.hover
        s.hl += ((isHover ? 1 : 0) - s.hl) * 0.18

        // project node to screen + get a front/back depth factor
        v.copy(s.base).applyMatrix4(group.matrixWorld)
        const camDot = v.clone().normalize().z // ~1 front, ~-1 back (sphere centered)
        v.project(camera)
        const sx = (v.x * 0.5 + 0.5) * W
        const sy = (-v.y * 0.5 + 0.5) * H
        // smooth 0..1 facing: fully visible near front, gone past the rim
        const facing = THREE.MathUtils.clamp((camDot + 0.15) / 0.6, 0, 1)

        // node mesh: steady dot, grows + brightens on hover. Back-facing nodes
        // stay dimly visible (not hidden) so you can tell there are skill
        // markers all the way around the orb - a cue to rotate it.
        s.mesh.scale.setScalar(1 + s.hl * 0.8)
        s.mesh.material.opacity = (0.32 + 0.6 * facing) * (1 + s.hl)

        // radar "ping" ring around the dot - expands from inside the dot out
        // to a larger circle then fades, signalling an interactive point.
        // Each node is offset by its phase so they pulse out of sync. Hidden
        // on the back of the sphere (facing ~0) so no rings get "stuck".
        const ping = (t * 0.5 + s.phase / (Math.PI * 2)) % 1 // 0..1 loop
        const ringSize = 10 + ping * 40 // bigger, more apparent expansion
        // ease-out fade; back nodes keep a faint ping so you can tell there
        // are interactive markers all the way around the orb
        const ringOpacity = (1 - ping) * (1 - ping) * (0.25 + 0.75 * facing)
        s.elRing.style.left = `${sx}px`
        s.elRing.style.top = `${sy}px`
        s.elRing.style.width = `${ringSize}px`
        s.elRing.style.height = `${ringSize}px`
        s.elRing.style.borderWidth = `${1.5 + (1 - ping) * 1.5}px`
        s.elRing.style.opacity = ringOpacity.toFixed(3)

        // label opacity from facing; hovering forces it visible even on the
        // back (so you get feedback when hovering a back dot), and a focused
        // node dims the others
        let op = Math.max(facing, s.hl)
        if (anyFocus) op *= isHover ? 1 : 0.25
        op = Math.min(1, op)

        const z = String(100 + Math.round(camDot * 50) + (isHover ? 200 : 0))
        // big hit area centered on the dot. Stays interactive even for back
        // dots (so you can hover/click them) - front dots win overlaps via
        // their higher z-index (camDot is larger when facing the camera).
        s.elHit.style.left = `${sx}px`
        s.elHit.style.top = `${sy}px`
        s.elHit.style.pointerEvents = 'auto'
        s.elHit.style.zIndex = z
        // chip floats above the dot, fades/scales with state
        s.elChip.style.left = `${sx}px`
        s.elChip.style.top = `${sy}px`
        s.elChip.style.opacity = op.toFixed(3)
        s.elChip.style.transform =
          `translate(-50%, calc(-100% - ${10 + s.hl * 6}px)) scale(${1 + s.hl * 0.22})`
        s.elChip.style.zIndex = z
        if (s.hl > 0.04) {
          s.elChip.style.color = '#f3efff'
          s.elChip.style.background = 'rgba(139,92,246,0.9)'
          s.elChip.style.boxShadow = '0 0 16px rgba(139,92,246,0.6)'
        } else {
          s.elChip.style.color = '#c4b5fd'
          s.elChip.style.background = 'rgba(10,10,20,0.55)'
          s.elChip.style.boxShadow = 'none'
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
        s.elHit.remove()
        s.elChip.remove()
        s.elRing.remove()
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
