'use client'

import type { PersonaId } from '@/lib/mausam-data'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp, Pin, PinOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getPersonaWidgets } from './persona-widgets'

export function WidgetGrid({ persona, editMode }: { persona: PersonaId; editMode: boolean }) {
  const widgets = getPersonaWidgets(persona)
  const [order, setOrder] = useState<string[]>(widgets.map((w) => w.id))
  const [pinned, setPinned] = useState<string[]>([])

  // Reset arrangement when persona changes
  useEffect(() => {
    setOrder(getPersonaWidgets(persona).map((w) => w.id))
    setPinned([])
  }, [persona])

  const byId = new Map(widgets.map((w) => [w.id, w]))
  const sorted = [...order].sort((a, b) => Number(pinned.includes(b)) - Number(pinned.includes(a)))

  const move = (id: string, dir: -1 | 1) => {
    setOrder((prev) => {
      const idx = prev.indexOf(id)
      const next = idx + dir
      if (next < 0 || next >= prev.length) return prev
      const copy = [...prev]
      ;[copy[idx], copy[next]] = [copy[next], copy[idx]]
      return copy
    })
  }

  const togglePin = (id: string) =>
    setPinned((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  return (
    <div className="grid grid-cols-2 gap-3 px-4 pt-4">
      {sorted.map((id, i) => {
        const w = byId.get(id)
        if (!w) return null
        return (
          <div key={id} className={cn('relative', w.wide && 'col-span-2')}>
            {w.render(i)}
            {editMode && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-2xl bg-[var(--mausam-blue)]/10 ring-2 ring-dashed ring-[var(--mausam-blue)]/50 backdrop-blur-[1px]">
                <button
                  type="button"
                  aria-label="Move up"
                  onClick={() => move(id, -1)}
                  className="flex size-9 items-center justify-center rounded-full bg-white text-[var(--mausam-text)] shadow-md active:scale-95"
                >
                  <ArrowUp className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Move down"
                  onClick={() => move(id, 1)}
                  className="flex size-9 items-center justify-center rounded-full bg-white text-[var(--mausam-text)] shadow-md active:scale-95"
                >
                  <ArrowDown className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label={pinned.includes(id) ? 'Unpin card' : 'Pin card'}
                  onClick={() => togglePin(id)}
                  className={cn(
                    'flex size-9 items-center justify-center rounded-full shadow-md active:scale-95',
                    pinned.includes(id) ? 'bg-[var(--mausam-blue)] text-white' : 'bg-white text-[var(--mausam-text)]',
                  )}
                >
                  {pinned.includes(id) ? <PinOff className="size-4" /> : <Pin className="size-4" />}
                </button>
              </div>
            )}
            {!editMode && pinned.includes(id) && (
              <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-[var(--mausam-blue)] text-white">
                <Pin className="size-2.5" />
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
