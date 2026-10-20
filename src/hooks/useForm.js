import { useState } from 'react'

/**
 * Small form helper: controlled values, validation on blur/submit, and a submit status.
 * `validate(values)` returns an object of { fieldName: 'error message' }.
 */
export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    const next = { ...values, [name]: type === 'checkbox' ? checked : value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
  }

  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = (onValid) => async (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])))

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      e.currentTarget.elements.namedItem(firstInvalid)?.focus()
      return
    }

    setStatus('submitting')
    await onValid(values)
    setStatus('success')
  }

  function reset() {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  /** Spread onto an input: <input {...field('email')} /> */
  function field(name) {
    return {
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched[name] ? errors[name] : undefined,
    }
  }

  return { values, status, field, handleSubmit, reset }
}

// Simulates a network request so loading and success states can be shown.
export const fakeRequest = (ms = 1200) => new Promise((resolve) => setTimeout(resolve, ms))
