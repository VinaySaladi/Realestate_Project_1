import { motion } from 'framer-motion'
import { ArrowLeft, Search } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import Button from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound({
  title = 'Page not found',
  message = 'The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.',
}) {
  useDocumentTitle(title)
  return (
    <PageTransition>
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 pb-20 pt-36 text-center">
        <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
        <div className="relative max-w-xl">
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="font-serif text-[8rem] font-semibold leading-none text-gold sm:text-[11rem]"
            aria-hidden
          >
            404
          </motion.p>
          <h1 className="mt-4 font-serif text-4xl font-semibold">{title}</h1>
          <p className="mt-4 text-stone-500">{message}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button to="/" variant="dark" iconLeft={ArrowLeft}>
              Back to home
            </Button>
            <Button to="/properties" variant="outline" iconLeft={Search}>
              Browse properties
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
