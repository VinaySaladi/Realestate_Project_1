import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheck, Mail, Phone, Send } from 'lucide-react'
import FormField from '../ui/FormField'
import Spinner from '../ui/Spinner'
import Button from '../ui/Button'
import SmartImage from '../ui/SmartImage'
import { fakeRequest, useForm } from '../../hooks/useForm'
import { isBlank, isEmail, isPhone } from '../../utils/validation'

function validate(v) {
  const errors = {}
  if (isBlank(v.name)) errors.name = 'Please enter your name.'
  if (isBlank(v.email)) errors.email = 'Please enter your email.'
  else if (!isEmail(v.email)) errors.email = 'Please enter a valid email address.'
  if (!isBlank(v.phone) && !isPhone(v.phone)) errors.phone = 'Please enter a valid phone number.'
  if (v.message.trim().length < 10) errors.message = 'Your message should be at least 10 characters.'
  return errors
}

export default function ContactAgentForm({ agent, property }) {
  const { status, field, handleSubmit, reset } = useForm(
    {
      name: '',
      email: '',
      phone: '',
      message: `Hi ${agent.name.split(' ')[0]}, I'm interested in ${property.title} and would like to arrange a viewing.`,
    },
    validate,
  )

  return (
    <div
      id="contact-agent"
      className="scroll-mt-24 overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-24px_rgba(12,18,32,0.3)] ring-1 ring-stone-200/70"
    >
      <div className="relative flex items-center gap-4 overflow-hidden bg-ink p-5 text-white sm:p-6">
        <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/20 blur-2xl" />
        <SmartImage
          id={agent.image}
          alt={agent.name}
          width={200}
          sizes="64px"
          className="h-14 w-14 shrink-0 rounded-2xl ring-2 ring-gold/60 sm:h-16 sm:w-16"
        />
        <div className="relative min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]">Listing agent</p>
          <p className="mt-1 font-serif text-lg font-semibold leading-tight sm:text-xl">{agent.name}</p>
          <p className="mt-0.5 text-xs leading-snug text-white/60 sm:text-sm">{agent.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-b border-stone-100 p-4 text-sm font-bold sm:p-5">
        <a
          href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-cream py-3 text-ink transition hover:bg-sand active:scale-[0.97]"
        >
          <Phone className="h-4 w-4 text-gold" aria-hidden /> Call
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-cream py-3 text-ink transition hover:bg-sand active:scale-[0.97]"
        >
          <Mail className="h-4 w-4 text-gold" aria-hidden /> Email
        </a>
      </div>

      <div className="p-5 sm:p-6">
        <AnimatePresence mode="wait" initial={false}>
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-8 text-center"
              role="status"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-500"
              >
                <CircleCheck className="h-8 w-8" aria-hidden />
              </motion.span>
              <h3 className="mt-5 font-serif text-2xl font-semibold">Message sent</h3>
              <p className="mt-2 text-sm text-stone-500">
                {agent.name.split(' ')[0]} will get back to you within 24 hours.
              </p>
              <button type="button" onClick={reset} className="mt-6 text-sm font-bold text-gold hover:text-ink">
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              noValidate
              onSubmit={handleSubmit(() => fakeRequest())}
              className="space-y-4"
              aria-label={`Contact ${agent.name}`}
            >
              <div>
                <h3 className="font-serif text-xl font-semibold">Schedule a viewing</h3>
                <p className="mt-1 text-xs text-stone-500">Usually replies within a few hours.</p>
              </div>
              <FormField label="Full name" required autoComplete="name" placeholder="Jane Doe" {...field('name')} />
              {/* Side by side when the card is full-width (tablet); stacked on phones and in the desktop sidebar */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <FormField label="Email" type="email" required autoComplete="email" placeholder="jane@email.com" {...field('email')} />
                <FormField label="Phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" {...field('phone')} />
              </div>
              <FormField label="Message" as="textarea" rows={4} required {...field('message')} />
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={status === 'submitting'}
                iconLeft={status === 'submitting' ? Spinner : Send}
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
