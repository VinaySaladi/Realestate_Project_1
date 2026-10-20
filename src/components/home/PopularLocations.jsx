import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'
import { popularLocations } from '../../data/content'
import { properties } from '../../data/properties'

const countFor = (city) => properties.filter((p) => p.location.city === city).length

// Bento layout: first tile is large, the rest fill around it.
const spans = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-4',
]

export default function PopularLocations() {
  return (
    <section className="relative bg-sand/50 py-24 sm:py-32">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Popular locations"
          title="Explore the most coveted addresses"
          description="From oceanfront Miami to the peaks of Aspen, find your next home in the cities our clients love most."
        />

        <ul className="grid auto-rows-[240px] gap-5 md:grid-cols-4 md:auto-rows-[260px]">
          {popularLocations.map((loc, i) => {
            const count = countFor(loc.city)
            return (
              <Reveal as="li" key={loc.city} delay={(i % 3) * 0.1} className={spans[i] ?? ''}>
                <Link
                  to={`/properties?city=${encodeURIComponent(loc.city)}`}
                  className="group relative block h-full overflow-hidden rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <SmartImage
                    id={loc.image}
                    alt={`${loc.city}, ${loc.state}`}
                    width={i === 0 ? 1200 : 800}
                    sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 100vw'}
                    className="h-full w-full"
                    imgClassName="group-hover:scale-110"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
                        {count} {count === 1 ? 'property' : 'properties'}
                      </p>
                      <h3 className={`mt-1 font-serif font-semibold ${i === 0 ? 'text-4xl' : 'text-2xl'}`}>{loc.city}</h3>
                      <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100">
                        {loc.tagline}
                      </p>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/40 backdrop-blur-sm transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <ArrowUpRight className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
