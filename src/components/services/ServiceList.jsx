import { useMemo } from 'react'

import ServiceCard from './ServiceCard'
import { buildServiceContent } from '../../data/services'
import { useLanguage } from '../../hooks/useLanguage'

export default function ServiceList({ category, onOpen }) {
  const { t } = useLanguage()
  const serviceContent = useMemo(() => buildServiceContent(t), [t])

  if (!category) return null

  return (
    <section className="ny-container ny-services-section">
      <h2 className="ny-section-title">{category.title}</h2>

      <p className="ny-section-sub">
        {t('service_list_count').replace('{count}', category.services.length)}
      </p>

      <div className="ny-grid">
        {category.services.map((id) => {
          const service = serviceContent[id]

          if (!service) return null

          return (
            <ServiceCard
              key={id}
              service={service}
              onOpen={() => onOpen(id)}
            />
          )
        })}
      </div>
    </section>
  )
}