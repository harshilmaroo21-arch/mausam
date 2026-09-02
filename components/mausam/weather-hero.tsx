'use client'

import { CURRENT_WEATHER, type Persona } from '@/lib/mausam-data'
import { CloudSun, MapPin, RefreshCw, Satellite } from 'lucide-react'

export function WeatherHero({ persona, updated, onRefresh, refreshing }: { persona: Persona; updated: string; onRefresh: () => void; refreshing: boolean }) {
  const w = CURRENT_WEATHER
  return (
    <header
      className="px-4 pb-5 pt-3 text-white"
      style={{ backgroundImage: `linear-gradient(160deg, ${persona.gradient[0]}, ${persona.gradient[1]})` }}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0" />
            <h1 className="truncate text-[16px] font-bold leading-tight">{w.location}</h1>
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-[10px] text-white/80">
            <Satellite className="size-3" />
            GPS {w.gpsAccuracy} · {w.coords}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <button
            type="button"
            onClick={onRefresh}
            aria-label="Refresh weather data"
            className="flex size-8 items-center justify-center rounded-full bg-white/20 active:scale-95"
          >
            <RefreshCw className={`size-4 ${refreshing ? 'mausam-spin' : ''}`} />
          </button>
          <span className="mt-1 text-[10px] text-white/80">Updated {updated}</span>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="flex items-start">
            <span className="text-[56px] font-medium leading-none tracking-tight">{w.temp}</span>
            <span className="mt-1 text-2xl font-medium">°C</span>
          </div>
          <p className="mt-1 text-[13px] text-white/90">Feels like {w.feelsLike}°C · {w.condition}</p>
          <p className="text-[12px] font-medium text-white/95">{persona.tagline}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-right">
          <CloudSun className="size-12 text-white/90" />
          <div className="flex gap-3 text-[11px] text-white/90">
            <span>💧 {w.humidity}%</span>
            <span>🌬 {w.wind} km/h</span>
          </div>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium">
            Rain {w.rainChance}% · {w.rainTime}
          </span>
        </div>
      </div>
    </header>
  )
}
