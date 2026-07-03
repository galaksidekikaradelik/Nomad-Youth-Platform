import { useState } from 'react'
import { LanguageContext } from './languageContextValue'
import az from '../translation/az.json'
import en from '../translation/en.json'
import ru from '../translation/ru.json'

const translations = { az, en, ru }

const LANG_ORDER = ['az', 'en', 'ru']

function getInitialLang() {
  const saved = localStorage.getItem('lang')
  return LANG_ORDER.includes(saved) ? saved : 'az'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  const setLanguage = (code) => {
    if (!LANG_ORDER.includes(code)) return
    setLang(code)
    localStorage.setItem('lang', code)
  }

  const t = (key) => {
    return translations[lang]?.[key] ?? translations.az[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}