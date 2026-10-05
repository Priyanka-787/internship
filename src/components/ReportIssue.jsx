import { useState } from 'react'
import { Mic, Square, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { useApp } from '../context.jsx'
import { useRecorder } from '../hooks.js'
const pad = n => String(n).padStart(2, '0')
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const fmt = s => `${Math.floor(s / 60)}:${pad(s % 60)}`
const blank = () => ({ company: '', owner: '', location: '', mobile: '', industry: 'rice', since: iso(new Date()), problem: '' })
export default function ReportIssue() {
  const { t, lang, user, addRequest, toast } = useApp()
  const [f, setF] = useState(blank), [bad, setBad] = useState({}), [err, setErr] = useState(''), [done, setDone] = useState(null)
  const rec = useRecorder(() => toast(t('rec_demo')))
  const set = k => e => { setF({ ...f, [k]: e.target.value }); setBad({ ...bad, [k]: false }) }
  const submit = e => {
    e.preventDefault()
    const digits = f.mobile.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    const b = {}; ['company', 'owner', 'location'].forEach(k => { if (!f[k].trim()) b[k] = true })
    if (!/^[6-9]\d{9}$/.test(digits)) b.mobile = true
    if (Object.keys(b).length) { setBad(b); return setErr(t('err_fields')) }
    if (!f.problem.trim() && rec.state !== 'done') { setBad({ problem: true }); return setErr(t('err_problem')) }
    const n = new Date()
    const req = { id: `VPE-${String(n.getFullYear()).slice(2)}${pad(n.getMonth() + 1)}${pad(n.getDate())}-${Math.floor(100 + Math.random() * 900)}`,
      ...f, company: f.company.trim(), owner: f.company.trim(), contact: f.owner.trim(), mobile: digits, status: 'New',
      hasVoice: rec.state === 'done', userId: user?.id || null, createdAt: n.toISOString(), notes: '', visit: '', review: null }
    addRequest(req); setErr(''); setDone(req)
    document.getElementById('contact')?.scrollIntoView()
  }
  const again = () => { setF(blank()); setBad({}); rec.reset(); setDone(null) }
  const loc = lang === 'en' ? 'en-IN' : lang === 'hi' ? 'hi-IN' : 'te-IN'
  const F = ({ k, label, ...p }) => <div className="field"><label htmlFor={'f' + k}>{t(label)}</label><input id={'f' + k} value={f[k]} onChange={set(k)} className={bad[k] ? 'bad' : ''} aria-invalid={!!bad[k]} {...p} /></div>
  return (
    <section className="section" id="contact"><div className="wrap">
      <h2>{t('contact_h')}</h2><p className="lede">{t('contact_sub')}</p>
      <div className="contact-grid">
        <div>
          {done ? (
            <div className="card done">
              <h3>{t('ok_h')}</h3><p>{t('ok_p')}</p>
              <dl><div><dt>{t('ok_ref')}</dt><dd>{done.id}</dd></div><div><dt>{t('f_company')}</dt><dd>{done.company}</dd></div>
                <div><dt>{t('ok_since')}</dt><dd>{new Date(done.since + 'T00:00:00').toLocaleDateString(loc, { day: 'numeric', month: 'short', year: 'numeric' })}</dd></div></dl>
              <div className="form-actions"><button className="btn btn-ghost" onClick={again}>{t('ok_again')}</button></div>
              <p className="demo-note">{t('ok_demo')}</p>
            </div>
          ) : (
            <form className="card" onSubmit={submit} noValidate>
              <div className="fields cols">
                <F k="company" label="f_company" autoComplete="organization" />
                <F k="owner" label="f_owner" autoComplete="name" />
                <F k="location" label="f_location" autoComplete="address-level2" />
                <F k="mobile" label="f_mobile" type="tel" inputMode="numeric" maxLength={14} autoComplete="tel" />
                <div className="field"><label htmlFor="findustry">{t('f_domain')}</label>
                  <select id="findustry" value={f.industry} onChange={set('industry')}>{['rice', 'cloth', 'cashew', 'other'].map(k => <option key={k} value={k}>{t('ind_' + k)}</option>)}</select></div>
                <F k="since" label="f_date" type="date" max={iso(new Date())} />
                <div className="field span2"><label htmlFor="fproblem">{t('f_problem')}</label>
                  <textarea id="fproblem" placeholder={t('ph_problem')} value={f.problem} onChange={set('problem')} className={bad.problem ? 'bad' : ''} /></div>
                <div className="or span2">{t('f_or')}</div>
                <div className="span2"><span className="label">{t('rec_h')}</span>
                  <div className="voice">
                    <button type="button" className={'btn btn-primary mic' + (rec.state === 'recording' ? ' rec' : '')} onClick={rec.state === 'recording' ? rec.stop : rec.start}>
                      {rec.state === 'recording' ? <Square className="ic" aria-hidden="true" /> : <Mic className="ic" aria-hidden="true" />}
                      <span>{rec.state === 'idle' ? t('rec_start') : rec.state === 'recording' ? t('rec_stop') : t('rec_again')}</span>
                    </button>
                    <div className="voice-meta">
                      <p className={'rec-status' + (rec.state !== 'idle' ? ' on' : '')} aria-live="polite">
                        {rec.state === 'idle' ? t('rec_hint') : rec.state === 'recording' ? `● ${fmt(rec.secs)}` : `${t('rec_done')} (${fmt(rec.secs)})`}</p>
                      {rec.url && <audio controls src={rec.url} />}
                    </div>
                  </div></div>
              </div>
              {err && <p className="err" role="alert">{err}</p>}
              <div className="form-actions"><button className="btn btn-accent" type="submit">{t('f_submit')}</button></div>
            </form>
          )}
        </div>
        <aside className="card info">
          <h3>{t('info_h')}</h3>
          <ul>
            <li><Phone className="ic" /><div><small>{t('info_call')}</small><a href="tel:+910000000000">+91 98XXX XXXXX</a></div></li>
            <li><Mail className="ic" /><div><small>{t('info_mail')}</small><a href="mailto:contact@venkatprasanna.example">contact@venkatprasanna.example</a></div></li>
            <li><MapPin className="ic" /><div><small>{t('f_location')}</small><span>{t('info_place')}</span></div></li>
            <li><Clock className="ic" /><div><small>{t('info_hours')}</small><span>{t('info_hours_v')}</span></div></li>
          </ul>
          <a className="btn btn-primary" href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer"><MessageCircle className="ic" /><span>{t('info_wa')}</span></a>
        </aside>
      </div>
    </div></section>
  )
}
