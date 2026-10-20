import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Phone, X } from 'lucide-react'
import { navLinks, site } from '../../config/site'
import { useFavorites } from '../../context/FavoritesContext'
import Button from '../ui/Button'
import Logo from './Logo'

// Pages that start with a dark image header, where the navbar can sit transparently on top.
const darkHeroRoutes = ['/', '/properties', '/about', '/contact', '/favorites']

export default function Navbar() {
  const { pathname } = useLocation()
  const { count } = useFavorites()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const overDarkHero = darkHeroRoutes.includes(pathname) && !scrolled
  const solid = !overDarkHero && !menuOpen
  const textColor = solid ? 'text-ink' : 'text-white'
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? 'bg-cream/85 py-3 shadow-[0_8px_30px_-12px_rgba(12,18,32,0.15)] backdrop-blur-xl' : 'bg-transparent py-5'
        }`}
      >
        <nav aria-label="Main" className={`mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 ${textColor}`}>
          <Link to="/" onClick={closeMenu} aria-label={`${site.name} home`}>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-semibold transition-opacity ${isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold"
                          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/favorites"
              onClick={closeMenu}
              aria-label={`Saved properties (${count})`}
              className={`relative grid h-11 w-11 place-items-center rounded-full transition ${
                solid ? 'hover:bg-ink/5' : 'hover:bg-white/10'
              }`}
            >
              <Heart className="h-5 w-5" aria-hidden />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Visibility lives on a wrapper: Button's own `inline-flex` would otherwise override `hidden`. */}
            <div className="hidden md:block">
              <Button to="/contact" variant={solid ? 'dark' : 'glass'} size="sm" iconLeft={Phone}>
                Contact agent
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className={`grid h-11 w-11 place-items-center rounded-full transition lg:hidden ${solid ? 'hover:bg-ink/5' : 'hover:bg-white/10'}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-28 text-white lg:hidden"
          >
            <div aria-hidden className="bg-dots-light absolute inset-0" />
            <div aria-hidden className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
              className="relative space-y-2"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.to}
                  variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } } }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block py-2 font-serif text-4xl font-semibold transition ${isActive ? 'text-gold' : 'text-white hover:text-gold'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative mt-auto space-y-4 border-t border-white/10 pt-8"
            >
              <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="block text-lg font-semibold">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block text-white/60">
                {site.email}
              </a>
              <Button to="/contact" onClick={closeMenu} variant="primary" className="mt-2 w-full">
                Talk to an agent
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
