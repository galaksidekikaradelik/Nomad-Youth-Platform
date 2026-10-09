
import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  SearchX,
  LoaderCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { useLanguage } from '../../hooks/useLanguage'
import { mundusService } from '../../services/mundusService'

import MundusProgramCard from './MundusProgramCard'

const PAGE_SIZE = 9

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
  const { lang } = useLanguage()

  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)

  const labels = {
    az: {
      loading: 'Proqramlar yüklənir...',
      errorTitle: 'Proqramları yükləmək mümkün olmadı.',
      errorDesc: 'Zəhmət olmasa bir az sonra yenidən cəhd edin.',
      emptyTitle: 'Uyğun proqram tapılmadı.',
      emptyDesc: 'Axtarış sözünü və ya filtrləri dəyişərək yenidən cəhd edin.',
      count: 'Tapılan proqramlar',
      previous: 'Əvvəlki',
      next: 'Növbəti',
    },
    en: {
      loading: 'Loading programmes...',
      errorTitle: 'Unable to load programmes.',
      errorDesc: 'Please try again a little later.',
      emptyTitle: 'No matching programmes found.',
      emptyDesc: 'Try changing your search or filters.',
      count: 'Programmes found',
      previous: 'Previous',
      next: 'Next',
    },
    ru: {
      loading: 'Загрузка программ...',
      errorTitle: 'Не удалось загрузить программы.',
      errorDesc: 'Пожалуйста, повторите попытку позже.',
      emptyTitle: 'Подходящие программы не найдены.',
      emptyDesc: 'Попробуйте изменить поиск или фильтры.',
      count: 'Найдено программ',
      previous: 'Назад',
      next: 'Далее',
    },
  }

  const l = labels[lang] || labels.az

  useEffect(() => {
    let active = true

    async function loadPrograms() {
      setLoading(true)
      setError(false)

      try {
        const response = await mundusService.getAll()

        if (!active) return

        setPrograms(normalizeResponse(response.data))
      } catch (err) {
        if (!active) return

        console.error('Mundus fetch failed:', err)

        setError(true)
        setPrograms([])
      } finally {
        if (active) setLoading(false)
      }
    }

    loadPrograms()

    return () => {
      active = false
    }
  }, [])

  const filteredPrograms = useMemo(() => {
    const query = String(search || '')
      .trim()
      .toLocaleLowerCase()

    if (!query) return programs

    return programs.filter(program => {
      const values = [
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

      return values
        .filter(Boolean)
        .map(value => String(value))
        .join(' ')
        .toLocaleLowerCase()
        .includes(query)
    })
  }, [programs, search])

  useEffect(() => {
    setPage(1)
  }, [search])

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

  if (loading) {
    return (
      <div className="mundus-results__state" role="status">
        <LoaderCircle
          className="mundus-results__spinner"
          size={38}
        />

        <h3 className="mundus-results__state-title">
          {l.loading}
        </h3>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mundus-results__state" role="alert">
        <AlertTriangle
          className="mundus-results__state-icon mundus-results__state-icon--error"
          size={38}
          strokeWidth={1.8}
        />

        <h3 className="mundus-results__state-title">
          {l.errorTitle}
        </h3>

        <p className="mundus-results__state-description">
          {l.errorDesc}
        </p>
      </div>
    )
  }

  if (filteredPrograms.length === 0) {
    return (
      <div className="mundus-results__state">
        <SearchX
          className="mundus-results__state-icon"
          size={38}
          strokeWidth={1.8}
        />

        <h3 className="mundus-results__state-title">
          {l.emptyTitle}
        </h3>

        <p className="mundus-results__state-description">
          {l.emptyDesc}
        </p>
      </div>
    )
  }

  return (
    <div className="mundus-results">

      <div className="mundus-results__count">
        {l.count}:{' '}
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

      {totalPages > 1 && (
        <div className="mundus-results__pagination">

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setPage(prev => Math.max(1, prev - 1))
            }
          >
            <ChevronLeft size={16} />
            {l.previous}
          </button>

          <span className="mundus-results__page-info">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setPage(prev =>
                Math.min(totalPages, prev + 1)
              )
            }
          >
            {l.next}
            <ChevronRight size={16} />
          </button>

        </div>
      )}
    </div>
  )
}
