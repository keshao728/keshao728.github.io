import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="service" className="relative py-20 lg:py-28">
      {/* subtle radial glow backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_60%)]" />
      <div className="container relative">
        <div className="mb-12 text-center">
          <h2 className="section-title">Skills</h2>
          <p className="mt-3 text-gray-400">More skills listed on my resume!</p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="glass-card group flex flex-col items-center gap-3 p-6 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow"
            >
              <i
                className={`${skill.icon} text-4xl text-gray-400 transition-colors group-hover:text-brand-light`}
              />
              <h4 className="text-sm font-medium text-gray-200">{skill.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
