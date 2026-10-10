
import { useEffect, useMemo, useState } from 'react'

import {
  AlertTriangle,
  CalendarClock,
} from 'lucide-react'

import { useLanguage } from '../../hooks/useLanguage'
import { mundusService } from '../../services/mundusService'

import MundusProgramCard from './MundusProgramCard'
import { MundusSkeletonGrid } from './MundusSkeleton'
import Pagination from '../Pagination'

const PAGE_SIZE = 9
const SKELETON_COUNT = 6

function normalizeResponse(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.content)) return data.content
  if (Array.isArray(data?.programs)) return data.programs
  if (Array.isArray(data?.data)) return data.data

  return []
}

export default function MundusProgramResults({
  search = '',
}) {
  const { t } = useLanguage()

  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)

  /* =========================================
     FETCH PROGRAMS
  ========================================= */

  useEffect(() => {
    let active = true

    async function loadPrograms() {
      setLoading(true)
      setError(false)

      try {
        const response = await mundusService.getAll()

        if (!active) return

        setPrograms(
          normalizeResponse(response.data)
        )
      } catch (err) {
        if (!active) return

        console.error(
          'Mundus programs fetch failed:',
          err
        )

        setError(true)
        setPrograms([])
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadPrograms()

    return () => {
      active = false
    }
  }, [])

  /* =========================================
     SEARCH FILTER
  ========================================= */

  const filteredPrograms = useMemo(() => {
    const query = String(search || '')
      .trim()
      .toLocaleLowerCase()

    if (!query) return programs

    return programs.filter(program => {
      const searchableValues = [
        program.programName,
        program.title,
        program.degree,
        program.language,

        ...(Array.isArray(program.countries)
          ? program.countries
          : []),

        ...(Array.isArray(program.bachelorFields)
          ? program.bachelorFields
          : []),
      ]

      return searchableValues
        .filter(Boolean)
        .map(value => String(value))
        .join(' ')
        .toLocaleLowerCase()
        .includes(query)
    })
  }, [programs, search])

  /* =========================================
     RESET PAGE
  ========================================= */

  useEffect(() => {
    setPage(1)
  }, [search])

  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.ceil(
    filteredPrograms.length / PAGE_SIZE
  )

  const currentPage = Math.min(
    page,
    Math.max(1, totalPages)
  )

  const visiblePrograms = filteredPrograms.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  /* =========================================
     SKELETON LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="mundus-results">
        <MundusSkeletonGrid
          count={SKELETON_COUNT}
          gridClassName="mundus-results__grid"
        />
      </div>
    )
  }

  /* =========================================
     ERROR STATE
  ========================================= */

  if (error) {
    return (
      <div
        className="mundus-results__state"
        role="alert"
      >
        <AlertTriangle
          className="mundus-results__state-icon mundus-results__state-icon--error"
          size={38}
          strokeWidth={1.8}
        />

        <h3 className="mundus-results__state-title">
          {t('mundus_results_error_title')}
        </h3>

        <p className="mundus-results__state-description">
          {t('mundus_results_error_desc')}
        </p>
      </div>
    )
  }

  /* =========================================
     EMPTY STATE
  ========================================= */

  if (filteredPrograms.length === 0) {
    return (
      <div className="mundus-results__state">
        <CalendarClock
          className="mundus-results__state-icon"
          size={38}
          strokeWidth={1.8}
        />

        <h3 className="mundus-results__state-title">
          {t('mundus_results_empty_title')}
        </h3>

        <p className="mundus-results__state-description">
          {t('mundus_results_empty_desc')}
        </p>
      </div>
    )
  }

  /* =========================================
     RESULTS
  ========================================= */

  return (
    <div className="mundus-results">

      {/* RESULTS COUNT */}

      <div className="mundus-results__count">
        {t('mundus_results_count')}: {' '}
        <strong>{filteredPrograms.length}</strong>
      </div>

      {/* PROGRAM GRID */}

      <div className="mundus-results__grid">
        {visiblePrograms.map(program => (
          <MundusProgramCard
            key={program.id}
            program={program}
          />
        ))}
      </div>

      {/* SHARED PAGINATION */}

      <Pagination
        currentPage={currentPage - 1}
        totalPages={totalPages}
        onPageChange={newPage => setPage(newPage + 1)}
      />

    </div>
  )
}
