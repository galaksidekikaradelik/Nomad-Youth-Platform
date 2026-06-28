import { useState } from 'react'
import { LanguageContext } from './languageContextValue'
import { translations } from '../data/translations'

const LANG_ORDER = ['az', 'en', 'ru']

function getInitialLang() {
  const saved = localStorage.getItem('lang')
  return LANG_ORDER.includes(saved) ? saved : 'az'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  const toggleLang = () => {
    const currentIndex = LANG_ORDER.indexOf(lang)
    const next = LANG_ORDER[(currentIndex + 1) % LANG_ORDER.length]
    setLang(next)
    localStorage.setItem('lang', next)
  }

  const t = (key) => {
    return translations[lang]?.[key] ?? translations.az[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}