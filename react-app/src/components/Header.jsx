import { profile, socials } from '../data/content'
import { useTypewriter } from '../hooks'
import Starfield from './Starfield'
import ParticleSphere from './ParticleSphere'

export default function Header() {
  const typed = useTypewriter(profile.roles)

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
                <span>View my Work</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </a>
              <a href="#contact" className="main-btn-outline">
                <i className="fa-solid fa-envelope text-xs" />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          {/* Glowing particle sphere, centered in the right column. Allowed to
              overflow a touch beyond the column for a bigger presence. */}
          <div className="hidden lg:block">
            <div className="relative mx-auto aspect-square w-full max-w-[40rem] lg:-my-16 lg:scale-110">
              <div className="absolute inset-12 rounded-full bg-brand/25 blur-[110px] animate-pulse-glow" />
              <div className="relative h-full w-full">
                <ParticleSphere />
              </div>
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
