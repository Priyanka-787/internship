import { useState } from 'react'
import { Phone, Shield, Sun, Moon, Menu, X, User, LogOut, Wrench, Search, AlertTriangle } from 'lucide-react'
import { useApp } from '../context.jsx'
import { NavLink, Link, useRouter } from '../router.jsx'

const LANGS = [
  ['en', 'EN', 'English'],
  ['hi', 'हिं', 'हिन्दी'],
  ['te', 'తె', 'తెలుగు']
]

export default function Header() {
  const { t, lang, setLang, theme, toggleTheme, user, setUser, setAuthMode, toast } = useApp()
  const { navigate } = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const out = () => {
    setUser(null)
    toast(t('a_out'))
    navigate('/')
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      {/* Emergency Hotline Strip */}
      <aside className="emergency-bar" aria-label="Emergency hotline banner">
        <div className="wrap emergency-inner">
          <div className="emergency-pulse">
            <span className="pulse-dot" aria-hidden="true"></span>
            <span>{t('emergency_title')}: <strong>{t('emergency_phone')}</strong></span>
            <span style={{ opacity: 0.85, fontSize: '0.8rem', display: 'none' }} className="d-sm-inline">({t('emergency_text')})</span>
          </div>
          <div className="emergency-links">
            <a href={`tel:${t('emergency_phone')}`} className="emergency-phone-btn">
              <Phone className="ic" style={{ width: '0.9em', height: '0.9em' }} /> {t('cta_call')}
            </a>
            <Link to="/track" className="emergency-phone-btn" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Search className="ic" style={{ width: '0.9em', height: '0.9em' }} /> {t('nav_track')}
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Glassmorphic Header */}
      <header className="top">
        <div className="wrap top-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand" onClick={closeMobile}>
            <div className="mark" aria-hidden="true">VP</div>
            <div className="brand-text">
              <span className="brand-name">Venkata Prasanna</span>
              <span className="brand-sub">Industrial Hardware Services</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-desktop" aria-label="Main Navigation">
            <NavLink to="/" className="nav-link">{t('nav_home')}</NavLink>
            <NavLink to="/about" className="nav-link">{t('nav_about')}</NavLink>
            <NavLink to="/services" className="nav-link">{t('nav_services')}</NavLink>
            <NavLink to="/experience" className="nav-link">{t('nav_experience')}</NavLink>
            <NavLink to="/track" className="nav-link">{t('nav_track')}</NavLink>
            <NavLink to="/troubleshoot" className="nav-link">{t('nav_troubleshoot')}</NavLink>
            <NavLink to="/reviews" className="nav-link">{t('nav_reviews')}</NavLink>
            <NavLink to="/contact" className="nav-link">{t('nav_contact')}</NavLink>
            {user && <NavLink to="/dashboard" className="nav-link">{t('nav_dash')}</NavLink>}
            {user?.role === 'engineer' && <NavLink to="/portal" className="nav-link">{t('nav_portal')}</NavLink>}
          </nav>

          {/* Action Utilities (Theme, Lang, Auth) */}
          <div className="header-actions">
            {/* Theme Toggle */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t('theme_light') : t('theme_dark')}
              title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
            >
              {theme === 'dark' ? <Sun className="ic" style={{ color: '#fbbf24' }} /> : <Moon className="ic" />}
            </button>

            {/* Language Switcher */}
            <div className="lang-picker" role="group" aria-label={t('lang_label')}>
              {LANGS.map(([c, s, n]) => (
                <button
                  key={c}
                  type="button"
                  className="lang-btn"
                  aria-label={n}
                  aria-pressed={lang === c}
                  onClick={() => setLang(c)}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Auth Slot */}
            <div className="auth-btn-group">
              {user ? (
                <>
                  <Link to="/dashboard" className="who-pill">
                    <User className="ic" style={{ width: '1em', height: '1em' }} />
                    <span>{user.name}</span>
                    <span className="who-role-badge">{user.role}</span>
                  </Link>
                  <button className="btn btn-ghost btn-sm" onClick={out} title={t('signout')}>
                    <LogOut className="ic" />
                  </button>
                </>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={() => setAuthMode('in')}>
                  {t('signin')}
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="ic" /> : <Menu className="ic" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <nav className="mobile-drawer" aria-label="Mobile Navigation">
            <NavLink to="/" className="nav-link" onClick={closeMobile}>{t('nav_home')}</NavLink>
            <NavLink to="/about" className="nav-link" onClick={closeMobile}>{t('nav_about')}</NavLink>
            <NavLink to="/services" className="nav-link" onClick={closeMobile}>{t('nav_services')}</NavLink>
            <NavLink to="/experience" className="nav-link" onClick={closeMobile}>{t('nav_experience')}</NavLink>
            <NavLink to="/track" className="nav-link" onClick={closeMobile}>{t('nav_track')}</NavLink>
            <NavLink to="/troubleshoot" className="nav-link" onClick={closeMobile}>{t('nav_troubleshoot')}</NavLink>
            <NavLink to="/reviews" className="nav-link" onClick={closeMobile}>{t('nav_reviews')}</NavLink>
            <NavLink to="/contact" className="nav-link" onClick={closeMobile}>{t('nav_contact')}</NavLink>
            {user && <NavLink to="/dashboard" className="nav-link" onClick={closeMobile}>{t('nav_dash')}</NavLink>}
            {user?.role === 'engineer' && <NavLink to="/portal" className="nav-link" onClick={closeMobile}>{t('nav_portal')}</NavLink>}
            
            <div className="mobile-drawer-bottom">
              <Link to="/report" className="btn btn-accent btn-sm" onClick={closeMobile} style={{ width: '100%' }}>
                <Wrench className="ic" /> {t('cta_report')}
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
