import portraitLg from '../assets/portrait.webp'
import portraitSm from '../assets/portrait-sm.webp'
import { profile } from '../data/profile'

/**
 * The cutout portrait.
 *
 * Imported rather than referenced from /public so Vite fingerprints the file
 * and resolves it against the configured base — a "/portrait.webp" string
 * literal would 404 on a GitHub Pages project page served from /<repo>/.
 *
 * The source has a transparent background, so it is presented free-standing
 * rather than cropped into a box. `.portrait-rim` supplies the edge light that
 * separates a navy suit from a near-black canvas.
 */
export default function Portrait({
  className = '',
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <img
      src={portraitLg}
      srcSet={`${portraitSm} 409w, ${portraitLg} 745w`}
      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 26rem"
      alt={`${profile.name}, ${profile.role}`}
      width={745}
      height={1200}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`portrait-rim select-none ${className}`}
      draggable={false}
    />
  )
}
