import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-gold text-ink hover:bg-gold-light shadow-lg shadow-gold/25 hover:shadow-gold/40',
  dark: 'bg-ink text-white hover:bg-ink-soft shadow-lg shadow-ink/20',
  outline: 'border border-ink/15 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white',
  glass: 'border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-ink',
  light: 'bg-white text-ink hover:bg-cream shadow-lg shadow-black/10',
}

const sizes = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-7 text-sm',
  lg: 'h-14 px-9 text-base',
}

/**
 * Renders a <Link> when `to` is set, an <a> when `href` is set, otherwise a <button>.
 * `icon` is a lucide component shown after the label; it nudges right on hover.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconLeft: IconLeft,
  className = '',
  children,
  ...props
}) {
  const classes = `group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {/* light sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      {IconLeft && <IconLeft className="relative h-4 w-4" aria-hidden />}
      <span className="relative">{children}</span>
      {Icon && (
        <Icon className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
