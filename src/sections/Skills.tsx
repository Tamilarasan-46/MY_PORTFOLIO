import { useReveal, revealDelay } from '../hooks/use-reveal'
import { skillCategories, stackTiers, currentlyBuilding, accentClass } from '../data/profile'
import TechIcon from '../components/TechIcon'

export default function Skills() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.15)

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
                    <li key={skill} className="chip gap-2">
                      <TechIcon name={skill} size={15} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        {/*
          Replaces the old self-reported percentage bars. "Vue.js 90%" is a
          number nobody can verify and every portfolio invents; how often
          something is actually reached for is a claim that means something.
        */}
        <div
          className={`transition-all duration-700 delay-300 ease-spring ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h3 className="text-2xl font-semibold mb-2">How deep I go</h3>
          <p className="text-fg-subtle mb-8 max-w-2xl">
            Grouped by how much of it I actually use, rather than a percentage.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {stackTiers.map((tier, index) => {
              const a = accentClass[tier.accent]
              return (
                <article
                  key={tier.title}
                  className={`surface-card surface-card-hover ${a.borderHover} p-6`}
                  style={revealDelay(index)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${a.dot}`} aria-hidden="true" />
                    <h4 className={`font-semibold ${a.text}`}>{tier.title}</h4>
                  </div>

                  <p className="text-sm text-fg-subtle mb-5 leading-relaxed">{tier.blurb}</p>

                  <ul className="flex flex-wrap gap-2">
                    {tier.items.map((item) => (
                      <li key={item} className="chip-sm gap-1.5">
                        <TechIcon name={item} size={13} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
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
