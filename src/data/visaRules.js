export const VISA_RULES = {
  'Albaniya': 'VISA_FREE',
  'Belarus': 'VISA_FREE',
  'Birləşmiş Ərəb Əmirlikləri': 'VISA_FREE',
  'Bosniya və Herseqovina': 'VISA_FREE',
  'Çin': 'VISA_FREE',
  'Gürcüstan': 'VISA_FREE',
  'İran': 'VISA_FREE',
  'Qazaxıstan': 'VISA_FREE',
  'Qırğızıstan': 'VISA_FREE',
  'Livan': 'VISA_FREE',
  'Malayziya': 'VISA_FREE',
  'Maldiv': 'VISA_FREE',
  'Mərakeş': 'VISA_FREE',
  'Moldova': 'VISA_FREE',
  'Özbəkistan': 'VISA_FREE',
  'Qatar': 'VISA_FREE',
  'Qətər': 'VISA_FREE',
  'Rusiya': 'VISA_FREE',
  'Serbiya': 'VISA_FREE',
  'Tacikistan': 'VISA_FREE',
  'Türkiyə': 'VISA_FREE',
  'Ukrayna': 'VISA_FREE',
}

export function getVisaType(country) {
  if (!country) return null

  return VISA_RULES[country] ?? 'VISA_REQUIRED'
}