import { useEffect, useRef, useState } from 'react'

// Typewriter that cycles through `phrases`, typing then deleting each one.
export function useTypewriter(phrases, { typeMs = 70, deleteMs = 35, holdMs = 1600 } = {}) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[index % phrases.length]

    if (!deleting && text === phrase) {
      const t = setTimeout(() => setDeleting(true), holdMs)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
      return
    }

    const t = setTimeout(
      () => {
        setText((cur) =>
          deleting ? cur.slice(0, -1) : phrase.slice(0, cur.length + 1),
        )
      },
      deleting ? deleteMs : typeMs,
    )
    return () => clearTimeout(t)
  }, [text, deleting, index, phrases, typeMs, deleteMs, holdMs])

  return text
}

// Counts from 0 up to `target` once `active` becomes true.
export function useCountUp(target, active, durationMs = 1500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf
    let start
    const step = (ts) => {
      if (start === undefined) start = ts
      const progress = Math.min((ts - start) / durationMs, 1)
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, active, durationMs])

  return value
}

// Reveals an element when it scrolls into view; returns a ref and a boolean.
// Falls back to immediately-visible when reduced motion is preferred or when
// IntersectionObserver is unavailable, so content is never stuck hidden.
export function useReveal({ threshold = 0 } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      // fire as soon as any part scrolls into view, but pull the trigger line
      // up a little (-12% bottom) so it animates just before fully on screen
      { threshold, rootMargin: '0px 0px -12% 0px' },
    )
    obs.observe(el)

    return () => obs.disconnect()
  }, [threshold])

  return [ref, shown]
}
