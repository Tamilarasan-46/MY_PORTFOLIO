import { Calendar, MapPin, Award, ExternalLink } from "lucide-react";
import { useReveal, revealDelay } from "../hooks/use-reveal";
import { education, certifications, accentClass } from "../data/profile";

export default function Education() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.1);

  return (
    <section
      id="education"
      ref={ref}
      aria-labelledby="education-heading"
      className="relative py-section lg:py-section-lg bg-canvas overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="ambient bottom-0 left-1/4 w-[36rem] h-[36rem] bg-flare/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header
          className={`max-w-3xl mb-14 transition-all duration-700 ease-spring ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="eyebrow mb-5">Education &amp; Certifications</span>
          <h2
            id="education-heading"
            className="text-display-sm lg:text-display-md font-bold mb-5"
          >
            Learning <span className="text-brand">journey</span>
          </h2>
          <p className="text-lg text-fg-subtle">
            Formal grounding in information technology, kept current with
            focused certifications.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Degree */}
          <div className="lg:col-span-7 space-y-6">
            {education.map((item, index) => {
              const a = accentClass[item.accent];
              return (
                <article
                  key={item.degree}
                  className={`surface-card surface-card-hover p-6 lg:p-8 transition-all duration-700 ease-spring ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={revealDelay(index)}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center ${a.bgSoft}`}
                    >
                      <item.icon
                        className={`w-7 h-7 ${a.text}`}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold text-fg mb-1.5">
                        {item.degree}
                      </h3>
                      <p className="text-beam font-medium mb-4">
                        {item.institution}
                      </p>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-subtle">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar
                            size={14}
                            className="text-brand"
                            aria-hidden="true"
                          />
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin
                            size={14}
                            className="text-brand"
                            aria-hidden="true"
                          />
                          {item.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
                          <Award size={14} aria-hidden="true" />
                          {item.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Certifications */}
          <div className="lg:col-span-5 space-y-6">
            {certifications.map((cert, index) => {
              const a = accentClass[cert.accent];
              return (
                <article
                  key={cert.title}
                  className={`group surface-card surface-card-hover ${a.borderHover} transition-all duration-700 ease-spring ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={revealDelay(index + 1)}
                >
                  {/*
                    The whole card is the link, so the hit target is the card
                    rather than a stray "view" link in the corner. The heading
                    stays the accessible name via the anchor wrapping it.
                  */}
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6"
                    aria-label={`View the ${cert.title} certificate from ${cert.issuer} (opens in a new tab)`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${a.bgSoft}`}
                      >
                        <cert.icon
                          className={`w-5 h-5 ${a.text}`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-fg group-hover:text-brand transition-colors duration-200">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-fg-subtle">
                          {cert.issuer} · {cert.date}
                        </p>
                      </div>
                      <ExternalLink
                        size={15}
                        className="shrink-0 mt-1 text-fg-subtle transition-colors duration-200 group-hover:text-brand"
                        aria-hidden="true"
                      />
                    </div>

                    <ul className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <li key={skill} className="chip-sm">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
