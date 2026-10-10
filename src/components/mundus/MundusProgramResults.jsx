
import { useEffect, useMemo, useState } from 'react'

import {
  AlertTriangle,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { useLanguage } from '../../hooks/useLanguage'
import { mundusService } from '../../services/mundusService'

import MundusProgramCard from './MundusProgramCard'
import { MundusSkeletonGrid } from './MundusSkeleton'

const PAGE_SIZE = 9
const SKELETON_COUNT = 6

function normalizeResponse(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.content)) return data.content
  if (Array.isArray(data?.programs)) return data.programs
  if (Array.isArray(data?.data)) return data.data

  return []
}

/* =========================================
   PAGINATION ITEMS
========================================= */

function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    )
  }

  const pages = new Set([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ])

  const sortedPages = [...pages]
    .filter(page => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)

  const result = []

  sortedPages.forEach((page, index) => {
    if (index > 0) {
      const previousPage = sortedPages[index - 1]
      const gap = page - previousPage

      if (gap === 2) {
        result.push(previousPage + 1)
      } else if (gap > 2) {
        result.push('...')
      }
    }

    result.push(page)
  })

  return result
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

  const paginationItems = getPaginationItems(
    currentPage,
    totalPages
  )

  const visiblePrograms = filteredPrograms.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handlePageChange = newPage => {
    const nextPage = Math.max(
      1,
      Math.min(totalPages, newPage)
    )

    if (nextPage === currentPage) return

    setPage(nextPage)
  }

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

      <div className="mundus-results__count">
        {t('mundus_results_count')}: {' '}
        <strong>{filteredPrograms.length}</strong>
      </div>

      <div className="mundus-results__grid">
        {visiblePrograms.map(program => (
          <MundusProgramCard
            key={program.id}
            program={program}
          />
        ))}
      </div>

      {/* =====================================
          PAGINATION
      ===================================== */}

      {totalPages > 1 && (
        <nav
          className="mundus-results__pagination"
          aria-label="Pagination"
        >

          {/* PREVIOUS */}

          <button
            type="button"
            className="mundus-results__pagination-btn mundus-results__pagination-arrow"
            disabled={currentPage === 1}
            onClick={() =>
              handlePageChange(currentPage - 1)
            }
            aria-label={t('mundus_results_previous')}
          >
            <ChevronLeft
              size={18}
              strokeWidth={2.2}
            />
          </button>

          {/* PAGE NUMBERS */}

          {paginationItems.map((item, index) =>
            item === '...' ? (
              <span
                key={`dots-${index}`}
                className="mundus-results__pagination-dots"
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className={`mundus-results__pagination-btn ${
                  currentPage === item ? 'is-active' : ''
                }`}
                onClick={() =>
                  handlePageChange(item)
                }
                aria-label={`Page ${item}`}
                aria-current={
                  currentPage === item
                    ? 'page'
                    : undefined
                }
              >
                {item}
              </button>
            )
          )}

          {/* NEXT */}

          <button
            type="button"
            className="mundus-results__pagination-btn mundus-results__pagination-arrow"
            disabled={currentPage === totalPages}
            onClick={() =>
              handlePageChange(currentPage + 1)
            }
            aria-label={t('mundus_results_next')}
          >
            <ChevronRight
              size={18}
              strokeWidth={2.2}
            />
          </button>

        </nav>
      )}

    </div>
  )
}
