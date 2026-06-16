import { recentWork } from '../data/content'
import WorkCard from './WorkCard'
import Reveal from './Reveal'

export default function Work() {
  return (
    <section id="work" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.1),transparent_60%)]" />
      <div className="container relative">
        <Reveal className="mb-10">
          <p className="mono-label mb-3">{'// work'}</p>
          <h2 className="section-title">My Recent Work</h2>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {recentWork.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 2) * 100}
              className={item.wide ? 'lg:col-span-2' : ''}
            >
              <WorkCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
