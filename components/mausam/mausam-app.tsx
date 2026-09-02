'use client'

import { PERSONAS, type PersonaId } from '@/lib/mausam-data'
import { Check, Pencil, RotateCw } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { AlertHeader } from './alert-header'
import { BottomNav, type NavTab } from './bottom-nav'
import { PersonaSwitcher } from './persona-switcher'
import { SmartTip } from './smart-tip'
import { WeatherHero } from './weather-hero'
import { WidgetGrid } from './widget-grid'

const PULL_THRESHOLD = 70

export function MausamApp() {
  const [persona, setPersona] = useState<PersonaId>('health')
  const [auto, setAuto] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [tab, setTab] = useState<NavTab>('home')
  const [updated, setUpdated] = useState('just now')
  const [refreshing, setRefreshing] = useState(false)
  const [pull, setPull] = useState(0)

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const pulling = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const activePersona = PERSONAS.find((p) => p.id === persona)!

  const doRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setUpdated('just now')
      setPull(0)
    }, 1000)
  }, [])

  const selectPersona = (id: PersonaId) => {
    setPersona(id)
    setAuto(false)
  }

  const shiftPersona = (dir: 1 | -1) => {
    const idx = PERSONAS.findIndex((p) => p.id === persona)
    const next = (idx + dir + PERSONAS.length) % PERSONAS.length
    setPersona(PERSONAS[next].id)
    setAuto(false)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    pulling.current = (scrollRef.current?.scrollTop ?? 0) <= 0
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current == null) return
    const dy = e.touches[0].clientY - touchStartY.current
    if (pulling.current && dy > 0 && !refreshing) {
      setPull(Math.min(dy * 0.5, PULL_THRESHOLD + 20))
    }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current != null && touchStartY.current != null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current
      const dy = e.changedTouches[0].clientY - touchStartY.current
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && !editMode) {
        shiftPersona(dx < 0 ? 1 : -1)
      }
    }
    if (pull >= PULL_THRESHOLD) doRefresh()
    else setPull(0)
    touchStartX.current = null
    touchStartY.current = null
    pulling.current = false
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-[428px] flex-col bg-[var(--mausam-bg)] text-[var(--mausam-text)] shadow-2xl">
      <AlertHeader />
      <PersonaSwitcher active={persona} auto={auto} onSelect={selectPersona} onToggleAuto={() => setAuto((v) => !v)} />

      {/* Pull-to-refresh indicator */}
      <div
        className="flex items-center justify-center overflow-hidden text-[var(--mausam-blue)]"
        style={{ height: pull, transition: pull === 0 ? 'height 0.3s ease' : 'none' }}
      >
        <RotateCw
          className={`size-5 ${refreshing ? 'mausam-spin' : ''}`}
          style={{ transform: `rotate(${pull * 3}deg)`, opacity: pull / PULL_THRESHOLD }}
        />
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-y-contain"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {tab === 'home' && (
          <>
            <WeatherHero persona={activePersona} updated={updated} onRefresh={doRefresh} refreshing={refreshing} />

            {auto && (
              <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-[var(--mausam-green)]/10 px-3 py-2 text-[11px] text-[var(--mausam-text-secondary)] ring-1 ring-[var(--mausam-green)]/20">
                <span className="flex size-4 items-center justify-center rounded-full bg-[var(--mausam-green)] text-white">
                  <Check className="size-2.5" />
                </span>
                Auto-detected <span className="font-medium text-[var(--mausam-text)]">{activePersona.label}</span> from your location & routine
              </div>
            )}

            <div className="flex items-center justify-between px-4 pt-4">
              <h2 className="text-[15px] font-bold">{activePersona.label} intelligence</h2>
              <button
                type="button"
                onClick={() => setEditMode((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                  editMode ? 'bg-[var(--mausam-blue)] text-white' : 'bg-white text-[var(--mausam-text-secondary)] ring-1 ring-[var(--mausam-border)]'
                }`}
              >
                {editMode ? <Check className="size-3.5" /> : <Pencil className="size-3.5" />}
                {editMode ? 'Done' : 'Edit'}
              </button>
            </div>
            {editMode && (
              <p className="px-4 pt-1 text-[11px] text-[var(--mausam-text-secondary)]">
                Reorder with arrows, pin cards to the top, then tap Done.
              </p>
            )}

            <WidgetGrid persona={persona} editMode={editMode} />
            <SmartTip persona={persona} />
            <p className="px-4 pb-6 pt-3 text-center text-[10px] text-[var(--mausam-text-secondary)]">
              Data: India Meteorological Department · CPCB · Swipe ← → to switch persona
            </p>
          </>
        )}

        {tab === 'personas' && <PersonaListView active={persona} onSelect={(id) => { selectPersona(id); setTab('home') }} />}
        {tab === 'alerts' && <AlertsView />}
        {tab === 'settings' && <SettingsView />}
      </div>

      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}

function PersonaListView({ active, onSelect }: { active: PersonaId; onSelect: (id: PersonaId) => void }) {
  return (
    <div className="p-4">
      <h2 className="mb-1 text-[18px] font-bold">Choose your lens</h2>
      <p className="mb-4 text-[13px] text-[var(--mausam-text-secondary)]">Weather intelligence tailored to how you live.</p>
      <div className="grid grid-cols-2 gap-3">
        {PERSONAS.map((p) => {
          const Icon = p.icon
          const isActive = p.id === active
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              className="flex flex-col items-start gap-2 rounded-2xl p-3.5 text-left text-white shadow-sm transition-transform active:scale-[0.98]"
              style={{ backgroundImage: `linear-gradient(140deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-white/20">
                <Icon className="size-5" />
              </span>
              <span className="text-[14px] font-bold">
                {p.label}
                {isActive && <span className="ml-1 text-[10px] font-medium opacity-90">· active</span>}
              </span>
              <span className="text-[11px] leading-snug text-white/90">{p.tagline}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function AlertsView() {
  const items = [
    { sev: '#e0531f', t: 'Heavy Rain Alert', d: 'Central Delhi · valid till 9 PM today', when: '2h ago' },
    { sev: '#c68a00', t: 'Thunderstorm Advisory', d: 'Delhi NCR · lightning likely 5–8 PM', when: '3h ago' },
    { sev: '#c68a00', t: 'Air Quality Watch', d: 'AQI expected to reach 180 by noon', when: '5h ago' },
    { sev: '#1a73e8', t: 'Fog Advisory (Lifted)', d: 'Morning visibility restored to 6 km', when: '8h ago' },
  ]
  return (
    <div className="p-4">
      <h2 className="mb-4 text-[18px] font-bold">Active & recent alerts</h2>
      <ul className="space-y-2.5">
        {items.map((a) => (
          <li key={a.t} className="flex gap-3 rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-black/5">
            <span className="mt-1 h-full w-1 shrink-0 rounded-full" style={{ backgroundColor: a.sev }} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-bold">{a.t}</p>
                <span className="text-[10px] text-[var(--mausam-text-secondary)]">{a.when}</span>
              </div>
              <p className="mt-0.5 text-[12px] text-[var(--mausam-text-secondary)]">{a.d}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SettingsView() {
  const toggles = [
    { t: 'High contrast mode', d: 'Boost text & UI contrast', on: false },
    { t: 'Large font scaling', d: 'Increase text size across app', on: false },
    { t: 'Simplified view', d: 'Elder-friendly, fewer widgets', on: false },
    { t: 'Voice-over labels', d: 'Screen reader descriptions', on: true },
    { t: 'Color-blind patterns', d: 'Add patterns to AQI & levels', on: true },
    { t: 'Push severe alerts', d: 'CAP warnings for your area', on: true },
  ]
  return (
    <div className="p-4">
      <h2 className="mb-1 text-[18px] font-bold">Settings & accessibility</h2>
      <p className="mb-4 text-[13px] text-[var(--mausam-text-secondary)]">Make Mausam work for everyone.</p>
      <ul className="space-y-2">
        {toggles.map((s) => (
          <li key={s.t} className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-black/5">
            <div>
              <p className="text-[13px] font-medium">{s.t}</p>
              <p className="text-[11px] text-[var(--mausam-text-secondary)]">{s.d}</p>
            </div>
            <MockToggle defaultOn={s.on} />
          </li>
        ))}
      </ul>
      <p className="mt-5 text-center text-[10px] text-[var(--mausam-text-secondary)]">
        Mausam v2.0 · India Meteorological Department · Ministry of Earth Sciences
      </p>
    </div>
  )
}

function MockToggle({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? 'bg-[var(--mausam-green)]' : 'bg-[var(--mausam-border)]'}`}
    >
      <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
    </button>
  )
}
