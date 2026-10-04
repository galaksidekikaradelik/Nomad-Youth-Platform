import CategoryCard from './CategoryCard'

export default function CategoryGrid({ categories, activeCategory, onSelect }) {
  return (
    <section className="ny-container">
      <div className="ny-cat-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}
