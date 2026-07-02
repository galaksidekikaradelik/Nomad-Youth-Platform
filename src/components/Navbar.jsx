import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import logo from '../assets/images/logo.png'

const LANGUAGES = [
  { code: 'az', label: 'Azərbaycan' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
]

const MoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
)

const SunIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

function getInitialDarkMode() {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
    return true
  }
  return false
}

export default function Navbar() {
  const { lang, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(getInitialDarkMode)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const langMenuRef = useRef(null)

  const links = [
    { to: '/',              label: t('nav_home') },
    { to: '/opportunities', label: t('nav_opportunities') },
    { to: '/services',      label: t('nav_services') },
    { to: '/faq',           label: t('nav_faq') },
    { to: '/about',         label: t('nav_about') },
    { to: '/contact',       label: t('nav_contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const toggleDarkMode = () => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const handleLinkClick = () => setMenuOpen(false)

  const selectLang = (code) => {
    setLanguage(code)
    setLangMenuOpen(false)
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo">
            <img src={logo} alt="Nomad Youth" style={{ height: '160px', width: 'auto' }} />
          </Link>

          <ul className="navbar__links">
            {links.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) => 'navbar__link' + (isActive ? ' active' : '')}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <div className="navbar__lang-wrap" ref={langMenuRef}>
              <button
                className="navbar__lang-btn"
                onClick={() => setLangMenuOpen(o => !o)}
                aria-label="Dil seçimi"
              >
                {lang.toUpperCase()}
              </button>

              {langMenuOpen && (
                <div className="navbar__lang-dropdown">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      className={`navbar__lang-option${l.code === lang ? ' active' : ''}`}
                      onClick={() => selectLang(l.code)}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="navbar__theme-btn"
              onClick={toggleDarkMode}
              aria-label="Tema dəyiş"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <Link to="/opportunities" className="navbar__cta">{t('nav_cta')}</Link>
          </div>

          <button
            className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menyu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => 'navbar__link' + (isActive ? ' active' : '')}
            onClick={handleLinkClick}
          >
            {l.label}
          </NavLink>
        ))}

        <div className="navbar__mobile-actions">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              className={`navbar__lang-btn${l.code === lang ? ' active' : ''}`}
              onClick={() => selectLang(l.code)}
            >
              {l.code.toUpperCase()}
            </button>
          ))}
          <button className="navbar__theme-btn" onClick={toggleDarkMode} aria-label="Tema dəyiş">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <Link to="/opportunities" className="navbar__cta" onClick={handleLinkClick}>
          {t('nav_cta')}
        </Link>
      </div>
    </>
  )
}