import { useEffect, useState } from 'react'

// Simulates a short data fetch so skeleton states are visible.
export function useLoading(ms = 600) {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), ms); return () => clearTimeout(t) }, [ms])
  return loading
}
