export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim())

export const isPhone = (value) => /^\+?[\d\s()-]{7,20}$/.test(String(value).trim())

export const isBlank = (value) => String(value ?? '').trim() === ''
