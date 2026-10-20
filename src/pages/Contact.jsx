import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheck, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import PageHeader from '../components/layout/PageHeader'
import FormField from '../components/ui/FormField'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import Reveal from '../components/ui/Reveal'
import SocialIcon from '../components/ui/SocialIcon'
import { site } from '../config/site'
import { fakeRequest, useForm } from '../hooks/useForm'
import { isBlank, isEmail, isPhone } from '../utils/validation'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const subjects = [
  { value: '', label: 'Select a topic' },
  { value: 'buying', label: 'I want to buy' },
  { value: 'renting', label: 'I want to rent' },
  { value: 'selling', label: 'I want to sell / get a valuation' },
  { value: 'other', label: 'Something else' },
]

function validate(v) {
  const errors = {}
  if (isBlank(v.name)) errors.name = 'Please enter your name.'
  if (isBlank(v.email)) errors.email = 'Please enter your email.'
  else if (!isEmail(v.email)) errors.email = 'Please enter a valid email address.'
  if (!isBlank(v.phone) && !isPhone(v.phone)) errors.phone = 'Please enter a valid phone number.'
  if (!v.subject) errors.subject = 'Please choose a topic.'
  if (v.message.trim().length < 20) errors.message = 'Please tell us a little more (at least 20 characters).'
  if (!v.consent) errors.consent = 'Please agree so we can contact you.'
  return errors
}

const contactCards = [
  { icon: Phone, label: 'Call us', value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, '')}` },
  { icon: Mail, label: 'Email us', value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: 'Office hours', value: site.hours },
]

function ContactCard({ icon: Icon, label, value, href }) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag
      href={href}
      className="group flex h-full items-center gap-4 rounded-2xl bg-white p-6 shadow-[0_20px_50px_-25px_rgba(12,18,32,0.35)] ring-1 ring-stone-200/60 transition hover:-translate-y-1"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-ink">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span>
        <span className="block text-xs font-bold uppercase tracking-wider text-stone-400">{label}</span>
        <span className="mt-1 block font-bold text-ink">{value}</span>
      </span>
    </Tag>
  )
}

function ContactForm() {
  const [params] = useSearchParams()
  const presetSubject = subjects.some((s) => s.value === params.get('subject')) ? params.get('subject') : ''
  const city = params.get('city')
  const type = params.get('type')
  const presetMessage =
    presetSubject === 'selling' && (city || type)
      ? `I'd like a free valuation for my ${type ? type.toLowerCase() : 'property'}${city ? ` in ${city}` : ''}.`
      : ''

  const { status, field, handleSubmit, reset } = useForm(
    { name: '', email: '', phone: '', subject: presetSubject, message: presetMessage, consent: false },
    validate,
  )

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-[0_30px_80px_-30px_rgba(12,18,32,0.3)] ring-1 ring-stone-200/60 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-16 text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
              className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-500"
            >
              <CircleCheck className="h-10 w-10" aria-hidden />
            </motion.span>
            <h2 className="mt-6 font-serif text-3xl font-semibold">Thank you!</h2>
            <p className="mt-3 max-w-sm text-stone-500">
              Your message is on its way. One of our advisors will be in touch within one business day.
            </p>
            <Button variant="outline" onClick={reset} className="mt-8">
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            noValidate
            onSubmit={handleSubmit(() => fakeRequest())}
            aria-label="Contact form"
          >
            <h2 className="font-serif text-3xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-stone-500">Fields marked * are required.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <FormField label="Full name" required autoComplete="name" placeholder="Jane Doe" {...field('name')} />
              <FormField label="Email" type="email" required autoComplete="email" placeholder="jane@email.com" {...field('email')} />
              <FormField label="Phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" {...field('phone')} />
              <FormField label="Topic" as="select" required options={subjects} {...field('subject')} />
              <FormField
                label="Message"
                as="textarea"
                required
                placeholder="Tell us about the home you're looking for, or the one you'd like to sell…"
                className="sm:col-span-2"
                {...field('message')}
              />
              <FormField
                as="checkbox"
                label="I agree to be contacted by Aurelia Estates about my enquiry."
                className="sm:col-span-2"
                {...field('consent')}
              />
            </div>

            <Button
              type="submit"
              variant="dark"
              size="lg"
              className="mt-8 w-full sm:w-auto"
              disabled={status === 'submitting'}
              iconLeft={status === 'submitting' ? Spinner : Send}
            >
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  useDocumentTitle('Contact')
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Get in touch"
        title="Let’s talk about your next move"
        description="Whether you’re buying, selling or renting, our advisors are ready to help. Expect a reply within one business day."
        image="photo-1600566753190-17f0baa2a6c3"
        breadcrumb="Contact"
      />

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <ul className="-mt-40 mb-20 grid gap-5 sm:-mt-44 md:grid-cols-3">
          {contactCards.map(({ icon: Icon, label, value, href }, i) => (
            <Reveal as="li" key={label} delay={i * 0.1} className="relative z-10">
              <ContactCard icon={Icon} label={label} value={value} href={href} />
            </Reveal>
          ))}
        </ul>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-10">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Our offices</p>
              <ul className="mt-6 space-y-4">
                {site.offices.map((o) => (
                  <li key={o.city} className="rounded-2xl border border-stone-200 bg-white/70 p-6 transition hover:border-gold/50 hover:bg-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-400">{o.label}</p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold">{o.city}</h3>
                    <p className="mt-3 flex gap-2 text-sm text-stone-600">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                      {o.address}
                    </p>
                    <a href={`tel:${o.phone.replace(/[^\d+]/g, '')}`} className="mt-2 flex gap-2 text-sm font-semibold text-ink hover:text-gold">
                      <Phone className="h-4 w-4 text-gold" aria-hidden />
                      {o.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Follow us</p>
              <ul className="mt-5 flex gap-3">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-12 w-12 place-items-center rounded-full border border-stone-200 bg-white text-ink transition hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-white"
                    >
                      <SocialIcon name={s.icon} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>

        {/* Map placeholder */}
        <Reveal className="relative mt-20 h-96 overflow-hidden rounded-[2rem] bg-ink">
          <div aria-hidden className="bg-dots-light absolute inset-0" />
          <svg aria-hidden className="absolute inset-0 h-full w-full text-white/10" preserveAspectRatio="none" viewBox="0 0 800 300">
            <path d="M0 220 C 150 180, 250 80, 400 120 S 650 260, 800 180" fill="none" stroke="currentColor" strokeWidth="10" />
            <path d="M260 0 L 330 300" fill="none" stroke="currentColor" strokeWidth="6" />
            <path d="M0 90 L 800 60" fill="none" stroke="currentColor" strokeWidth="5" />
            <path d="M560 0 L 520 300" fill="none" stroke="currentColor" strokeWidth="4" />
          </svg>
          {[
            { left: '22%', top: '55%' },
            { left: '58%', top: '30%' },
            { left: '76%', top: '62%' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={pos}
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 + i * 0.15 }}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" aria-hidden />
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gold text-ink shadow-xl">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
            </motion.div>
          ))}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md">
              Offices in {site.offices.map((o) => o.city).join(' · ')}
            </p>
            <Button
              href={`https://www.google.com/maps/search/${encodeURIComponent(site.offices[0].address)}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              size="sm"
            >
              Open in Google Maps
            </Button>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
