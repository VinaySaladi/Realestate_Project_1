import {
  Car,
  CircleCheck,
  Dumbbell,
  Film,
  Flame,
  Mountain,
  Shield,
  Sofa,
  Sun,
  Trees,
  Waves,
  Wifi,
  Wine,
  Building2,
  Sparkles,
  Briefcase,
  PawPrint,
  Zap,
} from 'lucide-react'
import Reveal from '../ui/Reveal'

// Keyword → icon. Anything unmatched gets a check mark.
const iconRules = [
  [/pool|beach|water|bay|ocean|dock|marina/i, Waves],
  [/gym/i, Dumbbell],
  [/cinema/i, Film],
  [/fireplace|hot tub|steam/i, Flame],
  [/mountain|ski/i, Mountain],
  [/gated|doorman|concierge|security/i, Shield],
  [/furnished/i, Sofa],
  [/terrace|rooftop|patio|deck/i, Sun],
  [/garden|park/i, Trees],
  [/smart/i, Wifi],
  [/wine/i, Wine],
  [/parking|valet|driveway/i, Car],
  [/elevator|view/i, Building2],
  [/spa|housekeeping/i, Sparkles],
  [/office|co-working/i, Briefcase],
  [/pet/i, PawPrint],
  [/ev |solar|charging/i, Zap],
]

const iconFor = (name) => iconRules.find(([re]) => re.test(name))?.[1] ?? CircleCheck

export default function AmenityList({ amenities }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {amenities.map((name, i) => {
        const Icon = iconFor(name)
        return (
          <Reveal
            as="li"
            key={name}
            delay={i * 0.04}
            y={16}
            className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-4 py-3.5 text-sm font-semibold text-ink transition hover:border-gold/50 hover:shadow-md"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sand text-gold">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            {name}
          </Reveal>
        )
      })}
    </ul>
  )
}
