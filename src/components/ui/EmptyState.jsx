import { motion } from 'framer-motion'

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center rounded-3xl border border-dashed border-stone-300 bg-white/60 px-6 py-20 text-center"
    >
      {Icon && (
        <span className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-sand text-gold">
          <Icon className="h-7 w-7" aria-hidden />
        </span>
      )}
      <h3 className="font-serif text-2xl font-semibold text-ink">{title}</h3>
      {description && <p className="mt-3 max-w-md text-stone-500">{description}</p>}
      {action && <div className="mt-8">{action}</div>}
    </motion.div>
  )
}
