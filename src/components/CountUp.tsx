import { useEffect, useMemo, useState } from 'react'
import { useReveal } from '../hooks/use-reveal'

const DURATION = 1400

/** easeOutCubic — fast start, gentle settle. */
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts a stat up from zero when it scrolls into view.
 *
 * Takes the display string rather than a number so the data stays readable
 * ("2+", "04", "8.29", "99%", "4x") — the numeric part is animated and the
 * prefix/suffix, decimal places and zero-padding are preserved.
 */
export default function CountUp({
  value,
  className = '',
}: {
  value: string
  className?: string
}) {
  const { ref, isVisible } = useReveal<HTMLSpanElement>(0.4)

  const parsed = useMemo(() => {
    const m = /^([^\d]*)([\d.]+)(.*)$/.exec(value)
    if (!m) return null

    const [, prefix, digits, suffix] = m
    const [whole, fraction] = digits.split('.')
    return {
      prefix,
      suffix,
      target: Number.parseFloat(digits),
      decimals: fraction?.length ?? 0,
      // "04" must stay two characters wide while counting.
      width: fraction ? 0 : whole.length,
    }
  }, [value])

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!parsed || !isVisible) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(parsed.target)
      return
    }

    let frame = 0
    let start: number | null = null

    const step = (now: number) => {
      start ??= now
      const t = Math.min((now - start) / DURATION, 1)
      setCurrent(parsed.target * ease(t))
      if (t < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [parsed, isVisible])

  // Anything that isn't "text + number + text" is rendered untouched.
  if (!parsed) return <span className={className}>{value}</span>

  const shown = current
    .toFixed(parsed.decimals)
    .padStart(parsed.width + (parsed.decimals ? parsed.decimals + 1 : 0), '0')

  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the final value, not a stream of changing digits. */}
      <span aria-hidden="true" className="tabular-nums">
        {parsed.prefix}
        {shown}
        {parsed.suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
