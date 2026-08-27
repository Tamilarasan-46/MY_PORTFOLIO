import {
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

/**
 * Raise a brand colour until it clears `min` contrast against the page ground.
 *
 * Several official brand colours are unreadable on #010101 — Elixir's #4B275F
 * sits at 1.74:1 and CSS's #663399 at 2.48:1. Lightening preserves the hue, so
 * the logo stays recognisable without disappearing into the background.
 */
function readable(hex: string, min = 3): string {
  const channel = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }

  let [r, g, b] = [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16))
  const ratio = () =>
    (0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b) + 0.05) / (0.0003 + 0.05)

  for (let guard = 0; ratio() < min && guard < 64; guard++) {
    r = Math.min(255, r + 8)
    g = Math.min(255, g + 8)
    b = Math.min(255, b + 8)
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
  'VS Code': {
    title: 'Visual Studio Code',
    hex: '007ACC',
    path: 'M23.15 2.587L18.21.21a1.49 1.49 0 0 0-1.705.29l-9.46 8.63l-4.12-3.128a1 1 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12L.326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a1 1 0 0 0 1.276.057l4.12-3.128l9.46 8.63a1.49 1.49 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352m-5.146 14.861L10.826 12l7.178-5.448z',
  },
}

/** Brand marks, keyed by the exact skill string used in profile.ts. */
const BRAND: Record<string, SimpleIcon> = {
  ...EXTRA,
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
const colourCache = new Map<string, string>()
const brandColour = (hex: string) => {
  let c = colourCache.get(hex)
  if (!c) {
    c = readable(hex)
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
    return (
      <svg
        role="img"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={`shrink-0 ${className}`}
        fill={colour ? brandColour(brand.hex) : 'currentColor'}
      >
        <path d={brand.path} />
      </svg>
    )
  }

  const Fallback = GENERIC[name] ?? Braces
  return <Fallback size={size} className={`shrink-0 ${className}`} aria-hidden="true" />
}
