import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Send,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Download,
} from 'lucide-react'
import { useReveal } from '../hooks/use-reveal'
import { profile } from '../data/profile'
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon'
import {
  sendEmail,
  whatsappLink,
  whatsappMessageFrom,
  emailDeliversDirectly,
} from '../lib/contact'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    accent: 'text-brand',
    bg: 'bg-brand/10',
    external: false,
  },
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: profile.whatsapp.display,
    href: whatsappLink(),
    accent: 'text-[#25D366]',
    bg: 'bg-[#25D366]/10',
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: profile.phone,
    href: profile.phoneHref,
    accent: 'text-beam',
    bg: 'bg-beam/10',
    external: false,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: profile.location,
    href: null,
    accent: 'text-flare',
    bg: 'bg-flare/10',
    external: false,
  },
] as const

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: profile.links.linkedin },
  { icon: Github, label: 'GitHub', href: profile.links.github },
  { icon: Globe, label: 'Portfolio', href: profile.links.portfolio },
] as const

type Status = 'idle' | 'sending' | 'sent' | 'handoff' | 'error'

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.1)
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const directDelivery = emailDeliversDirectly()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: hidden from people, irresistible to bots. Silently succeed.
    if ((new FormData(e.currentTarget).get('botcheck') as string) === 'on') {
      setStatus('sent')
      return
    }

    setErrorMessage('')
    setStatus('sending')

    try {
      const { delivered } = await sendEmail(form)
      if (delivered) {
        setForm(EMPTY)
        setStatus('sent')
      } else {
        // A mail client opened. That is a handoff, not a delivery — say so.
        setStatus('handoff')
      }
      setTimeout(() => setStatus('idle'), 8000)
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong sending your message.'
      )
    }
  }

  /** Hand whatever is typed so far straight to WhatsApp. */
  const openWhatsApp = () => {
    const hasContent = form.message.trim().length > 0
    window.open(
      hasContent ? whatsappLink(whatsappMessageFrom(form)) : whatsappLink(),
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="relative py-section lg:py-section-lg bg-canvas overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="ambient top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[25rem] bg-brand/5" />
        <div className="ambient bottom-0 left-0 w-[32rem] h-[32rem] bg-beam/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header
          className={`max-w-3xl mb-14 transition-all duration-700 ease-spring ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="eyebrow mb-5">Get In Touch</span>
          <h2 id="contact-heading" className="text-display-sm lg:text-display-md font-bold mb-5">
            Let&apos;s build something <span className="text-brand">together</span>
          </h2>
          <p className="text-lg text-fg-subtle">
            Open to software developer roles and freelance work in ERP, accounting platforms and
            Vue.js product engineering.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Details */}
          <div
            className={`lg:col-span-5 space-y-4 transition-all duration-700 delay-100 ease-spring ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <ul className="space-y-3">
              {contactInfo.map((item) => {
                const inner = (
                  <>
                    <span
                      className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${item.bg}`}
                    >
                      <item.icon className={`w-5 h-5 ${item.accent}`} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-fg-subtle">{item.label}</span>
                      <span className="block font-medium text-fg break-words">{item.value}</span>
                    </span>
                  </>
                )

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="surface-card surface-card-hover flex items-center gap-4 p-5"
                      >
                        {inner}
                        <ArrowUpRight
                          size={16}
                          className="ml-auto text-fg-subtle shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <div className="surface-card flex items-center gap-4 p-5">{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="surface-card p-6">
              <h3 className="font-semibold text-fg mb-4">Elsewhere</h3>
              <ul className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-canvas border border-line text-fg-muted transition-all duration-250 ease-spring hover:border-brand hover:text-brand"
                    >
                      <social.icon size={18} aria-hidden="true" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <a href={profile.resumeUrl} download className="btn-primary w-full">
              <Download size={18} aria-hidden="true" />
              Download Résumé
            </a>
          </div>

          {/* Form */}
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-200 ease-spring ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="surface-card p-6 lg:p-8 h-full">
              <h3 className="text-2xl font-semibold mb-2">Send a message</h3>
              <p className="text-sm text-fg-subtle mb-6">
                {directDelivery
                  ? 'Straight to my inbox — or send the same message over WhatsApp.'
                  : 'Send it over WhatsApp, or use the form to open your email client.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-fg-subtle mb-2">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="field-input"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-fg-subtle mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="field-input"
                    placeholder="jane@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-fg-subtle mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="field-input resize-none"
                    placeholder="Tell me about the role or project…"
                  />
                </div>

                {/* Honeypot — never shown, never focusable. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="grid sm:grid-cols-2 gap-3">
                  <button type="submit" disabled={status === 'sending'} className="btn-primary">
                    {status === 'sending' ? (
                      <>
                        <span
                          className="w-4 h-4 border-2 border-brand-ink/30 border-t-brand-ink rounded-full animate-spin"
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        {directDelivery ? 'Send email' : 'Open email client'}
                        <Send size={18} aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full
                               bg-[#25D366] text-[#04140a] font-semibold
                               transition-all duration-250 ease-spring
                               hover:bg-[#1fbe59] hover:scale-[1.03] active:scale-[0.99]"
                  >
                    <WhatsAppIcon size={18} />
                    Send on WhatsApp
                  </button>
                </div>

                {/* Status region — announced to screen readers */}
                <div role="status" aria-live="polite" className="min-h-[1.5rem]">
                  {status === 'sent' && (
                    <p className="flex items-center gap-2 text-sm text-brand">
                      <CheckCircle2 size={16} aria-hidden="true" />
                      Message sent — I usually reply within a day.
                    </p>
                  )}
                  {status === 'handoff' && (
                    <p className="flex items-start gap-2 text-sm text-fg-subtle">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                      Your email client should be open with the message ready. If nothing
                      happened, write to {profile.email} or use WhatsApp.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="flex flex-wrap items-center gap-2 text-sm text-flare">
                      <AlertCircle size={16} aria-hidden="true" />
                      {errorMessage}
                      <a href={`mailto:${profile.email}`} className="underline">
                        Email me directly
                      </a>
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-line/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-display text-xl font-bold">
              <span className="text-fg">{profile.nameLead}</span>
              <span className="text-brand">.</span>
            </p>

            <p className="text-sm text-fg-subtle text-center">
              © {new Date().getFullYear()} {profile.name}. Built with React, Vite &amp; Tailwind.
            </p>

            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-sm text-fg-subtle hover:text-brand transition-colors"
            >
              Back to top
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}
