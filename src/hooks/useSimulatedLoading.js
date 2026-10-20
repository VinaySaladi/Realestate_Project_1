import { useEffect, useState } from 'react'

/** Mimics an API round-trip on mount so skeleton loaders are visible. Swap for real fetching later. */
export function useSimulatedLoading(delay = 600) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(t)
  }, [delay])
  return loading
}
