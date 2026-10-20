import { site } from '../../config/site'

export default function Logo({ className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <rect width="40" height="40" rx="11" className="fill-gold" />
        <path d="M9 21 20 11l11 10" fill="none" stroke="#0c1220" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 19v10h14V19" fill="none" stroke="#0c1220" strokeWidth="2.6" strokeLinejoin="round" />
        <rect x="18" y="23" width="4" height="6" rx="1" fill="#0c1220" />
      </svg>
      <span className="leading-none">
        <span className="block font-serif text-xl font-semibold tracking-tight">{site.shortName}</span>
        <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.35em] opacity-60">Estates</span>
      </span>
    </span>
  )
}
