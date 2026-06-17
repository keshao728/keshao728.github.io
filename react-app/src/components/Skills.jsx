import { skills } from '../data/content'
import Reveal from './Reveal'
import SpotlightCard from './SpotlightCard'

export default function Skills() {
  return (
    <section id="service" className="grid-bg relative py-20 lg:py-28">
      {/* subtle radial glow backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_60%)]" />
      <div className="container relative">
        <Reveal className="mb-12 text-center">
          <p className="mono-label mb-4">my stack</p>
          <h2 className="section-title">Skills</h2>
          <p className="mt-3 text-gray-400">More skills listed on my resume!</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={(i % 5) * 60}>
              <SpotlightCard className="neon-card group flex h-full flex-col items-center gap-3 overflow-hidden p-6 hover:-translate-y-1">
                <i
                  className={`${skill.icon} relative text-4xl text-gray-400 transition-colors group-hover:text-brand-light`}
                />
                <h4 className="relative text-sm font-medium text-gray-200">
                  {skill.name}
                </h4>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
