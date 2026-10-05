import { useState, useEffect } from 'react'
import { Search, CheckCircle, Clock, AlertTriangle, ArrowRight, Printer, Phone, MessageSquare, Wrench, Shield, FileText } from 'lucide-react'
import { useApp } from '../context.jsx'
import { useRouter } from '../router.jsx'
import JobCardModal from '../components/JobCardModal.jsx'

export default function TrackPage() {
  const { t, requests } = useApp()
  const { query, navigate } = useRouter()
  const [searchId, setSearchId] = useState(query.id || '')
  const [activeReq, setActiveReq] = useState(null)
  const [searched, setSearched] = useState(false)
  const [showJobCard, setShowJobCard] = useState(false)

  // Find request whenever searchId or query changes
  useEffect(() => {
    if (query.id) {
      setSearchId(query.id)
      const found = requests.find(r => r.id.toLowerCase() === query.id.trim().toLowerCase())
      setActiveReq(found || null)
      setSearched(true)
    } else if (requests.length > 0 && !searched) {
      // Default to first active request for immediate showcase
      setActiveReq(requests[0])
      setSearchId(requests[0].id)
    }
  }, [query.id, requests])

  const handleSearch = e => {
    e?.preventDefault()
    const clean = searchId.trim().toLowerCase()
    if (!clean) return
    const found = requests.find(r => r.id.toLowerCase() === clean)
    setActiveReq(found || null)
    setSearched(true)
    navigate('/track', { id: searchId.trim() })
  }

  const pickSample = id => {
    setSearchId(id)
    const found = requests.find(r => r.id.toLowerCase() === id.toLowerCase())
    setActiveReq(found || null)
    setSearched(true)
    navigate('/track', { id })
  }

  // Determine timeline stage
  const getStageIndex = status => {
    switch (status) {
      case 'New': return 0
      case 'Acknowledged': return 1
      case 'Scheduled': return 2
      case 'InProgress': return 3
      case 'Completed': return 4
      case 'Cancelled': return -1
      default: return 0
    }
  }

  const stageIdx = activeReq ? getStageIndex(activeReq.status) : 0

  const steps = [
    { label: t('track_step1'), desc: 'Ticket registered into VPE system' },
    { label: t('track_step2'), desc: 'Lead engineer telephone triage' },
    { label: t('track_step3'), desc: 'On-site visit confirmed with spares' },
    { label: t('track_step4'), desc: 'Engineer on site conducting repair' },
    { label: t('track_step5'), desc: 'Full load test & client sign-off' }
  ]

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="hero" style={{ paddingBlock: '48px 56px' }}>
        <div className="wrap">
          <span className="hero-pill-badge">Live Ticket Status</span>
          <h1 style={{ fontSize: '2.6rem' }}>{t('track_title')}</h1>
          <p className="hero-tag">{t('track_sub')}</p>
        </div>
      </section>

      {/* Tracker Search Box */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="wrap">
          <div className="tracker-box">
            <h2 style={{ fontSize: '1.4rem', marginBottom: '14px' }}>Lookup Service Ticket</h2>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="tracker-search">
              <input
                type="text"
                placeholder={t('track_ph')}
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                style={{ fontSize: '1rem' }}
              />
              <button type="submit" className="btn btn-primary">
                <Search className="ic" /> {t('track_btn')}
              </button>
            </form>

            {/* Sample ID Quick Pills */}
            <div className="tracker-sample-pills">
              <span>Quick Demo Tickets:</span>
              {requests.slice(0, 4).map(r => (
                <button
                  key={r.id}
                  type="button"
                  className="sample-pill"
                  style={{ background: activeReq?.id === r.id ? 'var(--brand)' : 'var(--tint)', color: activeReq?.id === r.id ? '#fff' : 'var(--ink)' }}
                  onClick={() => pickSample(r.id)}
                >
                  {r.id} ({r.company.split(' ')[0]} - {r.status})
                </button>
              ))}
            </div>

            {/* Search Result Display */}
            {activeReq ? (
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '28px' }}>
                {/* Header Strip of Ticket */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <span className="mono" style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--brand)' }}>
                      {activeReq.id}
                    </span>
                    <h3 style={{ fontSize: '1.5rem', marginTop: '4px' }}>{activeReq.company}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                      Contact: <strong>{activeReq.contact || activeReq.owner}</strong> • Mobile: {activeReq.mobile}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`badge s-${activeReq.status}`} style={{ fontSize: '0.95rem', padding: '6px 16px' }}>
                      {t('st_' + activeReq.status)}
                    </span>
                    <button className="btn btn-outline btn-sm" onClick={() => setShowJobCard(true)}>
                      <FileText className="ic" /> {t('track_jobcard_btn')}
                    </button>
                  </div>
                </div>

                {/* 5-Step Visual Timeline */}
                <div style={{ marginBlock: '36px 20px' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '20px' }}>
                    {t('track_timeline')}
                  </h4>

                  <div className="tracker-timeline">
                    {steps.map((st, idx) => {
                      const isDone = stageIdx > idx
                      const isCurrent = stageIdx === idx
                      return (
                        <div key={idx} className={`timeline-step ${isDone ? 'done' : ''} ${isCurrent ? 'active' : ''}`}>
                          <div className="step-dot">
                            {isDone ? <CheckCircle className="ic" style={{ width: '1.1em', height: '1.1em' }} /> : idx + 1}
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <p className="step-title">{st.label}</p>
                            <small style={{ color: 'var(--muted)', fontSize: '0.75rem', display: 'block', marginTop: '4px' }}>
                              {st.desc}
                            </small>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="tracker-meta-grid">
                  <div className="tracker-meta-item">
                    <small>{t('track_meta_machine')}</small>
                    <b>{activeReq.machine || 'Industrial Processing Machine'}</b>
                  </div>
                  <div className="tracker-meta-item">
                    <small>{t('track_meta_location')}</small>
                    <b>{activeReq.location}</b>
                  </div>
                  <div className="tracker-meta-item">
                    <small>{t('track_meta_visit')}</small>
                    <b>{activeReq.visit || 'Immediate Triage / On-Call'}</b>
                  </div>
                </div>

                {/* Reported Problem */}
                <div style={{ marginTop: '24px', background: 'var(--surface)', border: '1px solid var(--line)', padding: '18px', borderRadius: 'var(--radius-sm)' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Reported Problem Description
                  </h4>
                  <p style={{ color: 'var(--ink)', lineHeight: '1.6' }}>{activeReq.problem}</p>
                  {activeReq.hasVoice && (
                    <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle className="ic" style={{ width: '1em', height: '1em' }} />
                      <span>{t('voice_att')}</span>
                    </div>
                  )}
                </div>

                {/* Engineer Inspection Notes */}
                <div style={{ marginTop: '20px', background: 'var(--tint)', border: '1px solid var(--line)', padding: '20px', borderRadius: 'var(--radius-sm)', borderLeft: '6px solid var(--brand)' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--ink)' }}>
                    {t('track_notes_title')}
                  </h4>
                  <p style={{ color: 'var(--ink-light)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {activeReq.notes || 'Inspection findings will be recorded here immediately following on-site diagnostic tests.'}
                  </p>
                </div>

                {/* Action Controls */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
                  <a
                    href={`https://wa.me/919848012345?text=Hello%20VPE%20Engineer,%20inquiring%20about%20my%20service%20ticket%20${activeReq.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <MessageSquare className="ic" style={{ color: '#25D366' }} /> WhatsApp Engineer About Ticket
                  </a>
                  <a href="tel:+919848012345" className="btn btn-outline btn-sm">
                    <Phone className="ic" /> Call Technician Hotline
                  </a>
                </div>
              </div>
            ) : searched ? (
              <div style={{ textAlign: 'center', padding: '40px', background: 'var(--tint)', borderRadius: 'var(--radius-md)' }}>
                <AlertTriangle className="ic" style={{ width: '2.5em', height: '2.5em', color: 'var(--accent)', margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>Ticket Not Found</h3>
                <p style={{ color: 'var(--muted)', maxWidth: '48ch', margin: '0 auto 18px' }}>
                  {t('track_not_found')}
                </p>
                <button className="btn btn-primary" onClick={() => pickSample('VPE-REQ-4821')}>
                  Load Demo Ticket (VPE-REQ-4821)
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Printable Job Card Modal */}
      {showJobCard && activeReq && (
        <JobCardModal req={activeReq} onClose={() => setShowJobCard(false)} />
      )}
    </div>
  )
}
