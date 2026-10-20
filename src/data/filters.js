export const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'sale', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
]

export const propertyTypes = ['Villa', 'House', 'Apartment', 'Penthouse', 'Townhouse', 'Loft']

// Range values are encoded as "min-max" strings so they fit neatly in the URL.
export const priceRanges = {
  sale: [
    { value: '0-1000000', label: 'Under $1M' },
    { value: '1000000-3000000', label: '$1M – $3M' },
    { value: '3000000-6000000', label: '$3M – $6M' },
    { value: '6000000-', label: '$6M+' },
  ],
  rent: [
    { value: '0-5000', label: 'Under $5k/mo' },
    { value: '5000-10000', label: '$5k – $10k/mo' },
    { value: '10000-20000', label: '$10k – $20k/mo' },
    { value: '20000-', label: '$20k+/mo' },
  ],
}

export const bedroomOptions = [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n}+ Beds` }))

export const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'area-desc', label: 'Largest first' },
]
