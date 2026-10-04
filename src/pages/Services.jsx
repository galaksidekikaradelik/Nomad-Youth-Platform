import { useMemo } from 'react'

import Navbar from '../components/Navbar'
import ServicesHero from '../components/services/ServicesHero'
import CategoryGrid from '../components/services/CategoryGrid'
import ServiceList from '../components/services/ServiceList'
import ServiceModal from '../components/services/ServiceModal'

import useServicesUrlState from '../hooks/useServicesUrlState'
import { useLanguage } from '../hooks/useLanguage'

import {
  buildServiceContent,
  buildCategories,
} from '../data/services'

export default function NomadYouthServices() {
  const { t } = useLanguage()

  const {
    activeCategory,
    selectedId,
    selectCategory,
    openService,
    closeService,
  } = useServicesUrlState()

  const serviceContent = useMemo(
    () => buildServiceContent(t),
    [t]
  )

  const categories = useMemo(
    () => buildCategories(t),
    [t]
  )

  const selected = selectedId
    ? serviceContent[selectedId]
    : null

  const category = categories.find(
    (c) => c.id === activeCategory
  )

  return (
    <>
      <Navbar />

      <div className="ny-page">
        <ServicesHero />

        <CategoryGrid
          categories={categories}
          activeCategory={activeCategory}
          onSelect={selectCategory}
        />

        <ServiceList
          category={category}
          onOpen={openService}
          services={serviceContent}
        />

        <ServiceModal
          service={selected}
          onClose={closeService}
        />
      </div>
    </>
  )
}