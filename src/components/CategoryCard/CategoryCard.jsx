export default function CategoryCard({ icon, name, count, active, onClick }) {
  return (
    <button
      className={`category-card${active ? ' active' : ''}`}
      onClick={onClick}
    >
      <div className="category-card__icon">{icon}</div>
      <div>
        <div className="category-card__name">{name}</div>
        <div className="category-card__count">{count} imkan</div>
      </div>
    </button>
  )
}
