import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  CalendarClock,
  CarFront,
  HeartPulse,
  Plane,
  Sprout,
  Umbrella,
  Users,
} from 'lucide-react'

export type PersonaId =
  | 'fitness'
  | 'agri'
  | 'travel'
  | 'health'
  | 'beach'
  | 'commute'
  | 'family'
  | 'events'

export interface Persona {
  id: PersonaId
  label: string
  icon: LucideIcon
  gradient: [string, string]
  tagline: string
}

export const PERSONAS: Persona[] = [
  { id: 'fitness', label: 'Fitness', icon: Activity, gradient: ['#34a853', '#0f9d58'], tagline: 'Train in the safest window' },
  { id: 'agri', label: 'Agri', icon: Sprout, gradient: ['#0f9d58', '#5b8c00'], tagline: 'Field-ready crop guidance' },
  { id: 'travel', label: 'Travel', icon: Plane, gradient: ['#1a73e8', '#673ab7'], tagline: 'Pack smart, fly informed' },
  { id: 'health', label: 'Health', icon: HeartPulse, gradient: ['#ea4335', '#ff6b35'], tagline: 'Breathe & step out safely' },
  { id: 'beach', label: 'Beach', icon: Umbrella, gradient: ['#1a73e8', '#00acc1'], tagline: 'Tides, waves & water safety' },
  { id: 'commute', label: 'Commute', icon: CarFront, gradient: ['#5f6368', '#1a73e8'], tagline: 'Beat fog, rain & delays' },
  { id: 'family', label: 'Family', icon: Users, gradient: ['#ff6b35', '#f9ab00'], tagline: 'Keep the family safe' },
  { id: 'events', label: 'Events', icon: CalendarClock, gradient: ['#673ab7', '#1a73e8'], tagline: 'Plan the perfect window' },
]

export const CURRENT_WEATHER = {
  location: 'New Delhi',
  region: 'Delhi NCR, India',
  coords: '28.61° N, 77.21° E',
  gpsAccuracy: 'High · ±8m',
  temp: 32,
  feelsLike: 36,
  condition: 'Partly Cloudy',
  humidity: 67,
  wind: 12,
  windDir: 'NW',
  aqi: 156,
  rainChance: 80,
  rainTime: '6:00 PM',
  updated: 'Just now',
}

/* ---- Severe weather alert (CAP compliant) ---- */
export const ALERT = {
  severity: 'orange' as 'red' | 'orange' | 'yellow',
  event: 'HEAVY RAIN ALERT',
  headline: 'HEAVY RAIN ALERT | Central Delhi District',
  location: 'Central & South Delhi',
  effective: 'Today 15:00 IST',
  expires: 'Today 21:00 IST',
  certainty: 'Likely',
  urgency: 'Expected',
  description:
    'Intense spells of rain (7–11 cm) accompanied by thunderstorm and gusty winds (40–50 km/h) very likely between 3 PM and 9 PM. Waterlogging expected in low-lying areas. Avoid non-essential travel.',
  instruction:
    'Do not take shelter under trees. Unplug electrical appliances. Follow updates from IMD and local authorities.',
  source: 'India Meteorological Department (IMD) · CAP-IN',
}

/* ---- Persona-specific packing / smart tip ---- */
export const PERSONA_TIPS: Record<PersonaId, { icon: string; text: string; why: string }> = {
  fitness: {
    icon: '🏃',
    text: 'Golden hour ends 6:40 AM — finish your run before heat index climbs past 38°C.',
    why: 'Heat index peaks at 2 PM (41°C). Morning humidity is lower, giving safer effort levels and faster recovery.',
  },
  agri: {
    icon: '🌾',
    text: 'Hold off spraying today — 40–50 km/h gusts after 3 PM will cause heavy drift.',
    why: 'Wind above 15 km/h reduces spray deposition efficiency. A calmer 6–9 AM window tomorrow is ideal.',
  },
  travel: {
    icon: '🧳',
    text: 'Carry a compact rain shell — 80% rain at 6 PM and reduced visibility near the airport.',
    why: 'Evening thunderstorm cell tracking over IGI Airport may cause 30–45 min departure holds.',
  },
  health: {
    icon: '😷',
    text: 'AQI 156 (Unhealthy) — mask up outdoors and keep windows shut till evening rain clears the air.',
    why: 'PM2.5 is 5× WHO limit. Rain after 6 PM typically drops AQI by 30–40 points overnight.',
  },
  beach: {
    icon: '🏖️',
    text: 'High tide at 4:12 PM with 1.8 m waves — swim before noon when the sea is calmest.',
    why: 'Moderate rip current risk builds with the incoming tide. Morning offers safer, lower-energy surf.',
  },
  commute: {
    icon: '☔',
    text: 'Umbrella needed. Leave by 5 PM to beat the 6 PM downpour and peak-hour waterlogging.',
    why: 'Rain intensity peaks 6–7 PM overlapping evening rush; expect 25+ min metro & road delays.',
  },
  family: {
    icon: '👨‍👩‍👧‍👦',
    text: 'Evening pickup at risk — sudden rain likely 5:30 PM. Send raincoats with the kids.',
    why: 'Thunderstorm advisory active. Playground comfort drops sharply after 3 PM; plan indoor play.',
  },
  events: {
    icon: '🎪',
    text: 'Best outdoor window is 10 AM–1 PM (Comfort 82). Avoid the 5–8 PM rain block.',
    why: 'Comfort index blends 32°C temp, 67% humidity and 12 km/h wind. Rain risk voids the evening slot.',
  },
}
