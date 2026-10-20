import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import Button from '../ui/Button'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'

export default function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-center text-white sm:px-16 sm:py-28">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <SmartImage id="photo-1613490493576-7fde63acd811" alt="" width={1600} className="h-full w-full" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/75 to-ink/50" />
        <div aria-hidden className="absolute -bottom-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Let&apos;s begin</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-6xl">
            Ready to find your <em className="text-gold-light">dream home?</em>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-white/70 sm:text-lg">
            Book a private consultation and let our advisors curate a shortlist tailored to your lifestyle.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button to="/properties" variant="primary" size="lg" icon={ArrowRight}>
              Browse properties
            </Button>
            <Button to="/contact" variant="glass" size="lg" iconLeft={Phone}>
              Talk to an agent
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
