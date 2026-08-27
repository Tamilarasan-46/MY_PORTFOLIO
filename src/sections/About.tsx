import { Check, Download, MapPin } from 'lucide-react'
import { useReveal, revealDelay } from '../hooks/use-reveal'
import { profile, stats, focusAreas, achievements, accentClass } from '../data/profile'
import Portrait from '../components/Portrait'
import CountUp from '../components/CountUp'

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
              {/*
                The portrait is a transparent cutout, so it gets a built panel
                to stand on rather than being cropped into a square. Dot grid
                and accent wash come from the same tokens as every other card.
              */}
              {/* Fixed 4:5 card. Without an aspect ratio the 745×1200 cutout
                  would stretch this column far past the stats beside it. */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-panel-raised to-panel">
                <div className="absolute inset-0 dot-grid opacity-[0.05]" aria-hidden="true" />
                <div
                  className="absolute bottom-0 left-1/2 h-2/3 w-[85%] -translate-x-1/2 rounded-full bg-brand/10 blur-[70px]"
                  aria-hidden="true"
                />

                <Portrait className="absolute bottom-0 left-1/2 z-10 h-[104%] w-auto max-w-none -translate-x-1/2" />

                {/* Fade the bottom crop line into the panel. */}
                <div
                  className="absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-panel to-transparent"
                  aria-hidden="true"
                />

                <p className="absolute bottom-4 left-4 z-30 flex items-center gap-2 text-sm text-fg-muted">
                  <MapPin size={16} className="text-brand" aria-hidden="true" />
                  {profile.location}
                </p>
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
                    <CountUp
                      value={stat.value}
                      className="block font-display text-3xl font-bold text-brand"
                    />
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

            <a href={profile.resumeUrl} download className="btn-resume">
              <Download size={18} aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
