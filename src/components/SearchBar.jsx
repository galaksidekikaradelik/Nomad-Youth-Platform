import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

export default function SearchBar({ onSearch }) {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.({ query, category })
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-bar__icon"><SearchIcon /></span>
      <input
        type="text"
        className="search-bar__input"
        placeholder={t('search_placeholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <span className="search-bar__divider" />
      <select
        className="search-bar__select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">{t('search_all_categories')}</option>
        <option value="grant">Qrant</option>
        <option value="internship">Təcrübə</option>
        <option value="volunteering">Könüllülük</option>
        <option value="training">Təlim</option>
        <option value="event">Tədbir</option>
      </select>
      <button type="submit" className="search-bar__btn">{t('search_btn')}</button>
    </form>
  )
}