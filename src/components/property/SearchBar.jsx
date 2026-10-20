import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BedDouble, Building2, DollarSign, MapPin, Search, Sparkles } from 'lucide-react'
import SelectField from '../ui/SelectField'
import Button from '../ui/Button'
import { cities } from '../../data/properties'
import { bedroomOptions, priceRanges, propertyTypes } from '../../data/filters'

const tabs = [
  { id: 'sale', label: 'Buy' },
  { id: 'rent', label: 'Rent' },
  { id: 'sell', label: 'Sell' },
]

const cityOptions = cities.map((c) => ({ value: c, label: c }))
const typeOptions = propertyTypes.map((t) => ({ value: t, label: t }))

export default function SearchBar() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('sale')
  const [filters, setFilters] = useState({ city: '', type: '', price: '', beds: '' })

  const set = (key) => (value) => setFilters((f) => ({ ...f, [key]: value }))

  function changeTab(next) {
    setTab(next)
    setFilters((f) => ({ ...f, price: '' })) // price bands differ between buying and renting
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (tab === 'sell') {
      const params = new URLSearchParams({ subject: 'selling' })
      if (filters.city) params.set('city', filters.city)
      if (filters.type) params.set('type', filters.type)
      navigate(`/contact?${params}`)
      return
    }
    const params = new URLSearchParams({ status: tab })
    Object.entries(filters).forEach(([k, v]) => v && params.set(k, v))
    navigate(`/properties?${params}`)
  }

  return (
    <div className="w-full max-w-5xl">
      <div role="tablist" aria-label="Search mode" className="inline-flex gap-1 rounded-t-2xl bg-white/10 p-1.5 backdrop-blur-xl">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => changeTab(t.id)}
            className={`relative rounded-xl px-6 py-2.5 text-sm font-bold transition-colors ${
              tab === t.id ? 'text-ink' : 'text-white/80 hover:text-white'
            }`}
          >
            {tab === t.id && (
              <motion.span
                layoutId="search-tab"
                className="absolute inset-0 rounded-xl bg-white"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-b-3xl rounded-tr-3xl bg-white/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab === 'sell' ? 'sell' : 'search'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`grid gap-4 sm:grid-cols-2 ${tab === 'sell' ? 'lg:grid-cols-[1fr_1fr_auto]' : 'lg:grid-cols-[1fr_1fr_1fr_1fr_auto]'} lg:items-end`}
          >
            <SelectField label="Location" icon={MapPin} value={filters.city} onChange={set('city')} options={cityOptions} placeholder="Any city" />
            <SelectField label="Property type" icon={Building2} value={filters.type} onChange={set('type')} options={typeOptions} placeholder="Any type" />

            {tab !== 'sell' && (
              <>
                <SelectField
                  label={tab === 'rent' ? 'Monthly rent' : 'Price range'}
                  icon={DollarSign}
                  value={filters.price}
                  onChange={set('price')}
                  options={priceRanges[tab]}
                  placeholder="Any price"
                />
                <SelectField label="Bedrooms" icon={BedDouble} value={filters.beds} onChange={set('beds')} options={bedroomOptions} placeholder="Any" />
              </>
            )}

            <Button
              type="submit"
              variant="dark"
              iconLeft={tab === 'sell' ? Sparkles : Search}
              className="w-full sm:col-span-2 lg:col-span-1 lg:w-auto"
            >
              {tab === 'sell' ? 'Free valuation' : 'Search'}
            </Button>
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  )
}
