import { useEffect, useRef } from 'react'
import { profile, socials, heroShapes } from '../data/content'

export default function Header() {
  const layerRefs = useRef([])

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
      className="relative overflow-hidden bg-gradient-to-br from-[#fff5fb] via-white to-[#f3f0ff] pt-36 pb-16 lg:pt-44 lg:pb-24"
    >
      {/* Floating parallax shapes */}
      {heroShapes.map((shape, i) => (
        <div
          key={i}
          ref={(el) => (layerRefs.current[i] = el)}
          className="pointer-events-none absolute z-0 transition-transform duration-200 ease-out"
          style={shape.style}
        >
          <img src={shape.src} alt="" className="w-16 lg:w-auto" />
        </div>
      ))}

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h4 className="mb-3 text-lg font-medium text-brand">Hello, I&apos;m</h4>
            <h1 className="mb-4 text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <p className="mb-8 text-lg text-muted">{profile.tagline}</p>
            <a href="#work" className="main-btn">
              View my Work
            </a>
          </div>

          <div className="hidden lg:block">
            <img
              src="images/banner/hero.png"
              alt="Illustration of Kelly Shao"
              className="mx-auto w-full max-w-md"
            />
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
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:bg-brand hover:text-white"
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
