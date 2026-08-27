import { Check, Download, MapPin } from 'lucide-react'
import { useReveal, revealDelay } from '../hooks/use-reveal'
import { profile, stats, focusAreas, achievements, accentClass } from '../data/profile'

export default function About() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.15)

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="relative py-section lg:py-section-lg bg-canvas overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.025]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — left-aligned rather than reflexively centred */}
        <header
          className={`max-w-3xl mb-16 transition-all duration-700 ease-spring ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="eyebrow mb-5">About Me</span>
          <h2 id="about-heading" className="text-display-sm lg:text-display-md font-bold">
            Know who <span className="text-brand">I am</span>
          </h2>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait + stats rail */}
          <div
            className={`lg:col-span-5 transition-all duration-700 delay-100 ease-spring ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              <div
                className="absolute -inset-4 border border-line rounded-3xl"
                aria-hidden="true"
              />
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/hero-profile.jpg"
                  alt={`${profile.name} at work`}
                  width={640}
                  height={640}
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-sm text-fg-muted">
                <MapPin size={16} className="text-brand" aria-hidden="true" />
                {profile.location}
              </div>
            </div>

            {/* Stats — every figure sourced from the CV */}
            <dl className="grid grid-cols-2 gap-3 mt-10">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`surface-card surface-card-hover p-5 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={revealDelay(i + 2)}
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <p className="font-display text-3xl font-bold text-brand">{stat.value}</p>
                    <p className="text-sm font-medium text-fg mt-1">{stat.label}</p>
                    <p className="text-xs text-fg-subtle mt-0.5">{stat.hint}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Narrative */}
          <div
            className={`lg:col-span-7 space-y-10 transition-all duration-700 delay-200 ease-spring ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Professional Summary</h3>
              <p className="text-lg leading-relaxed text-fg-muted">{profile.summary}</p>
              <p className="leading-relaxed text-fg-subtle">{profile.summaryExtended}</p>
            </div>

            <div className="space-y-5">
              <h3 className="text-2xl font-semibold">What I Do</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {focusAreas.map((area) => {
                  const a = accentClass[area.accent]
                  return (
                    <article
                      key={area.title}
                      className={`surface-card surface-card-hover p-5 ${a.borderHover}`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${a.bgSoft}`}
                      >
                        <area.icon className={`w-5 h-5 ${a.text}`} aria-hidden="true" />
                      </div>
                      <h4 className="font-semibold text-fg mb-1.5">{area.title}</h4>
                      <p className="text-sm leading-relaxed text-fg-subtle">{area.body}</p>
                    </article>
                  )
                })}
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-2xl font-semibold">Key Achievements</h3>
              <ul className="space-y-3">
                {achievements.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-brand/15 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Check className="w-3 h-3 text-brand" />
                    </span>
                    <span className="text-fg-muted leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href={profile.resumeUrl} download className="btn-ghost">
              <Download size={18} aria-hidden="true" />
              Download Résumé
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
