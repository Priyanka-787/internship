import { useState } from 'react'
import { Star, CheckCircle, MessageSquare, ThumbsUp, Send } from 'lucide-react'
import { useApp } from '../context.jsx'
import { Stars } from '../components/Reviews.jsx'

export default function ReviewsPage() {
  const { t, requests, addRequest, toast } = useApp()
  const [rating, setRating] = useState(5)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [industry, setIndustry] = useState('rice')
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const approvedReviews = requests.filter(r => r.review?.approved)

  const handleReviewSubmit = e => {
    e.preventDefault()
    if (!name.trim() || !company.trim() || !text.trim()) {
      return toast('Please fill in your name, company, and review text.')
    }

    const n = new Date()
    const newReq = {
      id: `VPE-REV-${Math.floor(1000 + Math.random() * 9000)}`,
      company: company.trim(),
      owner: name.trim(),
      contact: name.trim(),
      mobile: '9848000000',
      location: 'Andhra Pradesh',
      industry,
      machine: 'Plant Machinery',
      problem: 'Service feedback review',
      priority: 'Medium',
      since: n.toISOString().slice(0, 10),
      status: 'Completed',
      hasVoice: false,
      createdAt: n.toISOString(),
      notes: 'Customer direct testimonial review.',
      review: {
        rating,
        text: text.trim(),
        approved: true // Instant visibility for customer delight!
      }
    }

    addRequest(newReq)
    setSubmitted(true)
    toast('Thank you! Your review has been published.')
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="hero" style={{ paddingBlock: '48px 56px' }}>
        <div className="wrap">
          <span className="hero-pill-badge">Client Testimonials</span>
          <h1 style={{ fontSize: '2.6rem' }}>{t('rev_h')}</h1>
          <p className="hero-tag">
            Read verified feedback from rice millers, textile engineers, and cashew factory operators across Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* Ratings Aggregate Banner */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="wrap">
          <div className="card" style={{ background: 'var(--surface)', padding: '32px', marginBottom: '40px', borderLeft: '6px solid var(--accent)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span className="mono" style={{ fontSize: '3.2rem', fontWeight: '800', color: 'var(--brand)', lineHeight: 1 }}>4.9</span>
                  <span style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>/ 5.0 Overall Rating</span>
                </div>
                <div style={{ marginBlock: '8px 4px' }}>
                  <Stars n={5} />
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Based on 40+ on-site factory breakdown interventions in Andhra Pradesh
                </p>
              </div>

              <div style={{ display: 'grid', gap: '6px', minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <span>5 Star</span>
                  <div style={{ flex: 1, height: '8px', background: 'var(--line)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '92%', height: '100%', background: 'var(--accent)' }}></div>
                  </div>
                  <span>92%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <span>4 Star</span>
                  <div style={{ flex: 1, height: '8px', background: 'var(--line)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '8%', height: '100%', background: 'var(--accent)' }}></div>
                  </div>
                  <span>8%</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
            {/* Reviews Grid */}
            <div style={{ display: 'grid', gap: '20px' }}>
              <h2 style={{ fontSize: '1.4rem' }}>Approved Client Reviews</h2>
              {approvedReviews.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
                  <p>{t('rev_empty')}</p>
                </div>
              ) : (
                approvedReviews.map(r => (
                  <div key={r.id} className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <Stars n={r.review.rating} />
                      <span className="badge s-Completed" style={{ fontSize: '0.75rem' }}>Verified Job</span>
                    </div>

                    <p style={{ color: 'var(--ink)', fontSize: '0.975rem', lineHeight: '1.6', marginBottom: '14px', fontStyle: 'italic' }}>
                      "{r.review.text}"
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--line)', paddingTop: '10px', fontSize: '0.85rem' }}>
                      <div>
                        <strong>{r.contact || r.owner}</strong>
                        <span style={{ color: 'var(--muted)', display: 'block' }}>{r.company}</span>
                      </div>
                      <span className="badge s-Acknowledged">{t('ind_' + r.industry)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Write a Review Card */}
            <div className="card" style={{ borderTop: '6px solid var(--brand)', position: 'sticky', top: '90px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Share Your Experience</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '20px' }}>
                Had a recent service visit? Your rating helps us maintain top industrial quality.
              </p>

              {submitted ? (
                <div style={{ padding: '24px', background: 'var(--tint)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <CheckCircle className="ic" style={{ width: '2.5em', height: '2.5em', color: 'var(--success)', margin: '0 auto 10px' }} />
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>Review Published!</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
                    Thank you for supporting Venkata Prasanna Enterprises.
                  </p>
                  <button className="btn btn-outline btn-sm" style={{ marginTop: '16px' }} onClick={() => setSubmitted(false)}>
                    Submit Another Review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} style={{ display: 'grid', gap: '14px' }}>
                  <div>
                    <label className="label">Rating (1 to 5 Stars)</label>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          style={{
                            border: 0,
                            background: 'none',
                            cursor: 'pointer',
                            fontSize: '1.6rem',
                            color: star <= rating ? 'var(--accent)' : 'var(--line-strong)',
                            padding: '2px'
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="revName">Your Name</label>
                    <input id="revName" placeholder="e.g. M. Venkateswara Rao" value={name} onChange={e => setName(e.target.value)} required />
                  </div>

                  <div className="field">
                    <label htmlFor="revCompany">Plant / Company Name</label>
                    <input id="revCompany" placeholder="e.g. Sri Lakshmi Rice Mill" value={company} onChange={e => setCompany(e.target.value)} required />
                  </div>

                  <div className="field">
                    <label htmlFor="revInd">Industry</label>
                    <select id="revInd" value={industry} onChange={e => setIndustry(e.target.value)}>
                      <option value="rice">{t('ind_rice')}</option>
                      <option value="cloth">{t('ind_cloth')}</option>
                      <option value="cashew">{t('ind_cashew')}</option>
                      <option value="other">{t('ind_other')}</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="revText">Your Feedback / Service Experience</label>
                    <textarea
                      id="revText"
                      placeholder="Describe how quickly the fault was diagnosed and the machine operation..."
                      value={text}
                      onChange={e => setText(e.target.value)}
                      required
                      style={{ minHeight: '90px' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                    <Send className="ic" /> {t('rev_send')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
