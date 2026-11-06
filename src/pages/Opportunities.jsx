import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useOpportunities } from '../hooks/useOpportunities'
import { useOpportunityFilters } from '../hooks/useOpportunityFilters'
import { useOrganizations } from '../hooks/useOrganizations'
import { useOrganizationFilters } from '../hooks/useOrganizationFilters'
import SearchBar from '../components/SearchBar'
import OpportunityFilters from '../components/opportunities/OpportunityFilters'
import OpportunityResults from '../components/opportunities/OpportunityResults'
import OrganizationFilters from '../components/organization/OrganizationFilters'
import OrganizationResults from '../components/organization/OrganizationResults'
import MundusProgramResults from '../components/mundus/MundusProgramResults'
import { PROJECT_TABS } from '../utils/opportunityFilters.constants'
import { getOpportunityGroup } from '../utils/getOpportunityGroup'

const LOCAL_TAB_ID = 'local'
const MUNDUS_TAB_ID = 'mundus'

export default function Opportunities() {
  const { t, lang } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const { opportunityId: routeOpportunityId } = useParams()
  const [mundusSearch, setMundusSearch] = useState('')

  const initialQuery = searchParams.get('query') || ''
  const initialCategory = searchParams.get('category') || ''
  const highlightOppKey = routeOpportunityId || searchParams.get('show') || null

  const { opportunities, loading, error } = useOpportunities()

  const {
    search, categories, types, format, escOrSalto, durations,
    visaType, sort, activeTab, page, sorted, paginated, totalPages,
    setSearch, setCategories, setSort, setActiveTab,
    toggleCategory, toggleType, toggleFormat,
    toggleEscOrSalto, clearFormatFilters,
    toggleDuration, toggleVisaType, clearDurationAndVisa,
    handlePageChange, setPage,
  } = useOpportunityFilters({
    opportunities,
    initialQuery,
    initialCategory,
  })

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

  const isLocalTab = activeTab === LOCAL_TAB_ID
  const isMundusTab = activeTab === MUNDUS_TAB_ID

  const linkedMundusId = searchParams.get('mundusId')
  const linkedMundusTab = searchParams.get('tab') === MUNDUS_TAB_ID

  // Paylaşılan URL ilə avtomatik Mundus bölməsinə keçid
  useEffect(() => {
    if (linkedMundusId || linkedMundusTab) {
      setActiveTab(MUNDUS_TAB_ID)
    }
  }, [linkedMundusId, linkedMundusTab, setActiveTab])

  // Mövcud imkanların URL ilə açılması
  useEffect(() => {
    if (!highlightOppKey || !opportunities?.length) return

    const target = opportunities.find(
      opportunity =>
        String(opportunity.id) === String(highlightOppKey)
    )

    if (target) {
      setActiveTab(getOpportunityGroup(target))
    }
  }, [
    highlightOppKey,
    opportunities,
    setActiveTab,
  ])

  const currentSearch = isLocalTab
    ? orgSearch
    : isMundusTab
      ? mundusSearch
      : search

  function handleSearchChange(value) {
    if (isLocalTab) {
      setOrgSearch(value)
      return
    }

    if (isMundusTab) {
      setMundusSearch(value)
      return
    }

    setSearch(value)
  }

  function handleTabChange(tabId) {
    setActiveTab(tabId)

    const next = new URLSearchParams(searchParams)

    next.delete('mundusId')

    if (tabId === MUNDUS_TAB_ID) {
      next.set('tab', MUNDUS_TAB_ID)
    } else {
      next.delete('tab')
    }

    setSearchParams(next, { replace: true })

    if (
      tabId !== LOCAL_TAB_ID &&
      tabId !== MUNDUS_TAB_ID
    ) {
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
                activeTab === tab.id ? 'active' : ''
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="opportunities-searchbar-wrap">
          <SearchBar
            placeholder={
              isMundusTab
                ? 'Erasmus Mundus proqramı axtar...'
                : t('opp_search_placeholder')
            }
            query={currentSearch}
            category={
              isLocalTab || isMundusTab
                ? ''
                : categories[0] || ''
            }
            onQueryChange={handleSearchChange}
            onCategoryChange={id => {
              if (isLocalTab || isMundusTab) return

              setCategories(id ? [id] : [])
            }}
          />
        </div>

        {isLocalTab ? (
          <>
            <OrganizationFilters
              t={t}
              lang={lang}
              categories={orgCategories}
              toggleCategory={orgToggleCategory}
              sort={orgSort}
              setSort={setOrgSort}
            />

            <OrganizationResults
              t={t}
              lang={lang}
              organizations={orgPaginated}
              loading={orgLoading}
              error={orgError}
              page={orgPage}
              totalPages={orgTotalPages}
              onPageChange={orgHandlePageChange}
            />
          </>
        ) : isMundusTab ? (
          <MundusProgramResults
            search={mundusSearch}
          />
        ) : (
          <>
            <OpportunityFilters
              t={t}
              lang={lang}
              categories={categories}
              toggleCategory={toggleCategory}
              types={types}
              toggleType={toggleType}
              format={format}
              toggleFormat={toggleFormat}
              escOrSalto={escOrSalto}
              toggleEscOrSalto={toggleEscOrSalto}
              clearFormatFilters={clearFormatFilters}
              durations={durations}
              toggleDuration={toggleDuration}
              visaType={visaType}
              toggleVisaType={toggleVisaType}
              clearDurationAndVisa={clearDurationAndVisa}
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
              onPageChange={handlePageChange}
              highlightOppKey={highlightOppKey}
            />
          </>
        )}

      </div>
    </div>
  )
}