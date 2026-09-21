import { useEffect, useMemo, useState } from 'react'
import { ORG_PAGE_SIZE } from '../utils/organizationFilters.constants'

const NOMAD_SLUG = 'nomad-youth'

export function useOrganizationFilters({
  organizations = [],
  initialQuery = '',
}) {
  const [search, setSearch] = useState(initialQuery)
  const [categories, setCategories] = useState([])
  const [sort, setSort] = useState('name')
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

    const nomad = result.find(
      org =>
        org.slug === NOMAD_SLUG ||
        org.name?.trim().toLowerCase() === 'nomad youth'
    )

    const others = result.filter(
      org =>
        org.slug !== NOMAD_SLUG &&
        org.name?.trim().toLowerCase() !== 'nomad youth'
    )

    if (sort === 'active') {
      others.sort(
        (a, b) =>
          (b.activeOpportunities ?? 0) -
          (a.activeOpportunities ?? 0)
      )
    } else {
      others.sort((a, b) =>
        (a.name || '').localeCompare(
          b.name || '',
          'az',
          { sensitivity: 'base' }
        )
      )
    }

    return nomad ? [nomad, ...others] : others
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