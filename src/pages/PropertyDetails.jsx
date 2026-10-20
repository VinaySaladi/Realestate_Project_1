import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Bath, BedDouble, Building2, CalendarDays, Car, Check, ChevronRight, MapPin, Phone, Ruler, Share2 } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import Gallery from '../components/property/Gallery'
import AmenityList from '../components/property/AmenityList'
import ContactAgentForm from '../components/property/ContactAgentForm'
import FavoriteButton from '../components/property/FavoriteButton'
import PropertyCard from '../components/property/PropertyCard'
import Reveal from '../components/ui/Reveal'
import SmartImage from '../components/ui/SmartImage'
import Button from '../components/ui/Button'
import NotFound from './NotFound'
import { getPropertyBySlug, getSimilarProperties } from '../data/properties'
import { getAgentById } from '../data/agents'
import { formatNumber, formatPrice, priceSuffix, statusLabel } from '../utils/format'
import { useSimulatedLoading } from '../hooks/useSimulatedLoading'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8" role="status" aria-label="Loading property">
      <div className="h-4 w-48 animate-pulse rounded-full bg-sand" />
      <div className="mt-6 h-10 w-2/3 animate-pulse rounded-full bg-sand" />
      <div className="mt-4 h-4 w-1/3 animate-pulse rounded-full bg-sand" />
      <div className="mt-10 h-[52vh] animate-pulse rounded-3xl bg-sand md:h-[64vh]" />
      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-4 animate-pulse rounded-full bg-sand" style={{ width: `${90 - i * 12}%` }} />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-3xl bg-sand" />
      </div>
    </div>
  )
}

function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked; nothing else to do.
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="relative grid h-11 w-11 place-items-center rounded-full border border-stone-200 bg-white text-ink transition hover:border-ink"
      aria-label="Copy link to this property"
    >
      <Share2 className="h-5 w-5" aria-hidden />
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="absolute -top-10 right-0 flex items-center gap-1 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white"
          >
            <Check className="h-3 w-3" aria-hidden /> Link copied
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

/** Phone/tablet only: keeps price + "Contact agent" in reach, hidden while the form itself is on screen. */
function MobileContactBar({ property, agent }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const form = document.getElementById('contact-agent')
    const onScroll = () => {
      const rect = form?.getBoundingClientRect()
      const formOnScreen = rect ? rect.top < window.innerHeight && rect.bottom > 0 : false
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 200
      setVisible(window.scrollY > 400 && !formOnScreen && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-4 pt-3 shadow-[0_-12px_30px_-12px_rgba(12,18,32,0.2)] backdrop-blur-xl lg:hidden"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <SmartImage id={agent.image} alt="" width={120} sizes="44px" className="h-11 w-11 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg font-semibold leading-tight">
                {formatPrice(property)}
                <span className="font-sans text-xs font-medium text-stone-500">{priceSuffix(property)}</span>
              </p>
              <p className="truncate text-xs text-stone-500">with {agent.name}</p>
            </div>
            <Button
              size="sm"
              variant="dark"
              iconLeft={Phone}
              onClick={() => document.getElementById('contact-agent')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Contact agent
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function PropertyDetails() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)
  const loading = useSimulatedLoading(500)
  useDocumentTitle(property?.title ?? 'Property not found')

  if (!property) {
    return (
      <NotFound
        title="Property not found"
        message="This listing may have been sold or removed. Explore our other available homes instead."
      />
    )
  }

  const agent = getAgentById(property.agentId)
  const similar = getSimilarProperties(property)
  const { title, location, status, type } = property

  const specs = [
    { icon: BedDouble, label: 'Bedrooms', value: property.beds },
    { icon: Bath, label: 'Bathrooms', value: property.baths },
    { icon: Ruler, label: 'Living area', value: `${formatNumber(property.area)} sq ft` },
    { icon: Car, label: 'Garage', value: property.garage ? `${property.garage} cars` : 'None' },
    { icon: Building2, label: 'Type', value: type },
    { icon: CalendarDays, label: 'Year built', value: property.yearBuilt },
  ]

  return (
    <PageTransition>
      {loading ? (
        <DetailsSkeleton />
      ) : (
        <>
          <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-32">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                <li>
                  <Link to="/" className="transition hover:text-gold">
                    Home
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link to="/properties" className="transition hover:text-gold">
                    Properties
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page" className="text-ink">
                  {title}
                </li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    {statusLabel(status)}
                  </span>
                  <span className="rounded-full bg-sand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">{type}</span>
                </div>
                <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
                <p className="mt-3 flex items-center gap-2 text-stone-500">
                  <MapPin className="h-4 w-4 text-gold" aria-hidden />
                  {location.area}, {location.city}, {location.state}
                </p>
              </div>

              <div className="flex items-end gap-5 lg:flex-col lg:items-end">
                <p className="font-serif text-4xl font-semibold text-ink sm:text-5xl">
                  {formatPrice(property)}
                  <span className="font-sans text-base font-medium text-stone-500">{priceSuffix(property)}</span>
                </p>
                <div className="flex gap-2">
                  <FavoriteButton propertyId={property.id} title={title} variant="light" />
                  <ShareButton />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="mt-10"
            >
              <Gallery images={property.images} title={title} />
            </motion.div>
          </section>

          <section className="mx-auto mt-12 grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-3">
            <div className="space-y-14 lg:col-span-2">
              <Reveal>
                <h2 className="font-serif text-3xl font-semibold">Property overview</h2>
                <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {specs.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-stone-200/70">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sand text-gold">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="flex flex-col">
                        <dt className="order-2 text-xs font-medium text-stone-500">{label}</dt>
                        <dd className="font-bold text-ink">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal>
                <h2 className="font-serif text-3xl font-semibold">About this home</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-stone-600 sm:text-lg">
                  {property.description.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <div>
                <Reveal>
                  <h2 className="font-serif text-3xl font-semibold">Amenities</h2>
                </Reveal>
                <div className="mt-6">
                  <AmenityList amenities={property.amenities} />
                </div>
              </div>

              <Reveal>
                <h2 className="font-serif text-3xl font-semibold">Location</h2>
                <div className="relative mt-6 h-72 overflow-hidden rounded-3xl bg-sand">
                  <div aria-hidden className="bg-dots absolute inset-0" />
                  <svg aria-hidden className="absolute inset-0 h-full w-full text-stone-300" preserveAspectRatio="none" viewBox="0 0 400 200">
                    <path d="M0 140 C 80 120, 120 60, 200 80 S 320 150, 400 110" fill="none" stroke="currentColor" strokeWidth="6" />
                    <path d="M140 0 L 180 200" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M0 60 L 400 40" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" aria-hidden />
                    <span className="relative grid h-14 w-14 place-items-center rounded-full bg-ink text-gold shadow-xl">
                      <MapPin className="h-6 w-6" aria-hidden />
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(`${location.area}, ${location.city}, ${location.state}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink shadow-lg transition hover:bg-ink hover:text-white"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <ContactAgentForm agent={agent} property={property} />
              </Reveal>
            </aside>
          </section>

          <section className="bg-sand/50 py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">You may also like</p>
                  <h2 className="mt-3 font-serif text-4xl font-semibold">Similar properties</h2>
                </div>
                <Link to="/properties" className="text-sm font-bold text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-gold">
                  View all properties
                </Link>
              </Reveal>
              <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((p, i) => (
                  <Reveal as="li" key={p.id} delay={i * 0.1}>
                    <PropertyCard property={p} />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>

          <MobileContactBar property={property} agent={agent} />
        </>
      )}
    </PageTransition>
  )
}
