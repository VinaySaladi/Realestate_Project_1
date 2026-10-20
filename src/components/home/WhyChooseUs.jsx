import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import StatsBand from './StatsBand'
import { features } from '../../data/content'

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div aria-hidden className="bg-dots-light absolute inset-0" />
      <motion.div
        aria-hidden
        className="absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image collage */}
          <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="grid grid-cols-5 gap-4">
              <SmartImage
                id="photo-1600607687939-ce8a6c25118c"
                alt="Bright open-plan living room"
                width={900}
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="col-span-3 aspect-[3/4] rounded-3xl"
              />
              <div className="col-span-2 flex flex-col gap-4 pt-16">
                <SmartImage
                  id="photo-1600566753190-17f0baa2a6c3"
                  alt="Designer kitchen with island"
                  width={600}
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="aspect-square rounded-3xl"
                />
                <SmartImage
                  id="photo-1616594039964-ae9021a400a0"
                  alt="Serene master bedroom"
                  width={600}
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="aspect-[4/5] rounded-3xl"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.4 }}
              className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold text-ink">
                <BadgeCheck className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <p className="font-serif text-2xl font-semibold">Top 1%</p>
                <p className="text-xs text-white/60">Luxury brokerage nationwide</p>
              </div>
            </motion.div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="Why choose us"
              title={
                <>
                  More than an agency, <em className="text-gold">your advocate</em>
                </>
              }
              description="For over fifteen years we have helped discerning clients buy, sell and rent extraordinary homes with discretion and care."
            />

            <ul className="-mt-4 grid gap-6 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, text }, i) => (
                <Reveal
                  as="li"
                  key={title}
                  delay={i * 0.1}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.06]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold group-hover:text-ink">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{text}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3} className="mt-10">
              <Button to="/about" variant="primary" icon={ArrowRight}>
                Discover our story
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 border-t border-white/10 pt-16">
          <StatsBand tone="dark" />
        </div>
      </div>
    </section>
  )
}
