import {
  siC,
  siOpenjdk,
  siJavascript,
  siElixir,
  siPython,
  siVuedotjs,
  siHtml5,
  siCss,
  siBootstrap,
  siPhoenixframework,
  siPostgresql,
  siMysql,
  siMongodb,
  siGit,
  siPostman,
  siDjango,
  siReact,
} from 'simple-icons'
import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Database,
  Webhook,
  Building2,
  Cloud,
  Sparkles,
  ReceiptText,
  FileCheck2,
  Workflow,
  Code2,
  Braces,
  Brain,
  AudioLines,
} from 'lucide-react'

interface SimpleIcon {
  title: string
  hex: string
  path: string
}

const channel = (v: number) => {
  const s = v / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

const luminance = (r: number, g: number, b: number) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

/** Page grounds the icons sit on, from the tokens in index.css. */
const GROUND = {
  dark: luminance(1, 1, 1), //   #010101
  light: luminance(250, 250, 249), // #fafaf9
} as const

/**
 * Push a brand colour until it clears `min` contrast against the given ground.
 *
 * This has to run per theme, not once. Lightening for the dark ground is what
 * rescues Elixir (#4B275F, 1.74:1) and CSS (#663399, 2.48:1) — but the same
 * lightened values then fail on paper: JavaScript's yellow lands at 1.29:1 on
 * #fafaf9 and all but disappears. So dark mode lightens and light mode darkens,
 * and each icon carries both values.
 *
 * Nudging all three channels together preserves hue, so the mark stays
 * recognisable either way.
 */
function readable(hex: string, ground: keyof typeof GROUND, min = 3): string {
  let [r, g, b] = [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16))

  const gl = GROUND[ground]
  const ratio = () => {
    const l = luminance(r, g, b)
    const [hi, lo] = l > gl ? [l, gl] : [gl, l]
    return (hi + 0.05) / (lo + 0.05)
  }

  const step = ground === 'dark' ? 8 : -8
  for (let guard = 0; ratio() < min && guard < 64; guard++) {
    r = Math.min(255, Math.max(0, r + step))
    g = Math.min(255, Math.max(0, g + step))
    b = Math.min(255, Math.max(0, b + step))
  }

  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

/**
 * Marks the simple-icons package does not ship.
 *
 * VS Code was dropped from Simple Icons over trademark policy, so its path is
 * inlined here — same 24x24 viewBox and single-path shape as the rest, so it
 * renders identically alongside them.
 */
const EXTRA: Record<string, SimpleIcon> = {
  /*
   * Simple Icons dropped the Java mark over Oracle's trademark policy, so this
   * reuses OpenJDK's shipped path — a real path from the package rather than a
   * hand-drawn one — under Java's own orange, which is what makes it read as
   * Java at 14px. OpenJDK's own #000000 would be invisible here.
   */
  Java: {
    title: 'Java',
    hex: 'ED8B00',
    path: siOpenjdk.path,
  },
  'VS Code': {
    title: 'Visual Studio Code',
    hex: '007ACC',
    path: 'M23.15 2.587L18.21.21a1.49 1.49 0 0 0-1.705.29l-9.46 8.63l-4.12-3.128a1 1 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12L.326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a1 1 0 0 0 1.276.057l4.12-3.128l9.46 8.63a1.49 1.49 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352m-5.146 14.861L10.826 12l7.178-5.448z',
  },
}

/** Brand marks, keyed by the exact skill string used in profile.ts. */
const BRAND: Record<string, SimpleIcon> = {
  ...EXTRA,
  C: siC,
  JavaScript: siJavascript,
  Elixir: siElixir,
  Python: siPython,
  'Vue.js': siVuedotjs,
  HTML5: siHtml5,
  CSS3: siCss,
  Bootstrap: siBootstrap,
  'Phoenix Framework': siPhoenixframework,
  Phoenix: siPhoenixframework,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Git: siGit,
  Postman: siPostman,
  Django: siDjango,
  React: siReact,
}

/** Concepts and tools with no brand mark fall back to a lucide glyph. */
const GENERIC: Record<string, LucideIcon> = {
  SQL: Database,
  'REST APIs': Webhook,
  'REST API Integration': Webhook,
  ERP: Building2,
  SaaS: Cloud,
  'AI-assisted Accounting': Sparkles,
  GST: ReceiptText,
  'e-Invoice': FileCheck2,
  'Workflow Automation': Workflow,
  NLP: Brain,
  'Speech Recognition': AudioLines,
  'HTML5 / CSS3': Code2,
  'PostgreSQL / MySQL': Database,
  'Elixir / Phoenix': Braces,
}

/** Cache the contrast correction — it is pure and runs per icon otherwise. */
const colourCache = new Map<string, { dark: string; light: string }>()
const brandColour = (hex: string) => {
  let c = colourCache.get(hex)
  if (!c) {
    c = { dark: readable(hex, 'dark'), light: readable(hex, 'light') }
    colourCache.set(hex, c)
  }
  return c
}

export default function TechIcon({
  name,
  size = 14,
  className = '',
  colour = true,
}: {
  name: string
  size?: number
  className?: string
  /** false renders in currentColor, for contexts that own their palette. */
  colour?: boolean
}) {
  const brand = BRAND[name]

  if (brand) {
    const c = brandColour(brand.hex)
    return (
      <svg
        role="img"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={`tech-icon shrink-0 ${className}`}
        // Both corrected values ride along as custom properties; index.css
        // picks one per theme, so the swap is pure CSS and needs no re-render.
        style={
          colour
            ? ({ '--mark-dark': c.dark, '--mark-light': c.light } as CSSProperties)
            : undefined
        }
        fill={colour ? undefined : 'currentColor'}
      >
        <path d={brand.path} />
      </svg>
    )
  }

  const Fallback = GENERIC[name] ?? Braces
  return <Fallback size={size} className={`shrink-0 ${className}`} aria-hidden="true" />
}
