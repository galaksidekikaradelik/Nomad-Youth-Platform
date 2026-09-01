import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useOpportunities } from '../hooks/useOpportunities'
import { useOpportunityFilters } from '../hooks/useOpportunityFilters'
import SearchBar from '../components/SearchBar'
import OpportunityFilters from '../components/OpportunityFilters'
import OpportunityResults from '../components/OpportunityResults'
import { PROJECT_TABS } from '../utils/opportunityFilters.constants'

export default function Opportunities() {
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()

  const initialQuery = searchParams.get('query') || ''
  const initialCategory = searchParams.get('category') || ''
  const highlightOppKey = searchParams.get('show') || null

  const { opportunities, loading, error } = useOpportunities()

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

  return (
    <div className="section">
      <div className="container">
        <div className="page-header">
          <div className="page-header__eyebrow">{t('opp_eyebrow')}</div>
          <h1 className="page-header__title">{t('opp_title')}</h1>
          <p className="page-header__desc">{t('opp_desc')}</p>
        </div>

        <div className="opportunities-tabs">
          {PROJECT_TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`opportunities-tab ${
                activeTab === tab.id ? 'active' : ''
              }`}
              onClick={() => {
                setActiveTab(tab.id)
                setPage(0)
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="opportunities-searchbar-wrap">
          <SearchBar
            placeholder={t('opp_search_placeholder')}
            query={search}
            category={categories[0] || ''}
            onQueryChange={setSearch}
            onCategoryChange={(id) => setCategories(id ? [id] : [])}
          />
        </div>

        <OpportunityFilters
          t={t}
          lang={lang}
          categories={categories}
          toggleCategory={toggleCategory}
          types={types}
          toggleType={toggleType}
          format={format}
          toggleFormat={toggleFormat}
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
      </div>
    </div>
  )
}