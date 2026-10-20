import { AnimatePresence, motion } from 'framer-motion'
import PropertyCard from './PropertyCard'

function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-stone-200/60" aria-hidden>
      <div className="aspect-[4/3] animate-pulse bg-sand" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-20 animate-pulse rounded-full bg-sand" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-sand" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-sand" />
        <div className="flex justify-between border-t border-stone-100 pt-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-4 w-16 animate-pulse rounded-full bg-sand" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PropertyGrid({ properties, loading = false, skeletonCount = 6 }) {
  if (loading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading properties">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <motion.ul layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {properties.map((property, i) => (
          <motion.li
            key={property.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
          >
            <PropertyCard property={property} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}
