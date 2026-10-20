// All imagery is served from Unsplash's CDN, resized and compressed on the fly.
const BASE = 'https://images.unsplash.com/'
const WIDTHS = [480, 800, 1200, 1600, 2000]

export function unsplash(id, width = 1200, quality = 75) {
  return `${BASE}${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export function unsplashSrcSet(id, maxWidth = 2000) {
  return WIDTHS.filter((w) => w <= maxWidth)
    .map((w) => `${unsplash(id, w)} ${w}w`)
    .join(', ')
}
