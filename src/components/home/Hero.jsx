import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import SmartImage from '../ui/SmartImage'
import SearchBar from '../property/SearchBar'
import { unsplash } from '../../utils/image'
import { testimonials } from '../../data/content'

const ease = [0.22, 1, 0.36, 1]
const HERO_IMAGE = 'photo-1600585154340-be6161a56a0c'

const lines = [
  { text: 'Find a home that', accent: false },
  { text: 'moves you.', accent: true },
]

export default function Hero() {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 800], [0, 200])
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.2])

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-white">
      {/* Background: slow zoom-out on load + parallax on scroll */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2.6, ease }}
        >
          <SmartImage id={HERO_IMAGE} alt="Modern luxury home at dusk" priority width={2000} className="h-full w-full" />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/90" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      <motion.div
        aria-hidden
        className="absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gold/15 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div style={{ opacity: contentOpacity }} className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-36 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-light backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          Luxury real estate since 2010
        </motion.p>

        <h1 className="mt-8 font-serif text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
          {lines.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-2">
              <motion.span
                className={`block ${line.accent ? 'italic text-gold-light' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 0.55 + i * 0.15 }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.95 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Discover a curated collection of exceptional villas, penthouses and family homes, guided by advisors who know every
          street, view and opportunity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.1 }}
          className="mt-10"
        >
          <SearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <div className="flex -space-x-3">
            {testimonials.map((t) => (
              <img
                key={t.name}
                src={unsplash(t.image, 96)}
                alt=""
                className="h-10 w-10 rounded-full object-cover ring-2 ring-ink"
                loading="lazy"
              />
            ))}
          </div>
          <div className="text-sm">
            <div className="flex items-center gap-1 text-gold" aria-label="Rated 4.9 out of 5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
              ))}
              <span className="ml-1 font-bold text-white">4.9</span>
            </div>
            <p className="text-white/60">Trusted by 12,000+ homeowners</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#featured"
        aria-label="Scroll to featured properties"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 2 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 md:flex"
      >
        Scroll
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  )
}
