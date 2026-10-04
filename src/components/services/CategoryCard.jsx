import { ArrowRight } from 'lucide-react'

export default function CategoryCard({ category, isActive, onSelect }) {
  const Icon = category.icon

  return (
    <button
      className={`ny-card ${isActive ? 'ny-card--active' : ''}`}
      onClick={() => onSelect(category.id)}
    >
      <div className="ny-icon-badge">
        {Icon ? <Icon size={22} strokeWidth={1.8} /> : null}
      </div>

      <div className="ny-card-title">{category.title}</div>

      <div className="ny-card-desc">{category.services.length} xidmət</div>

      <span className="ny-card-link">
        {isActive ? 'Xidmətləri göstərilir' : 'Xidmətlərə bax'}
        <ArrowRight size={14} />
      </span>
    </button>
  )
}
