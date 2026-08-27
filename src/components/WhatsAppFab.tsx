import { useEffect, useState } from 'react'
import { WhatsAppIcon } from './icons/WhatsAppIcon'
import { whatsappLink } from '../lib/contact'
import { profile } from '../data/profile'

/**
 * Floating WhatsApp action.
 *
 * Held back until the reader has scrolled past the hero, so it never competes
 * with the hero's own calls to action. Uses WhatsApp's brand green rather than
 * the site accent — a platform affordance should look like that platform.
 */
export default function WhatsAppFab() {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setIsShown(window.scrollY > window.innerHeight * 0.6)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${profile.name} on WhatsApp`}
      className={`group fixed bottom-6 right-6 z-40 inline-flex items-center gap-0 overflow-hidden
                  rounded-full bg-[#25D366] text-[#04140a] shadow-lift
                  transition-all duration-300 ease-spring
                  hover:gap-2 hover:bg-[#1fbe59] focus-visible:gap-2
                  ${
                    isShown
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-4 opacity-0'
                  }`}
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <WhatsAppIcon size={26} />
      </span>
      {/* Label expands on hover/focus; collapsed to zero width at rest. */}
      <span
        className="max-w-0 whitespace-nowrap text-sm font-semibold opacity-0
                   transition-all duration-300 ease-spring
                   group-hover:max-w-[10rem] group-hover:pr-5 group-hover:opacity-100
                   group-focus-visible:max-w-[10rem] group-focus-visible:pr-5 group-focus-visible:opacity-100"
      >
        Chat on WhatsApp
      </span>
    </a>
  )
}
