import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import SmartImage from '../ui/SmartImage'

const ease = [0.22, 1, 0.36, 1]

/** Dark image banner used at the top of inner pages. */
export default function PageHeader({ eyebrow, title, description, image, breadcrumb, children }) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-40 text-white sm:pb-24 sm:pt-48">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <SmartImage id={image} alt="" priority width={2000} className="h-full w-full" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
            <li>
              <Link to="/" className="transition hover:text-gold">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="text-gold">
              {breadcrumb ?? title}
            </li>
          </ol>
        </motion.nav>

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-gold"
          >
            {eyebrow}
          </motion.p>
        )}

        <h1 className="mt-4 max-w-3xl overflow-hidden font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <motion.span
            className="block"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
          >
            {title}
          </motion.span>
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {description}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  )
}
