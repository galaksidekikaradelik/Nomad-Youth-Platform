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
import OpportunityFilters from '../components/opportunities/OpportunityFilters'
import OpportunityResults from '../components/opportunities/OpportunityResults'

import OrganizationFilters from '../components/organization/OrganizationFilters'
import OrganizationResults from '../components/organization/OrganizationResults'

import MundusProgramResults from '../components/mundus/MundusProgramResults'


import {
  PROJECT_TABS,
} from '../utils/opportunityFilters.constants'

import { getOpportunityGroup } from '../utils/getOpportunityGroup'

const LOCAL_TAB_ID = 'local'
const MUNDUS_TAB_ID = 'mundus'

export default function Opportunities() {
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()

  const {
    opportunityId: routeOpportunityId,
  } = useParams()

  const [mundusSearch, setMundusSearch] =
    useState('')

  const [mundusPage, setMundusPage] =
    useState(0)

  const initialQuery =
    searchParams.get('query') || ''

  const initialCategory =
    searchParams.get('category') || ''

  const highlightOppKey =
    routeOpportunityId ||
    searchParams.get('show') ||
    null

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

  const isMundusTab =
    activeTab === MUNDUS_TAB_ID


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


  const currentSearch =
    isLocalTab
      ? orgSearch
      : isMundusTab
        ? mundusSearch
        : search


  const handleSearchChange = value => {
    if (isLocalTab) {
      setOrgSearch(value)
      return
    }

    if (isMundusTab) {
      setMundusSearch(value)
      setMundusPage(0)
      return
    }

    setSearch(value)
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

                if (
                  tab.id === LOCAL_TAB_ID
                ) {
                  return
                }

                if (
                  tab.id === MUNDUS_TAB_ID
                ) {
                  setMundusPage(0)
                  return
                }

                setPage(0)

              }}
            >
              {tab.label}
            </button>

          ))}

        </div>


        {/* SEARCH */}

        <div className="opportunities-searchbar-wrap">

          <SearchBar
            placeholder={
              isMundusTab
                ? 'Erasmus Mundus proqramı axtar...'
                : t(
                    'opp_search_placeholder'
                  )
            }
            query={currentSearch}
            category={
              isLocalTab ||
              isMundusTab
                ? ''
                : categories[0] || ''
            }
            onQueryChange={
              handleSearchChange
            }
            onCategoryChange={id => {

              if (
                isLocalTab ||
                isMundusTab
              ) {
                return
              }

              setCategories(
                id ? [id] : []
              )

            }}
          />

        </div>


        {/* LOCAL */}

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

        ) : isMundusTab ? (

          /* ERASMUS MUNDUS */

          <MundusProgramResults
            programs={MUNDUS_PROGRAMS}
            search={mundusSearch}
            page={mundusPage}
            onPageChange={
              setMundusPage
            }
          />

        ) : (

          /* ERASMUS + INTERNATIONAL */

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