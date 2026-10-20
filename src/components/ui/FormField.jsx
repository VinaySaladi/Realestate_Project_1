import { useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const control =
  'w-full rounded-xl border bg-white px-4 py-3.5 text-base text-ink placeholder:text-stone-400 sm:text-sm outline-none transition duration-200 focus:border-gold focus:ring-4 focus:ring-gold/15'

/**
 * Labelled input / textarea / select / checkbox with an animated, screen-reader-linked error.
 * Pass the result of `field('name')` from useForm straight in.
 */
export default function FormField({ label, as = 'input', options = [], error, required, className = '', ...props }) {
  const uid = useId()
  const id = `${uid}-${props.name}`
  const errorId = `${id}-error`
  const a11y = { id, 'aria-invalid': !!error, 'aria-describedby': error ? errorId : undefined, required }
  const border = error ? 'border-rose-400' : 'border-stone-200 hover:border-stone-300'

  const message = (
    <AnimatePresence>
      {error && (
        <motion.p
          id={errorId}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1.5 text-xs font-medium text-rose-500"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  )

  if (as === 'checkbox') {
    const { value, ...rest } = props
    return (
      <div className={className}>
        <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-stone-600">
          <input
            type="checkbox"
            checked={!!value}
            {...rest}
            {...a11y}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-stone-300 accent-gold"
          />
          <span>{label}</span>
        </label>
        {message}
      </div>
    )
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      {as === 'textarea' ? (
        <textarea rows={5} {...props} {...a11y} className={`${control} ${border} resize-none`} />
      ) : as === 'select' ? (
        <div className="relative">
          <select {...props} {...a11y} className={`${control} ${border} cursor-pointer appearance-none pr-10`}>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        </div>
      ) : (
        <input {...props} {...a11y} className={`${control} ${border}`} />
      )}
      {message}
    </div>
  )
}
