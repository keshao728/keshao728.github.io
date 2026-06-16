import { socials } from '../data/content'

export default function Footer() {
  return (
    <footer className="bg-white py-16">
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
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-bg text-ink transition-all hover:-translate-y-1 hover:bg-brand hover:text-white"
              >
                <i className={s.icon} />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Kelly Shao. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
