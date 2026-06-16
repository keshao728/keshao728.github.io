import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="service" className="bg-gray-bg py-20 lg:py-28">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="section-title">Skills</h2>
          <p className="mt-3 text-muted">More skills listed on my resume!</p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <i
                className={`${skill.icon} text-4xl text-muted transition-colors group-hover:text-brand`}
              />
              <h4 className="text-sm font-medium text-ink">{skill.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
