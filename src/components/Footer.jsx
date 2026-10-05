import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react'
import { useApp } from '../context.jsx'
import { Link } from '../router.jsx'

export default function Footer() {
  const { t } = useApp()

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          {/* Col 1: Brand & Profile */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div className="mark" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>VP</div>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Venkata Prasanna Enterprises</h4>
            </div>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
              Specialized on-site industrial machinery diagnostics, electrical panel troubleshooting, motor overhauls, and preventive maintenance for rice mills, textile units, and cashew processing plants across Andhra Pradesh.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--brand)', fontWeight: '600' }}>
              <ShieldCheck className="ic" />
              <span>Certified Electrical & Industrial Service Engineer</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('nav_home')}</Link></li>
              <li><Link to="/about">{t('nav_about')}</Link></li>
              <li><Link to="/services">{t('nav_services')}</Link></li>
              <li><Link to="/experience">{t('nav_experience')}</Link></li>
              <li><Link to="/track">{t('nav_track')}</Link></li>
              <li><Link to="/troubleshoot">{t('nav_troubleshoot')}</Link></li>
              <li><Link to="/reviews">{t('nav_reviews')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div className="footer-col">
            <h4>Machinery Services</h4>
            <ul className="footer-links">
              <li><Link to="/report?cat=rice">{t('chip_rice')} Service</Link></li>
              <li><Link to="/report?cat=cloth">{t('chip_cloth')} Maintenance</Link></li>
              <li><Link to="/report?cat=cashew">{t('chip_cashew')} Burner Units</Link></li>
              <li><Link to="/services">Emergency Breakdown Repair</Link></li>
              <li><Link to="/services">Preventive AMC Audits</Link></li>
              <li><Link to="/services">Control Panel & VFD Diagnostics</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Service Area */}
          <div className="footer-col">
            <h4>Service Base & Contact</h4>
            <p style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <MapPin className="ic" style={{ color: 'var(--brand)' }} />
              <span>Rajahmundry & Coverage Across East Godavari, West Godavari, Guntur, Krishna & Srikakulam</span>
            </p>
            <p style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <Phone className="ic" style={{ color: 'var(--brand)' }} />
              <a href="tel:+919848012345" style={{ fontFamily: 'var(--font-mono)', fontWeight: '600' }}>+91 98480 12345</a>
            </p>
            <p style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <Mail className="ic" style={{ color: 'var(--brand)' }} />
              <a href="mailto:service@vpe.example">service@vpe.example</a>
            </p>
            <p style={{ display: 'flex', gap: '8px' }}>
              <Clock className="ic" style={{ color: 'var(--brand)' }} />
              <span>Mon - Sat: 8:00 AM - 7:00 PM (24/7 Breakdown Hotline)</span>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>© 2026 Venkata Prasanna Enterprises. All rights reserved.</span>
          <span>{t('foot')}</span>
        </div>
      </div>
    </footer>
  )
}
