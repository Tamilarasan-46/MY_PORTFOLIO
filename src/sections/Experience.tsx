import { Calendar, MapPin, Building2 } from 'lucide-react'
import { useReveal, revealDelay } from '../hooks/use-reveal'
import { experience, impactMetrics } from '../data/profile'
import CountUp from '../components/CountUp'
import TechIcon from '../components/TechIcon'

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
                      <li key={tech} className="chip-sm gap-1.5">
                        <TechIcon name={tech} size={13} />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What I owned, as a step-down timeline rather than a grid —
                    the work reads as a sequence you walk down. */}
                <div className="p-6 lg:p-8">
                  <h4 className="text-xs font-semibold text-fg-subtle uppercase tracking-[0.18em] mb-8">
                    What I owned
                  </h4>

                  <ol className="relative">
                    {role.groups.map((group, stepIndex) => {
                      const isLast = stepIndex === role.groups.length - 1
                      return (
                        <li key={group.label} className={`relative pl-16 ${isLast ? '' : 'pb-8'}`}>
                          {/* Connector — omitted on the last step so the line
                              stops rather than trailing into nothing. */}
                          {!isLast && (
                            <span
                              className="absolute left-6 top-12 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-brand/40 to-line"
                              aria-hidden="true"
                            />
                          )}

                          {/* Step marker */}
                          <span
                            className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-brand/40 bg-panel-raised shadow-panel"
                            aria-hidden="true"
                          >
                            <group.icon className="h-5 w-5 text-brand" />
                          </span>

                          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand/70 tabular-nums">
                            Step {String(stepIndex + 1).padStart(2, '0')}
                          </p>
                          <h5 className="mb-3 mt-1 font-semibold text-fg">{group.label}</h5>

                          <ul className="space-y-2">
                            {group.points.map((point) => (
                              <li
                                key={point}
                                className="relative pl-4 text-sm leading-relaxed text-fg-subtle before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand/50"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </li>
                      )
                    })}
                  </ol>
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
                  <CountUp
                    value={metric.value}
                    className="block font-display text-3xl md:text-4xl font-bold text-brand mb-1"
                  />
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
