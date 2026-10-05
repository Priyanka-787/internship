import { useState } from 'react'
import { Star, Mic } from 'lucide-react'
import { useApp } from '../context.jsx'
import { STATUSES } from '../i18n.js'
import { Stars } from './Reviews.jsx'
const Badge = ({ s }) => { const { t } = useApp(); return <span className={'badge s-' + s}>{t('st_' + s)}</span> }
function ReviewBox({ r }) {
  const { t, updateRequest, toast } = useApp()
  const [n, setN] = useState(0), [text, setText] = useState('')
  const send = () => { if (!n) return toast(t('rev_stars')); updateRequest(r.id, { review: { rating: n, text: text.trim(), approved: false } }); toast(t('rev_pending')) }
  return (
    <div className="rev"><span className="label">{t('rate_h')}</span>
      <div className="stars" role="radiogroup" aria-label={t('rate_h')}>{[1, 2, 3, 4, 5].map(i =>
        <button key={i} type="button" role="radio" aria-checked={n === i} aria-label={`${i}`} className={i <= n ? 'on' : ''} onClick={() => setN(i)}><Star aria-hidden="true" /></button>)}</div>
      <textarea placeholder={t('rev_ph')} value={text} onChange={e => setText(e.target.value)} style={{ marginTop: 8 }} />
      <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }} onClick={send}>{t('rev_send')}</button></div>
  )
}
function EngineerCard({ r }) {
  const { t, updateRequest, toast } = useApp()
  const [notes, setNotes] = useState(r.notes || ''), [visit, setVisit] = useState(r.visit || '')
  const save = () => { updateRequest(r.id, { notes, visit }); toast(t('saved')) }
  return (
    <article className="req">
      <div className="req-top"><b>{r.company}</b><Badge s={r.status} /></div>
      <p><small>{r.id} · {t('ind_' + r.industry)} · {r.location} · {r.contact} · <a href={`tel:+91${r.mobile}`}>{r.mobile}</a></small></p>
      {r.problem && <p>{r.problem}</p>}{r.hasVoice && <p><small><Mic className="ic" style={{ verticalAlign: '-3px' }} /> {t('voice_att')}</small></p>}
      <div className="req-ctl">
        <div className="field"><label htmlFor={'s' + r.id}>{t('status')}</label>
          <select id={'s' + r.id} value={r.status} onChange={e => updateRequest(r.id, { status: e.target.value })}>{STATUSES.map(s => <option key={s} value={s}>{t('st_' + s)}</option>)}</select></div>
        <div className="field"><label htmlFor={'v' + r.id}>{t('visit')}</label><input id={'v' + r.id} type="date" value={visit} onChange={e => setVisit(e.target.value)} /></div>
        <div className="field span2" style={{ gridColumn: '1 / -1' }}><label htmlFor={'n' + r.id}>{t('notes')}</label><textarea id={'n' + r.id} placeholder={t('note_ph')} value={notes} onChange={e => setNotes(e.target.value)} /></div>
      </div>
      <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={save}>{t('save')}</button>
      {r.review && <div className="rev"><Stars n={r.review.rating} /> {r.review.text && <p>{r.review.text}</p>}
        <button className="btn btn-ghost btn-sm" style={{ marginTop: 8 }} onClick={() => updateRequest(r.id, { review: { ...r.review, approved: !r.review.approved } })}>{r.review.approved ? t('rev_hide') : t('rev_approve')}</button></div>}
    </article>
  )
}
function CustomerCard({ r }) {
  const { t } = useApp()
  return (
    <article className="req">
      <div className="req-top"><b>{r.id}</b><Badge s={r.status} /></div>
      <p><small>{t('ind_' + r.industry)} · {r.location}{r.visit && ` · ${t('visit')}: ${r.visit}`}</small></p>
      {r.problem && <p>{r.problem}</p>}{r.hasVoice && <p><small>{t('voice_att')}</small></p>}
      {r.status === 'Completed' && (r.review ? <div className="rev"><Stars n={r.review.rating} />{!r.review.approved && <p><small>{t('rev_pending')}</small></p>}</div> : <ReviewBox r={r} />)}
    </article>
  )
}
export default function Dashboard() {
  const { t, user, requests } = useApp()
  const [flt, setFlt] = useState('')
  const eng = user.role === 'engineer'
  const mine = (eng ? requests : requests.filter(r => r.userId === user.id)).filter(r => !flt || r.status === flt)
  const count = s => requests.filter(r => s.includes(r.status)).length
  return (
    <section className="section alt" id="dashboard"><div className="wrap">
      <h2>{eng ? t('dash_all') : t('dash_my')}</h2>
      {eng && <div className="kpis">{[['kpi_new', ['New']], ['kpi_prog', ['Acknowledged', 'Scheduled', 'InProgress']], ['kpi_done', ['Completed']]].map(([k, s]) => <div className="kpi" key={k}><b>{count(s)}</b><span>{t(k)}</span></div>)}</div>}
      <select className="flt" aria-label={t('status')} value={flt} onChange={e => setFlt(e.target.value)}>
        <option value="">{t('all')}</option>{STATUSES.map(s => <option key={s} value={s}>{t('st_' + s)}</option>)}</select>
      {mine.length === 0 ? <p className="empty-box">{t('dash_empty')}</p> :
        <div className="req-list">{mine.map(r => eng ? <EngineerCard key={r.id} r={r} /> : <CustomerCard key={r.id} r={r} />)}</div>}
    </div></section>
  )
}
