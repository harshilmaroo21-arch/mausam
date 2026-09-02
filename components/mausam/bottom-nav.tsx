'use client'

import { cn } from '@/lib/utils'
import { Bell, Home, LayoutGrid, Settings } from 'lucide-react'

const TABS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'personas', label: 'Personas', icon: LayoutGrid },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const

export type NavTab = (typeof TABS)[number]['id']

export function BottomNav({ active, onChange, alertCount = 1 }: { active: NavTab; onChange: (t: NavTab) => void; alertCount?: number }) {
  return (
    <nav className="sticky bottom-0 z-30 border-t border-[var(--mausam-border)] bg-white/95 backdrop-blur">
      <ul className="mx-auto flex max-w-[428px] items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {TABS.map((t) => {
          const isActive = active === t.id
          const Icon = t.icon
          return (
            <li key={t.id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(t.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex w-full flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors',
                  isActive ? 'text-[var(--mausam-blue)]' : 'text-[var(--mausam-text-secondary)]',
                )}
              >
                <span className="relative">
                  <Icon className="size-5" />
                  {t.id === 'alerts' && alertCount > 0 && (
                    <span className="absolute -right-1.5 -top-1 flex size-3.5 items-center justify-center rounded-full bg-[var(--mausam-red)] text-[8px] font-bold text-white">
                      {alertCount}
                    </span>
                  )}
                </span>
                {t.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
