import { profile } from '../data/content'
import { useReveal, useCountUp } from '../hooks'

function Stat({ value, suffix, label, active }) {
  const n = useCountUp(value, active)
  return (
    <div className="neon-card flex flex-col items-center gap-1 px-4 py-6 text-center">
      <span className="bg-gradient-to-r from-white to-brand-light bg-clip-text font-mono text-4xl font-bold text-transparent">
        {n}
        {suffix}
      </span>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  )
}

export default function Stats() {
  const [ref, shown] = useReveal()
  return (
    <div ref={ref} className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-4">
      {profile.stats.map((s) => (
        <Stat key={s.label} {...s} active={shown} />
      ))}
    </div>
  )
}
