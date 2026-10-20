import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import Modal from '../ui/Modal'
import SmartImage from '../ui/SmartImage'
import { unsplash } from '../../utils/image'

/** Bento-style gallery that opens a keyboard-navigable lightbox. */
export default function Gallery({ images, title }) {
  // `index` is kept after closing so the photo stays visible during the exit animation.
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const show = (i, dir = 1) => {
    setDirection(dir)
    setIndex(i)
    setOpen(true)
  }
  const close = useCallback(() => setOpen(false), [])
  const go = useCallback(
    (dir) => {
      setDirection(dir)
      setIndex((i) => (i + dir + images.length) % images.length)
    },
    [images.length],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go])

  const tiles = images.slice(0, 5)

  return (
    <>
      <div className="grid h-[52vh] min-h-[340px] grid-cols-4 grid-rows-2 gap-3 overflow-hidden rounded-3xl md:h-[64vh]">
        {tiles.map((id, i) => (
          <button
            key={id + i}
            type="button"
            onClick={() => show(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            className={`group relative overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              i === 0 ? 'col-span-4 row-span-2 md:col-span-2' : 'hidden md:block'
            }`}
          >
            <SmartImage
              id={id}
              alt={`${title}, photo ${i + 1}`}
              priority={i === 0}
              width={i === 0 ? 1600 : 800}
              sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '25vw'}
              className="h-full w-full"
              imgClassName="group-hover:scale-105"
            />
            <span aria-hidden className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => show(0)}
        className="relative z-10 -mt-16 ml-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-ink shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
      >
        <Images className="h-4 w-4" aria-hidden /> View all {images.length} photos
      </button>

      <Modal open={open} onClose={close} label={`${title} photo gallery`} className="w-full max-w-6xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-white">
              <p className="text-sm font-semibold text-white/70">
                {index + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:rotate-90 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-soft">
              <AnimatePresence initial={false}>
                <motion.img
                  key={images[index]}
                  src={unsplash(images[index], 1800, 80)}
                  alt={`${title}, photo ${index + 1}`}
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -80 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {[
                { dir: -1, Icon: ChevronLeft, label: 'Previous photo', pos: 'left-3' },
                { dir: 1, Icon: ChevronRight, label: 'Next photo', pos: 'right-3' },
              ].map(({ dir, Icon, label, pos }) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => go(dir)}
                  aria-label={label}
                  className={`absolute ${pos} top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:scale-110 hover:bg-white`}
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((id, i) => (
                <button
                  key={id + i}
                  type="button"
                  onClick={() => show(i, i > index ? 1 : -1)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === index}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg transition ${
                    i === index ? 'ring-2 ring-gold' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={unsplash(id, 200)} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
      </Modal>
    </>
  )
}
