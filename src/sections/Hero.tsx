import { useEffect, useState } from 'react'
import { Linkedin, Github, Mail, ArrowUpRight, ChevronDown, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'
import { whatsappLink } from '../lib/contact'
import Portrait from '../components/Portrait'
import CountUp from '../components/CountUp'

const TYPE_SPEED = 70
const DELETE_SPEED = 35
const HOLD_MS = 1800

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Cycles through profile.rotatingRoles with a type/erase effect.
 * Every state change happens inside the timeout callback — never synchronously
 * in the effect body, which would cascade renders.
 */
function useRoleTypewriter(roles: readonly string[]) {
  const [reducedMotion] = useState(prefersReducedMotion)
  const [text, setText] = useState(() => (prefersReducedMotion() ? roles[0] : ''))
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion) return

    const current = roles[roleIndex % roles.length]
    const atFullWord = !isDeleting && text === current
    const atEmpty = isDeleting && text === ''

    const delay = atFullWord ? HOLD_MS : isDeleting ? DELETE_SPEED : TYPE_SPEED

    const tick = setTimeout(() => {
      if (atFullWord) {
        setIsDeleting(true)
      } else if (atEmpty) {
        setIsDeleting(false)
        setRoleIndex((i) => (i + 1) % roles.length)
      } else {
        setText((prev) =>
          isDeleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        )
      }
    }, delay)

    return () => clearTimeout(tick)
  }, [text, isDeleting, roleIndex, roles, reducedMotion])

  return text
}

const socials = [
  { icon: WhatsAppIcon, href: whatsappLink(), label: `Chat with ${profile.name} on WhatsApp` },
  { icon: Linkedin, href: profile.links.linkedin, label: 'LinkedIn profile' },
  { icon: Github, href: profile.links.github, label: 'GitHub profile' },
  { icon: Mail, href: `mailto:${profile.email}`, label: `Email ${profile.name}` },
]

const marqueeTech = [
  'Vue.js',
  'Elixir',
  'Phoenix',
  'PostgreSQL',
  'REST APIs',
  'MySQL',
  'JavaScript',
  'GST / e-Invoice',
  'ERP',
]

export default function Hero() {
  const typedRole = useRoleTypewriter(profile.rotatingRoles)

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center overflow-hidden bg-canvas pt-24 pb-16"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="ambient top-[12%] left-[8%] w-[28rem] h-[28rem] bg-brand/10 animate-pulse" />
        <div
          className="ambient bottom-[14%] right-[10%] w-[22rem] h-[22rem] bg-beam/10 animate-pulse"
          style={{ animationDelay: '1.2s' }}
        />
        <div className="absolute inset-0 grid-lines opacity-[0.035]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 7/5 asymmetric split — copy carries more weight than the portrait */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 animate-enter-up">
            {/* Availability */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-line bg-panel/60 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              <span className="text-fg-subtle">
                Open to opportunities · {profile.location}
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-brand text-sm font-semibold uppercase tracking-[0.2em]">
                Hello, I&apos;m
              </p>
              {/* The name stays the h1 for semantics, but the role carries the
                  visual weight — it is what a recruiter is actually scanning for. */}
              <h1
                id="hero-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold"
              >
                <span className="text-fg">{profile.nameLead}</span>
                <span className="text-brand">{profile.nameTail}</span>
              </h1>

              {/* Rotating role — fixed height so the layout never jumps */}
              <div
                className="flex items-center h-11 sm:h-14 lg:h-16"
                aria-live="polite"
              >
                <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand">
                  {typedRole}
                  <span className="inline-block w-[3px] h-7 sm:h-9 lg:h-11 bg-brand ml-1 align-middle animate-pulse" />
                </span>
              </div>
            </div>

            <p className="text-lg text-fg-subtle max-w-xl leading-relaxed">
              {profile.summary}
            </p>

            {/* Domain tags straight from the CV headline */}
            <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
              {['Enterprise ERP', 'AI Accounting', 'GST & e-Invoice', 'Workflow Automation'].map(
                (tag) => (
                  <li key={tag} className="chip-sm">
                    {tag}
                  </li>
                )
              )}
            </ul>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('contact')
                }}
                className="btn-primary"
              >
                Hire Me
                <ArrowUpRight size={18} />
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('projects')
                }}
                className="btn-ghost"
              >
                View Work
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="btn-resume"
                aria-label="Download resume as PDF"
              >
                <Download size={18} />
                Resume
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-fg-subtle text-sm">Find me:</span>
              <ul className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="icon-btn"
                      aria-label={label}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Portrait */}
          <div
            className="lg:col-span-5 relative flex justify-center lg:justify-end animate-enter-right"
            style={{ animationDelay: '200ms' }}
          >
            {/*
              Free-standing cutout, not a cropped square. The backdrop below
              does the work a photo background would normally do: a warm floor
              glow to seat the figure, and concentric rings to give the
              silhouette something to read against.
            */}
            <div className="relative w-[17rem] sm:w-[21rem] lg:w-[24rem]">
              <div className="absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
                <div className="absolute bottom-[6%] h-[62%] w-[112%] rounded-full bg-brand/15 blur-[90px]" />
                <div className="absolute bottom-[18%] h-[46%] w-[80%] rounded-full bg-beam/15 blur-[70px]" />
                <div className="absolute bottom-[4%] aspect-square w-[104%] rounded-full border border-line/70" />
                <div className="absolute bottom-[10%] aspect-square w-[84%] rounded-full border border-brand/20" />
              </div>

              <Portrait priority className="relative w-full h-auto animate-float" />

              {/* Grounding shadow so the figure doesn't float in a void. */}
              <div
                className="absolute -bottom-2 left-1/2 h-6 w-[62%] -translate-x-1/2 rounded-[50%] bg-canvas-deep/80 blur-xl"
                aria-hidden="true"
              />

              <div className="absolute bottom-[22%] -left-2 sm:-left-6 px-4 py-2 glass rounded-full text-sm font-medium text-beam shadow-panel">
                <CountUp value={profile.experienceYears} /> Years Experience
              </div>
            </div>
          </div>
        </div>

        {/* Tech marquee */}
        <div
          className="relative mt-16 lg:mt-20 overflow-hidden border-y border-line/60 py-4"
          aria-hidden="true"
        >
          <div className="flex w-max animate-marquee gap-10">
            {[...marqueeTech, ...marqueeTech].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="text-sm uppercase tracking-[0.2em] text-fg-subtle/60 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent" />
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 text-fg-subtle hover:text-brand transition-colors"
        aria-label="Scroll to the About section"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" aria-hidden="true" />
      </button>

    </section>
  )
}
