import { useEffect } from 'react'
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
   * ==========================
   * OPPORTUNITIES
   * ==========================
   */

  const {
    opportunities,
    loading,
    error,
  } = useOpportunities()

  const {
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
  } = useOpportunityFilters({
    opportunities,
    initialQuery,
    initialCategory,
  })

  /*
   * ==========================
   * ORGANIZATIONS
   * ==========================
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

    sorted: orgSorted,
    paginated: orgPaginated,
    totalPages: orgTotalPages,

    setSearch: setOrgSearch,
    setSort: setOrgSort,

    toggleCategory: orgToggleCategory,

    handlePageChange:
      orgHandlePageChange,
  } = useOrganizationFilters({
    organizations,
    initialQuery,
  })

  /*
   * ==========================
   * ACTIVE TAB
   * ==========================
   */

  const isLocalTab =
    activeTab === LOCAL_TAB_ID

  /*
   * ==========================
   * OPENED OPPORTUNITY
   * ==========================
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
   * ==========================
   * SEARCH
   * ==========================
   */

  const currentSearch = isLocalTab
    ? orgSearch
    : search

  const handleSearchChange = value => {
    if (isLocalTab) {
      setOrgSearch(value)
    } else {
      setSearch(value)
    }
  }

  /*
   * ==========================
   * RENDER
   * ==========================
   */

  return (
    <div className="section">
      <div className="container">

        {/* HEADER */}

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

        {/* TABS */}

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
              onClick={() => {
                setActiveTab(tab.id)

                if (tab.id === LOCAL_TAB_ID) {
                  // Organization pagination
                  // öz hook-unda idarə olunur.
                } else {
                  setPage(0)
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SEARCH */}

        <div className="opportunities-searchbar-wrap">
          <SearchBar
            placeholder={t(
              'opp_search_placeholder'
            )}
            query={currentSearch}

            /*
             * Yerli imkanlar üçün SearchBar-ın
             * category dropdown-unu boş saxlayırıq.
             * Organization kateqoriyaları aşağıdakı
             * OrganizationFilters-də idarə olunur.
             */
            category={
              isLocalTab
                ? ''
                : categories[0] || ''
            }

            onQueryChange={
              handleSearchChange
            }

            onCategoryChange={id => {
              if (isLocalTab) return

              setCategories(
                id ? [id] : []
              )
            }}
          />
        </div>

        {/* ==========================
            LOCAL ORGANIZATIONS
           ========================== */}

        {isLocalTab ? (
          <>
            <OrganizationFilters
              t={t}
              lang={lang}
              categories={orgCategories}
              toggleCategory={
                orgToggleCategory
              }
              sort={orgSort}
              setSort={setOrgSort}
            />

            <OrganizationResults
              t={t}
              lang={lang}
              loading={orgLoading}
              error={orgError}
              sorted={orgSorted}
              paginated={orgPaginated}
              page={orgPage}
              totalPages={orgTotalPages}
              onPageChange={
                orgHandlePageChange
              }
            />
          </>
        ) : (

          /* ==========================
             NORMAL OPPORTUNITIES
             ========================== */

          <>
            <OpportunityFilters
              t={t}
              lang={lang}
              categories={categories}
              toggleCategory={
                toggleCategory
              }
              types={types}
              toggleType={toggleType}
              format={format}
              toggleFormat={
                toggleFormat
              }
              durations={durations}
              toggleDuration={
                toggleDuration
              }
              visaType={visaType}
              toggleVisaType={
                toggleVisaType
              }
              clearDurationAndVisa={
                clearDurationAndVisa
              }
              sort={sort}
              setSort={setSort}
            />

            <OpportunityResults
              t={t}
              loading={loading}
              error={error}
              sorted={sorted}
              paginated={paginated}
              page={page}
              totalPages={totalPages}
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