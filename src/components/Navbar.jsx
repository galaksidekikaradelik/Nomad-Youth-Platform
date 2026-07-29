import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { User, LayoutDashboard, Settings, LogOut } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import logoLight from '../assets/images/logo-light2.png'
import logoDark from '../assets/images/logo-dark2.png'
import { useAuth } from "../hooks/useAuth";
import NotificationsDropdown from './NotificationsDropdown'
import Avatar from './Avatar'
import EmailVerificationBanner from './EmailVerificationBanner'

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
  const { user, logout } = useAuth();
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(getInitialDarkMode)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const langMenuRef = useRef(null)
  const profileMenuRef = useRef(null)

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
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
  document.body.style.overflow = menuOpen ? 'hidden' : '';

  return () => {
    document.body.style.overflow = '';
  };
}, [menuOpen]);

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

  const handleLogout = () => {
    logout()
    setProfileMenuOpen(false)
  }

  const goToProfileSettings = () => {
    navigate('/profile', { state: { view: 'settings' } })
    setProfileMenuOpen(false)
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo">
            <img src={darkMode ? logoDark : logoLight} alt="Nomad Youth" style={{ height: '60px', width: 'auto' }} />
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
                aria-label={t('nav_lang_select_aria')}
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
              aria-label={t('nav_theme_toggle_aria')}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {user && <NotificationsDropdown />}

            {user ? (
              <div className="navbar__profile-wrap" ref={profileMenuRef}>
                <button
                  className="navbar__avatar-btn"
                  onClick={() => setProfileMenuOpen(o => !o)}
                  aria-label={t('nav_profile')}
                >
                  <Avatar user={user} size={36} />
                </button>

                {profileMenuOpen && (
                  <div className="navbar__profile-dropdown">
                    <div className="navbar__profile-info">
                      <div className="navbar__profile-name">{user?.name || user?.email}</div>
                      {(user?.major || user?.university) && (
                        <div className="navbar__profile-sub">{user?.major || user?.university}</div>
                      )}
                    </div>

                    <div className="navbar__profile-divider" />

                    <Link to="/profile" className="navbar__profile-item" onClick={() => setProfileMenuOpen(false)}>
                      <User size={16} /> {t('nav_profile')}
                    </Link>
                    <Link to="/dashboard" className="navbar__profile-item" onClick={() => setProfileMenuOpen(false)}>
                      <LayoutDashboard size={16} /> {t('nav_dashboard')}
                    </Link>
                    <button type="button" className="navbar__profile-item" onClick={goToProfileSettings}>
                      <Settings size={16} /> {t('nav_settings')}
                    </button>

                    <div className="navbar__profile-divider" />

                    <button className="navbar__profile-item navbar__profile-item--danger" onClick={handleLogout}>
                      <LogOut size={16} /> {t('nav_logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/register" className="navbar__cta">
                {t('nav_create_account')}
              </Link>
            )}
          </div>

          <button
            className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={t('nav_menu_aria')}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <EmailVerificationBanner />

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

        {user ? (
          <>
            
            <Link to="/profile" className="navbar__link" onClick={handleLinkClick}>
              <User size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} /> {t('nav_profile')}
            </Link>
            <Link to="/dashboard" className="navbar__link" onClick={handleLinkClick}>
              <LayoutDashboard size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} /> {t('nav_dashboard')}
            </Link>
            <button type="button" className="navbar__link" onClick={goToProfileSettings} style={{ textAlign: 'left', width: '100%' }}>
              <Settings size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} /> {t('nav_settings')}
            </button>

            <button
              className="navbar__cta"
              onClick={() => {
                logout();
                handleLinkClick();
              }}
            >
              {t('nav_logout')}
            </button>
          </>
        ) : (
          <Link to="/register" className="navbar__cta" onClick={handleLinkClick}>
            {t('nav_create_account')}
          </Link>
        )}
      </div>
    </>
  )
}