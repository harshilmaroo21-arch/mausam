'use client'

import { ALERT } from '@/lib/mausam-data'
import { AlertTriangle, Check, ChevronDown, X } from 'lucide-react'
import { useState } from 'react'

const SEVERITY: Record<string, { bg: string; label: string }> = {
  red: { bg: '#c5221f', label: 'RED · TAKE ACTION' },
  orange: { bg: '#e0531f', label: 'ORANGE · BE PREPARED' },
  yellow: { bg: '#c68a00', label: 'YELLOW · BE AWARE' },
}

export function AlertHeader() {
  const [dismissed, setDismissed] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const sev = SEVERITY[ALERT.severity]

  if (dismissed) return null

  return (
    <div className="relative z-30 text-white" style={{ backgroundColor: sev.bg }}>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-start gap-2.5 px-4 py-2.5 text-left"
      >
        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20">
          <AlertTriangle className="size-3.5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/80">{sev.label}</span>
          </span>
          <span className="mt-0.5 block truncate text-[13px] font-bold leading-tight">{ALERT.headline}</span>
          {!expanded && (
            <span className="block truncate text-[11px] text-white/85">
              {ALERT.effective} → {ALERT.expires} · Tap for details
            </span>
          )}
        </span>
        <ChevronDown className={`mt-0.5 size-4 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="space-y-2.5 px-4 pb-3 text-[12px] leading-relaxed">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 rounded-lg bg-white/10 p-2.5 text-[11px]">
            <span><span className="text-white/70">Urgency: </span>{ALERT.urgency}</span>
            <span><span className="text-white/70">Certainty: </span>{ALERT.certainty}</span>
            <span><span className="text-white/70">Area: </span>{ALERT.location}</span>
            <span><span className="text-white/70">Valid till: </span>{ALERT.expires}</span>
          </div>
          <p>{ALERT.description}</p>
          <p className="rounded-lg bg-white/10 p-2.5">
            <span className="font-bold">Instructions: </span>
            {ALERT.instruction}
          </p>
          <p className="text-[10px] text-white/70">{ALERT.source}</p>
          <div className="flex gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium"
              style={{ color: sev.bg }}
            >
              <Check className="size-3.5" /> Mark as Read
            </button>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[12px] font-medium text-white"
            >
              <X className="size-3.5" /> Collapse
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
