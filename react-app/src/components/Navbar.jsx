import { useEffect, useState } from 'react'
import { navLinks } from '../data/content'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const [scrolled, setScrolled] = useState(false)

  // Glassy background kicks in once scrolled off the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the section whose top sits just above a line ~33%
  // down the viewport. Computed on scroll so it stays correct even for short
  // sections (an IntersectionObserver band can miss those).
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)

    const onScroll = () => {
      // pick the section that covers the line ~40% down the viewport; this
      // handles tall sections and trailing content (footer) correctly
      const line = window.innerHeight * 0.4
      let current = sections[0]?.id
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) {
          current = s.id
          break
        }
        // also advance past sections whose top is already above the line
        if (r.top <= line) current = s.id
      }
      if (current) setActive(`#${current}`)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#0a0a14]/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo + mono wordmark */}
        <a
          href="#home"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src="images/logo.png"
            alt="Kelly Shao logo"
            className="h-10 w-10 rounded-full ring-1 ring-brand/40 transition-shadow group-hover:shadow-glow"
          />
          <span className="hidden font-mono text-sm font-semibold tracking-wider text-white sm:block">
            kelly<span className="text-brand-light">.shao</span>
          </span>
        </a>

        {/* Desktop nav - floating glass pill */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-sm transition-all ${
                    active === link.href
                      ? 'bg-brand/20 text-brand-light shadow-[inset_0_0_0_1px_rgba(167,139,250,0.4)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs text-brand/60">
                    0{i + 1}.
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 lg:hidden"
        >
          <span className={`h-0.5 w-5 rounded bg-white transition-all ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 rounded bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 rounded bg-white transition-all ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-white/10 bg-[#0a0a14]/95 backdrop-blur-xl lg:hidden">
          <ul className="container flex flex-col py-3">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 font-mono text-sm transition-colors ${
                    active === link.href
                      ? 'bg-brand/15 text-brand-light'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-xs text-brand/60">0{i + 1}.</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
