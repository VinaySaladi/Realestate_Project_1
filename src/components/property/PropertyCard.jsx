import { Link } from 'react-router-dom'
import { ArrowUpRight, Bath, BedDouble, MapPin, Ruler } from 'lucide-react'
import SmartImage from '../ui/SmartImage'
import FavoriteButton from './FavoriteButton'
import { formatNumber, formatPrice, priceSuffix, statusLabel } from '../../utils/format'

export default function PropertyCard({ property }) {
  const { slug, title, images, type, status, location, beds, baths, area, featured } = property

  const specs = [
    { icon: BedDouble, value: beds, label: beds === 1 ? 'Bed' : 'Beds' },
    { icon: Bath, value: baths, label: baths === 1 ? 'Bath' : 'Baths' },
    { icon: Ruler, value: formatNumber(area), label: 'sq ft' },
  ]

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_-12px_rgba(12,18,32,0.18)] ring-1 ring-stone-200/60 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-24px_rgba(12,18,32,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          id={images[0]}
          alt={`${title}, ${location.area}`}
          width={800}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full"
          imgClassName="group-hover:scale-110"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
            {statusLabel(status)}
          </span>
          {featured && (
            <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
              Featured
            </span>
          )}
        </div>

        <p className="absolute bottom-4 left-5 font-serif text-2xl font-semibold text-white">
          {formatPrice(property)}
          <span className="font-sans text-sm font-medium text-white/70">{priceSuffix(property)}</span>
        </p>

        <span
          aria-hidden
          className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-3 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{type}</p>
        <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
          {/* Stretched link: the whole card is clickable while the favorite button stays separate */}
          <Link
            to={`/properties/${slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-gold"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
          <MapPin className="h-4 w-4 shrink-0 text-stone-400" aria-hidden />
          {location.area}, {location.city}, {location.state}
        </p>

        <ul className="mt-auto flex items-center justify-between border-t border-stone-100 pt-5 text-sm text-stone-600">
          {specs.map(({ icon: Icon, value, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-gold" aria-hidden />
              <span>
                <strong className="font-bold text-ink">{value}</strong> {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <FavoriteButton propertyId={property.id} title={title} className="absolute right-4 top-4 z-10" />
    </article>
  )
}
