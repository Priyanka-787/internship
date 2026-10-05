import { useState } from 'react'
import { Building2, CheckCircle2, Shield, ArrowRight, Award, FileText } from 'lucide-react'
import { useApp } from '../context.jsx'
import { Link } from '../router.jsx'

export default function ExperiencePage() {
  const { t } = useApp()
  const [indFilter, setIndFilter] = useState('all')

  const clients = [
    { name: 'Sri Lakshmi Modern Rice Mill', location: 'Rajahmundry', ind: 'rice', since: 2016, machines: '6 De-huskers, 4 Polishers, 50 HP Bucket Elevators' },
    { name: 'Annapurna Synthetic Textiles Ltd', location: 'Guntur Industrial Estate', ind: 'cloth', since: 2018, machines: '18 Air-Jet Looms, Central Compressor, Inverter Panels' },
    { name: 'Sai Export Cashew Processors', location: 'Palasa, Srikakulam', ind: 'cashew', since: 2019, machines: 'Rotary Roasting Batteries, Steam Boiler Control Unit' },
    { name: 'Godavari Agro Foods & Parboil', location: 'Tanuku', ind: 'rice', since: 2021, machines: 'Paddy Pre-cleaners, Color Sorter Feeding Line' },
    { name: 'Padmavathi Spinning Mills', location: 'Chilakaluripet', ind: 'cloth', since: 2022, machines: 'Ring Frames, Humidification Plant Fans' },
    { name: 'Konaseema Cashew Industries', location: 'Amalapuram', ind: 'cashew', since: 2023, machines: 'Cashew Shelling Lines, Vacuum Nitrogen Sealing Units' },
    { name: 'Venkateswara Flour & Feed Mill', location: 'Kakinada Port', ind: 'rice', since: 2020, machines: 'Grain Hammer Mills, Cyclone Dust Blowers' },
    { name: 'Sri Krishna Textiles', location: 'Pedaravuru, Tenali', ind: 'cloth', since: 2024, machines: 'Rapier Looms, Electronic Dobby Drives' }
  ]

  const caseStudies = [
    {
      title: '50 HP Rice Mill Elevator Motor Overheating Solved in 3.5 Hours',
      client: 'Sri Lakshmi Modern Rice Mill, Rajahmundry',
      category: 'rice',
      problem: 'Elevator motor kept tripping the 63A main breaker after 20 minutes of running. Plant stood idle with paddy intake stalled during monsoon rush.',
      action: 'Conducted thermal imaging and found a severe 28A vs 42A phase current unbalance caused by a pitted contactor contact and worn motor drive-end bearing. Replaced thermal relay, installed SKF deep-groove bearing, and balanced phase load.',
      result: 'Motor current stabilized at 34A per phase under full paddy load. Mill was restarted within 3.5 hours of initial call, preventing spoilage of 40 tons of raw grain.',
      metric: 'Downtime saved: ~18 hours'
    },
    {
      title: 'Dynamic Braking Resistor Overhaul on Air-Jet Loom Line',
      client: 'Annapurna Synthetic Textiles, Guntur',
      category: 'cloth',
      problem: 'Loom #4 inverter continuously threw Overvoltage (E-04) during high-speed stopping, causing weft yarn breakage and defective fabric weave.',
      action: 'Megger and resistance test revealed the dynamic braking resistor unit had open-circuited due to thermal fatigue. Replaced with heavy-duty aluminum housed braking resistor and reconfigured deceleration curve on the drive.',
      result: 'Loom resumed weaving at full 650 picks/minute without tension jerks or brake errors.',
      metric: 'Zero fabric rejection on subsequent shift'
    },
    {
      title: 'Digital Thermocouple & Burner Calibration on 180°C Roaster',
      client: 'Sai Export Cashew Processors, Palasa',
      category: 'cashew',
      problem: 'Rotary cashew roaster temperature was drifting wildly between 160°C and 205°C, resulting in scorched batches and uneven moisture removal.',
      action: 'Identified a degraded mineral-insulated thermocouple junction wire and clogged burner fuel-air mixing nozzle. Replaced with high-precision K-type probe and fine-tuned PID proportional band.',
      result: 'Roaster maintained ±1.5°C stability across 8-hour continuous roasting cycles.',
      metric: 'Export quality grade yield increased by 14%'
    }
  ]

  const filteredClients = indFilter === 'all' ? clients : clients.filter(c => c.ind === indFilter)

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="hero" style={{ paddingBlock: '48px 56px' }}>
        <div className="wrap">
          <span className="hero-pill-badge">Proven Track Record</span>
          <h1 style={{ fontSize: '2.6rem' }}>Vendor Experience & Clients</h1>
          <p className="hero-tag">
            Why leading manufacturing, textile, and food processing plants across Andhra Pradesh trust VPE as their approved service vendor.
          </p>
        </div>
      </section>

      {/* Vendor Reliability Highlights */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            <div className="card" style={{ borderLeft: '6px solid var(--brand)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Shield className="ic" style={{ color: 'var(--brand)' }} />
                <h3 style={{ fontSize: '1.2rem' }}>Registered Vendor Status</h3>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Fully compliant with industrial procurement procedures. Invoices with GST, formal inspection reports, and warranty certificates provided.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '6px solid var(--accent)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Award className="ic" style={{ color: 'var(--accent)' }} />
                <h3 style={{ fontSize: '1.2rem' }}>Guaranteed Response Promise</h3>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Every service ticket submitted online or by phone receives rapid engineer acknowledgement, telephone triage, and a committed visit schedule.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '6px solid var(--info)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <FileText className="ic" style={{ color: 'var(--info)' }} />
                <h3 style={{ fontSize: '1.2rem' }}>Official Service Documentation</h3>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Complete written job card documentation with insulation test values, thermal scans, parts replaced, and preventive recommendations.
              </p>
            </div>
          </div>

          {/* Client Roster with Industry Filter */}
          <div className="section-head" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <div>
              <span className="section-tag">Client Roster</span>
              <h2>Registered Plants & Experience</h2>
            </div>

            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['all', 'rice', 'cloth', 'cashew'].map(f => (
                <button
                  key={f}
                  type="button"
                  className="btn btn-sm"
                  style={{
                    background: indFilter === f ? 'var(--brand)' : 'var(--tint)',
                    color: indFilter === f ? '#fff' : 'var(--ink)',
                    border: '1px solid var(--line)'
                  }}
                  onClick={() => setIndFilter(f)}
                >
                  {f === 'all' ? 'All Industries' : t('chip_' + f)}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.925rem' }}>
                <thead>
                  <tr style={{ background: 'var(--tint)', borderBottom: '1px solid var(--line)' }}>
                    <th style={{ padding: '14px 18px', textAlign: 'left' }}>Company / Plant Name</th>
                    <th style={{ padding: '14px 18px', textAlign: 'left' }}>Industry</th>
                    <th style={{ padding: '14px 18px', textAlign: 'left' }}>Location</th>
                    <th style={{ padding: '14px 18px', textAlign: 'left' }}>Equipment Maintained</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Vendor Since</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: '600' }}>{c.name}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <span className="badge s-Acknowledged">{t('ind_' + c.ind)}</span>
                      </td>
                      <td style={{ padding: '14px 18px', color: 'var(--muted)' }}>{c.location}</td>
                      <td style={{ padding: '14px 18px', fontSize: '0.85rem' }}>{c.machines}</td>
                      <td style={{ padding: '14px 18px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                        {c.since}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <span className="section-tag">Case Studies</span>
            <h2>Field Troubleshooting In Action</h2>
            <p className="lede">Real breakdown challenges solved on-site with measurable downtime reduction.</p>
          </div>

          <div style={{ display: 'grid', gap: '24px' }}>
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="card" style={{ borderLeft: '6px solid var(--brand)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <span className="badge s-Completed" style={{ marginBottom: '6px' }}>{cs.metric}</span>
                    <h3 style={{ fontSize: '1.3rem' }}>{cs.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '2px' }}>{cs.client}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px', background: 'var(--tint)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--alert)', fontSize: '0.85rem', marginBottom: '4px' }}>Reported Problem:</strong>
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>{cs.problem}</p>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--brand)', fontSize: '0.85rem', marginBottom: '4px' }}>Engineer Action Taken:</strong>
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>{cs.action}</p>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--success)', fontSize: '0.85rem', marginBottom: '4px' }}>Operational Outcome:</strong>
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>{cs.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <Link to="/report" className="btn btn-accent btn-lg">
              Book Engineer for Your Plant <ArrowRight className="ic" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
