import { useEffect, useState } from 'react'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export function useOrganizations() {
  const [organizations, setOrganizations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchOrganizations = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}/organizations`)

        if (!response.ok) {
          throw new Error(
            `Organizations request failed: ${response.status}`
          )
        }

        const data = await response.json()

        if (!cancelled) {
          setOrganizations(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch organizations:', err)
          setError(err)
          setOrganizations([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchOrganizations()

    return () => {
      cancelled = true
    }
  }, [])

  return {
    organizations,
    loading,
    error,
  }
}