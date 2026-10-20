import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { unsplash, unsplashSrcSet } from '../../utils/image'

/**
 * Responsive Unsplash image with a shimmering placeholder, fade-in on load and a graceful error state.
 * `className` styles the wrapper (size it there); `imgClassName` styles the <img> (e.g. hover zoom).
 */
export default function SmartImage({
  id,
  alt,
  sizes = '100vw',
  width = 1200,
  priority = false,
  className = '',
  imgClassName = '',
}) {
  // Status is stored per image id, so swapping `id` (e.g. in a gallery) starts from "loading" again.
  const [state, setState] = useState({ id, status: 'loading' })
  const status = state.id === id ? state.status : 'loading'
  const setStatus = (next) => setState({ id, status: next })

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {status === 'loading' && (
        <div aria-hidden className="absolute inset-0 animate-pulse bg-gradient-to-br from-sand via-stone-200 to-sand" />
      )}
      {status === 'error' ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sand to-stone-300 text-stone-400">
          <ImageOff className="h-8 w-8" aria-hidden />
          <span className="sr-only">{alt}</span>
        </div>
      ) : (
        <img
          src={unsplash(id, width)}
          srcSet={unsplashSrcSet(id)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}
