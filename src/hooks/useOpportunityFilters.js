import { useState } from 'react'

export function useOpportunityFilters({
  initialQuery = '',
  initialCategory = '',
} = {}) {
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

  const toggleCategory = id => {
    if (!id) {
      setCategories([])
      return
    }

    setCategories(prev =>
      prev.includes(id)
        ? prev.filter(category => category !== id)
        : [...prev, id]
    )
  }

  const toggleType = id => {
    if (!id) {
      setTypes([])
      return
    }

    setTypes(prev =>
      prev.includes(id)
        ? prev.filter(type => type !== id)
        : [...prev, id]
    )
  }

  const toggleFormat = id => {
    if (!id || id === 'Hamısı') {
      setFormat('Hamısı')
      return
    }

    setFormat(id)
  }

  const toggleDuration = id => {
    if (!id) {
      setDurations([])
      return
    }

    setDurations(prev =>
      prev.includes(id)
        ? []
        : [id]
    )
  }

  const toggleVisaType = id => {
    if (!id) {
      setVisaType('')
      return
    }

    setVisaType(prev =>
      prev === id
        ? ''
        : id
    )
  }

  const clearDurationAndVisa = () => {
    setDurations([])
    setVisaType('')
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

    setSearch,
    setCategories,
    setTypes,
    setFormat,
    setDurations,
    setVisaType,
    setSort,
    setActiveTab,

    toggleCategory,
    toggleType,
    toggleFormat,
    toggleDuration,
    toggleVisaType,

    clearDurationAndVisa,
  }
}