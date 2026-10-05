import { useState } from 'react'
import { useApp } from '../context.jsx'
const INSPECTION = 1500
const inr = n => '₹' + n.toLocaleString('en-IN')
const travel = km => km <= 25 ? 0 : km <= 50 ? 500 : km <= 100 ? 1200 : 1200 + Math.ceil(km - 100) * 12
function Table({ head, rows }) {
  const { t } = useApp()
  return <div className="scroll"><table><thead><tr><th>{t(head[0])}</th><th className="num">{t(head[1])}</th></tr></thead>
    <tbody>{rows.map(([k, v, tr]) => <tr key={k}><td>{t(k)}</td><td className={'num' + (tr ? ' wrap' : '')}>{tr ? t(v) : v}</td></tr>)}</tbody></table></div>
}
export default function Charges() {
  const { t } = useApp()
  const [km, setKm] = useState('')
  const valid = km !== '' && +km >= 0
  const c = valid ? travel(+km) : null
  return (
    <section className="section" id="charges"><div className="wrap">
      <h2>{t('srv_h')}</h2><p className="lede">{t('srv_sub')}</p>
      <div className="rate-grid">
        <div className="insp"><h3>{t('insp_h')}</h3><p className="price">{inr(INSPECTION)}<small>{t('insp_unit')}</small></p><p className="n">{t('insp_note')}</p></div>
        <div className="rate-tables">
          <h3>{t('kit_h')}</h3>
          <Table head={['col_item', 'col_cost']} rows={[['kit1', '₹800'], ['kit2', '₹600'], ['kit3', '₹1,200']]} />
          <h3>{t('ext_h')}</h3>
          <Table head={['col_item', 'col_cost']} rows={[['ext1', '₹900'], ['ext2', '₹2,000'], ['ext3', 'on_request', 1]]} />
          <h3>{t('trv_h')}</h3>
          <Table head={['trv_col_dist', 'col_cost']} rows={[['trv1', 'trv1v', 1], ['trv2', '₹500'], ['trv3', '₹1,200'], ['trv4', 'trv4v', 1], ['trv5', 'trv5v', 1]]} />
          <div className="calc">
            <label htmlFor="km">{t('trv_calc')}</label>
            <input id="km" type="number" inputMode="numeric" min="0" step="1" value={km} onChange={e => setKm(e.target.value)} />
            <dl className="calc-out" aria-live="polite">
              <div><dt>{t('trv_est')}</dt><dd>{valid ? (c === 0 ? t('trv1v') : inr(c)) : '-'}</dd></div>
              <div><dt>{t('trv_total')}</dt><dd>{valid ? inr(INSPECTION + c) : '-'}</dd></div>
            </dl>
          </div>
        </div>
      </div>
      <p className="foot-note">{t('srv_foot')}</p>
    </div></section>
  )
}
