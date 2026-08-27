import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * Back-to-top control. Appears once the reader has scrolled past roughly one
 * viewport, and sits directly above the WhatsApp button so the two stack
 * rather than overlap.
 */
export default function ScrollToTop() {
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

  const toTop = () =>
    window.scrollTo({
      top: 0,
      // Honour the OS motion preference rather than always animating.
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`group fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center
                  rounded-full border border-line bg-panel/80 text-fg-subtle backdrop-blur
                  shadow-panel transition-all duration-300 ease-spring
                  hover:-translate-y-0.5 hover:border-brand hover:text-brand
                  ${
                    isShown
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-4 opacity-0'
                  }`}
    >
      <ArrowUp
        size={20}
        aria-hidden="true"
        className="transition-transform duration-250 ease-spring group-hover:-translate-y-0.5"
      />
    </button>
  )
}
