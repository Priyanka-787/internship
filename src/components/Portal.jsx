import { useState } from 'react'
import { useApp } from '../context.jsx'
const pad = n => String(n).padStart(2, '0')
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const IND = { rice: 'a rice mill', cloth: 'a textile unit', cashew: 'a cashew factory', other: 'an industrial unit' }
export default function Portal() {
  const { t, toast } = useApp()
  const [f, setF] = useState({ date: iso(new Date()), industry: 'rice', work: '', client: '', consent: false })
  const [connected, setConnected] = useState(false)
  const set = k => e => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const post = () => {
    if (!f.work.trim()) return ''
    const d = new Date(f.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    const where = f.client.trim() && f.consent ? `${f.client.trim()} (${IND[f.industry].replace(/^an? /, '')})` : IND[f.industry]
    return `Service visit update, ${d}\n\nToday I visited ${where} in Andhra Pradesh for an on-site machine service.\n\n${f.work.trim()}\n\n#HardwareService #IndustrialMaintenance #AndhraPradesh`
  }
  const text = post()
  const publish = () => toast(!connected ? t('p_need') : !text ? t('p_needwork') : t('p_posted'))
  return (
    <section className="section" id="portal"><div className="wrap">
      <h2>{t('portal_h')}</h2><p className="lede">{t('portal_sub')}</p>
      <div className="portal-grid">
        <div className="card"><div className="fields">
          <div className="field"><label htmlFor="pd">{t('p_date')}</label><input id="pd" type="date" value={f.date} onChange={set('date')} /></div>
          <div className="field"><label htmlFor="pi">{t('f_domain')}</label><select id="pi" value={f.industry} onChange={set('industry')}>{Object.keys(IND).map(k => <option key={k} value={k}>{t('ind_' + k)}</option>)}</select></div>
          <div className="field"><label htmlFor="pw">{t('p_work')}</label><textarea id="pw" value={f.work} onChange={set('work')} /></div>
          <div className="field"><label htmlFor="pc">{t('p_client')}</label><input id="pc" value={f.client} onChange={set('client')} /></div>
          <label className="check"><input type="checkbox" checked={f.consent} onChange={set('consent')} /><span>{t('p_consent')}</span></label>
        </div></div>
        <div>
          <p className="label">{t('p_preview')}</p>
          <div className={'li-card' + (connected ? ' connected' : '')}>
            <div className="li-head"><div className="li-av" aria-hidden="true">VP</div><div><b>Owner Name</b><small>Hardware Service Engineer at Venkata Prasanna Enterprises</small></div></div>
            <p className={'li-text' + (text ? '' : ' empty')}>{text || t('p_empty')}</p>
          </div>
          <div className="li-actions">
            <button className="btn btn-ghost" onClick={() => setConnected(!connected)}>{connected ? t('p_connected') : t('p_connect')}</button>
            <button className="btn btn-primary" onClick={publish}>{t('p_post')}</button>
          </div>
        </div>
      </div>
    </div></section>
  )
}
