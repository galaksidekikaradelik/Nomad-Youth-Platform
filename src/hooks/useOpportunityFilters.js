import { useState, useMemo, useEffect } from 'react'
import { filterActiveOpportunities } from '../utils/opportunityStatus'
import { getOpportunityGroup } from '../utils/getOpportunityGroup'
import { PAGE_SIZE } from '../utils/opportunityFilters.constants'

export function useOpportunityFilters({
  opportunities,
  initialQuery,
  initialCategory,
}) {
  const [search, setSearch] = useState(initialQuery)
  const [categories, setCategories] = useState(
    initialCategory ? [initialCategory] : []
  )
  const [types, setTypes] = useState([])
  const [format, setFormat] = useState('Hamısı')
  const [durations, setDurations] = useState([])
  const [visaType, setVisaType] = useState('')
  const [sort, setSort] = useState('deadline')
  const [activeTab, setActiveTab] = useState('erasmus')
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

  const toggleType = (id) => {
    if (id === '') {
      setTypes([])
      return
    }
    setTypes(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }

  const toggleFormat = (id) => {
    setFormat(id)
  }

  const toggleDuration = (id) => {
    setDurations(prev =>
      prev.includes(id) ? [] : [id]
    )
  }

  const toggleVisaType = (id) => {
    setVisaType(prev => (prev === id ? '' : id))
  }

  const clearDurationAndVisa = () => {
    setDurations([])
    setVisaType('')
  }

  const enriched = useMemo(() => {
    return filterActiveOpportunities(opportunities).map(op => ({
      ...op,
      opportunityGroup: getOpportunityGroup(op),
    }))
  }, [opportunities])

  const filtered = useMemo(() => {
    return enriched.filter(op => {
      const matchTab = op.opportunityGroup === activeTab

      const matchCat =
        categories.length === 0 ||
        (
          Array.isArray(op.categoryGroups) &&
          categories.some(cat => op.categoryGroups.includes(cat))
        )

      const matchType =
        types.length === 0 || types.includes(op.type)

      const matchFormat =
        format === 'Hamısı' || op.typeDetail === format

      const matchDuration =
        durations.length === 0 || durations.includes(op.durationType)

      const matchVisa =
        !visaType || op.visaType === visaType

      const q = search.toLocaleLowerCase('az')

      const matchSearch =
        !search ||
        op.title?.toLocaleLowerCase('az').includes(q) ||
        op.location?.toLocaleLowerCase('az').includes(q) ||
        op.organization?.toLocaleLowerCase('az').includes(q) ||
        (
          Array.isArray(op.tags) &&
          op.tags.some(tag =>
            String(tag).toLocaleLowerCase('az').includes(q)
          )
        )

      return (
        matchTab &&
        matchCat &&
        matchType &&
        matchFormat &&
        matchDuration &&
        matchVisa &&
        matchSearch
      )
    })
  }, [
    enriched,
    activeTab,
    search,
    categories,
    types,
    format,
    durations,
    visaType,
  ])

  const sorted = useMemo(() => {
    const arr = [...filtered]

    if (sort === 'deadline') {
      arr.sort((a, b) => {
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return new Date(a.deadline) - new Date(b.deadline)
      })
    } else if (sort === 'newest') {
      arr.sort((a, b) => Number(b.id) - Number(a.id))
    } else if (sort === 'country') {
      arr.sort((a, b) =>
        String(a.location || '').localeCompare(
          String(b.location || ''),
          'az'
        )
      )
    }

    return arr
  }, [filtered, sort])

  useEffect(() => {
    setPage(0)
  }, [
    activeTab,
    search,
    categories,
    types,
    format,
    durations,
    visaType,
    sort,
  ])

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)

  const paginated = useMemo(() => {
    const start = page * PAGE_SIZE
    return sorted.slice(start, start + PAGE_SIZE)
  }, [sorted, page])

  const handlePageChange = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    search,
    categories,
    types,
    format,
    durations,
    visaType,
    sort,
    activeTab,
    page,
    sorted,
    paginated,
    totalPages,
    setSearch,
    setCategories,
    setSort,
    setActiveTab,
    toggleCategory,
    toggleType,
    toggleFormat,
    toggleDuration,
    toggleVisaType,
    clearDurationAndVisa,
    handlePageChange,
    setPage,
  }
}