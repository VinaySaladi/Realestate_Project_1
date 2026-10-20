import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'
import { testimonials } from '../../data/content'

const AUTOPLAY_MS = 7000

export default function Testimonials() {
  const [[index, direction], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)

  const go = useCallback((dir) => {
    setState(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir])
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, go, index])

  const current = testimonials[index]

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Testimonials" title="Words from our clients" />

        <Reveal
          className="relative rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_-30px_rgba(12,18,32,0.25)] ring-1 ring-stone-200/60 sm:p-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <Quote aria-hidden className="absolute right-8 top-8 h-20 w-20 text-sand sm:h-28 sm:w-28" />

          <div className="relative min-h-[260px] sm:min-h-[220px]" aria-live="polite">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex gap-1 text-gold" aria-label={`${current.rating} out of 5 stars`}>
                  {Array.from({ length: current.rating }, (_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-6 font-serif text-2xl leading-snug text-ink sm:text-3xl">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <SmartImage id={current.image} alt={current.name} width={160} sizes="56px" className="h-14 w-14 rounded-full" />
                  <div>
                    <p className="font-bold text-ink">{current.name}</p>
                    <p className="text-sm text-stone-500">{current.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={i === index}
                  className="relative h-2 overflow-hidden rounded-full bg-stone-200 transition-all duration-500"
                  style={{ width: i === index ? 40 : 8 }}
                >
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-gold"
                      initial={{ width: '0%' }}
                      animate={{ width: paused ? '0%' : '100%' }}
                      transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              {[
                { dir: -1, Icon: ChevronLeft, label: 'Previous testimonial' },
                { dir: 1, Icon: ChevronRight, label: 'Next testimonial' },
              ].map(({ dir, Icon, label }) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => go(dir)}
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-stone-200 text-ink transition hover:border-ink hover:bg-ink hover:text-white active:scale-90"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
