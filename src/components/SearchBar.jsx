import { useLanguage } from '../hooks/useLanguage'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

export default function SearchBar({ placeholder, query, category, onQueryChange, onCategoryChange }) {
  const { t } = useLanguage()

  return (
    <div className="search-bar">
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
        <option value="Könüllülük">Könüllülük</option>
        <option value="Erasmus+">Erasmus+</option>
        <option value="ESC">ESC</option>
        <option value="Təcrübə">Təcrübə</option>
        <option value="Təlim">Təlim</option>
        <option value="Qrant">Qrant</option>
        <option value="Konfrans">Konfrans</option>
      </select>
    </div>
  )
}