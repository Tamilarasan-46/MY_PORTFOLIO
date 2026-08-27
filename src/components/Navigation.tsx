import { useState, useEffect, useCallback } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { profile } from '../data/profile'

const navLinks = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'Education', id: 'education' },
  { name: 'Contact', id: 'contact' },
] as const

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    let frame = 0

    const handleScroll = () => {
      // rAF-throttled: the raw scroll event fires far more often than we can paint.
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setIsScrolled(window.scrollY > 50)

        for (const link of [...navLinks].reverse()) {
          const el = document.getElementById(link.id)
          if (el && el.getBoundingClientRect().top <= 120) {
            setActiveSection(link.id)
            break
          }
        }
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Escape closes the mobile menu; lock the page behind it while open.
  useEffect(() => {
    if (!isMenuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const goTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }, [])

  return (
    <>
      <nav
        aria-label="Primary"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-spring ${
          isScrolled ? 'glass border-b border-line/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                goTo('hero')
              }}
              className="font-display text-xl md:text-2xl font-bold tracking-tight"
              aria-label={`${profile.name} — back to top`}
            >
              <span className="text-fg">{profile.nameLead}</span>
              <span className="text-brand">.</span>
            </a>

            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault()
                        goTo(link.id)
                      }}
                      className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        isActive ? 'text-brand' : 'text-fg-subtle hover:text-fg'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="hidden md:flex items-center gap-2">
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-fg-subtle rounded-lg transition-colors duration-200 hover:text-brand"
              >
                <Download size={16} aria-hidden="true" />
                Résumé
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  goTo('contact')
                }}
                className="inline-flex items-center px-5 py-2.5 bg-brand text-brand-ink text-sm font-semibold rounded-full transition-all duration-250 ease-spring hover:bg-brand-hover hover:scale-105"
              >
                Hire Me
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="md:hidden p-2 text-fg rounded-lg"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-canvas-deep/80 backdrop-blur-lg"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          id="mobile-menu"
          className={`absolute top-16 inset-x-0 bg-panel border-b border-line transition-transform duration-300 ease-spring ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <ul className="px-4 py-6 space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      goTo(link.id)
                    }}
                    className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-brand/10 text-brand'
                        : 'text-fg-subtle hover:bg-line/30 hover:text-fg'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              )
            })}

            <li className="pt-3 space-y-2">
              <a
                href={profile.resumeUrl}
                download
                className="btn-ghost w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Download size={18} aria-hidden="true" />
                Résumé
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  goTo('contact')
                }}
                className="btn-primary w-full"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
