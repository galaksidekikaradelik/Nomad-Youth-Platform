import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/',              label: 'Ana Səhifə' },
  { to: '/opportunities', label: 'İmkanlar' },
  { to: '/events',        label: 'Tədbirlər' },
  { to: '/trainings',     label: 'Təlimlər' },
  { to: '/about',         label: 'Haqqımızda' },
  { to: '/contact',       label: 'Əlaqə' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo" onClick={handleLinkClick}>
            <span className="navbar__logo-dot" />
            Nomad Youth
          </Link>

          <ul className="navbar__links">
            {links.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    'navbar__link' + (isActive ? ' active' : '')
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/opportunities" className="navbar__cta" style={{ display: 'none' }}>
            İmkan Tap
          </Link>

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
            className={({ isActive }) =>
              'navbar__link' + (isActive ? ' active' : '')
            }
            onClick={handleLinkClick}
          >
            {l.label}
          </NavLink>
        ))}
        <Link to="/opportunities" className="navbar__cta" onClick={handleLinkClick}>
          İmkan Tap
        </Link>
      </div>
    </>
  )
}