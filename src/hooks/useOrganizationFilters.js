import { useEffect, useMemo, useState } from 'react'
import { ORG_PAGE_SIZE } from '../utils/organizationFilters.constants'

export function useOrganizationFilters({
  organizations = [],
  initialQuery = '',
}) {
  const [search, setSearch] = useState(initialQuery)
  const [categories, setCategories] = useState([])
  const [sort, setSort] = useState('rating_desc')
  const [page, setPage] = useState(0)

  const toggleCategory = id => {
    if (id === '') {
      setCategories([])
      setPage(0)
      return
    }

    setCategories(prev => {
      if (prev.includes(id)) {
        return prev.filter(category => category !== id)
      }

      return [...prev, id]
    })

    setPage(0)
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return organizations.filter(org => {
      const matchesSearch =
        !query ||
        org.name?.toLowerCase().includes(query) ||
        org.tagline?.toLowerCase().includes(query)

      const matchesCategory =
        categories.length === 0 ||
        categories.some(category =>
          org.categories?.includes(category)
        )

      return matchesSearch && matchesCategory
    })
  }, [organizations, search, categories])

  const sorted = useMemo(() => {
    const result = [...filtered]

    switch (sort) {
      case 'rating_desc':
        result.sort(
          (a, b) => (b.rating ?? -1) - (a.rating ?? -1)
        )
        break

      case 'reviews_desc':
        result.sort(
          (a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
        )
        break

      case 'name_asc':
        result.sort((a, b) =>
          (a.name || '').localeCompare(b.name || '')
        )
        break

      default:
        break
    }

    return result
  }, [filtered, sort])

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / ORG_PAGE_SIZE)
  )

  useEffect(() => {
    if (page >= totalPages) {
      setPage(0)
    }
  }, [page, totalPages])

  const paginated = useMemo(() => {
    const start = page * ORG_PAGE_SIZE
    const end = start + ORG_PAGE_SIZE

    return sorted.slice(start, end)
  }, [sorted, page])

  return {
    search,
    categories,
    sort,
    page,
    sorted,
    paginated,
    totalPages,

    setSearch,
    setSort,
    setPage,

    toggleCategory,

    handlePageChange: setPage,
  }
}