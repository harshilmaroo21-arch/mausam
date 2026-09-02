'use client'

import type { PersonaId } from '@/lib/mausam-data'
import {
  AlarmClock,
  Baby,
  Bus,
  CloudRain,
  Droplets,
  Eye,
  Flower2,
  Footprints,
  Gauge,
  Luggage,
  MapPin,
  Route,
  School,
  ShieldAlert,
  Snowflake,
  Sparkles,
  SprayCan,
  Sun,
  Sunrise,
  ThermometerSun,
  TreePine,
  Waves,
  Wind,
} from 'lucide-react'
import type { ReactNode } from 'react'
import {
  BigMetric,
  CircularGauge,
  Countdown,
  HourlyTimeline,
  LevelBadge,
  ProgressMeter,
  TideTimeline,
  WidgetCard,
  WindCompass,
  YesNoPill,
} from './primitives'

export interface WidgetDef {
  id: string
  wide?: boolean
  render: (index: number) => ReactNode
}

const AQI_SEGMENTS = [
  { upTo: 50, color: '#34a853', name: 'Good' },
  { upTo: 100, color: '#f9ab00', name: 'Moderate' },
  { upTo: 200, color: '#ff6b35', name: 'Unhealthy' },
  { upTo: 300, color: '#ea4335', name: 'Very Poor' },
  { upTo: 500, color: '#8e24aa', name: 'Severe' },
]
const UV_SEGMENTS = [
  { upTo: 2, color: '#34a853', name: 'Low' },
  { upTo: 5, color: '#f9ab00', name: 'Moderate' },
  { upTo: 7, color: '#ff6b35', name: 'High' },
  { upTo: 10, color: '#ea4335', name: 'Very High' },
  { upTo: 15, color: '#8e24aa', name: 'Extreme' },
]
const COMFORT_SEGMENTS = [
  { upTo: 40, color: '#ea4335', name: 'Poor' },
  { upTo: 70, color: '#f9ab00', name: 'Fair' },
  { upTo: 100, color: '#34a853', name: 'Great' },
]
const SOIL_SEGMENTS = [
  { upTo: 30, color: '#ff6b35', name: 'Dry' },
  { upTo: 65, color: '#34a853', name: 'Optimal' },
  { upTo: 100, color: '#1a73e8', name: 'Wet' },
]

