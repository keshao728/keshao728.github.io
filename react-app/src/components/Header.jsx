import { useEffect, useRef } from 'react'
import { profile, socials, heroShapes } from '../data/content'
import { useTypewriter } from '../hooks'
import Starfield from './Starfield'

export default function Header() {
  const layerRefs = useRef([])
  const tiltRef = useRef(null)
  const typed = useTypewriter(profile.roles)

  // 3D tilt on the portrait following the cursor within its bounds.
  function handleTilt(e) {
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) scale(1.03)`
  }
  function resetTilt() {
    if (tiltRef.current) tiltRef.current.style.transform = ''
  }

  // Native parallax: move each shape opposite the cursor, scaled by its depth.
  // Replaces the original jQuery parallax.min.js, no dependency needed.
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      layerRefs.current.forEach((el, i) => {
        if (!el) return
        const depth = heroShapes[i].depth
        el.style.transform = `translate(${-x * depth * 100}px, ${-y * depth * 100}px)`
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <header
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#0a0a14] via-[#14142a] to-[#251347] pt-32 pb-20 lg:pt-36"
    >
      {/* Animated constellation backdrop */}
      <Starfield />
      {/* Faint grid texture */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px] animate-pulse-glow" />

      {/* Floating parallax shapes */}
      {heroShapes.map((shape, i) => (
        <div
          key={i}
          ref={(el) => (layerRefs.current[i] = el)}
          className="pointer-events-none absolute z-0 opacity-70 transition-transform duration-200 ease-out"
          style={shape.style}
        >
          <img src={shape.src} alt="" className="w-16 lg:w-auto" />
        </div>
      ))}

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <p className="mono-label mb-4">{'// hello world'}</p>
            <h4 className="mb-3 text-lg font-medium text-brand-light">I&apos;m</h4>
            <h1 className="gradient-text mb-4 animate-gradient-x text-5xl font-bold sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            {/* Typewriter role line */}
            <p className="mb-8 min-h-[1.75rem] font-mono text-lg text-gray-300">
              <span className="text-brand-light">&gt;</span> {typed}
              <span className="ml-0.5 inline-block w-2 animate-blink bg-brand-light align-middle" style={{ height: '1.1em' }} />
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#work" className="main-btn">
                View my Work
              </a>
              <a href="#contact" className="main-btn-outline">
                Get in Touch
              </a>
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-center">
            <div
              className="relative animate-fade-up"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              {/* Soft purple glow bloom behind the stylized portrait */}
              <div className="absolute -inset-6 rounded-[2rem] bg-brand/25 blur-3xl animate-pulse-glow" />
              <img
                ref={tiltRef}
                src="images/banner/porfolio-hero.png"
                alt="Kelly Shao"
                className="relative w-80 rounded-2xl ring-1 ring-brand-light/20 transition-transform duration-200 ease-out lg:w-[26rem]"
              />
            </div>
          </div>
        </div>

        {/* Social row */}
        <div className="mt-12 flex gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-brand hover:shadow-glow"
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll-down indicator */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-400 transition-colors hover:text-brand-light lg:flex"
      >
        <span className="font-mono text-xs uppercase tracking-widest">scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-gray-500 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-brand-light" />
        </span>
      </a>
    </header>
  )
}
