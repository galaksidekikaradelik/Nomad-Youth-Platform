export const OPPORTUNITY_VALUE_TRANSLATIONS = {
  'İtaliya': { az: 'İtaliya', en: 'Italy', ru: 'Италия' },
  'Litva': { az: 'Litva', en: 'Lithuania', ru: 'Литва' },
  'Litvaniya': { az: 'Litvaniya', en: 'Lithuania', ru: 'Литва' },
  'Vyana': { az: 'Vyana', en: 'Vienna', ru: 'Вена' },
  'Budapeşt': { az: 'Budapeşt', en: 'Budapest', ru: 'Будапешт' },
  'Buxarest': { az: 'Buxarest', en: 'Bucharest', ru: 'Бухарест' },
  'Qaziantep': { az: 'Qaziantep', en: 'Gaziantep', ru: 'Газиантеп' },
  'Yozqat': { az: 'Yozqat', en: 'Yozgat', ru: 'Йозгат' },
  'online': { az: 'Onlayn', en: 'Online', ru: 'Онлайн' },
  'Online': { az: 'Onlayn', en: 'Online', ru: 'Онлайн' },
  'vebinar': { az: 'Vebinar', en: 'Webinar', ru: 'Вебинар' },
  'Malta': { az: 'Malta', en: 'Malta', ru: 'Мальта' },
  'Slovak Republic': { az: 'Slovakiya', en: 'Slovak Republic', ru: 'Словацкая Республика' },
}

export function translateOpportunityValue(value, lang) {
  if (!value) return value
  const clean = value.trim()
  return OPPORTUNITY_VALUE_TRANSLATIONS[clean]?.[lang] || value
}

export function translateFinancialSupport(value, lang) {
  if (!value || lang === 'az') return value

  const normalized = value.trim().toLowerCase()
  let key = null

  if (normalized.includes('qismən')) key = 'partial'
  else if (normalized.includes('maliyyələşdirmir')) key = 'none'
  else if (normalized.includes('tam')) key = 'full'

  const MAP = {
    full: { en: 'Fully funded', ru: 'Полностью финансируется' },
    partial: { en: 'Partially funded', ru: 'Частично финансируется' },
    none: { en: 'Not funded', ru: 'Не финансируется' },
  }

  return key ? MAP[key][lang] : value
}

export function translateDuration(value, lang) {
  if (!value || lang === 'az') return value

  const UNITS = {
    en: { həftə: 'weeks', ay: 'months', gün: 'days', il: 'years' },
    ru: { həftə: 'недель', ay: 'месяцев', gün: 'дней', il: 'лет' },
  }

  const units = UNITS[lang]
  if (!units) return value

  let result = value
  for (const [az, translated] of Object.entries(units)) {
    result = result.split(az).join(translated)
  }
  return result
}

const LANGUAGE_NAMES = {
  'İngilis': { en: 'English', ru: 'английский' },
  'Alman': { en: 'German', ru: 'немецкий' },
  'Fransız': { en: 'French', ru: 'французский' },
  'Rus': { en: 'Russian', ru: 'русский' },
  'Ukrayna': { en: 'Ukrainian', ru: 'украинский' },
  'Portuqal': { en: 'Portuguese', ru: 'португальский' },
  'Ərəb': { en: 'Arabic', ru: 'арабский' },
  'Çex': { en: 'Czech', ru: 'чешский' },
  'Azərbaycan': { en: 'Azerbaijani', ru: 'азербайджанский' },
}

const CONNECTORS = {
  'və ya': { en: 'or', ru: 'или' },
  'və': { en: 'and', ru: 'и' },
}

export function translateLanguageField(value, lang) {
  if (!value) return value
  if (lang === 'az') return value

  const trimmed = value.trim()
  if (/^qeyd olunmayıb$/i.test(trimmed)) {
    return lang === 'en' ? 'Not specified' : 'Не указано'
  }

  const parts = trimmed.split(/(,|;| və ya | və )/)

  const translated = parts.map((part) => {
    const cleanKey = part.trim().replace(/\s*dilində$/i, '').replace(/\s*dili$/i, '')
    if (LANGUAGE_NAMES[cleanKey]) return LANGUAGE_NAMES[cleanKey][lang]

    const connectorKey = part.trim()
    if (CONNECTORS[connectorKey]) return ` ${CONNECTORS[connectorKey][lang]} `

    return part
  })

  return translated
    .join('')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,;])/g, '$1')
    .replace(/([,;])(?!\s)/g, '$1 ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase())
}