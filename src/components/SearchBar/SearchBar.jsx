import { useState } from 'react'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)

export default function SearchBar({ onSearch, placeholder = 'İmkan axtar...', categories = [] }) {
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('')

  const handleSearch = () => {
    if (onSearch) onSearch({ query, category })
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="search-bar">
      <span className="search-bar__icon">
        <SearchIcon />
      </span>

      <input
        className="search-bar__input"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKey}
      />

      {categories.length > 0 && (
        <>
          <div className="search-bar__divider" />
          <select
            className="search-bar__select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">Bütün kateqoriyalar</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </>
      )}

      <button className="search-bar__btn" onClick={handleSearch}>
        Axtar
      </button>
    </div>
  )
}
