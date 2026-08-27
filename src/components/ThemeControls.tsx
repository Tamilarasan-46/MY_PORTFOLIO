import { useEffect, useRef, useState } from 'react'
import { Sun, Moon, Palette, Check, Monitor } from 'lucide-react'
import { useTheme, ACCENTS, type ThemeChoice } from '../hooks/use-theme'

const SWATCH: Record<string, string> = {
  lime: 'bg-[#acf96d]',
  sky: 'bg-[#7dd3fc]',
  violet: 'bg-[#c4a5ff]',
  amber: 'bg-[#fbbf24]',
}

const MODES: { id: ThemeChoice; label: string; icon: typeof Sun }[] = [
  { id: 'light', label: 'Day', icon: Sun },
  { id: 'dark', label: 'Night', icon: Moon },
  { id: 'system', label: 'Auto', icon: Monitor },
]

export default function ThemeControls({ compact = false }: { compact?: boolean }) {
  const { choice, resolved, setChoice, toggle, accent, setAccent } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const wrapper = useRef<HTMLDivElement>(null)

  // Close the palette on outside click or Escape.
  useEffect(() => {
    if (!isOpen) return
    const onDown = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setIsOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  if (compact) {
    // Mobile menu: everything laid out flat, nothing to open.
    return (
      <div className="space-y-4 pt-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle">
            Appearance
          </p>
          <div className="grid grid-cols-3 gap-2">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setChoice(mode.id)}
                aria-pressed={choice === mode.id}
                className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors duration-200 ${
                  choice === mode.id
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-line text-fg-subtle hover:text-fg'
                }`}
              >
                <mode.icon size={15} aria-hidden="true" />
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle">
            Accent
          </p>
          <div className="flex gap-2">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAccent(a.id)}
                aria-pressed={accent === a.id}
                aria-label={`${a.label} accent`}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-transform duration-200 ${
                  accent === a.id ? 'border-brand scale-110' : 'border-line'
                }`}
              >
                <span className={`h-5 w-5 rounded-full ${SWATCH[a.id]}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={wrapper} className="relative flex items-center gap-1">
      <button
        type="button"
        onClick={toggle}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-subtle transition-colors duration-200 hover:border-brand hover:text-brand"
        aria-label={resolved === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
        title={resolved === 'dark' ? 'Day mode' : 'Night mode'}
      >
        {resolved === 'dark' ? (
          <Sun size={16} aria-hidden="true" />
        ) : (
          <Moon size={16} aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Choose accent colour"
        title="Accent colour"
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 ${
          isOpen ? 'border-brand text-brand' : 'border-line text-fg-subtle hover:border-brand hover:text-brand'
        }`}
      >
        <Palette size={16} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-11 z-50 w-52 rounded-2xl border border-line bg-panel p-4 shadow-lift"
          role="group"
          aria-label="Appearance"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle">
            Theme
          </p>
          <div className="mb-4 grid grid-cols-3 gap-1.5">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setChoice(mode.id)}
                aria-pressed={choice === mode.id}
                className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-[0.7rem] transition-colors duration-200 ${
                  choice === mode.id
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-line text-fg-subtle hover:text-fg'
                }`}
              >
                <mode.icon size={14} aria-hidden="true" />
                {mode.label}
              </button>
            ))}
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle">
            Accent
          </p>
          <div className="flex gap-2">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAccent(a.id)}
                aria-pressed={accent === a.id}
                aria-label={`${a.label} accent`}
                title={a.label}
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform duration-200 hover:scale-110 ${
                  accent === a.id ? 'border-brand' : 'border-line'
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${SWATCH[a.id]}`}
                >
                  {accent === a.id && <Check size={12} className="text-black" aria-hidden="true" />}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
