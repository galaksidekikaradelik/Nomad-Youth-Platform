import { useState, useMemo, useEffect } from 'react'
import { ORG_PAGE_SIZE } from '../utils/organizationFilters.constants'

export function useOrganizationFilters({
  organizations,
  initialQuery = '',
  initialCategory = '',
}) {
  const [search, setSearch] = useState(initialQuery)

  const [categories, setCategories] = useState(
    initialCategory ? [initialCategory] : []
  )

  const [sort, setSort] = useState('rating')

  const [page, setPage] = useState(0)

  const toggleCategory = (id) => {
    if (id === '') {
      setCategories([])
      return
    }

    setCategories(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
  }

  const filtered = useMemo(() => {
    const q = search.toLocaleLowerCase('az')

    return organizations.filter(org => {
      const matchCategory =
        categories.length === 0 ||
        (
          Array.isArray(org.categories) &&
          categories.some(cat =>
            org.categories.includes(cat)
          )
        )

      const matchSearch =
        !search ||

        org.name
          ?.toLocaleLowerCase('az')
          .includes(q) ||

        org.tagline
          ?.toLocaleLowerCase('az')
          .includes(q) ||

        (
          Array.isArray(org.categories) &&
          org.categories.some(cat =>
            String(cat)
              .toLocaleLowerCase('az')
              .includes(q)
          )
        )

      return matchCategory && matchSearch
    })
  }, [organizations, search, categories])

  const sorted = useMemo(() => {
    const arr = [...filtered]

    if (sort === 'rating') {
      arr.sort(
        (a, b) => (b.rating ?? -1) - (a.rating ?? -1)
      )
    } else if (sort === 'active') {
      arr.sort(
        (a, b) =>
          (b.activeOpportunities || 0) -
          (a.activeOpportunities || 0)
      )
    } else if (sort === 'name') {
      arr.sort((a, b) =>
        String(a.name || '').localeCompare(
          String(b.name || ''),
          'az'
        )
      )
    }

    return arr
  }, [filtered, sort])

  useEffect(() => {
    setPage(0)
  }, [search, categories, sort])

  const totalPages = Math.ceil(sorted.length / ORG_PAGE_SIZE)

  const paginated = useMemo(() => {
    const start = page * ORG_PAGE_SIZE
    return sorted.slice(start, start + ORG_PAGE_SIZE)
  }, [sorted, page])

  const handlePageChange = (p) => {
    setPage(p)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return {
    search,
    categories,
    sort,
    page,
    sorted,
    paginated,
    totalPages,
    setSearch,
    setCategories,
    setSort,
    toggleCategory,
    handlePageChange,
    setPage,
  }
}