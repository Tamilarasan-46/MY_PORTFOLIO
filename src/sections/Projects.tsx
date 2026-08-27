import type { ElementType } from 'react'
import { Calendar, Lock, GraduationCap, Mail, Check } from 'lucide-react'
import { useReveal, revealDelay } from '../hooks/use-reveal'
import { projects, profile, accentClass } from '../data/profile'

/**
 * Generated cover for work that has no public screenshot.
 * Better an honest, on-brand pattern than a stock image pretending to be a product.
 */
function GeneratedCover({
  Icon,
  accent,
  label,
}: {
  Icon: ElementType
  accent: keyof typeof accentClass
  label: string
}) {
  const a = accentClass[accent]
  return (
    <div
      className={`relative h-44 overflow-hidden rounded-xl border border-line bg-gradient-to-br ${a.glow} to-transparent`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.06]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className={`w-14 h-14 ${a.text} opacity-90`} />
      </div>
      <span className="absolute bottom-3 left-4 text-[0.68rem] uppercase tracking-[0.22em] text-fg-subtle/70">
        {label}
      </span>
    </div>
  )
}

export default function Projects() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.1)

  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
      className="relative py-section lg:py-section-lg bg-canvas overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="ambient top-1/2 left-0 w-[32rem] h-[32rem] bg-brand/5 -translate-y-1/2" />
        <div className="ambient top-1/2 right-0 w-[32rem] h-[32rem] bg-beam/5 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header
          className={`max-w-3xl mb-14 transition-all duration-700 ease-spring ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="eyebrow mb-5">Selected Work</span>
          <h2 id="projects-heading" className="text-display-sm lg:text-display-md font-bold mb-5">
            Things I&apos;ve <span className="text-brand">built</span>
          </h2>
          <p className="text-lg text-fg-subtle">
            Enterprise platforms, compliance integrations and an AI accounting product — plus the
            academic project that started it.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const a = accentClass[project.accent]
            const isPrivate = project.access === 'private'

            return (
              <article
                key={project.title}
                className={`group surface-card surface-card-hover ${a.borderHover} p-6 flex flex-col transition-all duration-700 ease-spring ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={revealDelay(index, 120)}
              >
                {/* Cover */}
                {project.image ? (
                  <div className="relative h-44 overflow-hidden rounded-xl border border-line">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      width={640}
                      height={360}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-canvas/80 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <GeneratedCover Icon={project.icon} accent={project.accent} label={project.category} />
                )}

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mt-6 mb-3">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${a.bgSoft} ${a.text}`}>
                    {project.status}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-fg-subtle">
                    <Calendar size={13} aria-hidden="true" />
                    {project.period}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-fg mb-1.5 group-hover:text-brand transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-fg-subtle mb-4">{project.tagline}</p>

                <p className="text-fg-muted leading-relaxed mb-5">{project.description}</p>

                <ul className="space-y-2 mb-6">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-fg-subtle leading-relaxed">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${a.text}`}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-2 mb-6" aria-label="Technologies">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="chip-sm">
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* Access — honest state instead of a dead "#" link */}
                <div className="mt-auto pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs text-fg-subtle">
                    {isPrivate ? (
                      <>
                        <Lock size={13} aria-hidden="true" />
                        Private — proprietary client codebase
                      </>
                    ) : (
                      <>
                        <GraduationCap size={13} aria-hidden="true" />
                        Academic project, B.Tech final year
                      </>
                    )}
                  </span>

                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(
                      `Walkthrough request: ${project.title}`
                    )}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover transition-colors"
                  >
                    <Mail size={14} aria-hidden="true" />
                    Request a walkthrough
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