export function getPersonaWidgets(persona: PersonaId): WidgetDef[] {
  switch (persona) {
    /* ------------------------------ HEALTH ------------------------------ */
    case 'health':
      return [
        {
          id: 'aqi',
          render: (i) => (
            <WidgetCard key="aqi" index={i} title="Air Quality Index" subtitle="Live · CPCB" icon={Wind} accent="#ff6b35" detail="AQI 156 falls in the Unhealthy band. Sensitive groups should limit prolonged outdoor exertion.">
              <CircularGauge value={156} max={500} label="AQI" sub="US AQI" segments={AQI_SEGMENTS} />
            </WidgetCard>
          ),
        },
        {
          id: 'pm',
          render: (i) => (
            <WidgetCard key="pm" index={i} title="Particulate Matter" icon={Gauge} accent="#ea4335">
              <div className="space-y-2.5">
                <ProgressMeter big="112" unit="µg/m³ PM2.5" value={74} color="#ff6b35" leftLabel="PM2.5" rightLabel="5× WHO limit" />
                <ProgressMeter big="168" unit="µg/m³ PM10" value={60} color="#f9ab00" leftLabel="PM10" rightLabel="Poor" />
              </div>
            </WidgetCard>
          ),
        },
        {
          id: 'pollen',
          render: (i) => (
            <WidgetCard key="pollen" index={i} title="Pollen Count" subtitle="Grass & weed" icon={Flower2} accent="#34a853">
              <LevelBadge level="Medium" note="Seasonal" />
              <p className="mt-2 text-[11px] text-[var(--mausam-text-secondary)]">Peaks early morning. Keep antihistamines handy.</p>
            </WidgetCard>
          ),
        },
        {
          id: 'uv',
          render: (i) => (
            <WidgetCard key="uv" index={i} title="UV Index" subtitle="Safe exposure" icon={Sun} accent="#ff6b35">
              <CircularGauge value={8} max={15} label="UV" segments={UV_SEGMENTS} size={104} />
              <p className="text-center text-[11px] text-[var(--mausam-text-secondary)]">Burn risk in ~25 min</p>
            </WidgetCard>
          ),
        },
        {
          id: 'feels',
          wide: true,
          render: (i) => (
            <WidgetCard key="feels" index={i} title="Humidity & Feels Like" icon={Droplets} accent="#1a73e8">
              <div className="flex items-center justify-between">
                <BigMetric value="67" unit="%" hint="Relative humidity" />
                <div className="h-10 w-px bg-[var(--mausam-border)]" />
                <BigMetric value="36°" hint="Feels like (32° actual)" />
              </div>
            </WidgetCard>
          ),
        },
      ]

    /* ------------------------------ FITNESS ----------------------------- */
    case 'fitness':
      return [
        {
          id: 'golden',
          wide: true,
          render: (i) => (
            <WidgetCard key="golden" index={i} title="Golden Hours — Workout Window" icon={AlarmClock} accent="#34a853" detail="Best effort window closes as the heat index rises. Hydrate every 20 minutes.">
              <Countdown target={3120} label="Until ideal morning window ends (6:40 AM)" />
            </WidgetCard>
          ),
        },
        {
          id: 'wind',
          render: (i) => (
            <WidgetCard key="wind" index={i} title="Wind" subtitle="Direction & speed" icon={Wind} accent="#1a73e8">
              <WindCompass speed={12} dir="NW" />
            </WidgetCard>
          ),
        },
        {
          id: 'heat',
          render: (i) => (
            <WidgetCard key="heat" index={i} title="Heat Stroke Risk" icon={ThermometerSun} accent="#ea4335" detail="Heat index 36°C now, rising to 41°C by 2 PM. Avoid high-intensity sessions midday.">
              <LevelBadge level="Moderate" note="36° index" />
              <p className="mt-2 text-[11px] text-[var(--mausam-text-secondary)]">Rises to High after 12 PM</p>
            </WidgetCard>
          ),
        },
        {
          id: 'sunrise',
          render: (i) => (
            <WidgetCard key="sunrise" index={i} title="Sunset Countdown" icon={Sunrise} accent="#ff6b35">
              <Countdown target={20400} label="Until sunset · 6:52 PM" color="#ff6b35" />
            </WidgetCard>
          ),
        },
        {
          id: 'track',
          render: (i) => (
            <WidgetCard key="track" index={i} title="Running Track" subtitle="Surface condition" icon={Footprints} accent="#34a853">
              <LevelBadge level="Dry" note="Good grip" />
              <p className="mt-2 text-[11px] text-[var(--mausam-text-secondary)]">May turn Wet after 6 PM rain</p>
            </WidgetCard>
          ),
        },
      ]

    /* ------------------------------ BEACH ------------------------------- */
    case 'beach':
      return [
        {
          id: 'tide',
          wide: true,
          render: (i) => (
            <WidgetCard key="tide" index={i} title="Tide Timeline" subtitle="Chennai Marina" icon={Waves} accent="#1a73e8">
              <TideTimeline
                tides={[
                  { time: '4:12 AM', type: 'Low', h: '0.4 m' },
                  { time: '10:38 AM', type: 'High', h: '1.6 m' },
                  { time: '4:12 PM', type: 'High', h: '1.8 m' },
                  { time: '10:54 PM', type: 'Low', h: '0.3 m' },
                ]}
              />
            </WidgetCard>
          ),
        },
        {
          id: 'wave',
          render: (i) => (
            <WidgetCard key="wave" index={i} title="Wave Height" subtitle="Surfability: Fair" icon={Waves} accent="#00acc1">
              <BigMetric value="1.8" unit="m" hint="Swell from SW · 8s period" />
            </WidgetCard>
          ),
        },
        {
          id: 'sst',
          render: (i) => (
            <WidgetCard key="sst" index={i} title="Sea Surface Temp" icon={ThermometerSun} accent="#ff6b35">
              <BigMetric value="29" unit="°C" hint="Comfortable for swimming" />
            </WidgetCard>
          ),
        },
        {
          id: 'water',
          render: (i) => (
            <WidgetCard key="water" index={i} title="Water Quality" icon={Droplets} accent="#34a853">
              <LevelBadge level="Caution" note="Post-rain" />
              <p className="mt-2 text-[11px] text-[var(--mausam-text-secondary)]">Runoff may raise bacteria levels</p>
            </WidgetCard>
          ),
        },
        {
          id: 'rip',
          render: (i) => (
            <WidgetCard key="rip" index={i} title="Rip Current Risk" icon={ShieldAlert} accent="#ea4335" detail="Risk increases with the incoming afternoon tide. Swim between the flags only.">
              <LevelBadge level="Moderate" note="Rises PM" />
            </WidgetCard>
          ),
        },
      ]

    /* ------------------------------ TRAVEL ------------------------------ */
    case 'travel':
      return [
        {
          id: 'dest',
          wide: true,
          render: (i) => (
            <WidgetCard key="dest" index={i} title="Saved Destinations" icon={MapPin} accent="#1a73e8">
              <div className="space-y-1.5">
                {[
                  { c: 'Mumbai', t: '31°', d: 'Humid, showers', col: '#f9ab00' },
                  { c: 'Bengaluru', t: '24°', d: 'Pleasant, cloudy', col: '#34a853' },
                  { c: 'Manali', t: '9°', d: 'Cold, clear', col: '#1a73e8' },
                ].map((r) => (
                  <div key={r.c} className="flex items-center justify-between rounded-lg bg-black/[0.03] px-2.5 py-1.5">
                    <div>
                      <p className="text-[12px] font-medium text-[var(--mausam-text)]">{r.c}</p>
                      <p className="text-[10px] text-[var(--mausam-text-secondary)]">{r.d}</p>
                    </div>
                    <span className="text-[16px] font-medium" style={{ color: r.col }}>{r.t}</span>
                  </div>
                ))}
              </div>
            </WidgetCard>
          ),
        },
        {
          id: 'flight',
          render: (i) => (
            <WidgetCard key="flight" index={i} title="Flight Rain Impact" subtitle="IGI Airport" icon={CloudRain} accent="#673ab7" detail="Evening convective cells may cause 30–45 min departure holds after 6 PM.">
              <LevelBadge level="High" note="6–9 PM" />
            </WidgetCard>
          ),
        },
        {
          id: 'pack',
          render: (i) => (
            <WidgetCard key="pack" index={i} title="Packing Tip" subtitle="AI suggestion" icon={Sparkles} accent="#1a73e8">
              <p className="text-[12px] leading-relaxed text-[var(--mausam-text)]">Add a light rain shell & quick-dry layers. Skip the heavy jacket.</p>
            </WidgetCard>
          ),
        },
        {
          id: 'vis',
          render: (i) => (
            <WidgetCard key="vis" index={i} title="Visibility" subtitle="Fog advisory" icon={Eye} accent="#5f6368">
              <BigMetric value="4.5" unit="km" hint="Reduces to 1 km by night" />
            </WidgetCard>
          ),
        },
        {
          id: 'baggage',
          render: (i) => (
            <WidgetCard key="baggage" index={i} title="Baggage Advice" icon={Luggage} accent="#34a853">
              <p className="text-[12px] leading-relaxed text-[var(--mausam-text)]">Waterproof your check-in bag cover — tarmac transfers likely in rain.</p>
            </WidgetCard>
          ),
        },
      ]

    /* ------------------------------ FAMILY ------------------------------ */
    case 'family':
      return [
        {
          id: 'school',
          wide: true,
          render: (i) => (
            <WidgetCard key="school" index={i} title="School Commute Weather" icon={School} accent="#ff6b35" detail="Morning is clear and safe. Evening pickup carries rain risk — send raincoats.">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-[var(--mausam-text-secondary)]">AM · 7:30</p>
                  <LevelBadge level="Safe" />
                </div>
                <div className="h-8 w-px bg-[var(--mausam-border)]" />
                <div>
                  <p className="text-[11px] font-medium text-[var(--mausam-text-secondary)]">PM · 2:30</p>
                  <LevelBadge level="Caution" />
                </div>
              </div>
            </WidgetCard>
          ),
        },
        {
          id: 'suddenrain',
          render: (i) => (
            <WidgetCard key="suddenrain" index={i} title="Sudden Rain Alert" icon={CloudRain} accent="#1a73e8">
              <BigMetric value="5:30 PM" hint="Predicted onset · 80% likely" />
            </WidgetCard>
          ),
        },
        {
          id: 'storm',
          render: (i) => (
            <WidgetCard key="storm" index={i} title="Thunderstorm Advisory" icon={ShieldAlert} accent="#ea4335" detail="Keep children indoors during lightning. Stay away from windows and open fields.">
              <LevelBadge level="Caution" note="Active" />
            </WidgetCard>
          ),
        },
        {
          id: 'playground',
          render: (i) => (
            <WidgetCard key="playground" index={i} title="Playground Comfort" icon={TreePine} accent="#34a853">
              <ProgressMeter big="58" unit="/100" value={58} color="#f9ab00" leftLabel="Hot & humid" rightLabel="Best 8–10 AM" />
            </WidgetCard>
          ),
        },
        {
          id: 'uvkids',
          render: (i) => (
            <WidgetCard key="uvkids" index={i} title="Kids' UV Protection" icon={Baby} accent="#ff6b35">
              <LevelBadge level="High" note="Apply SPF 50" />
              <p className="mt-2 text-[11px] text-[var(--mausam-text-secondary)]">Hats & shade 11 AM–3 PM</p>
            </WidgetCard>
          ),
        },
      ]

    /* --------------------------- AGRICULTURE ---------------------------- */
    case 'agri':
      return [
        {
          id: 'soil',
          render: (i) => (
            <WidgetCard key="soil" index={i} title="Soil Moisture" subtitle="Wheat · optimal 40–65%" icon={Droplets} accent="#34a853" detail="Current 52% sits in the optimal band for wheat at this growth stage.">
              <CircularGauge value={52} max={100} label="Moisture" sub="Root zone" unit="%" segments={SOIL_SEGMENTS} />
            </WidgetCard>
          ),
        },
        {
          id: 'frost',
          render: (i) => (
            <WidgetCard key="frost" index={i} title="Frost / Heat Stress" icon={Snowflake} accent="#1a73e8">
              <LevelBadge level="Low" note="No frost" />
              <p className="mt-2 text-[11px] text-[var(--mausam-text-secondary)]">Night min 21°C — safe for crops</p>
            </WidgetCard>
          ),
        },
        {
          id: 'crop',
          wide: true,
          render: (i) => (
            <WidgetCard key="crop" index={i} title="Seasonal Crop Guidance" subtitle="Rabi season" icon={Sprout} accent="#0f9d58">
              <div className="rounded-lg bg-[var(--mausam-green)]/10 p-2.5">
                <p className="text-[13px] font-medium text-[var(--mausam-text)]">Wheat: Sowing ideal ✓</p>
                <p className="mt-1 text-[11px] text-[var(--mausam-text-secondary)]">Soil temp & moisture favourable. Complete sowing before the next wet spell for best germination.</p>
              </div>
            </WidgetCard>
          ),
        },
        {
          id: 'rainprob',
          wide: true,
          render: (i) => (
            <WidgetCard key="rainprob" index={i} title="7-Day Rain Probability" icon={CloudRain} accent="#1a73e8">
              <HourlyTimeline
                data={[
                  { t: 'Mon', v: 80 },
                  { t: 'Tue', v: 35 },
                  { t: 'Wed', v: 10 },
                  { t: 'Thu', v: 5 },
                  { t: 'Fri', v: 20 },
                  { t: 'Sat', v: 60 },
                  { t: 'Sun', v: 45 },
                ]}
              />
            </WidgetCard>
          ),
        },
        {
          id: 'spray',
          wide: true,
          render: (i) => (
            <WidgetCard key="spray" index={i} title="Spraying Suitability" icon={SprayCan} accent="#ff6b35" detail="Gusts of 40–50 km/h after 3 PM cause spray drift. Next calm window: tomorrow 6–9 AM.">
              <LevelBadge level="Avoid" note="High wind" />
            </WidgetCard>
          ),
        },
      ]

    /* ------------------------------ COMMUTE ----------------------------- */
    case 'commute':
      return [
        {
          id: 'fog',
          wide: true,
          render: (i) => (
            <WidgetCard key="fog" index={i} title="Fog Visibility — Hourly" icon={Eye} accent="#5f6368">
              <HourlyTimeline
                unit="km"
                color="#5f6368"
                data={[
                  { t: '6a', v: 1 },
                  { t: '7a', v: 2 },
                  { t: '8a', v: 4 },
                  { t: '9a', v: 6 },
                  { t: '6p', v: 5 },
                  { t: '8p', v: 2 },
                ]}
              />
            </WidgetCard>
          ),
        },
        {
          id: 'road',
          render: (i) => (
            <WidgetCard key="road" index={i} title="Road Weather Risk" icon={Route} accent="#ea4335" detail="Waterlogging likely on underpasses after 6 PM. Prefer elevated routes.">
              <LevelBadge level="High" note="6–8 PM" />
            </WidgetCard>
          ),
        },
        {
          id: 'transit',
          render: (i) => (
            <WidgetCard key="transit" index={i} title="Transit Delay" subtitle="Metro & bus" icon={Bus} accent="#1a73e8">
              <BigMetric value="+18" unit="min" hint="Predicted at 6 PM peak" />
            </WidgetCard>
          ),
        },
        {
          id: 'umbrella',
          render: (i) => (
            <WidgetCard key="umbrella" index={i} title="Umbrella Needed?" icon={CloudRain} accent="#ff6b35">
              <YesNoPill yes yesText="Yes, carry one" noText="Not today" />
              <p className="mt-2 text-[11px] text-[var(--mausam-text-secondary)]">Heavy rain 6–7 PM</p>
            </WidgetCard>
          ),
        },
        {
          id: 'peak',
          render: (i) => (
            <WidgetCard key="peak" index={i} title="Peak-Hour Forecast" icon={AlarmClock} accent="#673ab7">
              <BigMetric value="Rain" hint="6 PM · 11 mm/h intensity" />
            </WidgetCard>
          ),
        },
      ]

    /* ------------------------------ EVENTS ------------------------------ */
    case 'events':
      return [
        {
          id: 'comfort',
          render: (i) => (
            <WidgetCard key="comfort" index={i} title="Comfort Index" subtitle="Temp + Humidity + Wind" icon={Gauge} accent="#673ab7" detail="Blends 32°C, 67% humidity and 12 km/h wind. Above 70 is comfortable for guests.">
              <CircularGauge value={64} max={100} label="Comfort" sub="Now" segments={COMFORT_SEGMENTS} />
            </WidgetCard>
          ),
        },
        {
          id: 'venuerain',
          render: (i) => (
            <WidgetCard key="venuerain" index={i} title="Venue Rain Probability" icon={CloudRain} accent="#1a73e8">
              <HourlyTimeline
                data={[
                  { t: '11a', v: 5 },
                  { t: '1p', v: 15 },
                  { t: '3p', v: 40 },
                  { t: '5p', v: 70 },
                  { t: '7p', v: 85 },
                ]}
              />
            </WidgetCard>
          ),
        },
        {
          id: 'timing',
          wide: true,
          render: (i) => (
            <WidgetCard key="timing" index={i} title="Best Event Window" icon={AlarmClock} accent="#34a853" detail="Comfort peaks late morning before rain risk climbs in the afternoon.">
              <div className="rounded-lg bg-[var(--mausam-green)]/10 p-2.5">
                <p className="text-[15px] font-medium text-[var(--mausam-text)]">10:00 AM – 1:00 PM</p>
                <p className="mt-1 text-[11px] text-[var(--mausam-text-secondary)]">Recommended 3-hour slot · Comfort 82 · Rain risk under 15%</p>
              </div>
            </WidgetCard>
          ),
        },
        {
          id: 'setup',
          render: (i) => (
            <WidgetCard key="setup" index={i} title="Setup / Takedown" icon={Wind} accent="#ff6b35" detail="Secure canopies before 3 PM — gusty winds and rain expected during evening takedown.">
              <LevelBadge level="Caution" note="Wind PM" />
            </WidgetCard>
          ),
        },
        {
          id: 'guest',
          render: (i) => (
            <WidgetCard key="guest" index={i} title="Guest Comfort Score" icon={Sun} accent="#34a853">
              <ProgressMeter big="82" unit="/100" value={82} color="#34a853" leftLabel="Late morning" rightLabel="Great" />
            </WidgetCard>
          ),
        },
      ]
  }
}
