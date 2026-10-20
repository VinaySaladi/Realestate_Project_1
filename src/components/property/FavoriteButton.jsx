import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useFavorites } from '../../context/FavoritesContext'

const styles = {
  overlay: {
    on: 'bg-white text-rose-500 shadow-lg',
    off: 'bg-ink/30 text-white backdrop-blur-md hover:bg-white hover:text-rose-500',
  },
  light: {
    on: 'border border-rose-200 bg-rose-50 text-rose-500',
    off: 'border border-stone-200 bg-white text-ink hover:border-rose-200 hover:text-rose-500',
  },
}

export default function FavoriteButton({ propertyId, title, variant = 'overlay', className = '' }) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(propertyId)

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(propertyId)
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${title} from favorites` : `Save ${title} to favorites`}
      className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-300 ${
        active ? styles[variant].on : styles[variant].off
      } ${className}`}
    >
      <motion.span
        key={active ? 'on' : 'off'}
        initial={{ scale: active ? 0.3 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 12 }}
        className="grid place-items-center"
      >
        <Heart className={`h-5 w-5 ${active ? 'fill-current' : ''}`} aria-hidden />
      </motion.span>
    </motion.button>
  )
}
