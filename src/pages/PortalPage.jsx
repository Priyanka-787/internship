import { useState } from 'react'
import { MessageSquare, Share2, CheckCircle2, ShieldCheck, Copy } from 'lucide-react'
import { useApp } from '../context.jsx'

const pad = n => String(n).padStart(2, '0')
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const IND = {
  rice: 'a modern rice mill',
  cloth: 'a textile spinning & weaving unit',
  cashew: 'a cashew processing factory',
  other: 'an industrial plant'
}

export default function PortalPage() {
  const { t, toast } = useApp()
  const [f, setF] = useState({
    date: iso(new Date()),
    industry: 'rice',
    work: 'Diagnosed high-temperature fault on 50 HP elevator drive motor. Replaced worn drive-end bearing with SKF 6308-2Z, cleaned cooling fan cowl, and balanced 3-phase line current.',
    client: 'Sri Lakshmi Modern Rice Mill, Rajahmundry',
    consent: true
  })
  const [connected, setConnected] = useState(true)

  const set = k => e =>
    setF({
      ...f,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    })

  const generatePost = () => {
    if (!f.work.trim()) return ''
    const d = new Date(f.date + 'T00:00:00').toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    const where =
      f.client.trim() && f.consent
        ? `${f.client.trim()} (${IND[f.industry].replace(/^an? /, '')})`
        : IND[f.industry]
    return `🔧 On-Site Industrial Service Update | ${d}\n\nToday I completed a technical breakdown intervention at ${where} in Andhra Pradesh.\n\nKey Service Findings & Action Taken:\n${f.work.trim()}\n\nLine successfully tested under full mechanical load. Machine certified operational with zero vibration.\n\n#VenkataPrasannaEnterprises #IndustrialMaintenance #RiceMill #Textiles #CashewFactory #ElectricalEngineering #AndhraPradesh`
  }

  const text = generatePost()

  const copyToClipboard = () => {
    if (!text) return toast('Please enter service work details first.')
    navigator.clipboard.writeText(text)
    toast('Summary copied to clipboard!')
  }

  const publish = () => {
    if (!connected) return toast(t('p_need'))
    if (!text) return toast(t('p_needwork'))
    toast('Published daily service log to LinkedIn successfully!')
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="hero" style={{ paddingBlock: '48px 56px' }}>
        <div className="wrap">
          <span className="hero-pill-badge">Engineer Dispatch Desk</span>
          <h1 style={{ fontSize: '2.6rem' }}>{t('portal_h')}</h1>
          <p className="hero-tag">{t('portal_sub')}</p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section">
        <div className="wrap">
          <div className="portal-grid">
            {/* Form Column */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Daily Field Service Log</h3>

              <div className="fields">
                <div className="field">
                  <label htmlFor="pd">{t('p_date')}</label>
                  <input id="pd" type="date" value={f.date} onChange={set('date')} />
                </div>

                <div className="field">
                  <label htmlFor="pi">{t('f_domain')}</label>
                  <select id="pi" value={f.industry} onChange={set('industry')}>
                    {Object.keys(IND).map(k => (
                      <option key={k} value={k}>{t('ind_' + k)}</option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="pc">{t('p_client')}</label>
                  <input
                    id="pc"
                    placeholder="e.g. Sri Lakshmi Rice Mill"
                    value={f.client}
                    onChange={set('client')}
                  />
                </div>

                <div className="field">
                  <label htmlFor="pw">{t('p_work')}</label>
                  <textarea
                    id="pw"
                    rows={4}
                    placeholder="Detail work done, tests performed, parts replaced..."
                    value={f.work}
                    onChange={set('work')}
                    style={{ minHeight: '120px' }}
                  />
                </div>

                <label className="check" style={{ marginTop: '6px' }}>
                  <input type="checkbox" checked={f.consent} onChange={set('consent')} />
                  <span style={{ fontSize: '0.875rem' }}>{t('p_consent')}</span>
                </label>
              </div>
            </div>

            {/* Social Post Preview Column */}
            <div>
              <p className="label" style={{ marginBottom: '10px' }}>{t('p_preview')}</p>

              <div className={`li-card ${connected ? 'connected' : ''}`} style={{ background: 'var(--surface-card)', boxShadow: 'var(--shadow-md)' }}>
                <div className="li-head">
                  <div className="li-av" aria-hidden="true">VP</div>
                  <div>
                    <b>V. Prasanna Rao</b>
                    <small>Lead Industrial Hardware & Electrical Engineer at VPE</small>
                  </div>
                </div>

                <p className={`li-text ${text ? '' : 'empty'}`} style={{ fontSize: '0.925rem', lineHeight: '1.6' }}>
                  {text || t('p_empty')}
                </p>
              </div>

              <div className="li-actions" style={{ marginTop: '18px' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setConnected(!connected)}
                >
                  <Share2 className="ic" /> {connected ? t('p_connected') : t('p_connect')}
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={publish}
                >
                  {t('p_post')}
                </button>

                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={copyToClipboard}
                  title="Copy formatted summary"
                >
                  <Copy className="ic" /> Copy Text
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
