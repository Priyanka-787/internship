import { useState } from 'react'
import { Wrench, Shield, Check, Calculator, ArrowRight, Zap, Sliders, Clock, Info } from 'lucide-react'
import { useApp } from '../context.jsx'
import { Link, useRouter } from '../router.jsx'

const inr = n => '₹' + Number(n).toLocaleString('en-IN')

const calcTravelFee = km => {
  if (km <= 25) return 0
  if (km <= 50) return 500
  if (km <= 100) return 1200
  return 1200 + Math.ceil(km - 100) * 12
}

const DISTRICT_PRESETS = [
  { name: 'Rajahmundry Base', km: 10 },
  { name: 'Tanuku (West Godavari)', km: 45 },
  { name: 'Kakinada Port Area', km: 65 },
  { name: 'Eluru Processing Cluster', km: 95 },
  { name: 'Vijayawada Auto Nagar', km: 155 },
  { name: 'Guntur Industrial Zone', km: 185 },
  { name: 'Visakhapatnam (Vizag)', km: 195 },
  { name: 'Palasa (Cashew Hub)', km: 260 }
]

export default function ServicesPage() {
  const { t } = useApp()
  const { navigate } = useRouter()

  // Calculator State
  const [km, setKm] = useState(45)
  const [serviceType, setServiceType] = useState('breakdown')
  const [includeKit, setIncludeKit] = useState(true)

  const basePrices = {
    breakdown: 1500,
    amc: 2500,
    commissioning: 3000
  }

  const baseFee = basePrices[serviceType] || 1500
  const travelFee = calcTravelFee(km)
  const kitFee = includeKit ? 800 : 0
  const totalEstimate = baseFee + travelFee + kitFee

  const handleBookEstimate = () => {
    navigate('/report', {
      service: serviceType,
      estKm: km,
      estTotal: totalEstimate
    })
  }

  const services = [
    {
      title: 'Emergency Breakdown Repair',
      desc: 'Rapid on-site diagnosis and repair when your line stops. We arrive equipped with multi-meters, thermal sensors, and common electrical spares.',
      price: 'Visit from ₹1,500',
      badge: 'Rapid Response',
      items: ['Circuit breaker & contactor replacement', 'Loose connection & hot spot fixing', 'Motor overheating triage', 'Control relay logic debugging']
    },
    {
      title: 'Preventive Maintenance (AMC)',
      desc: 'Scheduled monthly or quarterly audits that prevent catastrophic machine failure during peak harvesting and processing seasons.',
      price: 'From ₹2,500 / visit',
      badge: 'Zero Downtime',
      items: ['Bearing vibration & temperature logging', 'Insulation resistance (Megger) audit', 'Contactor arc chute cleaning', 'Terminal torque check to spec']
    },
    {
      title: 'Motor & Drive Overhauls',
      desc: 'Heavy-duty 3-phase induction motors, elevator drives, and VFD inverters up to 150 HP.',
      price: 'Quoted per HP',
      badge: 'Heavy Industrial',
      items: ['Bearing pull & hydraulic press replacement', 'Stator dry-out & varnish recoating', 'VFD acceleration & torque parameter tuning', 'Pulley and coupling laser alignment']
    },
    {
      title: 'Control Panel Upgrades & Retrofits',
      desc: 'Modernize aging electromechanical starter panels with microprocessor protection relays, phase monitors, and emergency stop circuits.',
      price: 'Quoted per Panel',
      badge: 'Modernization',
      items: ['Star-Delta to Soft Starter conversion', 'Single phasing & dry run protection', 'Digital volt/amp/frequency meters', 'Waterproof IP55 cabinet enclosures']
    },
    {
      title: 'Air-Jet & Loom Drive Synchronization',
      desc: 'Specialized textile unit electronic drive servicing, inverter brake resistors, and tension motor calibration.',
      price: 'Custom Quote',
      badge: 'Textile Specialized',
      items: ['Dynamic braking resistor replacement', 'Encoder signal verification', 'Weft feeder motor repair', 'Panel heat-sink blower maintenance']
    },
    {
      title: 'Cashew Roaster Burner & Boiler Controls',
      desc: 'Precision temperature loop tuning for commercial cashew roasters and continuous cookers.',
      price: 'Quoted per Unit',
      badge: 'Food Processing',
      items: ['Thermocouple & RTD probe replacement', 'Gas burner solenoid valve checks', 'Digital PID controller tuning', 'High-temp limit safety bypass tests']
    }
  ]

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="hero" style={{ paddingBlock: '48px 56px' }}>
        <div className="wrap">
          <span className="hero-pill-badge">Services & Transparent Rates</span>
          <h1 style={{ fontSize: '2.6rem' }}>Machinery Services & Pricing</h1>
          <p className="hero-tag">
            Clear, transparent inspection and travel rates. Never any hidden fees or surprise billings.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-tag">Core Offerings</span>
            <h2>On-Site Technical Services</h2>
            <p className="lede">From emergency same-day triage to full preventive maintenance contracts.</p>
          </div>

          <div className="services-grid">
            {services.map((s, idx) => (
              <div key={idx} className="service-card">
                <div className="service-card-head">
                  <div className="service-icon-box">
                    <Wrench className="ic" />
                  </div>
                  <div>
                    <span className="badge s-Acknowledged" style={{ fontSize: '0.75rem' }}>{s.badge}</span>
                    <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>{s.title}</h3>
                  </div>
                </div>

                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
                  {s.desc}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'grid', gap: '8px', fontSize: '0.85rem' }}>
                  {s.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Check className="ic" style={{ color: 'var(--brand)', width: '1em', height: '1em' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-price-tag">
                  <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Starting from:</span>
                  <b>{s.price}</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Travel & Cost Estimator Calculator */}
      <section className="section alt" id="calculator">
        <div className="wrap">
          <div className="section-head">
            <span className="section-tag">Instant Transparent Quote</span>
            <h2>{t('calc_title')}</h2>
            <p className="lede">{t('calc_sub')}</p>
          </div>

          <div className="calc-card">
            <div className="calc-grid">
              {/* Controls */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>1. Choose Service & Distance</h3>

                {/* Service Type Selection */}
                <div style={{ marginBottom: '20px' }}>
                  <label className="label" style={{ marginBottom: '8px', display: 'block' }}>{t('calc_service_type')}</label>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '6px', background: serviceType === 'breakdown' ? 'var(--brand-light)' : 'var(--surface)', cursor: 'pointer' }}>
                      <input type="radio" name="srv" checked={serviceType === 'breakdown'} onChange={() => setServiceType('breakdown')} />
                      <div>
                        <strong>Emergency Breakdown Diagnostic Visit</strong>
                        <span style={{ display: 'block', fontSize: '0.825rem', color: 'var(--muted)' }}>Full on-site root-cause inspection & written report (₹1,500)</span>
                      </div>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '6px', background: serviceType === 'amc' ? 'var(--brand-light)' : 'var(--surface)', cursor: 'pointer' }}>
                      <input type="radio" name="srv" checked={serviceType === 'amc'} onChange={() => setServiceType('amc')} />
                      <div>
                        <strong>Comprehensive Preventive AMC Audit</strong>
                        <span style={{ display: 'block', fontSize: '0.825rem', color: 'var(--muted)' }}>Multi-point electrical, thermal & vibration assessment (₹2,500)</span>
                      </div>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: '6px', background: serviceType === 'commissioning' ? 'var(--brand-light)' : 'var(--surface)', cursor: 'pointer' }}>
                      <input type="radio" name="srv" checked={serviceType === 'commissioning'} onChange={() => setServiceType('commissioning')} />
                      <div>
                        <strong>Equipment Commissioning & Alignment</strong>
                        <span style={{ display: 'block', fontSize: '0.825rem', color: 'var(--muted)' }}>New line setup, laser alignment, and full trial run (₹3,000)</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Distance Slider & Quick Location Presets */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label className="label" htmlFor="distInput">{t('calc_distance_label')}</label>
                    <span className="mono" style={{ fontWeight: '700', color: 'var(--brand)', fontSize: '1.1rem' }}>{km} km</span>
                  </div>
                  <input
                    id="distInput"
                    type="range"
                    min="5"
                    max="280"
                    step="5"
                    value={km}
                    onChange={e => setKm(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--brand)' }}
                  />

                  {/* Preset District Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                    {DISTRICT_PRESETS.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        className="sample-pill"
                        style={{ background: km === p.km ? 'var(--brand)' : 'var(--tint)', color: km === p.km ? '#fff' : 'var(--ink)' }}
                        onClick={() => setKm(p.km)}
                      >
                        {p.name} ({p.km} km)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kit Consumable Option */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={includeKit} onChange={e => setIncludeKit(e.target.checked)} style={{ width: '18px', height: '18px' }} />
                    <span>Include Standard Consumable Service Kit (Cleaning solvents, high-temp grease, cable ties: ₹800)</span>
                  </label>
                </div>
              </div>

              {/* Live Cost Breakdown Display */}
              <div className="calc-breakdown">
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calculator className="ic" style={{ color: 'var(--brand)' }} />
                    Estimated Billing Breakdown
                  </h3>

                  <div className="calc-row">
                    <span>{t('calc_base_fee')}:</span>
                    <strong className="mono">{inr(baseFee)}</strong>
                  </div>

                  <div className="calc-row">
                    <div>
                      <span>{t('calc_travel_fee')}:</span>
                      <small style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem' }}>
                        {km <= 25 ? 'Included within 25 km base' : `${km} km round-trip distance tier`}
                      </small>
                    </div>
                    <strong className="mono">{travelFee === 0 ? 'Free (Base)' : inr(travelFee)}</strong>
                  </div>

                  {includeKit && (
                    <div className="calc-row">
                      <span>Consumable Service Kit:</span>
                      <strong className="mono">{inr(kitFee)}</strong>
                    </div>
                  )}

                  <div className="calc-row total">
                    <span>{t('calc_total_estimate')}:</span>
                    <b>{inr(totalEstimate)}</b>
                  </div>

                  <div style={{ marginTop: '16px', padding: '12px', background: 'var(--surface)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--muted)', border: '1px solid var(--line)' }}>
                    <Info className="ic" style={{ width: '1em', height: '1em', verticalAlign: '-2px', marginRight: '4px' }} />
                    <span>Replacement spare parts (contractors, bearings, belts) are supplied at actual manufacturer cost and quoted after initial diagnosis.</span>
                  </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleBookEstimate}>
                    <span>{t('calc_book_btn')}</span>
                    <ArrowRight className="ic" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Rate Matrix */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-tag">Published Rate Matrix</span>
            <h2>Standard Component & Travel Charge Schedule</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '14px' }}>Distance Travel Tiers</h3>
              <table style={{ width: '100%', fontSize: '0.9rem' }}>
                <tbody>
                  <tr><td>Up to 25 km from Base</td><td style={{ textAlign: 'right', fontWeight: '600', color: 'var(--success)' }}>Included</td></tr>
                  <tr><td>26 km to 50 km</td><td style={{ textAlign: 'right', fontWeight: '600' }}>₹500 flat</td></tr>
                  <tr><td>51 km to 100 km</td><td style={{ textAlign: 'right', fontWeight: '600' }}>₹1,200 flat</td></tr>
                  <tr><td>Above 100 km</td><td style={{ textAlign: 'right', fontWeight: '600' }}>₹1,200 + ₹12/extra km</td></tr>
                  <tr><td>Overnight Stay (Outstation)</td><td style={{ textAlign: 'right', fontWeight: '600' }}>At actual tariff</td></tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '14px' }}>Diagnostic Kits & Tooling</h3>
              <table style={{ width: '100%', fontSize: '0.9rem' }}>
                <tbody>
                  <tr><td>Cleaning & Lubrication Solvent Kit</td><td style={{ textAlign: 'right', fontWeight: '600' }}>₹800</td></tr>
                  <tr><td>High-Voltage Megger Insulation Test</td><td style={{ textAlign: 'right', fontWeight: '600' }}>₹600</td></tr>
                  <tr><td>Specialist Gas Refill (R134a/R410A)</td><td style={{ textAlign: 'right', fontWeight: '600' }}>₹900 / kg</td></tr>
                  <tr><td>Laser Shaft Alignment Rig</td><td style={{ textAlign: 'right', fontWeight: '600' }}>₹2,000 / job</td></tr>
                  <tr><td>Industrial Spares Supply</td><td style={{ textAlign: 'right', fontWeight: '600' }}>At direct stockist rate</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
