// Kateqoriya adları data-da (Google Sheets) İngiliscə saxlanılır.
// Bu fayl həmin İngiliscə adları AZ/EN/RU-ya çevirmək üçündür.
// Filtrasiya və data uyğunluğu üçün "id" (İngiliscə) dəyişməz qalır, yalnız görünüş dəyişir.

export const categoryTranslations = {
  'Climate':           { az: 'İqlim',              en: 'Climate',           ru: 'Климат' },
  'Leadership':        { az: 'Liderlik',            en: 'Leadership',        ru: 'Лидерство' },
  'Digital':           { az: 'Rəqəmsal',            en: 'Digital',           ru: 'Цифровые технологии' },
  'Education':         { az: 'Təhsil',              en: 'Education',         ru: 'Образование' },
  'Youth':             { az: 'Gənclər',             en: 'Youth',             ru: 'Молодёжь' },
  'Entrepreneurship':  { az: 'Sahibkarlıq',         en: 'Entrepreneurship',  ru: 'Предпринимательство' },
  'Innovation':        { az: 'İnnovasiya',          en: 'Innovation',        ru: 'Инновации' },
  'Environment':       { az: 'Ətraf mühit',         en: 'Environment',       ru: 'Окружающая среда' },
  'Sustainability':    { az: 'Davamlılıq',          en: 'Sustainability',    ru: 'Устойчивость' },
  'Human Rights':      { az: 'İnsan Hüquqları',     en: 'Human Rights',      ru: 'Права человека' },
  'Social Inclusion':  { az: 'Sosial İnklüzivlik',  en: 'Social Inclusion',  ru: 'Социальная инклюзия' },
  'Culture':           { az: 'Mədəniyyət',          en: 'Culture',           ru: 'Культура' },
  'Volunteering':      { az: 'Könüllülük',          en: 'Volunteering',      ru: 'Волонтёрство' },
  'Business':          { az: 'Biznes',              en: 'Business',          ru: 'Бизнес' },
  'Startups':          { az: 'Startaplar',          en: 'Startups',          ru: 'Стартапы' },
  'AI':                { az: 'Süni İntellekt',      en: 'AI',                ru: 'ИИ' },
  'Technology':        { az: 'Texnologiya',         en: 'Technology',        ru: 'Технологии' },
  'Erasmus+':          { az: 'Erasmus+',            en: 'Erasmus+',          ru: 'Erasmus+' },
  'Mobility':          { az: 'Mobillik',            en: 'Mobility',          ru: 'Мобильность' },
  'Health':            { az: 'Sağlamlıq',           en: 'Health',            ru: 'Здоровье' },
  'Well-being':        { az: 'Rifah',               en: 'Well-being',        ru: 'Благополучие' },
}

// category: İngiliscə original dəyər (data-dan), lang: 'az' | 'en' | 'ru'
export function translateCategory(category, lang) {
  return categoryTranslations[category]?.[lang] || category
}