import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * One-shot scroll reveal. Every section used to hand-roll this observer;
 * this collapses six copies into one and disconnects after the first hit.
 *
 * Readers who opted out of motion start visible, so nothing depends on the
 * observer ever firing.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    const node = ref.current
    if (!node || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, isVisible])

  return { ref, isVisible }
}

/** Staggered enter transition classes for a child at `index`. */
export function revealDelay(index: number, step = 90) {
  return { transitionDelay: `${index * step}ms` }
}
