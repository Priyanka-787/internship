import { useState } from 'react'
import { Plus, Search, Filter, Calendar, Star, Mic, Phone, CheckCircle, FileText, Download, Wrench, User } from 'lucide-react'
import { useApp } from '../context.jsx'
import { STATUSES } from '../i18n.js'
import { Stars } from '../components/Reviews.jsx'
import { Link, useRouter } from '../router.jsx'
import JobCardModal from '../components/JobCardModal.jsx'

export default function DashboardPage() {
  const { t, user, setUser, requests, updateRequest, setAuthMode, toast } = useApp()
  const { navigate } = useRouter()

  const [flt, setFlt] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJobCardReq, setSelectedJobCardReq] = useState(null)

  // Demo Fast-Login helpers if not logged in
  const loginAs = role => {
    if (role === 'engineer') {
      setUser({ id: 'owner@vpe.com', name: 'V. Prasanna Rao', role: 'engineer' })
      toast('Signed in as Lead Engineer')
    } else {
      setUser({ id: 'demo@vpe.com', name: 'M. Venkateswara Rao', role: 'customer' })
      toast('Signed in as Customer (Sri Lakshmi Rice Mill)')
    }
  }

  if (!user) {
    return (
      <div style={{ paddingBlock: '80px 100px' }}>
        <div className="wrap" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div className="card" style={{ padding: '40px', borderTop: '6px solid var(--brand)' }}>
            <User className="ic" style={{ width: '3em', height: '3em', color: 'var(--brand)', margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Access Service Portal</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '28px', lineHeight: '1.6' }}>
              Sign in to manage your factory's repair tickets, review inspection notes, or manage technician dispatches.
            </p>

            <div style={{ display: 'grid', gap: '12px' }}>
              <button className="btn btn-primary btn-lg" onClick={() => loginAs('engineer')}>
                <Wrench className="ic" /> One-Click Login as Engineer (Admin)
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => loginAs('customer')}>
                <User className="ic" /> One-Click Login as Customer (Rice Mill)
              </button>
            </div>

            <div style={{ marginTop: '24px', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setAuthMode('in')}>
                Sign in with custom email / password
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isEng = user.role === 'engineer'

  // Filter requests
  const filtered = requests.filter(r => {
    // If customer, show their requests or all demo
    const matchesUser = isEng ? true : (r.userId === user.id || !r.userId)
    const matchesStatus = !flt || r.status === flt
    const matchesSearch = !searchTerm ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.machine && r.machine.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesUser && matchesStatus && matchesSearch
  })

  const countStatus = sList => requests.filter(r => sList.includes(r.status)).length

  const exportData = () => {
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(requests, null, 2))
    const dlAnchor = document.createElement('a')
    dlAnchor.setAttribute("href", jsonStr)
    dlAnchor.setAttribute("download", `vpe-service-requests-${new Date().toISOString().slice(0, 10)}.json`)
    dlAnchor.click()
    toast('Data exported successfully!')
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header Banner */}
      <section className="hero" style={{ paddingBlock: '40px 48px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div>
              <span className="hero-pill-badge">{isEng ? 'Lead Engineer Dispatch' : 'Client Operations Portal'}</span>
              <h1 style={{ fontSize: '2.4rem' }}>{isEng ? t('dash_all') : t('dash_my')}</h1>
              <p className="hero-tag" style={{ marginTop: '6px' }}>
                Welcome, <strong>{user.name}</strong> • Role: <span style={{ textTransform: 'capitalize' }}>{user.role}</span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/report" className="btn btn-accent">
                <Plus className="ic" /> {t('cta_report')}
              </Link>
              {isEng && (
                <button className="btn btn-light" onClick={exportData} title="Export all ticket data">
                  <Download className="ic" /> Export Data
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="section">
        <div className="wrap">
          {/* KPIs Strip for Engineer */}
          {isEng && (
            <div className="kpis" style={{ marginTop: 0, marginBottom: '32px' }}>
              <div className="kpi">
                <b>{countStatus(['New'])}</b>
                <span>{t('kpi_new')}</span>
              </div>
              <div className="kpi">
                <b>{countStatus(['Acknowledged', 'Scheduled', 'InProgress'])}</b>
                <span>{t('kpi_prog')}</span>
              </div>
              <div className="kpi">
                <b>{countStatus(['Completed'])}</b>
                <span>{t('kpi_done')}</span>
              </div>
            </div>
          )}

          {/* Filter & Search Bar */}
          <div className="card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flex: 1, minWidth: '240px', gap: '10px', alignItems: 'center' }}>
                <Search className="ic" style={{ color: 'var(--muted)' }} />
                <input
                  type="text"
                  placeholder={t('search_tickets')}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ border: 0, background: 'none', padding: 0, minHeight: 'auto', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Filter className="ic" style={{ color: 'var(--muted)', width: '1em', height: '1em' }} />
                <select value={flt} onChange={e => setFlt(e.target.value)} style={{ width: 'auto', minHeight: '38px', padding: '6px 12px' }}>
                  <option value="">{t('all')}</option>
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{t('st_' + s)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tickets List */}
          {filtered.length === 0 ? (
            <div className="empty-box" style={{ textAlign: 'center', padding: '48px 20px' }}>
              <p style={{ fontSize: '1.1rem' }}>{t('dash_empty')}</p>
              <Link to="/report" className="btn btn-primary" style={{ marginTop: '16px' }}>
                Report an Issue Now
              </Link>
            </div>
          ) : (
            <div className="req-list">
              {filtered.map(r => (
                <TicketRow
                  key={r.id}
                  r={r}
                  isEng={isEng}
                  updateRequest={updateRequest}
                  toast={toast}
                  t={t}
                  onOpenJobCard={() => setSelectedJobCardReq(r)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Official Job Card Modal */}
      {selectedJobCardReq && (
        <JobCardModal req={selectedJobCardReq} onClose={() => setSelectedJobCardReq(null)} />
      )}
    </div>
  )
}

function TicketRow({ r, isEng, updateRequest, toast, t, onOpenJobCard }) {
  const [notes, setNotes] = useState(r.notes || '')
  const [visit, setVisit] = useState(r.visit || '')
  const [reviewText, setReviewText] = useState('')
  const [reviewStars, setReviewStars] = useState(5)

  const saveDetails = () => {
    updateRequest(r.id, { notes, visit })
    toast(t('saved'))
  }

  const handleStatusChange = e => {
    updateRequest(r.id, { status: e.target.value })
    toast(`Status updated to ${e.target.value}`)
  }

  const submitCustomerReview = () => {
    if (!reviewStars) return toast(t('rev_stars'))
    updateRequest(r.id, {
      review: {
        rating: reviewStars,
        text: reviewText.trim(),
        approved: false
      }
    })
    toast(t('rev_pending'))
  }

  const toggleReviewApproval = () => {
    if (!r.review) return
    updateRequest(r.id, {
      review: { ...r.review, approved: !r.review.approved }
    })
    toast(r.review.approved ? 'Review hidden from public site' : 'Review approved & visible')
  }

  return (
    <article className="req" style={{ borderLeft: `6px solid var(--${r.status === 'Completed' ? 'success' : r.status === 'New' ? 'accent' : 'brand'})` }}>
      <div className="req-top">
        <div>
          <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: '700' }}>{r.id}</span>
          <b style={{ display: 'block', fontSize: '1.25rem', marginTop: '2px' }}>{r.company}</b>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className={`badge s-${r.status}`} style={{ fontSize: '0.85rem' }}>{t('st_' + r.status)}</span>
          <button className="btn btn-outline btn-sm" onClick={onOpenJobCard} title="Printable Job Slip">
            <FileText className="ic" /> {t('job_card')}
          </button>
        </div>
      </div>

      <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: '6px' }}>
        <strong>Equipment:</strong> {r.machine || 'General Machinery'} • <strong>Industry:</strong> {t('ind_' + r.industry)} • <strong>Location:</strong> {r.location} • <strong>Contact:</strong> {r.contact || r.owner} ({r.mobile})
      </p>

      {r.problem && (
        <div style={{ marginTop: '12px', background: 'var(--tint)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '0.925rem' }}>
          <strong style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Reported Problem:</strong>
          {r.problem}
        </div>
      )}

      {/* Engineer Edit Controls */}
      {isEng ? (
        <div style={{ marginTop: '16px', borderTop: '1px dashed var(--line)', paddingTop: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: 'var(--brand)' }}>Lead Engineer Dispatch Controls</h4>
          <div className="req-ctl">
            <div className="field">
              <label htmlFor={'s' + r.id}>{t('status')}</label>
              <select id={'s' + r.id} value={r.status} onChange={handleStatusChange}>
                {STATUSES.map(s => (
                  <option key={s} value={s}>{t('st_' + s)}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor={'v' + r.id}>{t('visit')}</label>
              <input id={'v' + r.id} type="date" value={visit} onChange={e => setVisit(e.target.value)} />
            </div>

            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor={'n' + r.id}>{t('notes')}</label>
              <textarea id={'n' + r.id} placeholder={t('note_ph')} value={notes} onChange={e => setNotes(e.target.value)} style={{ minHeight: '70px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button className="btn btn-primary btn-sm" onClick={saveDetails}>
              {t('save')}
            </button>
            <a href={`tel:+91${r.mobile}`} className="btn btn-outline btn-sm">
              <Phone className="ic" /> Call Customer (+91 {r.mobile})
            </a>
          </div>

          {/* Review Moderation for Engineer */}
          {r.review && (
            <div className="rev" style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Stars n={r.review.rating} />
                  <p style={{ marginTop: '4px', fontStyle: 'italic' }}>"{r.review.text}"</p>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={toggleReviewApproval}>
                  {r.review.approved ? t('rev_hide') : t('rev_approve')}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Customer View */
        <div style={{ marginTop: '14px', borderTop: '1px solid var(--line)', paddingTop: '12px' }}>
          {r.visit && (
            <p style={{ fontSize: '0.9rem', color: 'var(--brand)', fontWeight: '600' }}>
              <Calendar className="ic" style={{ width: '1em', height: '1em', verticalAlign: '-2px', marginRight: '4px' }} />
              Scheduled Engineer Visit: {new Date(r.visit + 'T00:00:00').toLocaleDateString()}
            </p>
          )}

          {r.notes && (
            <div style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--ink-light)' }}>
              <strong>Technician Notes:</strong> {r.notes}
            </div>
          )}

          {/* Customer Rating Section if Completed */}
          {r.status === 'Completed' && (
            <div style={{ marginTop: '16px', background: 'var(--tint)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
              {r.review ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Stars n={r.review.rating} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                      {r.review.approved ? 'Verified Review' : t('rev_pending')}
                    </span>
                  </div>
                  {r.review.text && <p style={{ marginTop: '6px', fontSize: '0.9rem', fontStyle: 'italic' }}>"{r.review.text}"</p>}
                </div>
              ) : (
                <div>
                  <span className="label">{t('rate_h')}</span>
                  <div style={{ display: 'flex', gap: '6px', marginBlock: '6px' }}>
                    {[1, 2, 3, 4, 5].map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setReviewStars(st)}
                        style={{ border: 0, background: 'none', cursor: 'pointer', fontSize: '1.4rem', color: st <= reviewStars ? 'var(--accent)' : 'var(--line-strong)' }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    placeholder={t('rev_ph')}
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    style={{ minHeight: '60px', marginTop: '6px' }}
                  />
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '10px' }} onClick={submitCustomerReview}>
                    {t('rev_send')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  )
}
