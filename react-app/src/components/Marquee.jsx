import { skills } from '../data/content'

// Infinite horizontal scroll of the tech stack. The list is duplicated so the
// -50% translate loops seamlessly.
export default function Marquee() {
  const items = [...skills, ...skills]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-6">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0a14] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0a14] to-transparent" />

      <div className="flex w-max animate-marquee gap-12">
        {items.map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-gray-400 transition-colors hover:text-brand-light"
          >
            <i className={`${skill.icon} text-2xl`} />
            <span className="font-mono text-sm uppercase tracking-wider">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
