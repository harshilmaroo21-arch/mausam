'use client'

import { PERSONAS, type PersonaId } from '@/lib/mausam-data'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'

export function PersonaSwitcher({
  active,
  auto,
  onSelect,
  onToggleAuto,
}: {
  active: PersonaId
  auto: boolean
  onSelect: (id: PersonaId) => void
  onToggleAuto: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  return (
    <div className="sticky top-0 z-20 border-b border-[var(--mausam-border)] bg-[var(--mausam-bg)]/95 backdrop-blur">
      <div ref={scrollRef} className="no-scrollbar flex items-center gap-2 overflow-x-auto px-3 py-2.5">
        <button
          type="button"
          onClick={onToggleAuto}
          aria-pressed={auto}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-medium transition-colors',
            auto ? 'bg-[var(--mausam-blue)] text-white' : 'bg-white text-[var(--mausam-text-secondary)] ring-1 ring-[var(--mausam-border)]',
          )}
        >
          <Sparkles className="size-3.5" />
          Auto
        </button>
        <div className="h-6 w-px shrink-0 bg-[var(--mausam-border)]" />
        {PERSONAS.map((p) => {
          const isActive = p.id === active
          const Icon = p.icon
          return (
            <button
              key={p.id}
              ref={isActive ? activeRef : undefined}
              type="button"
              onClick={() => onSelect(p.id)}
              aria-pressed={isActive}
              aria-label={`${p.label} persona`}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-medium transition-all active:scale-95',
                isActive ? 'text-white shadow-sm' : 'bg-white text-[var(--mausam-text-secondary)] ring-1 ring-[var(--mausam-border)]',
              )}
              style={isActive ? { backgroundImage: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` } : undefined}
            >
              <Icon className="size-3.5" />
              {p.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
