import { profile } from '../data/content'
import Reveal from './Reveal'
import Stats from './Stats'

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container">
        <Reveal className="mb-12 text-center">
          <p className="mono-label mb-4">about me</p>
          <h2 className="section-title">About Me</h2>
        </Reveal>

        <Reveal className="mx-auto max-w-2xl text-center">
          <h5 className="mb-4 text-xl font-semibold text-white">
            Hi There! I&apos;m {profile.name}
          </h5>
          {profile.about.split('\n\n').map((para, i) => (
            <p key={i} className="mb-6 leading-relaxed text-gray-400">
              {para}
            </p>
          ))}

          <div className="flex items-center justify-center">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-gray-300 transition-colors hover:text-brand-light"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-brand-light">
                <i className="fa-solid fa-envelope" />
              </span>
              {profile.email}
            </a>
          </div>
        </Reveal>

        <Reveal className="mx-auto max-w-4xl">
          <Stats />
        </Reveal>
      </div>
    </section>
  )
}
