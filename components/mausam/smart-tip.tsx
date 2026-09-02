'use client'

import { PERSONA_TIPS, type PersonaId } from '@/lib/mausam-data'
import { ChevronDown, Lightbulb } from 'lucide-react'
import { useState } from 'react'

export function SmartTip({ persona }: { persona: PersonaId }) {
  const [open, setOpen] = useState(false)
  const tip = PERSONA_TIPS[persona]
  return (
    <section className="mx-4 mt-4 rounded-2xl bg-[var(--mausam-blue)]/[0.06] p-3.5 ring-1 ring-[var(--mausam-blue)]/15">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--mausam-blue)]/15 text-lg" aria-hidden>
          {tip.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="size-3.5 text-[var(--mausam-blue)]" />
            <h2 className="text-[12px] font-bold uppercase tracking-wide text-[var(--mausam-blue)]">AI Smart Tip</h2>
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--mausam-text)]">{tip.text}</p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-[var(--mausam-blue)]"
          >
            Why this tip?
            <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <p className="mt-1.5 border-t border-[var(--mausam-blue)]/15 pt-1.5 text-[11px] leading-relaxed text-[var(--mausam-text-secondary)]">
              {tip.why}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
