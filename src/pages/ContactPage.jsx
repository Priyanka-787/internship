import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle, ShieldCheck } from 'lucide-react'
import { useApp } from '../context.jsx'
import { Link } from '../router.jsx'

export default function ContactPage() {
  const { t, toast } = useApp()
  const [f, setF] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (!f.name.trim() || !f.phone.trim()) {
      return toast('Please enter your name and contact phone number.')
    }
    setSent(true)
    toast('Your message has been sent. The lead engineer will call you shortly.')
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="hero" style={{ paddingBlock: '48px 56px' }}>
        <div className="wrap">
          <span className="hero-pill-badge">Direct Communication</span>
          <h1 style={{ fontSize: '2.6rem' }}>{t('info_h')}</h1>
          <p className="hero-tag">
            Reach lead engineer V. Prasanna Rao directly by phone, WhatsApp, or through this form.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'start' }}>
            {/* Contact Details Card */}
            <div>
              <span className="section-tag">Direct Lines</span>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Get In Touch Today</h2>

              <div style={{ display: 'grid', gap: '20px' }}>
                <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center', borderLeft: '6px solid var(--brand)' }}>
                  <div className="service-icon-box" style={{ width: '48px', height: '48px' }}>
                    <Phone className="ic" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                      24/7 Breakdown Hotline
                    </span>
                    <a href="tel:+919848012345" className="mono" style={{ display: 'block', fontSize: '1.25rem', fontWeight: '800', color: 'var(--brand)', marginTop: '2px' }}>
                      +91 98480 12345
                    </a>
                  </div>
                </div>

                <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center', borderLeft: '6px solid #25D366' }}>
                  <div className="service-icon-box" style={{ width: '48px', height: '48px', background: '#dcfce7', color: '#16a34a' }}>
                    <MessageSquare className="ic" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                      WhatsApp Direct Chat
                    </span>
                    <a href="https://wa.me/919848012345" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '1.1rem', fontWeight: '700', color: 'var(--ink)', marginTop: '2px' }}>
                      Click to Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center', borderLeft: '6px solid var(--accent)' }}>
                  <div className="service-icon-box" style={{ width: '48px', height: '48px', background: '#fef3c7', color: '#b45309' }}>
                    <Mail className="ic" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                      Official Service Email
                    </span>
                    <a href="mailto:service@vpe.example" style={{ display: 'block', fontSize: '1.05rem', fontWeight: '600', color: 'var(--ink)', marginTop: '2px' }}>
                      service@vpe.example
                    </a>
                  </div>
                </div>

                <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center', borderLeft: '6px solid var(--info)' }}>
                  <div className="service-icon-box" style={{ width: '48px', height: '48px', background: '#e0f2fe', color: '#0369a1' }}>
                    <MapPin className="ic" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: '600' }}>
                      Operating Base
                    </span>
                    <p style={{ fontWeight: '600', color: 'var(--ink)', marginTop: '2px' }}>
                      Rajahmundry & On-Site Across Andhra Pradesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Callback / Quick Inquiry Form */}
            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Send Quick Message</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Have questions regarding maintenance contracts, machinery advice, or quotes?
              </p>

              {sent ? (
                <div style={{ textAlign: 'center', padding: '36px', background: 'var(--tint)', borderRadius: 'var(--radius-sm)' }}>
                  <CheckCircle className="ic" style={{ width: '2.5em', height: '2.5em', color: 'var(--success)', margin: '0 auto 12px' }} />
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Message Received</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                    We will call you back within 30 minutes during working hours.
                  </p>
                  <button className="btn btn-outline btn-sm" style={{ marginTop: '16px' }} onClick={() => setSent(false)}>
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px' }}>
                  <div className="field">
                    <label htmlFor="cname">Your Name</label>
                    <input id="cname" placeholder="e.g. K. Sridhar" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} required />
                  </div>

                  <div className="field">
                    <label htmlFor="cphone">Contact Phone / WhatsApp</label>
                    <input id="cphone" type="tel" placeholder="10-digit mobile number" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} required />
                  </div>

                  <div className="field">
                    <label htmlFor="cemail">Email Address (Optional)</label>
                    <input id="cemail" type="email" placeholder="e.g. plant@example.com" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
                  </div>

                  <div className="field">
                    <label htmlFor="cmsg">How can we assist you?</label>
                    <textarea
                      id="cmsg"
                      placeholder="Specify your plant equipment or question..."
                      value={f.message}
                      onChange={e => setF({ ...f, message: e.target.value })}
                      style={{ minHeight: '100px' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '10px' }}>
                    <Send className="ic" /> Send Inquiry
                  </button>

                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                      Have an emergency breakdown? <Link to="/report" style={{ color: 'var(--brand)', fontWeight: '600' }}>Report fault directly here →</Link>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
