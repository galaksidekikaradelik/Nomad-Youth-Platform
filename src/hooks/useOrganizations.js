import { useState, useEffect } from 'react'

// Backend hazır olduqda YALNIZ bu endpoint-i dəyişmək kifayətdir.
// Gözlənilən cavab formatı (array):
// [
//   {
//     id: string | number,
//     slug: string,               // profil linki üçün, məs. "ecohub"
//     name: string,
//     code: string,                // avatarda görünən 2 hərf, məs. "EC"
//     color: string,                // avatar arxa fonu, hex, məs. "#16a34a"
//     tagline: string,              // qısa təsvir
//     rating: number | null,        // null olarsa "Rating formalaşır" göstərilir
//     reviewCount: number,
//     categories: string[],          // CANONICAL_CATEGORIES ilə eyni id-lər
//     activeOpportunities: number,
//   },
//   ...
// ]
const ORGANIZATIONS_ENDPOINT = '/api/organizations'

const MOCK_ORGANIZATIONS = [
  {
    id: 1,
    slug: 'ecohub',
    name: 'EcoHub',
    code: 'EC',
    color: '#1f8a4c',
    tagline: 'Ekologiya və gənclərin iştirakı',
    rating: 9.2,
    reviewCount: 27,
    categories: ['Ekologiya', 'Könüllülük'],
    activeOpportunities: 4,
  },
  {
    id: 2,
    slug: 'bir-konullu',
    name: 'Bir Könüllü',
    code: 'Bİ',
    color: '#2952a3',
    tagline: 'Gənclər və sosial təsir platforması',
    rating: 8.8,
    reviewCount: 18,
    categories: ['Könüllülük', 'Təhsil'],
    activeOpportunities: 6,
  },
  {
    id: 3,
    slug: 'techbridge',
    name: 'TechBridge',
    code: 'TE',
    color: '#7c3aed',
    tagline: 'Gənclər üçün rəqəmsal bacarıqlar',
    rating: 9.0,
    reviewCount: 31,
    categories: ['Texnologiya', 'Təhsil'],
    activeOpportunities: 3,
  },
  {
    id: 4,
    slug: 'medeni-mekan',
    name: 'Mədəni Məkan',
    code: 'Mə',
    color: '#c2542f',
    tagline: 'İncəsənət və icma proqramları',
    rating: null,
    reviewCount: 0,
    categories: ['Mədəniyyət', 'Media'],
    activeOpportunities: 2,
  },
  {
    id: 5,
    slug: 'youthlab',
    name: 'YouthLab',
    code: 'YO',
    color: '#c99a1e',
    tagline: 'Gənclər üçün liderlik laboratoriyası',
    rating: 8.7,
    reviewCount: 14,
    categories: ['Liderlik', 'Sahibkarlıq'],
    activeOpportunities: 5,
  },
  {
    id: 6,
    slug: 'saglam-sabah',
    name: 'Sağlam Sabah',
    code: 'SA',
    color: '#158a80',
    tagline: 'Rifah və sağlam həyat təşəbbüsləri',
    rating: null,
    reviewCount: 0,
    categories: ['Rifah', 'Gənclər'],
    activeOpportunities: 2,
  },
]

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
          setOrganizations(MOCK_ORGANIZATIONS)
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