import { useEffect, useState } from 'react'
import {
  useParams,
  useSearchParams,
} from 'react-router-dom'

import { useLanguage } from '../hooks/useLanguage'

import { useOpportunities } from '../hooks/useOpportunities'
import { useOpportunityFilters } from '../hooks/useOpportunityFilters'

import { useOrganizations } from '../hooks/useOrganizations'
import { useOrganizationFilters } from '../hooks/useOrganizationFilters'

import SearchBar from '../components/SearchBar'
import OpportunityFilters from '../components/OpportunityFilters'
import OpportunityResults from '../components/OpportunityResults'

import OrganizationFilters from '../components/OrganizationFilters'
import OrganizationResults from '../components/OrganizationResults'

import {
  PROJECT_TABS,
} from '../utils/opportunityFilters.constants'

import { getOpportunityGroup } from '../utils/getOpportunityGroup'

const LOCAL_TAB_ID = 'local'

export default function Opportunities() {
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()

  const {
    opportunityId: routeOpportunityId,
  } = useParams()

  const initialQuery =
    searchParams.get('query') || ''

  const initialCategory =
    searchParams.get('category') || ''

  const highlightOppKey =
    routeOpportunityId ||
    searchParams.get('show') ||
    null


  /*
   * Filter state-ləri
   *
   * Artıq useOpportunityFilters bütün elanları
   * qəbul edib pagination etməyəcək.
   * Yalnız filter state-lərini idarə edəcək.
   */
  const {
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
    setSort,
    setActiveTab,

    toggleCategory,
    toggleType,
    toggleFormat,
    toggleDuration,
    toggleVisaType,

    clearDurationAndVisa,
  } = useOpportunityFilters({
    initialQuery,
    initialCategory,
  })


  /*
   * Pagination artıq burada server-side idarə olunur
   */
  const [page, setPage] = useState(0)


  /*
   * Backend-dən yalnız cari səhifənin 12 elanı gəlir
   */
  const {
    opportunities,
    totalPages,
    totalElements,
    loading,
    error,
  } = useOpportunities({
    page,
    size: 12,
    search,
    category: categories[0] || '',
    format: format || '',
  })


  /*
   * LOCAL / Organization hissəsi əvvəlki kimi qalır
   */
  const {
    organizations,
    loading: orgLoading,
    error: orgError,
  } = useOrganizations()

  const {
    search: orgSearch,
    categories: orgCategories,
    sort: orgSort,
    page: orgPage,

    paginated: orgPaginated,
    totalPages: orgTotalPages,

    setSearch: setOrgSearch,
    setSort: setOrgSort,

    toggleCategory: orgToggleCategory,

    handlePageChange: orgHandlePageChange,
  } = useOrganizationFilters({
    organizations,
    initialQuery,
  })


  const isLocalTab =
    activeTab === LOCAL_TAB_ID


  /*
   * URL-dən konkret elan açılıbsa,
   * onun aid olduğu tab-a keç
   */
  useEffect(() => {
    if (!highlightOppKey) return
    if (!opportunities?.length) return

    const target = opportunities.find(
      opportunity =>
        String(opportunity.id) ===
        String(highlightOppKey)
    )

    if (!target) return

    setActiveTab(
      getOpportunityGroup(target)
    )
  }, [
    highlightOppKey,
    opportunities,
    setActiveTab,
  ])


  /*
   * Search dəyişəndə server pagination
   * ilk səhifəyə qayıdır
   */
  const handleSearchChange = value => {
    if (isLocalTab) {
      setOrgSearch(value)
      return
    }

    setSearch(value)
    setPage(0)
  }


  /*
   * Category dəyişəndə ilk səhifəyə qayıt
   */
  const handleCategoryChange = id => {
    if (isLocalTab) return

    setCategories(
      id ? [id] : []
    )

    setPage(0)
  }


  /*
   * Format dəyişəndə ilk səhifəyə qayıt
   */
  const handleFormatChange = value => {
    toggleFormat(value)
    setPage(0)
  }


  /*
   * Server-side pagination
   */
  const handlePageChange = newPage => {
    setPage(newPage)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  /*
   * Tab dəyişəndə opportunity pagination
   * yenidən 0-dan başlayır
   */
  const handleTabChange = tabId => {
    setActiveTab(tabId)

    if (tabId !== LOCAL_TAB_ID) {
      setPage(0)
    }
  }


  return (
    <div className="section">
      <div className="container">

        <div className="page-header">
          <div className="page-header__eyebrow">
            {t('opp_eyebrow')}
          </div>

          <h1 className="page-header__title">
            {t('opp_title')}
          </h1>

          <p className="page-header__desc">
            {t('opp_desc')}
          </p>
        </div>


        <div className="opportunities-tabs">
          {PROJECT_TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`opportunities-tab ${
                activeTab === tab.id
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                handleTabChange(tab.id)
              }
            >
              {tab.label}
            </button>
          ))}
        </div>


        <div className="opportunities-searchbar-wrap">
          <SearchBar
            placeholder={t(
              'opp_search_placeholder'
            )}
            query={
              isLocalTab
                ? orgSearch
                : search
            }
            category={
              isLocalTab
                ? ''
                : categories[0] || ''
            }
            onQueryChange={
              handleSearchChange
            }
            onCategoryChange={
              handleCategoryChange
            }
          />
        </div>


        {isLocalTab ? (
          <>
            <OrganizationFilters
              t={t}
              lang={lang}
              categories={
                orgCategories
              }
              toggleCategory={
                orgToggleCategory
              }
              sort={orgSort}
              setSort={setOrgSort}
            />

            <OrganizationResults
              t={t}
              lang={lang}
              organizations={
                orgPaginated
              }
              loading={orgLoading}
              error={orgError}
              page={orgPage}
              totalPages={
                orgTotalPages
              }
              onPageChange={
                orgHandlePageChange
              }
            />
          </>
        ) : (
          <>
            <OpportunityFilters
              t={t}
              lang={lang}

              categories={
                categories
              }
              toggleCategory={id => {
                toggleCategory(id)
                setPage(0)
              }}

              types={types}
              toggleType={id => {
                toggleType(id)
                setPage(0)
              }}

              format={format}
              toggleFormat={
                handleFormatChange
              }

              durations={durations}
              toggleDuration={id => {
                toggleDuration(id)
                setPage(0)
              }}

              visaType={visaType}
              toggleVisaType={id => {
                toggleVisaType(id)
                setPage(0)
              }}

              clearDurationAndVisa={() => {
                clearDurationAndVisa()
                setPage(0)
              }}

              sort={sort}
              setSort={value => {
                setSort(value)
                setPage(0)
              }}
            />

            <OpportunityResults
              t={t}
              loading={loading}
              error={error}

              /*
               * Artıq frontend-də slice yoxdur.
               * Backend-in qaytardığı cari 12 elan.
               */
              sorted={opportunities}
              paginated={opportunities}

              page={page}
              totalPages={totalPages}
              totalElements={
                totalElements
              }

              onPageChange={
                handlePageChange
              }

              highlightOppKey={
                highlightOppKey
              }
            />
          </>
        )}

      </div>
    </div>
  )
}