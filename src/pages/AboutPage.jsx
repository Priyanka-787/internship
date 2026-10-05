import { CheckCircle, ShieldCheck, Award, Wrench, Cpu, Zap, Phone } from 'lucide-react'
import { useApp } from '../context.jsx'
import { Link } from '../router.jsx'

export default function AboutPage() {
  const { t } = useApp()

  const certifications = [
    { title: 'Diploma in Electrical & Electronics Engineering (DEEE)', org: 'State Board of Technical Education, Andhra Pradesh', year: '2012' },
    { title: 'Grade "A" Electrical Supervisor Competency Certificate', org: 'AP State Electrical Licensing Board', year: '2015' },
    { title: 'Industrial Motor Drives & PLC Automation Certification', org: 'National Institute of Technical Training', year: '2017' },
    { title: 'Industrial Safety & LOTO (Lockout / Tagout) Standards', org: 'Industrial Safety Forum AP', year: '2019' }
  ]

  const toolkits = [
    { name: 'Fluke Infrared Thermal Imager', desc: 'Detects loose busbar joints, overloaded contactors, and bearing heat build-up before catastrophic failure.' },
    { name: 'Digital Megohmmeter (5kV Megger)', desc: 'Tests motor stator and rotor winding insulation resistance against ground faults.' },
    { name: 'True-RMS Clamp Meter & Power Analyzer', desc: 'Measures 3-phase voltage balance, startup surge currents, and harmonic neutral currents.' },
    { name: 'Optical Laser Tachometer & Vibration Pen', desc: 'Accurately verifies shaft RPM, pulley slip, and mechanical bearing wear vibration amplitude.' }
  ]

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header Banner */}
      <section className="hero" style={{ paddingBlock: '48px 56px' }}>
        <div className="wrap">
          <span className="hero-pill-badge">Profile & Credentials</span>
          <h1 style={{ fontSize: '2.6rem' }}>About the Lead Service Engineer</h1>
          <p className="hero-tag">
            Hands-on technical engineering dedicated to keeping Andhra Pradesh's heavy processing mills operational around the clock.
          </p>
        </div>
      </section>

      {/* Bio & Philosophy */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
            <div>
              <span className="section-tag">Engineering Background</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Over a Decade on Factory Floors</h2>
              <p style={{ color: 'var(--ink-light)', lineHeight: '1.7', marginBottom: '16px' }}>
                With over 12 years of hands-on field experience throughout East Godavari, West Godavari, Guntur, Krishna, and Srikakulam, <strong>Venkata Prasanna Enterprises (VPE)</strong> was established to provide reliable, professional, and rapid on-site troubleshooting for industrial plants.
              </p>
              <p style={{ color: 'var(--ink-light)', lineHeight: '1.7', marginBottom: '20px' }}>
                Unlike general electricians, we specialize in high-capacity 3-phase industrial power systems, variable frequency motor drives (VFDs), automated control panels, elevator conveyors, and precision thermal machinery.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'var(--tint)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <b style={{ display: 'block', fontSize: '1.8rem', color: 'var(--brand)', fontFamily: 'var(--font-mono)' }}>500+</b>
                  <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Motors & Starters Repaired</span>
                </div>
                <div>
                  <b style={{ display: 'block', fontSize: '1.8rem', color: 'var(--brand)', fontFamily: 'var(--font-mono)' }}>99.2%</b>
                  <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>First-Visit Resolution Rate</span>
                </div>
              </div>
            </div>

            {/* Engineer ID Card */}
            <div className="card" style={{ borderTop: '6px solid var(--brand)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div className="plate-avatar">VP</div>
                <div>
                  <h3 style={{ fontSize: '1.3rem' }}>V. Prasanna Rao</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Founder & Lead Industrial Engineer</p>
                  <span className="badge s-Completed" style={{ marginTop: '4px' }}>Active AP License</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', display: 'grid', gap: '12px', fontSize: '0.925rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Base Location:</span>
                  <b>Rajahmundry, AP</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Field Service Radius:</span>
                  <b>Up to 250 km</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Languages Spoken:</span>
                  <b>Telugu (తెలుగు), Hindi (हिन्दी), English</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Direct Phone:</span>
                  <b style={{ fontFamily: 'var(--font-mono)' }}>+91 98480 12345</b>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Link to="/report" className="btn btn-primary" style={{ width: '100%' }}>
                  <Wrench className="ic" /> Request an On-Site Inspection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Qualifications */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <span className="section-tag">Formal Credentials</span>
            <h2>Licenses, Qualifications & Safety Standards</h2>
            <p className="lede">Every repair is conducted adhering to rigorous industrial safety codes and electrical regulations.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {certifications.map((c, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <Award className="ic" style={{ color: 'var(--accent)', marginTop: '2px', width: '1.4em', height: '1.4em' }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>{c.title}</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{c.org}</p>
                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--brand)', fontWeight: '600', marginTop: '6px', display: 'inline-block' }}>
                    Certified: {c.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Equipment */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-tag">Precision Diagnostics</span>
            <h2>On-Site Diagnostic Toolkit</h2>
            <p className="lede">
              We carry specialized calibrated diagnostic instrumentation on every service visit to detect root causes rather than temporary symptoms.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {toolkits.map((t, idx) => (
              <div key={idx} className="card">
                <div className="service-icon-box" style={{ marginBottom: '14px' }}>
                  <Zap className="ic" />
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{t.name}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
