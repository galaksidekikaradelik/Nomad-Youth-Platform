import { useEffect, useState } from 'react'
import { SERVICE_META, CATEGORY_META } from '../data/services'

// Bu hook yalnız id-lərlə işləyir, mətn (tərcümə) lazım deyil.
export default function useServicesUrlState() {
  const [activeCategory, setActiveCategory] = useState('membership')
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const categoryFromUrl = params.get('category')
    const shouldOpenService = params.get('open') === '1'

    const exists = CATEGORY_META.some((c) => c.id === categoryFromUrl)
    const targetCategory = exists ? categoryFromUrl : 'membership'

    setActiveCategory(targetCategory)

    if (shouldOpenService) {
      const categoryData = CATEGORY_META.find((c) => c.id === targetCategory)
      const firstServiceId = categoryData?.services?.[0]

      if (firstServiceId && SERVICE_META[firstServiceId]) {
        setSelectedId(firstServiceId)
      }
    }
  }, [])

  const selectCategory = (categoryId) => {
    setActiveCategory(categoryId)

    const params = new URLSearchParams(window.location.search)
    params.set('category', categoryId)

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    )
  }

  const openService = (id) => setSelectedId(id)
  const closeService = () => setSelectedId(null)

  return {
    activeCategory,
    selectedId,
    selectCategory,
    openService,
    closeService,
  }
}