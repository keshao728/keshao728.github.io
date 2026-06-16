import { useEffect, useRef } from 'react'

// A soft purple light that trails the cursor. Disabled on touch / coarse
// pointers where it adds nothing.
export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const el = ref.current
    const onMove = (e) => {
      el.style.setProperty('--x', `${e.clientX}px`)
      el.style.setProperty('--y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <div ref={ref} className="cursor-glow hidden lg:block" aria-hidden="true" />
}
