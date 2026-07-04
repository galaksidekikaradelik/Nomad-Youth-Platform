
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


export function getCanonicalCategory(rawCategory) {
  if (!rawCategory) return rawCategory
  return CATEGORY_MAP[rawCategory.trim()] || rawCategory.trim()
}


export function mapCategoriesToCanonical(categories) {
  if (!Array.isArray(categories)) return []
  const mapped = categories.map(getCanonicalCategory)
  return [...new Set(mapped)]
}