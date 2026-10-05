import { useState } from 'react'
import { Phone, Wrench, Shield, CheckCircle, ArrowRight, Search, Activity, Cpu, Settings, Star, AlertCircle, Clock } from 'lucide-react'
import { useApp } from '../context.jsx'
import { Link, useRouter } from '../router.jsx'
import { Stars } from '../components/Reviews.jsx'

export default function HomePage() {
  const { t, requests } = useApp()
  const { navigate } = useRouter()
  const [quickId, setQuickId] = useState('')

  const handleQuickTrack = e => {
    e.preventDefault()
    if (quickId.trim()) {
      navigate('/track', { id: quickId.trim() })
    } else {
      navigate('/track')
    }
  }

  const approvedReviews = requests.filter(r => r.review?.approved).slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="hero-pill-badge">
              <Shield className="ic" style={{ width: '1em', height: '1em' }} />
              <span>{t('hero_badge')}</span>
            </div>
            <h1>{t('hero_title')}</h1>
            <p className="hero-tag">{t('hero_desc')}</p>

            <div className="chips">
              <span className="chip">🌾 {t('chip_rice')}</span>
              <span className="chip">🧵 {t('chip_cloth')}</span>
              <span className="chip">🥜 {t('chip_cashew')}</span>
              <span className="chip">⚡ 415V Three-Phase Drives</span>
              <span className="chip">⚙️ Gearboxes & Elevators</span>
            </div>

            <div className="hero-actions">
              <Link to="/report" className="btn btn-accent btn-lg">
                <Wrench className="ic" /> {t('hero_cta_report')}
              </Link>
              <Link to="/services" className="btn btn-light btn-lg">
                <Settings className="ic" /> {t('hero_cta_calc')}
              </Link>
            </div>
          </div>

          {/* Lead Engineer ID Plate */}
          <aside className="plate" aria-label="Engineer Credentials">
            <div className="plate-top">
              <div className="plate-avatar" aria-hidden="true">VP</div>
              <div>
                <h2>V. Prasanna Rao</h2>
                <p className="role">{t('plate_role')}</p>
              </div>
            </div>
            <dl>
              <div>
                <dt>{t('plate_id')}</dt>
                <dd className="mono">VPE-IND-001</dd>
              </div>
              <div>
                <dt>{t('plate_exp')}</dt>
                <dd>{t('plate_exp_v')}</dd>
              </div>
              <div>
                <dt>{t('plate_qual')}</dt>
                <dd>{t('plate_qual_v')}</dd>
              </div>
              <div>
                <dt>{t('plate_area')}</dt>
                <dd>{t('plate_area_v')}</dd>
              </div>
            </dl>
            <div className="plate-verify">
              <CheckCircle className="ic" style={{ width: '1.1em', height: '1.1em' }} />
              <span>Registered Vendor across AP Industrial Estates</span>
            </div>
          </aside>
        </div>
      </section>

      {/* KPI Stats Strip */}
      <div className="wrap">
        <div className="kpi-strip">
          <div className="kpi-card">
            <b>12+</b>
            <span>{t('stat_exp')}</span>
          </div>
          <div className="kpi-card">
            <b>40+</b>
            <span>{t('stat_clients')}</span>
          </div>
          <div className="kpi-card">
            <b>500+</b>
            <span>{t('stat_machines')}</span>
          </div>
          <div className="kpi-card">
            <b>&lt; 4h</b>
            <span>{t('stat_response')}</span>
          </div>
        </div>
      </div>

      {/* Quick Track & Troubleshoot Callout Strip */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Quick Tracker Widget */}
            <div className="card" style={{ background: 'var(--surface)', borderLeft: '6px solid var(--brand)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Activity className="ic" style={{ color: 'var(--brand)' }} />
                <h3 style={{ fontSize: '1.25rem' }}>{t('track_title')}</h3>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.925rem', marginBottom: '16px' }}>
                Have an ongoing service ticket? Check engineer dispatch status, live visit date, and notes.
              </p>
              <form onSubmit={handleQuickTrack} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="e.g. VPE-REQ-4821"
                  value={quickId}
                  onChange={e => setQuickId(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary">
                  <Search className="ic" /> {t('track_btn')}
                </button>
              </form>
            </div>

            {/* Quick Troubleshooter Widget */}
            <div className="card" style={{ background: 'var(--surface)', borderLeft: '6px solid var(--accent)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <AlertCircle className="ic" style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '1.25rem' }}>{t('trouble_title')}</h3>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.925rem', marginBottom: '16px' }}>
                Machine stopped, overheating, or tripping? Run our 1-minute self-diagnostic helper.
              </p>
              <Link to="/troubleshoot" className="btn btn-outline" style={{ width: '100%' }}>
                <span>Launch Troubleshooter</span>
                <ArrowRight className="ic" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Specialized */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <span className="section-tag">Core Domain Expertise</span>
            <h2>Industries We Keep Moving Without Downtime</h2>
            <p className="lede">
              Tailored mechanical and electrical maintenance for Andhra Pradesh's backbone industries.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="card">
              <div className="service-icon-box" style={{ background: '#fef3c7', color: '#b45309' }}>🌾</div>
              <h3 style={{ fontSize: '1.3rem', marginBlock: '14px 8px' }}>Rice Processing Mills</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                Paddy pre-cleaners, rubber-roll de-huskers, bucket elevators, cone polishers, vibratory sifters, and high-load 3-phase induction motors.
              </p>
              <Link to="/report?cat=rice" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--brand)', fontWeight: '600', fontSize: '0.9rem' }}>
                Book Rice Mill Service <ArrowRight className="ic" style={{ width: '1em', height: '1em' }} />
              </Link>
            </div>

            <div className="card">
              <div className="service-icon-box" style={{ background: '#e0f2fe', color: '#0369a1' }}>🧵</div>
              <h3 style={{ fontSize: '1.3rem', marginBlock: '14px 8px' }}>Textile & Weaving Plants</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                Air-jet looms, rapier weaving drives, ring frames, inverter panels, synchronized servo tensioners, and high-speed bearing alignments.
              </p>
              <Link to="/report?cat=cloth" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--brand)', fontWeight: '600', fontSize: '0.9rem' }}>
                Book Textile Service <ArrowRight className="ic" style={{ width: '1em', height: '1em' }} />
              </Link>
            </div>

            <div className="card">
              <div className="service-icon-box" style={{ background: '#ecfdf5', color: '#047857' }}>🥜</div>
              <h3 style={{ fontSize: '1.3rem', marginBlock: '14px 8px' }}>Cashew Processing Units</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                Steam boiling cookers, rotary gas/wood roasters, peeling line blowers, vacuum tin sealers, and digital temperature control loops.
              </p>
              <Link to="/report?cat=cashew" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--brand)', fontWeight: '600', fontSize: '0.9rem' }}>
                Book Cashew Plant Service <ArrowRight className="ic" style={{ width: '1em', height: '1em' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reviews Highlight */}
      {approvedReviews.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
              <div>
                <span className="section-tag">Customer Trust</span>
                <h2>{t('rev_h')}</h2>
                <p className="lede">Real feedback from plant managers and mill owners across Andhra Pradesh.</p>
              </div>
              <Link to="/reviews" className="btn btn-outline">
                View All Reviews <ArrowRight className="ic" />
              </Link>
            </div>

            <div className="reviews-masonry">
              {approvedReviews.map(r => (
                <div key={r.id} className="rev-card">
                  <Stars n={r.review.rating} />
                  <p className="rev-text">"{r.review.text}"</p>
                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                    <p className="rev-author">{r.contact || r.owner}</p>
                    <p className="rev-meta">{r.company} • {t('ind_' + r.industry)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Emergency Call-out Banner */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--hero-bg), #062b20)', color: '#ffffff', padding: '40px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
              <div>
                <span style={{ color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>
                  Emergency On-Call Dispatch
                </span>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', marginTop: '6px' }}>
                  Is Your Production Line Halted Right Now?
                </h3>
                <p style={{ color: '#cbd5e1', maxWidth: '52ch', marginTop: '8px' }}>
                  Our lead technician responds immediately with spare components, thermal diagnostics, and emergency bypass capabilities.
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href={`tel:${t('emergency_phone')}`} className="btn btn-accent btn-lg">
                  <Phone className="ic" /> Call +91 98480 12345
                </a>
                <Link to="/report" className="btn btn-light btn-lg">
                  <Wrench className="ic" /> Submit Ticket Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
