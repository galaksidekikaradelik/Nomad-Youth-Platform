import { useState, useEffect } from 'react'
const ORGANIZATIONS_ENDPOINT = '/api/organizations'



export function useOrganizations() {
  const [organizations, setOrganizations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(ORGANIZATIONS_ENDPOINT)

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const data = await res.json()

        if (!cancelled) {
          setOrganizations(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        // Backend hələ hazır deyil / xəta var -> mock data ilə davam edirik.
        if (!cancelled) {
          console.warn(
            'useOrganizations: API-dan alınmadı, mock data istifadə olunur.',
            err
          )
          setError(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { organizations, loading, error }
}