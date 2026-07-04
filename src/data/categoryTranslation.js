// Kateqoriya adları data-da (Google Sheets) İngiliscə saxlanılır.
// Bu fayl həmin İngiliscə adları AZ/EN/RU-ya çevirmək üçündür.
// Filtrasiya və data uyğunluğu üçün "id" (İngiliscə) dəyişməz qalır, yalnız görünüş dəyişir.

export const categoryTranslations = {
  'Təhsil':           { az: 'Təhsil',              en: 'Education',           ru: 'Образование' },
  'Texnologiya':        { az: 'Texnologiya',            en: 'Technology',        ru: 'Технологии' },
  'Sahibkarlıq':           { az: 'Sahibkarlıq',            en: 'Entrepreneurship',           ru: 'Предпринимательство' },
  'Liderlik':         { az: 'Liderlik',              en: 'Leadership',         ru: 'Лидерство' },
  'Tərəfdaşlıq':             { az: 'Tərəfdaşlıq',             en: 'Partnership',             ru: 'Партнёрство' },
  'Ekologiya':  { az: 'Ekologiya',         en: 'Environment',  ru: 'Окружающая среда' },
  'Rifah':        { az: 'Rifah',          en: 'Well-being',        ru: 'Благополучие' },
  'Mədəniyyət':       { az: 'Mədəniyyət',         en: 'Culture',       ru: 'Культура' },
  'Media':    { az: 'Media',          en: 'Media',    ru: 'Медиа' },
  'Hüquq':      { az: 'Hüquq',     en: 'Law',      ru: 'Право' },
  'Sülh':  { az: 'Sülh',  en: 'Peace',  ru: 'Мир' },
  'Gənclər':           { az: 'Gənclər',          en: 'Youth',           ru: 'Молодёжь' },

  // Spesifik alt-kateqoriyalar (badge-də göstərilir, filtr üçün yuxarıdakı 12-yə map olunur)
  'Psixologiya':       { az: 'Psixologiya',       en: 'Psychology',        ru: 'Психология' },
  'Autizm':            { az: 'Autizm',            en: 'Autism',            ru: 'Аутизм' },
  'Sağlamlıq':         { az: 'Sağlamlıq',         en: 'Health',            ru: 'Здоровье' },
  'Təşkilatçılıq':     { az: 'Təşkilatçılıq',     en: 'Organization',      ru: 'Организация' },
  'İdarəetmə':         { az: 'İdarəetmə',         en: 'Management',        ru: 'Управление' },
  'Mentorluq':         { az: 'Mentorluq',         en: 'Mentoring',         ru: 'Наставничество' },
  'Yaradıcılıq':       { az: 'Yaradıcılıq',       en: 'Creativity',        ru: 'Творчество' },
  'Rəqəmsallaşma':     { az: 'Rəqəmsallaşma',     en: 'Digitalization',    ru: 'Цифровизация' },
  'İnteqrasiya':       { az: 'İnteqrasiya',       en: 'Integration',       ru: 'Интеграция' },
  'E-təhsil':          { az: 'E-təhsil',          en: 'E-learning',        ru: 'Электронное обучение' },
}

// category: İngiliscə original dəyər (data-dan), lang: 'az' | 'en' | 'ru'
export function translateCategory(category, lang) {
  return categoryTranslations[category]?.[lang] || category
}