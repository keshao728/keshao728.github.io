import { socials } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c0c18] py-16">
      <div className="container flex flex-col items-center gap-6 text-center">
        <a href="#home">
          <img src="images/logo.png" alt="Kelly Shao logo" className="h-10 w-auto" />
        </a>
        <ul className="flex gap-4">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:-translate-y-1 hover:bg-brand hover:shadow-glow"
              >
                <i className={s.icon} />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Kelly Shao. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
