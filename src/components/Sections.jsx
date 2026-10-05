import { Phone, Check } from 'lucide-react'
import { useApp } from '../context.jsx'
export function Hero() {
  const { t } = useApp()
  const rows = [['plate_id', 'VPE-001'], ['plate_exp', t('plate_exp_v')], ['plate_qual', t('plate_qual_v')], ['plate_area', t('plate_area_v')]]
  return (
    <section className="hero" id="home"><div className="wrap hero-grid">
      <div>
        <h1>Venkata Prasanna Enterprises</h1>
        <p className="hero-role">{t('hero_role')}</p>
        <p className="hero-tag">{t('hero_tag')}</p>
        <div className="chips">{['chip_rice', 'chip_cloth', 'chip_cashew'].map(k => <span key={k} className="chip">{t(k)}</span>)}</div>
        <div className="hero-actions">
          <a className="btn btn-accent" href="#contact">{t('cta_report')}</a>
          <a className="btn btn-light" href="tel:+910000000000"><Phone className="ic" aria-hidden="true" /><span>{t('cta_call')}</span></a>
        </div>
      </div>
      <aside className="plate" aria-label="Engineer ID plate">
        <div className="plate-top">
          {/* Replace with <img src="/owner.jpg" alt="Owner"> */}
          <div className="photo"><svg viewBox="0 0 90 120" role="img" aria-label="Owner photo placeholder"><rect width="90" height="120" fill="#c7d2ce" /><circle cx="45" cy="46" r="18" fill="#8d9b96" /><path d="M8 120c2-30 16-44 37-44s35 14 37 44z" fill="#8d9b96" /></svg></div>
          <div><h2>Owner Name</h2><p className="role">{t('plate_role')}</p></div>
        </div>
        <dl>{rows.map(([k, v]) => <div key={k}><dt>{t(k)}</dt><dd>{v}</dd></div>)}</dl>
        <p className="plate-note">{t('plate_note')}</p>
      </aside>
    </div></section>
  )
}
export function About() {
  const { t } = useApp()
  return (
    <section className="section" id="about"><div className="wrap">
      <h2>{t('about_h')}</h2>
      <div className="two">
        <div>
          <p>{t('about_p')}</p>
          <dl className="facts">{[['stat_years', '12+'], ['stat_ind', '40+'], ['stat_mach', '500+']].map(([k, v]) => <div key={k}><dt>{t(k)}</dt><dd>{v}</dd></div>)}</dl>
        </div>
        <ul className="duties">{['duty1', 'duty2', 'duty3', 'duty4'].map(k => <li key={k}><Check className="ic" aria-hidden="true" /><span>{t(k)}</span></li>)}</ul>
      </div>
    </div></section>
  )
}
const VENDORS = [['Sri Lakshmi Rice Mill', 'ind_rice', 2016], ['Annapurna Textiles', 'ind_cloth', 2018], ['Sai Cashew Exports', 'ind_cashew', 2019], ['Godavari Agro Foods', 'ind_rice', 2021], ['Padmavathi Spinning Mills', 'ind_cloth', 2022]]
export function Experience() {
  const { t } = useApp()
  return (
    <section className="section alt" id="experience"><div className="wrap">
      <h2>{t('exp_h')}</h2><p className="lede">{t('exp_sub')}</p>
      <div className="scroll"><table>
        <thead><tr><th>{t('col_company')}</th><th>{t('col_industry')}</th><th className="num">{t('col_since')}</th></tr></thead>
        <tbody>{VENDORS.map(([n, i, y]) => <tr key={n}><td>{n}</td><td>{t(i)}</td><td className="num">{y}</td></tr>)}</tbody>
      </table></div>
    </div></section>
  )
}
