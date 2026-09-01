import { CANONICAL_CATEGORIES } from './categoryMapping'

export const PROJECT_TABS = [
  {
    id: 'erasmus',
    label: 'Erasmus layihələri',
  },
  {
    id: 'international',
    label: 'Beynəlxalq imkanlar',
  },
  {
    id: 'local',
    label: 'Yerli imkanlar',
  },
]

export const CATEGORIES = [
  { id: '', labelKey: 'category_all' },
  ...CANONICAL_CATEGORIES.map(id => ({
    id,
    labelKey: null,
  })),
]

export const TYPES = [
  { id: '', labelKey: 'type_all' },
  { id: 'Seminar', labelKey: 'type_seminar' },
  { id: 'Kurs', labelKey: 'type_course' },
  { id: 'Konfrans', labelKey: 'type_conference' },
  { id: 'Vebinar', labelKey: 'type_webinar' },
  { id: 'Fəaliyyət', labelKey: 'type_activity' },
]

export const FORMATS = [
  { id: 'Hamısı', labelKey: 'format_all' },
  { id: 'Online', labelKey: 'format_online' },
  { id: 'Offline', labelKey: 'format_onsite' },
]

export const SORT_OPTIONS = [
  { id: 'deadline', labelKey: 'sort_deadline' },
  { id: 'newest', labelKey: 'sort_newest' },
  { id: 'country', labelKey: 'sort_country' },
]

export const PAGE_SIZE = 12