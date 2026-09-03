import { CANONICAL_CATEGORIES } from './categoryMapping'

export const ORG_CATEGORIES = [
  { id: '', labelKey: 'category_all' },
  ...CANONICAL_CATEGORIES.map(id => ({
    id,
    labelKey: null,
  })),
]

export const ORG_SORT_OPTIONS = [
  { id: 'rating', labelKey: 'org_sort_rating' },
  { id: 'active', labelKey: 'org_sort_active' },
  { id: 'name', labelKey: 'org_sort_name' },
]

export const ORG_PAGE_SIZE = 6

