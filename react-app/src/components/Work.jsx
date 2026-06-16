import { recentWork } from '../data/content'
import WorkCard from './WorkCard'

export default function Work() {
  return (
    <section id="work" className="py-20 lg:py-28">
      <div className="container">
        <h2 className="section-title mb-10">My Recent Work</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {recentWork.map((item) => (
            <WorkCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
