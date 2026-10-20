import { motion } from 'framer-motion'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import PageHeader from '../components/layout/PageHeader'
import SectionHeading from '../components/ui/SectionHeading'
import SmartImage from '../components/ui/SmartImage'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import StatsBand from '../components/home/StatsBand'
import Testimonials from '../components/home/Testimonials'
import CallToAction from '../components/home/CallToAction'
import { agents } from '../data/agents'
import { missionVision } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function TeamCard({ member }) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
        <SmartImage
          id={member.image}
          alt={member.name}
          width={600}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full"
          imgClassName="grayscale-[30%] group-hover:scale-105 group-hover:grayscale-0"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-4 bottom-4 flex translate-y-4 gap-2 opacity-0 transition-all duration-500 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href={`tel:${member.phone.replace(/[^\d+]/g, '')}`}
            aria-label={`Call ${member.name}`}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition hover:bg-gold"
          >
            <Phone className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition hover:bg-gold"
          >
            <Mail className="h-4 w-4" aria-hidden />
          </a>
          <span className="ml-auto self-center rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            {member.sold}+ sold
          </span>
        </div>
      </div>
      <h3 className="mt-5 font-serif text-xl font-semibold">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold text-gold">{member.role}</p>
      <p className="mt-2 text-sm leading-relaxed text-stone-500">{member.bio}</p>
    </article>
  )
}

export default function About() {
  useDocumentTitle('About us')
  return (
    <PageTransition>
      <PageHeader
        eyebrow="About Aurelia"
        title="A legacy built on trust"
        description="Since 2010 we have paired remarkable homes with the people who love them, one thoughtful introduction at a time."
        image="photo-1600210492486-724fe5c67fb0"
        breadcrumb="About"
      />

      {/* Introduction */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2">
        <Reveal className="relative">
          <SmartImage
            id="photo-1600596542815-ffad4c1539a9"
            alt="A modern home represented by Aurelia Estates"
            width={1000}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/5] rounded-[2rem]"
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 -right-4 rounded-3xl bg-ink p-8 text-white shadow-2xl sm:-right-8"
          >
            <p className="font-serif text-6xl font-semibold text-gold">15</p>
            <p className="mt-1 text-sm font-semibold text-white/70">
              Years of
              <br />
              excellence
            </p>
          </motion.div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Who we are"
            title={
              <>
                Real estate, <em className="text-gold">reimagined</em> around you
              </>
            }
          />
          <Reveal className="-mt-6 space-y-5 text-base leading-relaxed text-stone-600 sm:text-lg">
            <p>
              Aurelia Estates began as a two-person boutique in West Hollywood with one simple belief: buying or selling a home
              should feel personal, not transactional.
            </p>
            <p>
              Today our team of advisors spans Los Angeles, New York, Miami and beyond, yet that founding belief still guides
              every introduction, viewing and negotiation we lead.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <Button to="/contact" variant="dark" icon={ArrowRight}>
              Work with us
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-sand/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="What drives us" title="Mission, vision & promise" />
          <ul className="grid gap-6 md:grid-cols-3">
            {missionVision.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                as="li"
                key={title}
                delay={i * 0.12}
                className="group relative overflow-hidden rounded-3xl bg-white p-10 ring-1 ring-stone-200/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(12,18,32,0.35)]"
              >
                <span aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 transition-transform duration-700 group-hover:scale-[2.5]" />
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-ink text-gold">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="relative mt-8 font-serif text-2xl font-semibold">{title}</h3>
                <p className="relative mt-4 leading-relaxed text-stone-600">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <StatsBand tone="dark" />
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          eyebrow="Our team"
          title="Meet the advisors"
          description="Local experts with global reach, each dedicated to finding the right home for every client."
        />
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((member, i) => (
            <Reveal as="li" key={member.id} delay={i * 0.1}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </ul>
      </section>

      <div className="bg-sand/40">
        <Testimonials />
      </div>
      <div className="pt-24 sm:pt-32">
        <CallToAction />
      </div>
    </PageTransition>
  )
}
