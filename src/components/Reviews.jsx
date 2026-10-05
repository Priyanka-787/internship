import { useApp } from '../context.jsx'
export const Stars = ({ n }) => <span className="rev-stars" role="img" aria-label={`${n} / 5`}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
export default function Reviews() {
  const { t, requests } = useApp()
  const list = requests.filter(r => r.review?.approved)
  return (
    <section className="section alt" id="reviews"><div className="wrap">
      <h2>{t('rev_h')}</h2>
      {list.length === 0 ? <p className="empty-box">{t('rev_empty')}</p> :
        <div className="rev-grid">{list.map(r => (
          <figure key={r.id} className="rev-card" style={{ margin: 0 }}>
            <Stars n={r.review.rating} />
            {r.review.text && <blockquote style={{ margin: '10px 0' }}>{r.review.text}</blockquote>}
            <figcaption><small style={{ color: 'var(--muted)' }}>{r.owner}, {t('ind_' + r.industry)}</small></figcaption>
          </figure>))}</div>}
    </div></section>
  )
}
