import { useEffect, useState } from 'react'
import { profile, socials } from '../data/content'
import { useTypewriter } from '../hooks'
import Starfield from './Starfield'
import ParticleSphere from './ParticleSphere'

export default function Header() {
  const typed = useTypewriter(profile.roles)
  // hold the entrance animation until the preloader finishes (or after a
  // short fallback in case the preloader isn't present)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const onDone = () => setReady(true)
    window.addEventListener('preloader:done', onDone)
    const fallback = setTimeout(() => setReady(true), 2600)
    return () => {
      window.removeEventListener('preloader:done', onDone)
      clearTimeout(fallback)
    }
  }, [])

  // entrance: start slightly down + transparent, slide in when ready.
  // Returns props (className + style) so the delay can be an inline value.
  const enter = (delay = 0) => ({
    className: `transition-all duration-700 ease-out ${
      ready ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
    }`,
    style: { transitionDelay: ready ? `${delay}ms` : '0ms' },
  })

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


      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:-mt-4 lg:text-left">
            <p
              className={`mono-label mb-4 justify-center lg:justify-start ${enter(0).className}`}
              style={enter(0).style}
            >
              {'// hello world'}
            </p>
            <div className={enter(120).className} style={enter(120).style}>
              <h4 className="mb-2 text-base font-medium text-brand-light sm:text-lg">I&apos;m</h4>
              <h1 className="gradient-text mb-4 animate-gradient-x text-[2.75rem] font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
            </div>
            {/* Typewriter role line - height reserved for up to 2 lines so the
                buttons never shift when a longer phrase wraps */}
            <p
              className={`mx-auto mb-8 flex min-h-[3.25rem] max-w-[20rem] items-start justify-center font-mono text-base text-gray-300 sm:min-h-[1.75rem] sm:text-lg lg:mx-0 lg:max-w-none lg:justify-start ${enter(240).className}`}
              style={enter(240).style}
            >
              <span className="mr-1 text-brand-light">&gt;</span>
              <span>
                {typed}
                <span className="ml-0.5 inline-block w-2 animate-blink bg-brand-light align-middle" style={{ height: '1.1em' }} />
              </span>
            </p>
            <div
              className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start ${enter(360).className}`}
              style={enter(360).style}
            >
              <a href="#work" className="main-btn justify-center">
                <span>View my Work</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </a>
              <a href="#contact" className="main-btn-outline justify-center">
                <i className="fa-solid fa-envelope text-xs" />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          {/* Glowing particle sphere, centered in the right column. Allowed to
              overflow a touch beyond the column for a bigger presence. */}
          <div className={`hidden lg:block ${enter(300).className}`} style={enter(300).style}>
            <div className="relative mx-auto aspect-square w-full max-w-[40rem] lg:-my-16 lg:scale-110">
              <div className="absolute inset-12 rounded-full bg-brand/25 blur-[110px] animate-pulse-glow" />
              <div className="relative h-full w-full">
                <ParticleSphere />
              </div>
            </div>
          </div>
        </div>

        {/* Social row */}
        <div
          className={`mt-10 flex justify-center gap-4 lg:mt-12 lg:justify-start ${enter(440).className}`}
          style={enter(440).style}
        >
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
