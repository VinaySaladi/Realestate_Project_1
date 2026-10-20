export function parseRange(value) {
  if (!value) return [null, null]
  const [min, max] = value.split('-')
  return [min ? Number(min) : null, max ? Number(max) : null]
}

const sorters = {
  newest: (a, b) => new Date(b.listedAt) - new Date(a.listedAt),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'area-desc': (a, b) => b.area - a.area,
}

/** Applies the filters held in the URL to a list of properties. */
export function filterProperties(list, { q, status, type, city, price, beds, sort }) {
  const query = q?.trim().toLowerCase()
  const [min, max] = parseRange(price)

  const result = list.filter((p) => {
    if (status && status !== 'all' && p.status !== status) return false
    if (type && p.type !== type) return false
    if (city && p.location.city !== city) return false
    if (beds && p.beds < Number(beds)) return false
    if (min !== null && p.price < min) return false
    if (max !== null && p.price > max) return false
    if (query) {
      const haystack = `${p.title} ${p.type} ${p.location.area} ${p.location.city} ${p.location.state}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })

  return result.sort(sorters[sort] ?? sorters.newest)
}
