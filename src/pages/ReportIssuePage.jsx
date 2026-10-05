import { useState, useEffect } from 'react'
import { Mic, Square, Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle, Upload, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'
import { useApp } from '../context.jsx'
import { useRecorder } from '../hooks.js'
import { useRouter, Link } from '../router.jsx'

const pad = n => String(n).padStart(2, '0')
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const fmt = s => `${Math.floor(s / 60)}:${pad(s % 60)}`

export default function ReportIssuePage() {
  const { t, user, addRequest, toast } = useApp()
  const { query, navigate } = useRouter()

  const [f, setF] = useState({
    company: user?.company || '',
    owner: user?.name || '',
    location: user?.location || '',
    mobile: user?.phone || '',
    industry: query.cat || 'rice',
    machine: query.machine || '',
    priority: query.service === 'breakdown' ? 'Urgent' : 'High',
    since: iso(new Date()),
    problem: query.problem || ''
  })

  const [bad, setBad] = useState({})
  const [err, setErr] = useState('')
  const [done, setDone] = useState(null)
  const [fileNames, setFileNames] = useState([])

  const rec = useRecorder(() => toast(t('rec_demo')))

  // Auto-fill from query
  useEffect(() => {
    if (query.machine || query.problem || query.cat) {
      setF(prev => ({
        ...prev,
        machine: query.machine || prev.machine,
        problem: query.problem || prev.problem,
        industry: query.cat || prev.industry
      }))
    }
  }, [query])

  const set = k => e => {
    setF({ ...f, [k]: e.target.value })
    setBad({ ...bad, [k]: false })
  }

  const handleFileUpload = e => {
    if (e.target.files?.length) {
      const names = Array.from(e.target.files).map(f => f.name)
      setFileNames(names)
      toast(`${names.length} file(s) attached.`)
    }
  }

  const submit = e => {
    e.preventDefault()
    const digits = f.mobile.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    const b = {}
    ;['company', 'owner', 'location'].forEach(k => {
      if (!f[k].trim()) b[k] = true
    })
    if (!/^[6-9]\d{9}$/.test(digits)) b.mobile = true
    if (Object.keys(b).length) {
      setBad(b)
      return setErr(t('err_fields'))
    }
    if (!f.problem.trim() && rec.state !== 'done') {
      setBad({ problem: true })
      return setErr(t('err_problem'))
    }

    const n = new Date()
    const newId = `VPE-REQ-${Math.floor(1000 + Math.random() * 9000)}`

    const req = {
      id: newId,
      company: f.company.trim(),
      owner: f.owner.trim(),
      contact: f.owner.trim(),
      mobile: digits,
      location: f.location.trim(),
      industry: f.industry,
      machine: f.machine.trim() || 'General Processing Line',
      problem: f.problem.trim(),
      priority: f.priority,
      since: f.since,
      status: 'New',
      hasVoice: rec.state === 'done',
      files: fileNames,
      userId: user?.id || null,
      createdAt: n.toISOString(),
      notes: '',
      visit: '',
      history: [
        {
          status: 'New',
          time: n.toISOString(),
          note: 'Request registered via online portal.'
        }
      ],
      review: null
    }

    addRequest(req)
    setErr('')
    setDone(req)
    toast('Service ticket generated successfully!')
  }

  const handleTrackNew = () => {
    if (done) {
      navigate('/track', { id: done.id })
    }
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="hero" style={{ paddingBlock: '48px 56px' }}>
        <div className="wrap">
          <span className="hero-pill-badge">Rapid Service Dispatch</span>
          <h1 style={{ fontSize: '2.6rem' }}>{t('contact_h')}</h1>
          <p className="hero-tag">{t('contact_sub')}</p>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="section">
        <div className="wrap">
          <div className="report-grid">
            {/* Form Column */}
            <div>
              {done ? (
                <div className="card done" style={{ borderLeft: '6px solid var(--success)', padding: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <CheckCircle className="ic" style={{ color: 'var(--success)', width: '2em', height: '2em' }} />
                    <h3 style={{ fontSize: '1.6rem', margin: 0 }}>{t('ok_h')}</h3>
                  </div>

                  <p style={{ color: 'var(--ink-light)', fontSize: '1.05rem', lineHeight: '1.6' }}>
                    Your machine breakdown has been registered into the dispatch queue. Lead technician <strong>V. Prasanna Rao</strong> has been alerted.
                  </p>

                  <div style={{ marginBlock: '24px', padding: '20px', background: 'var(--tint)', borderRadius: 'var(--radius-md)', display: 'grid', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--muted)' }}>Ticket Reference ID:</span>
                      <strong className="mono" style={{ fontSize: '1.15rem', color: 'var(--brand)' }}>{done.id}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--muted)' }}>Mill / Plant:</span>
                      <strong>{done.company}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--muted)' }}>Equipment:</span>
                      <strong>{done.machine}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--muted)' }}>Contact Mobile:</span>
                      <strong>{done.mobile}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '24px' }}>
                    <button className="btn btn-primary" onClick={handleTrackNew}>
                      Track Live Status <ArrowRight className="ic" />
                    </button>
                    <a
                      href={`https://wa.me/919848012345?text=Hello%20VPE,%20I%20have%20submitted%20ticket%20${done.id}%20for%20${encodeURIComponent(done.company)}.%20Please%20confirm%20engineer%20dispatch.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      <MessageSquare className="ic" style={{ color: '#25D366' }} /> Send Details to Engineer via WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form className="card" onSubmit={submit} noValidate style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '6px' }}>Service Ticket Details</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                    Fields marked with (*) are required. You may speak the problem using the voice recorder below.
                  </p>

                  <div className="fields cols">
                    <div className="field">
                      <label htmlFor="fcompany">{t('f_company')} *</label>
                      <input
                        id="fcompany"
                        placeholder="e.g. Sri Lakshmi Rice Mill"
                        value={f.company}
                        onChange={set('company')}
                        className={bad.company ? 'bad' : ''}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="fowner">{t('f_owner')} *</label>
                      <input
                        id="fowner"
                        placeholder="e.g. M. Venkateswara Rao"
                        value={f.owner}
                        onChange={set('owner')}
                        className={bad.owner ? 'bad' : ''}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="flocation">{t('f_location')} *</label>
                      <input
                        id="flocation"
                        placeholder="e.g. Rajahmundry, East Godavari"
                        value={f.location}
                        onChange={set('location')}
                        className={bad.location ? 'bad' : ''}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="fmobile">{t('f_mobile')} *</label>
                      <input
                        id="fmobile"
                        type="tel"
                        inputMode="numeric"
                        placeholder="10-digit mobile number"
                        value={f.mobile}
                        onChange={set('mobile')}
                        className={bad.mobile ? 'bad' : ''}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="findustry">{t('f_domain')}</label>
                      <select id="findustry" value={f.industry} onChange={set('industry')}>
                        <option value="rice">{t('ind_rice')}</option>
                        <option value="cloth">{t('ind_cloth')}</option>
                        <option value="cashew">{t('ind_cashew')}</option>
                        <option value="other">{t('ind_other')}</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="fmachine">Machinery Name / Model</label>
                      <input
                        id="fmachine"
                        placeholder="e.g. 50 HP Elevator Motor / Air-Jet Loom #4"
                        value={f.machine}
                        onChange={set('machine')}
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="fpriority">Urgency / Priority</label>
                      <select id="fpriority" value={f.priority} onChange={set('priority')}>
                        <option value="Urgent">Emergency Breakdown (Immediate Dispatch)</option>
                        <option value="High">High Priority (Within 24 Hours)</option>
                        <option value="Medium">Standard Maintenance (Scheduled)</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="fsince">{t('f_date')}</label>
                      <input id="fsince" type="date" value={f.since} max={iso(new Date())} onChange={set('since')} />
                    </div>

                    <div className="field span2">
                      <label htmlFor="fproblem">{t('f_problem')} *</label>
                      <textarea
                        id="fproblem"
                        placeholder={t('ph_problem')}
                        value={f.problem}
                        onChange={set('problem')}
                        className={bad.problem ? 'bad' : ''}
                        style={{ minHeight: '90px' }}
                      />
                    </div>

                    {/* Voice Note Recording Box */}
                    <div className="span2">
                      <span className="label">{t('rec_h')} (Speak in Telugu, Hindi or English)</span>
                      <div className={`voice-recorder-box ${rec.state === 'recording' ? 'recording' : ''}`}>
                        <button
                          type="button"
                          className={`btn ${rec.state === 'recording' ? 'btn-accent' : 'btn-primary'}`}
                          onClick={rec.state === 'recording' ? rec.stop : rec.start}
                        >
                          {rec.state === 'recording' ? <Square className="ic" /> : <Mic className="ic" />}
                          <span>
                            {rec.state === 'idle'
                              ? t('rec_start')
                              : rec.state === 'recording'
                              ? t('rec_stop')
                              : t('rec_again')}
                          </span>
                        </button>

                        <div style={{ flex: 1, minWidth: '180px' }}>
                          <p style={{ fontSize: '0.85rem', color: rec.state === 'recording' ? 'var(--alert)' : 'var(--muted)', fontWeight: rec.state === 'recording' ? '700' : '500' }}>
                            {rec.state === 'idle'
                              ? t('rec_hint')
                              : rec.state === 'recording'
                              ? `Recording: ${fmt(rec.secs)}`
                              : `${t('rec_done')} (${fmt(rec.secs)})`}
                          </p>
                          {rec.url && <audio controls src={rec.url} style={{ marginTop: '8px', width: '100%', height: '36px' }} />}
                        </div>
                      </div>
                    </div>

                    {/* Attachments */}
                    <div className="field span2">
                      <label htmlFor="ffiles">Attach Machine / Error Photos (Optional)</label>
                      <input id="ffiles" type="file" multiple onChange={handleFileUpload} accept="image/*,video/*,.pdf" />
                      {fileNames.length > 0 && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--brand)', marginTop: '4px' }}>
                          Selected: {fileNames.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>

                  {err && (
                    <div className="err" style={{ marginTop: '16px' }} role="alert">
                      <AlertCircle className="ic" style={{ verticalAlign: '-2px', marginRight: '6px' }} />
                      {err}
                    </div>
                  )}

                  <div className="form-actions" style={{ marginTop: '28px' }}>
                    <button className="btn btn-accent btn-lg" type="submit" style={{ width: '100%' }}>
                      <Wrench className="ic" /> {t('f_submit')}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Contact Info */}
            <aside className="card" style={{ height: 'fit-content', padding: '28px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '14px' }}>Direct Engineer Hotline</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '20px', lineHeight: '1.5' }}>
                Need emergency support before filling the form? Reach lead engineer directly on phone.
              </p>

              <div style={{ display: 'grid', gap: '16px', fontSize: '0.925rem' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Phone className="ic" style={{ color: 'var(--brand)', marginTop: '3px' }} />
                  <div>
                    <small style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem' }}>24/7 Breakdown Hotline</small>
                    <a href="tel:+919848012345" className="mono" style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--brand)' }}>
                      +91 98480 12345
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <MessageSquare className="ic" style={{ color: '#25D366', marginTop: '3px' }} />
                  <div>
                    <small style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem' }}>WhatsApp Support</small>
                    <a href="https://wa.me/919848012345" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', color: 'var(--ink)' }}>
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Mail className="ic" style={{ color: 'var(--brand)', marginTop: '3px' }} />
                  <div>
                    <small style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem' }}>Direct Email</small>
                    <a href="mailto:service@vpe.example" style={{ fontWeight: '600' }}>service@vpe.example</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <MapPin className="ic" style={{ color: 'var(--brand)', marginTop: '3px' }} />
                  <div>
                    <small style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem' }}>Field Headquarters</small>
                    <span>Rajahmundry, Andhra Pradesh</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Clock className="ic" style={{ color: 'var(--brand)', marginTop: '3px' }} />
                  <div>
                    <small style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem' }}>Operating Hours</small>
                    <span>Mon - Sat: 8:00 AM - 7:00 PM (Emergency calls 24/7)</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
