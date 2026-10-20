import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CircleCheck, Mail, MapPin, Phone } from 'lucide-react'
import { navLinks, site } from '../../config/site'
import { propertyTypes } from '../../data/filters'
import { isEmail } from '../../utils/validation'
import SocialIcon from '../ui/SocialIcon'
import Logo from './Logo'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!isEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setDone(true)
    setEmail('')
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {done ? (
        <motion.p
          key="done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-emerald-300"
          role="status"
        >
          <CircleCheck className="h-5 w-5" aria-hidden /> You&apos;re subscribed. Welcome aboard!
        </motion.p>
      ) : (
        <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit} noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="flex rounded-full border border-white/15 bg-white/5 p-1.5 transition focus-within:border-gold">
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-invalid={!!error}
              aria-describedby={error ? 'newsletter-error' : undefined}
              className="min-w-0 flex-1 bg-transparent px-4 text-base sm:text-sm text-white placeholder:text-white/40 outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-ink transition hover:scale-105 hover:bg-gold-light"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {error && (
            <p id="newsletter-error" className="mt-2 pl-4 text-xs text-rose-300">
              {error}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export default function Footer() {
  const columns = [
    { title: 'Explore', links: [...navLinks, { label: 'Saved homes', to: '/favorites' }] },
    {
      title: 'Property types',
      links: propertyTypes.map((t) => ({ label: `${t}s`, to: `/properties?type=${t}` })),
    },
  ]
  const hq = site.offices[0]

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="bg-dots-light absolute inset-0" />
      <div aria-hidden className="absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Link to="/" aria-label={`${site.name} home`}>
              <Logo />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              {site.tagline} Luxury homes, villas and penthouses across America&apos;s most desirable cities.
            </p>
            <ul className="mt-8 flex gap-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{col.title}</h2>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white">
                      <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" aria-hidden />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Stay in the loop</h2>
            <p className="mt-6 text-sm text-white/55">New listings and market insights, once a month. No spam.</p>
            <div className="mt-5">
              <Newsletter />
            </div>
            <ul className="mt-8 space-y-3 text-sm text-white/65">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                {hq.address}
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="flex gap-3 transition hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex gap-3 transition hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden /> {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Listings shown are for demonstration purposes.</p>
        </div>
      </div>
    </footer>
  )
}
