import { useCallback, useEffect, useState } from 'react'

export type ThemeChoice = 'light' | 'dark' | 'system'
export type Accent = 'lime' | 'sky' | 'violet' | 'amber'

export const ACCENTS: { id: Accent; label: string }[] = [
  { id: 'lime', label: 'Lime' },
  { id: 'sky', label: 'Sky' },
  { id: 'violet', label: 'Violet' },
  { id: 'amber', label: 'Amber' },
]

const THEME_KEY = 'portfolio-theme'
const ACCENT_KEY = 'portfolio-accent'

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

/** Reads what the boot script in index.html already applied. */
function readStored<T extends string>(key: string, fallback: T, valid: readonly string[]): T {
  try {
    const v = localStorage.getItem(key)
    return v && valid.includes(v) ? (v as T) : fallback
  } catch {
    // Private mode / blocked storage — fall back rather than crash.
    return fallback
  }
}

/**
 * Day/night and accent, persisted per visitor.
 *
 * `system` is resolved to a concrete light/dark value on the root element, so
 * the stylesheet only ever needs [data-theme='light'] and no duplicated
 * prefers-color-scheme block.
 */
export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>(() =>
    readStored(THEME_KEY, 'system', ['light', 'dark', 'system'])
  )
  const [accent, setAccentState] = useState<Accent>(() =>
    readStored(ACCENT_KEY, 'lime', ['lime', 'sky', 'violet', 'amber'])
  )

  const resolved: 'light' | 'dark' =
    choice === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : choice

  // Apply + persist the theme.
  useEffect(() => {
    const root = document.documentElement
    const apply = () => {
      const effective = choice === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : choice
      root.dataset.theme = effective
      // Keep Tailwind's class strategy in step for any shadcn/ui primitives.
      root.classList.toggle('dark', effective === 'dark')
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', effective === 'dark' ? '#010101' : '#fafaf9')
    }

    apply()
    try {
      localStorage.setItem(THEME_KEY, choice)
    } catch {
      /* storage unavailable — the choice still applies for this session */
    }

    if (choice !== 'system') return
    // Follow the OS while the visitor is on "system".
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [choice])

  useEffect(() => {
    document.documentElement.dataset.accent = accent
    try {
      localStorage.setItem(ACCENT_KEY, accent)
    } catch {
      /* ignore */
    }
  }, [accent])

  const toggle = useCallback(
    () => setChoice(resolved === 'dark' ? 'light' : 'dark'),
    [resolved]
  )

  return { choice, resolved, setChoice, toggle, accent, setAccent: setAccentState }
}
