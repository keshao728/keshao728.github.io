import { profile } from '../data/content'
import Reveal from './Reveal'
import Stats from './Stats'
import CopyEmail from './CopyEmail'

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container">
        <Reveal className="mb-12 text-center">
          <p className="mono-label mb-4">about me</p>
          <h2 className="section-title">About Me</h2>
        </Reveal>

        <Reveal className="mx-auto max-w-2xl text-center">
          <h5 className="mb-5 text-xl font-semibold text-white sm:text-2xl">
            Hi there! I&apos;m {profile.name}
          </h5>
          {profile.about.split('\n\n').map((para, i) => (
            <p key={i} className="mb-5 leading-7 text-gray-400">
              {para}
            </p>
          ))}

          <div className="mt-8 flex items-center justify-center">
            <CopyEmail />
          </div>
        </Reveal>

        <Reveal className="mx-auto max-w-4xl">
          <Stats />
        </Reveal>
      </div>
    </section>
  )
}
