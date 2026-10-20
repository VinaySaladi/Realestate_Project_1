import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpDown,
  BedDouble,
  Building2,
  DollarSign,
  MapPin,
  Search,
  SearchX,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import PageHeader from '../components/layout/PageHeader'
import PropertyGrid from '../components/property/PropertyGrid'
import SelectField from '../components/ui/SelectField'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import { cities, properties } from '../data/properties'
import { bedroomOptions, priceRanges, propertyTypes, sortOptions, statusOptions } from '../data/filters'
import { filterProperties } from '../utils/filterProperties'
import { useSimulatedLoading } from '../hooks/useSimulatedLoading'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const PAGE_SIZE = 6
const FILTER_KEYS = ['q', 'status', 'type', 'city', 'price', 'beds']

const cityOptions = cities.map((c) => ({ value: c, label: c }))
const typeOptions = propertyTypes.map((t) => ({ value: t, label: t }))

export default function Properties() {
  useDocumentTitle('Properties')
  const [params, setParams] = useSearchParams()
  const loading = useSimulatedLoading(700)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // The URL is the single source of truth for filters, so results are shareable and survive refresh.
  const filters = useMemo(
    () => ({
      q: params.get('q') ?? '',
      status: params.get('status') ?? 'all',
      type: params.get('type') ?? '',
      city: params.get('city') ?? '',
      price: params.get('price') ?? '',
      beds: params.get('beds') ?? '',
      sort: params.get('sort') ?? 'newest',
    }),
    [params],
  )

  const results = useMemo(() => filterProperties(properties, filters), [filters])
  const shown = results.slice(0, visible)
  const priceOptions = filters.status === 'all' ? [] : priceRanges[filters.status]

  function update(key, value) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (!value || (key === 'status' && value === 'all') || (key === 'sort' && value === 'newest')) next.delete(key)
        else next.set(key, value)
        if (key === 'status') next.delete('price') // price bands depend on buy vs rent
        return next
      },
      { replace: true },
    )
    setVisible(PAGE_SIZE)
  }

  function clearAll() {
    setParams(filters.sort !== 'newest' ? { sort: filters.sort } : {}, { replace: true })
    setVisible(PAGE_SIZE)
  }

  function loadMore() {
    setLoadingMore(true)
    setTimeout(() => {
      setVisible((v) => v + PAGE_SIZE)
      setLoadingMore(false)
    }, 600)
  }

  // Chips for every active filter, each removable on its own.
  const activeChips = FILTER_KEYS.filter((k) => filters[k] && !(k === 'status' && filters[k] === 'all')).map((k) => {
    const value = filters[k]
    const label =
      k === 'q'
        ? `“${value}”`
        : k === 'status'
          ? statusOptions.find((o) => o.value === value)?.label
          : k === 'price'
            ? [...priceRanges.sale, ...priceRanges.rent].find((o) => o.value === value)?.label
            : k === 'beds'
              ? `${value}+ beds`
              : value
    return { key: k, label: label ?? value }
  })

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Our listings"
        title="Find your perfect property"
        description="Browse our complete portfolio of homes for sale and rent. Refine by location, type, price and more."
        image="photo-1600047509807-ba8f99d2cdde"
        breadcrumb="Properties"
      />

      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        {/* Filter panel */}
        <div className="rounded-3xl bg-white p-5 shadow-[0_24px_60px_-28px_rgba(12,18,32,0.35)] ring-1 ring-stone-200/60 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Search by name or location</span>
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
              <input
                type="search"
                value={filters.q}
                onChange={(e) => update('q', e.target.value)}
                placeholder="Search by property, neighbourhood or city…"
                className="w-full rounded-2xl border border-stone-200 bg-cream/60 py-3.5 pl-12 pr-4 text-base font-medium sm:text-sm text-ink placeholder:text-stone-400 outline-none transition focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15"
              />
            </label>

            <div role="radiogroup" aria-label="Listing type" className="flex rounded-2xl bg-cream p-1">
              {statusOptions.map((o) => {
                const active = filters.status === o.value
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => update('status', o.value)}
                    className={`relative flex-1 rounded-xl px-5 py-2.5 text-sm font-bold transition-colors lg:flex-none ${
                      active ? 'text-white' : 'text-stone-500 hover:text-ink'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="status-pill"
                        className="absolute inset-0 rounded-xl bg-ink"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">{o.label}</span>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              aria-expanded={showFilters}
              aria-controls="advanced-filters"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-200 px-5 py-3 text-sm font-bold text-ink transition hover:border-ink lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              {showFilters ? 'Hide filters' : 'More filters'}
            </button>
          </div>

          {/* Always visible on desktop; collapsible on mobile/tablet */}
          <div id="advanced-filters" className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="mt-5 grid gap-4 border-t border-stone-100 pt-5 sm:grid-cols-2 lg:grid-cols-5">
              <SelectField label="Location" icon={MapPin} value={filters.city} onChange={(v) => update('city', v)} options={cityOptions} placeholder="All cities" />
              <SelectField label="Property type" icon={Building2} value={filters.type} onChange={(v) => update('type', v)} options={typeOptions} placeholder="All types" />
              <SelectField
                label={filters.status === 'rent' ? 'Monthly rent' : 'Price'}
                icon={DollarSign}
                value={filters.price}
                onChange={(v) => update('price', v)}
                options={priceOptions}
                placeholder={filters.status === 'all' ? 'Choose Buy or Rent' : 'Any price'}
                disabled={filters.status === 'all'}
              />
              <SelectField label="Bedrooms" icon={BedDouble} value={filters.beds} onChange={(v) => update('beds', v)} options={bedroomOptions} placeholder="Any" />
              <SelectField label="Sort by" icon={ArrowUpDown} value={filters.sort} onChange={(v) => update('sort', v)} options={sortOptions} />
            </div>
          </div>
        </div>

        {/* Results bar */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500" aria-live="polite">
            {loading ? (
              'Loading properties…'
            ) : (
              <>
                <strong className="font-bold text-ink">{results.length}</strong> {results.length === 1 ? 'property' : 'properties'} found
              </>
            )}
          </p>

          <AnimatePresence>
            {activeChips.length > 0 && (
              <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap items-center gap-2">
                {activeChips.map((chip) => (
                  <motion.li key={chip.key} layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <button
                      type="button"
                      onClick={() => update(chip.key, '')}
                      aria-label={`Remove filter ${chip.label}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-ink-soft"
                    >
                      {chip.label} <X className="h-3 w-3" aria-hidden />
                    </button>
                  </motion.li>
                ))}
                <li>
                  <button type="button" onClick={clearAll} className="px-2 text-xs font-bold text-gold hover:text-ink">
                    Clear all
                  </button>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8">
          {!loading && results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No properties match your search"
              description="Try widening your price range, choosing a different city or removing a filter or two."
              action={
                <Button variant="dark" onClick={clearAll}>
                  Reset all filters
                </Button>
              }
            />
          ) : (
            <PropertyGrid properties={shown} loading={loading} />
          )}
        </div>

        {!loading && visible < results.length && (
          <div className="mt-14 flex flex-col items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Showing {shown.length} of {results.length}
            </p>
            <div className="h-1 w-48 overflow-hidden rounded-full bg-sand">
              <motion.div
                className="h-full bg-gold"
                animate={{ width: `${(shown.length / results.length) * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <Button
              variant="outline"
              onClick={loadMore}
              disabled={loadingMore}
              className="mt-3"
              iconLeft={loadingMore ? Spinner : undefined}
            >
              {loadingMore ? 'Loading…' : 'Load more properties'}
            </Button>
          </div>
        )}
      </section>
    </PageTransition>
  )
}
