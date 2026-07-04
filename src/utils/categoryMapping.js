// Excel/Sheets-dən gələn xam kateqoriya adını əsas (canonical) kateqoriyaya map edir.
// Filter dropdown, badge rəngi və tərcümə HAMISI bu əsas kateqoriyaya görə işləyir.

export const CANONICAL_CATEGORIES = [
  'Təhsil',
  'Texnologiya',
  'Sahibkarlıq',
  'Liderlik',
  'Tərəfdaşlıq',
  'Ekologiya',
  'Rifah',
  'Mədəniyyət',
  'Media',
  'Hüquq',
  'Sülh',
  'Gənclər',
]

// Xam ad -> əsas kateqoriya
const CATEGORY_MAP = {
  'Təhsil': 'Təhsil',
  'E-təhsil': 'Təhsil',

  'Rifah': 'Rifah',
  'Psixologiya': 'Rifah',
  'Autizm': 'Rifah',
  'Sağlamlıq': 'Rifah',

  'Gənclər': 'Gənclər',

  'Təşkilatçılıq': 'Liderlik',
  'İdarəetmə': 'Liderlik',
  'Mentorluq': 'Liderlik',

  'Sahibkarlıq': 'Sahibkarlıq',

  'Media': 'Media',

  'Yaradıcılıq': 'Mədəniyyət',
  'Mədəniyyət': 'Mədəniyyət',

  'Texnologiya': 'Texnologiya',
  'Rəqəmsallaşma': 'Texnologiya',

  'Ekologiya': 'Ekologiya',

  'Hüquq': 'Hüquq',

  'Sülh': 'Sülh',

  'Tərəfdaşlıq': 'Tərəfdaşlıq',
  'İnteqrasiya': 'Tərəfdaşlıq',
}

/**
 * Xam kateqoriya adını əsas kateqoriyaya çevirir.
 * Xəritədə tapılmasa, adı olduğu kimi qaytarır (fallback).
 */
export function getCanonicalCategory(rawCategory) {
  if (!rawCategory) return rawCategory
  return CATEGORY_MAP[rawCategory.trim()] || rawCategory.trim()
}

/**
 * Kateqoriya massivini əsas kateqoriyalara çevirir və təkrarları silir.
 * Məs: ["Psixologiya", "kurs"] -> ["Rifah", "kurs"]
 */
export function mapCategoriesToCanonical(categories) {
  if (!Array.isArray(categories)) return []
  const mapped = categories.map(getCanonicalCategory)
  return [...new Set(mapped)]
}