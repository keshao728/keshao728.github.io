import { profile } from '../data/content'

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container">
        <h2 className="section-title mb-12 text-center">About Me</h2>

        <div className="mx-auto max-w-2xl text-center">
          <h5 className="mb-4 text-xl font-semibold text-white">
            Hi There! I&apos;m {profile.name}
          </h5>
          <p className="mb-8 leading-relaxed text-gray-400">{profile.about}</p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-gray-300 transition-colors hover:text-brand-light"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-brand-light">
                <i className="fa-solid fa-envelope" />
              </span>
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-3 text-gray-300 transition-colors hover:text-brand-light"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-brand-light">
                <i className="fa-solid fa-phone" />
              </span>
              {profile.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
