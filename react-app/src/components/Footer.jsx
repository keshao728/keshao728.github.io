import { socials, navLinks, profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c0c18]">
      <div className="container py-14">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:text-left">
          {/* brand + blurb */}
          <div className="flex max-w-xs flex-col items-center gap-4 text-center md:items-start md:text-left">
            <a href="#home" className="flex items-center gap-3">
              <img src="images/logo.png" alt="Kelly Shao logo" className="h-10 w-10 rounded-full ring-1 ring-brand/40" />
              <span className="font-mono text-lg font-semibold text-white">
                kelly<span className="text-brand-light">.shao</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed text-gray-500">{profile.tagline}, building delightful interfaces.</p>
          </div>

          {/* quick nav */}
          <nav>
            <p className="mb-3 text-center font-mono text-xs uppercase tracking-widest text-gray-600 md:text-left">
              navigate
            </p>
            <ul className="flex flex-col items-center gap-2 md:items-start">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-sm text-gray-400 transition-colors hover:text-brand-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* socials */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <p className="font-mono text-xs uppercase tracking-widest text-gray-600">find me</p>
            <ul className="flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-all hover:-translate-y-1 hover:border-brand/50 hover:text-brand-light hover:shadow-glow"
                  >
                    <i className={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs text-gray-600">
            © {new Date().getFullYear()} Kelly Shao. All rights reserved.
          </p>
          <p className="font-mono text-xs text-gray-600">
            Built with React, Three.js &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
