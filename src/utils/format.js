const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('en-US')

export const formatCurrency = (value) => currency.format(value)
export const formatNumber = (value) => number.format(value)

export function formatPrice(property) {
  return formatCurrency(property.price)
}

export function priceSuffix(property) {
  return property.status === 'rent' ? '/month' : ''
}

export function statusLabel(status) {
  return status === 'rent' ? 'For Rent' : 'For Sale'
}
