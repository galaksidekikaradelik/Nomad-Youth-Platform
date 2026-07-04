import { useLanguage } from '../hooks/useLanguage'
import { translateCategory } from '../data/categoryTranslation'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

export default function SearchBar({
  placeholder,
  query,
  category,
  onQueryChange,
  onCategoryChange,
  onSubmit,
  showButton = false,
}) {
  const { t, lang } = useLanguage()

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ query, category })
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-bar__icon"><SearchIcon /></span>
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder || t('search_placeholder')}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <span className="search-bar__divider" />
      <select
        className="search-bar__select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">{t('search_all_categories')}</option>
        <option value="Climate">{translateCategory('Climate', lang)}</option>
        <option value="Leadership">{translateCategory('Leadership', lang)}</option>
        <option value="Digital">{translateCategory('Digital', lang)}</option>
        <option value="Education">{translateCategory('Education', lang)}</option>
        <option value="Youth">{translateCategory('Youth', lang)}</option>
        <option value="Entrepreneurship">{translateCategory('Entrepreneurship', lang)}</option>
        <option value="Innovation">{translateCategory('Innovation', lang)}</option>
        <option value="Environment">{translateCategory('Environment', lang)}</option>
        <option value="Sustainability">{translateCategory('Sustainability', lang)}</option>
        <option value="Human Rights">{translateCategory('Human Rights', lang)}</option>
        <option value="Social Inclusion">{translateCategory('Social Inclusion', lang)}</option>
        <option value="Culture">{translateCategory('Culture', lang)}</option>
        <option value="Volunteering">{translateCategory('Volunteering', lang)}</option>
        <option value="Business">{translateCategory('Business', lang)}</option>
        <option value="Startups">{translateCategory('Startups', lang)}</option>
        <option value="AI">{translateCategory('AI', lang)}</option>
        <option value="Technology">{translateCategory('Technology', lang)}</option>
        <option value="Erasmus+">{translateCategory('Erasmus+', lang)}</option>
        <option value="Mobility">{translateCategory('Mobility', lang)}</option>
        <option value="Health">{translateCategory('Health', lang)}</option>
        <option value="Well-being">{translateCategory('Well-being', lang)}</option>
      </select>
      {showButton && (
        <button type="submit" className="search-bar__btn">{t('search_btn')}</button>
      )}
    </form>
  )
}