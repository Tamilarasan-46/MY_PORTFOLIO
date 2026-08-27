import { Calendar, MapPin, Building2 } from 'lucide-react'
import { useReveal, revealDelay } from '../hooks/use-reveal'
import { experience, impactMetrics } from '../data/profile'

export default function Experience() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.1)

  return (
    <section
      id="experience"
      ref={ref}
      aria-labelledby="experience-heading"
      className="relative py-section lg:py-section-lg bg-canvas overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="ambient bottom-0 right-0 w-[38rem] h-[38rem] bg-beam/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header
          className={`max-w-3xl mb-14 transition-all duration-700 ease-spring ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="eyebrow mb-5">Work Experience</span>
          <h2 id="experience-heading" className="text-display-sm lg:text-display-md font-bold mb-5">
            My <span className="text-brand">journey</span> so far
          </h2>
          <p className="text-lg text-fg-subtle">
            Two years shipping enterprise software that real businesses run on every day.
          </p>
        </header>

        <ol className="space-y-12">
          {experience.map((role, roleIndex) => (
            <li
              key={role.company}
              className={`transition-all duration-700 ease-spring ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={revealDelay(roleIndex, 150)}
            >
              <article className="surface-card overflow-hidden">
                {/* Role header */}
                <div className="p-6 lg:p-8 border-b border-line">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-brand/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-brand" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-semibold text-fg">{role.title}</h3>
                        <p className="text-beam font-medium">{role.company}</p>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-brand/10 text-brand text-sm font-medium rounded-full">
                      {role.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-subtle mb-5">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} className="text-brand" aria-hidden="true" />
                      {role.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-brand" aria-hidden="true" />
                      {role.location}
                    </span>
                  </div>

                  <p className="text-fg-muted leading-relaxed max-w-3xl mb-5">{role.summary}</p>

                  <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                    {role.technologies.map((tech) => (
                      <li key={tech} className="chip-sm">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Responsibility groups — all visible, no click required */}
                <div className="p-6 lg:p-8">
                  <h4 className="text-xs font-semibold text-fg-subtle uppercase tracking-[0.18em] mb-6">
                    What I owned
                  </h4>

                  <div className="grid md:grid-cols-2 gap-4">
                    {role.groups.map((group) => (
                      <div
                        key={group.label}
                        className="p-5 bg-canvas border border-line rounded-xl transition-colors duration-200 hover:border-brand/30"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="w-9 h-9 shrink-0 rounded-lg bg-brand/10 flex items-center justify-center">
                            <group.icon className="w-4 h-4 text-brand" aria-hidden="true" />
                          </span>
                          <h5 className="font-semibold text-fg text-sm">{group.label}</h5>
                        </div>

                        <ul className="space-y-2">
                          {group.points.map((point) => (
                            <li
                              key={point}
                              className="text-sm leading-relaxed text-fg-subtle pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand/50"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        {/* Measured impact */}
        <div
          className={`mt-16 transition-all duration-700 delay-300 ease-spring ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h3 className="text-sm font-semibold text-fg-subtle uppercase tracking-[0.18em] mb-6">
            Measured impact
          </h3>

          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactMetrics.map((metric) => (
              <div key={metric.label} className="surface-card surface-card-hover p-6 text-center">
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <p className="font-display text-3xl md:text-4xl font-bold text-brand mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-fg-subtle">{metric.label}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
