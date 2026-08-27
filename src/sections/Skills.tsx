import { useEffect, useState } from 'react'
import { useReveal, revealDelay } from '../hooks/use-reveal'
import { skillCategories, proficiency, currentlyBuilding, accentClass } from '../data/profile'

export default function Skills() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.15)
  const [levels, setLevels] = useState<number[]>(() => proficiency.map(() => 0))

  useEffect(() => {
    if (!isVisible) return
    const t = setTimeout(() => setLevels(proficiency.map((p) => p.level)), 350)
    return () => clearTimeout(t)
  }, [isVisible])

  return (
    <section
      id="skills"
      ref={ref}
      aria-labelledby="skills-heading"
      className="relative py-section lg:py-section-lg bg-canvas overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="ambient top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-brand/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header
          className={`max-w-3xl mb-14 transition-all duration-700 ease-spring ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="eyebrow mb-5">Technical Skills</span>
          <h2 id="skills-heading" className="text-display-sm lg:text-display-md font-bold mb-5">
            The <span className="text-brand">stack</span> I build on
          </h2>
          <p className="text-lg text-fg-subtle">
            Frontend to database — the toolkit behind every ERP module, compliance integration and
            accounting workflow I ship.
          </p>
        </header>

        {/* Six CV categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {skillCategories.map((category, index) => {
            const a = accentClass[category.accent]
            return (
              <article
                key={category.title}
                className={`group surface-card surface-card-hover ${a.borderHover} p-6 transition-all duration-700 ease-spring ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={revealDelay(index)}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${a.bgSoft} transition-transform duration-250 ease-spring group-hover:scale-110`}
                >
                  <category.icon className={`w-6 h-6 ${a.text}`} aria-hidden="true" />
                </div>

                <h3 className="text-lg font-semibold text-fg mb-4">{category.title}</h3>

                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        {/* Proficiency */}
        <div
          className={`transition-all duration-700 delay-300 ease-spring ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h3 className="text-2xl font-semibold mb-8">Working proficiency</h3>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {proficiency.map((tech, index) => (
              <li key={tech.name} className="surface-card p-5 hover:border-line-strong">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-fg">{tech.name}</span>
                  <span className="text-sm font-semibold text-brand tabular-nums">
                    {levels[index]}%
                  </span>
                </div>

                <div
                  className="h-1.5 bg-canvas-deep rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={tech.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${tech.name} proficiency`}
                >
                  <div
                    className="h-full bg-gradient-to-r from-brand to-beam rounded-full transition-[width] duration-1000 ease-spring"
                    style={{ width: `${levels[index]}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Now building */}
        <div
          className={`mt-14 transition-all duration-700 delay-500 ease-spring ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="inline-flex items-center gap-3 px-6 py-3 surface-card !rounded-full text-brand">
            <span className="w-2 h-2 bg-brand rounded-full animate-pulse" aria-hidden="true" />
            {currentlyBuilding}
          </p>
        </div>
      </div>
    </section>
  )
}
