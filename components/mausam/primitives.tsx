'use client'

import { cn } from '@/lib/utils'
import { ChevronRight, Navigation } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------- */
/* Base widget card                                                  */
/* ---------------------------------------------------------------- */
export function WidgetCard({
  title,
  subtitle,
  icon: Icon,
  accent = 'var(--mausam-blue)',
  wide = false,
  onExpand,
  children,
  detail,
  index = 0,
}: {
  title: string
  subtitle?: string
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  accent?: string
  wide?: boolean
  onExpand?: () => void
  children: ReactNode
  detail?: string
  index?: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <section
      className={cn(
        'mausam-card-in flex flex-col rounded-2xl bg-[var(--mausam-card)] p-3.5 shadow-sm ring-1 ring-black/5 transition-transform active:scale-[0.98]',
        wide && 'col-span-2',
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <header className="mb-2 flex items-center gap-2">
        {Icon && (
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${accent}1a`, color: accent }}
          >
            <Icon className="size-3.5" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[12px] font-medium leading-tight text-[var(--mausam-text)]">{title}</h3>
          {subtitle && <p className="truncate text-[10px] leading-tight text-[var(--mausam-text-secondary)]">{subtitle}</p>}
        </div>
        {(detail || onExpand) && (
          <button
            type="button"
            aria-label={`Expand ${title} details`}
            onClick={() => (onExpand ? onExpand() : setOpen((v) => !v))}
            className="flex size-6 items-center justify-center rounded-full text-[var(--mausam-text-secondary)] transition-colors hover:bg-black/5"
          >
            <ChevronRight className={cn('size-4 transition-transform', open && 'rotate-90')} />
          </button>
        )}
      </header>
      <div className="flex-1">{children}</div>
      {detail && open && (
        <p className="mt-2 border-t border-[var(--mausam-border)] pt-2 text-[11px] leading-relaxed text-[var(--mausam-text-secondary)]">
          {detail}
        </p>
      )}
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Circular gauge (AQI, soil moisture, comfort, UV...)               */
/* ---------------------------------------------------------------- */
export function CircularGauge({
  value,
  max = 100,
  label,
  sub,
  segments,
  size = 116,
  unit = '',
}: {
  value: number
  max?: number
  label: string
  sub?: string
  unit?: string
  size?: number
  segments: { upTo: number; color: string; name: string }[]
}) {
  const [animated, setAnimated] = useState(0)
  const stroke = 11
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const arc = 0.75 // 270deg gauge
  const pct = Math.min(animated / max, 1)
  const activeSeg = segments.find((s) => value <= s.upTo) ?? segments[segments.length - 1]

  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 120)
    return () => clearTimeout(t)
  }, [value])

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size * 0.82 }}>
        <svg width={size} height={size} className="-rotate-[225deg]" style={{ overflow: 'visible' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--mausam-border)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${c * arc} ${c}`}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={activeSeg.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${c * arc * pct} ${c}`}
            style={{ transition: 'stroke-dasharray 1.1s cubic-bezier(0.22,1,0.36,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingBottom: size * 0.1 }}>
          <span className="text-[30px] font-medium leading-none text-[var(--mausam-text)]">
            {Math.round(animated)}
            {unit && <span className="text-sm">{unit}</span>}
          </span>
          <span className="mt-0.5 text-[11px] font-medium" style={{ color: activeSeg.color }}>
            {activeSeg.name}
          </span>
        </div>
      </div>
      <span className="text-[11px] text-[var(--mausam-text-secondary)]">{sub ?? label}</span>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Horizontal progress meter with optimal zone                       */
/* ---------------------------------------------------------------- */
export function ProgressMeter({
  value,
  color = 'var(--mausam-green)',
  zone,
  leftLabel,
  rightLabel,
  big,
  unit = '%',
}: {
  value: number
  color?: string
  zone?: [number, number]
  leftLabel?: string
  rightLabel?: string
  big?: string
  unit?: string
}) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setW(value), 120)
    return () => clearTimeout(t)
  }, [value])
  return (
    <div>
      {big && (
        <div className="mb-1.5 text-[26px] font-medium leading-none text-[var(--mausam-text)]">
          {big}
          <span className="text-sm text-[var(--mausam-text-secondary)]"> {unit}</span>
        </div>
      )}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[var(--mausam-border)]">
        {zone && (
          <div
            className="absolute inset-y-0 rounded-full bg-black/5 ring-1 ring-inset ring-[var(--mausam-green)]/40"
            style={{ left: `${zone[0]}%`, width: `${zone[1] - zone[0]}%` }}
          />
        )}
        <div
          className="h-full rounded-full"
          style={{ width: `${w}%`, backgroundColor: color, transition: 'width 1s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </div>
      {(leftLabel || rightLabel) && (
        <div className="mt-1 flex justify-between text-[10px] text-[var(--mausam-text-secondary)]">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Level badge — Low / Medium / High etc. (colorblind: icon + text)  */
/* ---------------------------------------------------------------- */
const LEVEL_STYLES: Record<string, { bg: string; fg: string; dots: number }> = {
  low: { bg: '#34a8531a', fg: '#0f9d58', dots: 1 },
  safe: { bg: '#34a8531a', fg: '#0f9d58', dots: 1 },
  good: { bg: '#34a8531a', fg: '#0f9d58', dots: 1 },
  dry: { bg: '#34a8531a', fg: '#0f9d58', dots: 1 },
  moderate: { bg: '#f9ab001a', fg: '#c68a00', dots: 2 },
  medium: { bg: '#f9ab001a', fg: '#c68a00', dots: 2 },
  caution: { bg: '#ff6b351a', fg: '#e0531f', dots: 2 },
  wet: { bg: '#f9ab001a', fg: '#c68a00', dots: 2 },
  high: { bg: '#ea43351a', fg: '#c5221f', dots: 3 },
  avoid: { bg: '#ea43351a', fg: '#c5221f', dots: 3 },
  muddy: { bg: '#ea43351a', fg: '#c5221f', dots: 3 },
}

export function LevelBadge({ level, note }: { level: string; note?: string }) {
  const s = LEVEL_STYLES[level.toLowerCase()] ?? LEVEL_STYLES.moderate
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium"
        style={{ backgroundColor: s.bg, color: s.fg }}
      >
        <span className="flex gap-0.5" aria-hidden>
          {[1, 2, 3].map((d) => (
            <span
              key={d}
              className="size-1.5 rounded-full"
              style={{ backgroundColor: d <= s.dots ? s.fg : 'currentColor', opacity: d <= s.dots ? 1 : 0.25 }}
            />
          ))}
        </span>
        {level}
      </span>
      {note && <span className="text-[11px] text-[var(--mausam-text-secondary)]">{note}</span>}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Big metric                                                        */
/* ---------------------------------------------------------------- */
export function BigMetric({ value, unit, hint }: { value: string; unit?: string; hint?: string }) {
  return (
    <div>
      <div className="text-[30px] font-medium leading-none text-[var(--mausam-text)]">
        {value}
        {unit && <span className="text-base text-[var(--mausam-text-secondary)]"> {unit}</span>}
      </div>
      {hint && <p className="mt-1 text-[11px] text-[var(--mausam-text-secondary)]">{hint}</p>}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Wind compass                                                      */
/* ---------------------------------------------------------------- */
const DIR_DEG: Record<string, number> = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 }
export function WindCompass({ speed, dir }: { speed: number; dir: string }) {
  const deg = DIR_DEG[dir] ?? 0
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex size-16 items-center justify-center rounded-full ring-1 ring-[var(--mausam-border)]">
        {['N', 'E', 'S', 'W'].map((d, i) => (
          <span
            key={d}
            className="absolute text-[8px] font-medium text-[var(--mausam-text-secondary)]"
            style={{
              top: i === 0 ? 2 : i === 2 ? 'auto' : '50%',
              bottom: i === 2 ? 2 : 'auto',
              left: i === 3 ? 3 : i === 1 ? 'auto' : '50%',
              right: i === 1 ? 3 : 'auto',
              transform: i % 2 === 0 ? 'translateX(-50%)' : 'translateY(-50%)',
            }}
          >
            {d}
          </span>
        ))}
        <Navigation
          className="size-6 text-[var(--mausam-blue)]"
          style={{ transform: `rotate(${deg + 180}deg)`, transition: 'transform 0.8s ease' }}
          fill="currentColor"
        />
      </div>
      <div>
        <div className="text-[24px] font-medium leading-none text-[var(--mausam-text)]">
          {speed}
          <span className="text-sm text-[var(--mausam-text-secondary)]"> km/h</span>
        </div>
        <p className="mt-1 text-[11px] text-[var(--mausam-text-secondary)]">From {dir}</p>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Countdown timer (live)                                            */
/* ---------------------------------------------------------------- */
export function Countdown({ target, label, color = 'var(--mausam-green)' }: { target: number; label: string; color?: string }) {
  const [left, setLeft] = useState(target)
  useEffect(() => {
    const i = setInterval(() => setLeft((v) => (v <= 0 ? 0 : v - 1)), 1000)
    return () => clearInterval(i)
  }, [])
  const h = Math.floor(left / 3600)
  const m = Math.floor((left % 3600) / 60)
  const s = left % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div>
      <div className="flex items-baseline gap-1 font-medium tabular-nums" style={{ color }}>
        {h > 0 && (
          <>
            <span className="text-[26px] leading-none">{pad(h)}</span>
            <span className="text-xs text-[var(--mausam-text-secondary)]">h</span>
          </>
        )}
        <span className="text-[26px] leading-none">{pad(m)}</span>
        <span className="text-xs text-[var(--mausam-text-secondary)]">m</span>
        <span className="text-[26px] leading-none">{pad(s)}</span>
        <span className="text-xs text-[var(--mausam-text-secondary)]">s</span>
      </div>
      <p className="mt-1 text-[11px] text-[var(--mausam-text-secondary)]">{label}</p>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Hourly mini timeline (fog / rain probability)                     */
/* ---------------------------------------------------------------- */
export function HourlyTimeline({
  data,
  unit = '%',
  color = 'var(--mausam-blue)',
}: {
  data: { t: string; v: number }[]
  unit?: string
  color?: string
}) {
  const max = Math.max(...data.map((d) => d.v), 1)
  return (
    <div className="flex items-end justify-between gap-1.5 pt-1">
      {data.map((d) => (
        <div key={d.t} className="flex flex-1 flex-col items-center gap-1">
          <span className="text-[9px] font-medium text-[var(--mausam-text-secondary)]">{d.v}{unit}</span>
          <div className="flex h-14 w-full items-end justify-center">
            <div
              className="w-2.5 rounded-full"
              style={{ height: `${(d.v / max) * 100}%`, backgroundColor: color, minHeight: 4, transition: 'height 0.8s ease' }}
            />
          </div>
          <span className="text-[9px] text-[var(--mausam-text-secondary)]">{d.t}</span>
        </div>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Tide timeline with animated wave                                  */
/* ---------------------------------------------------------------- */
export function TideTimeline({ tides }: { tides: { time: string; type: 'High' | 'Low'; h: string }[] }) {
  return (
    <div>
      <div className="relative mb-2 h-10 overflow-hidden rounded-lg bg-[var(--mausam-blue)]/10">
        <div className="mausam-wave absolute bottom-0 left-0 h-6 w-[200%]" aria-hidden>
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-full w-full" fill="var(--mausam-blue)" opacity={0.35}>
            <path d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20 V40 H0 Z" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {tides.map((t) => (
          <div key={t.time} className="flex items-center justify-between rounded-lg bg-black/[0.03] px-2 py-1">
            <div>
              <p className="text-[11px] font-medium text-[var(--mausam-text)]">{t.type} tide</p>
              <p className="text-[10px] text-[var(--mausam-text-secondary)]">{t.h}</p>
            </div>
            <span className="text-[12px] font-medium text-[var(--mausam-blue)]">{t.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Yes / No pill (umbrella needed etc.)                              */
/* ---------------------------------------------------------------- */
export function YesNoPill({ yes, yesText, noText }: { yes: boolean; yesText: string; noText: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[15px] font-medium"
      style={{
        backgroundColor: yes ? '#ff6b351a' : '#34a8531a',
        color: yes ? '#e0531f' : '#0f9d58',
      }}
    >
      <span className="text-lg leading-none">{yes ? '✓' : '✗'}</span>
      {yes ? yesText : noText}
    </div>
  )
}
