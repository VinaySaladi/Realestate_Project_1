import { useId } from 'react'
import { ChevronDown } from 'lucide-react'

/** Compact labelled select used by the search bar and listing filters. */
export default function SelectField({ label, icon: Icon, value, onChange, options, placeholder, disabled, className = '' }) {
  const id = useId()
  return (
    <div className={`group relative ${className}`}>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
        {Icon && <Icon className="h-3.5 w-3.5 text-gold" aria-hidden />}
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full cursor-pointer appearance-none truncate rounded-xl border border-stone-200 bg-white py-3 pl-4 pr-10 text-base font-semibold sm:text-sm text-ink outline-none transition hover:border-stone-300 focus:border-gold focus:ring-4 focus:ring-gold/15 disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-400"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 transition group-focus-within:rotate-180 group-focus-within:text-gold"
        />
      </div>
    </div>
  )
}
