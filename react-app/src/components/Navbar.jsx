import { useEffect, useState } from 'react'
import { navLinks } from '../data/content'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  // Scroll-spy: highlight the nav link for whichever section is in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      // Trigger when a section crosses the upper third of the viewport.
      { rootMargin: '-40% 0px -55% 0px' },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-black shadow-[0_0_29px_0_rgba(134,134,134,0.25)]">
      <div className="container flex items-center justify-between py-5 lg:py-7">
        <a href="#home" className="flex items-center" onClick={() => setOpen(false)}>
          <img
            src="images/logo.png"
            alt="Kelly Shao logo"
            className="h-12 w-12 rounded-full"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`group relative text-sm font-medium uppercase transition-colors hover:text-brand ${
                    active === link.href ? 'text-brand' : 'text-white'
                  }`}
                >
                  {/* Vertical pink indicator pinned to the navbar's true top
                      edge (the link sits below the navbar's vertical center
                      because the logo is taller, so -top-[42px] reaches the
                      top). Grows downward via origin-top; active height stops
                      ~6px short of the link, leaving a gap above the text. */}
                  <span
                    className={`absolute -top-[42px] left-1/2 w-[3px] -translate-x-1/2 origin-top bg-brand transition-all duration-300 ease-out group-hover:h-9 ${
                      active === link.href ? 'h-9' : 'h-0'
                    }`}
                  />
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
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className="h-0.5 w-6 rounded bg-white" />
          <span className="h-0.5 w-6 rounded bg-white" />
          <span className="h-0.5 w-6 rounded bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-white/10 bg-black lg:hidden">
          <ul className="container flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-brand ${
                    active === link.href ? 'text-brand' : 'text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
