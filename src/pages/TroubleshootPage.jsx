import { useState } from 'react'
import { AlertTriangle, ShieldAlert, CheckCircle, ArrowRight, Wrench, Zap, RotateCcw } from 'lucide-react'
import { useApp } from '../context.jsx'
import { useRouter } from '../router.jsx'

const FAULT_DATABASE = {
  motor: {
    name: '3-Phase Induction Motor (5 - 100 HP)',
    symptoms: [
      {
        id: 'trip',
        label: 'Motor Overheats & Trips Breaker after 10-30 Mins',
        causes: ['Phase voltage unbalance (> 2%)', 'Worn drive-end bearing causing excessive mechanical drag', 'Thermal overload relay setting too low or aged', 'Clogged motor cooling fan cowl'],
        safety: 'DO NOT repeatedly reset the thermal breaker. Repeated hot resets will permanently melt the copper stator winding varnish.',
        action: 'Requires clamp meter phase-current verification, bearing infrared thermal scan, and winding resistance check.'
      },
      {
        id: 'hum',
        label: 'Motor Hums Loudly but Shaft Refuses to Rotate',
        causes: ['Single phasing (one fuse or phase line disconnected)', 'Seized bearing or jammed mechanical load', 'Broken rotor bar or severe stator short'],
        safety: 'IMMEDIATELY switch off power! A single-phasing motor drawing locked-rotor current will burn out within 60 to 90 seconds.',
        action: 'De-couple motor from machine to verify free shaft rotation by hand, then measure 3-phase incoming terminal voltage.'
      },
      {
        id: 'vibe',
        label: 'Excessive Mechanical Vibration & Grinding Noise',
        causes: ['Misaligned pulley or damaged flexible coupling', 'Internal bearing cage degradation', 'Bent shaft or loose foundation anchor bolts'],
        safety: 'Stop the drive before bearing disintegration scores the stator laminations or damages driven machinery.',
        action: 'Perform laser coupling alignment check and bearing vibration velocity measurement.'
      }
    ]
  },
  elevator: {
    name: 'Bucket Elevator / Grain Conveyor',
    symptoms: [
      {
        id: 'slip',
        label: 'Drive Motor Runs but Elevator Belt Slips / Stalls',
        causes: ['Insufficient belt tension or worn head-pulley rubber lagging', 'Grain jamming in elevator boot hopper', 'Under-rated gearbox worm drive slipping'],
        safety: 'Isolate main power and follow LOTO before opening elevator cleanout doors to prevent entrapment.',
        action: 'Adjust tensioning screws evenly and inspect head pulley lagging condition.'
      },
      {
        id: 'noise',
        label: 'Loud Clattering or Rhythmic Knocking Sound',
        causes: ['Loose elevator bucket scraping against casing trunking', 'Slack chain/belt hitting housing', 'Boot bearing bearing flange fractured'],
        safety: 'Shut down immediately to prevent loose metal buckets from ripping and sparking inside the grain trunking.',
        action: 'Open inspection hatch, check bucket bolts torque, and inspect guide rollers.'
      }
    ]
  },
  loom: {
    name: 'Air-Jet & Rapier Weaving Loom',
    symptoms: [
      {
        id: 'inv_err',
        label: 'Inverter Throws Overvoltage (E-04 / OC Fault) on Braking',
        causes: ['Burnt dynamic braking resistor', 'Deceleration time parameter too steep', 'AC input line surge during shift changes'],
        safety: 'Allow inverter capacitor bank to bleed down for 10 minutes before opening inverter cabinet.',
        action: 'Measure dynamic braking resistor ohmic value and check heat sink fan operation.'
      },
      {
        id: 'jerk',
        label: 'Uneven Weft Insertion / Servo Tension Jitter',
        causes: ['Encoder cable shielding noise interference', 'Servo motor feedback connector loose', 'Worn timing belt drive teeth'],
        safety: 'Keep hands clear of rapid shedding mechanisms during diagnostic dry runs.',
        action: 'Inspect encoder shielded ground connection and check timing belt tension.'
      }
    ]
  },
  cashew: {
    name: 'Cashew Roaster & Burner Unit',
    symptoms: [
      {
        id: 'temp_drift',
        label: 'Roaster Temperature Drifting Wildly (±25°C)',
        causes: ['Degraded K-type thermocouple probe or extension wire', 'Clogged gas burner jet nozzle', 'PID temperature controller output relay sticking'],
        safety: 'Verify fuel gas shutoff valve works properly before inspecting combustion burner.',
        action: 'Replace thermocouple probe with mineral insulated shielded assembly and clean gas injector.'
      },
      {
        id: 'no_ignite',
        label: 'Burner Spark Occurs but Flame Fails to Establish',
        causes: ['Faulty flame sensor rod (photocell or ionization)', 'Low LPG gas regulator pressure', 'Solenoid valve coil burnt'],
        safety: 'Do not attempt repeated manual ignitions without purging gas from combustion chamber for at least 3 minutes.',
        action: 'Clean flame detection rod and test solenoid valve coil resistance.'
      }
    ]
  },
  panel: {
    name: '415V Main LT Starter Panel',
    symptoms: [
      {
        id: 'burn',
        label: 'Burning Plastic Odor or Audible Buzzing from Contactor',
        causes: ['Dust/dirt buildup on contactor laminated AC magnet pole faces', 'Severely pitted copper power contacts', 'Loose terminal lug causing high electrical resistance'],
        safety: 'High arc-flash hazard! Wear safety visor and disconnect upstream circuit breaker before touching panel interior.',
        action: 'Conduct infrared thermal scan to pinpoint hot spots, clean contactor pole faces, and replace burnt contacts.'
      }
    ]
  }
}

export default function TroubleshootPage() {
  const { t } = useApp()
  const { navigate } = useRouter()

  const [selectedMachine, setSelectedMachine] = useState('motor')
  const [selectedSymptom, setSelectedSymptom] = useState(FAULT_DATABASE.motor.symptoms[0].id)

  const machineObj = FAULT_DATABASE[selectedMachine]
  const symptomObj = machineObj.symptoms.find(s => s.id === selectedSymptom) || machineObj.symptoms[0]

  const handleMachineChange = key => {
    setSelectedMachine(key)
    setSelectedSymptom(FAULT_DATABASE[key].symptoms[0].id)
  }

  const handleBookWithDiagnosis = () => {
    navigate('/report', {
      machine: machineObj.name,
      problem: `[Self-Diagnosed Issue]: ${symptomObj.label}. Suspected: ${symptomObj.causes[0]}. Recommended: ${symptomObj.action}`
    })
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="hero" style={{ paddingBlock: '48px 56px' }}>
        <div className="wrap">
          <span className="hero-pill-badge">Self-Service Diagnostics</span>
          <h1 style={{ fontSize: '2.6rem' }}>{t('trouble_title')}</h1>
          <p className="hero-tag">{t('trouble_sub')}</p>
        </div>
      </section>

      {/* Troubleshooter Interactive Box */}
      <section className="section">
        <div className="wrap">
          <div className="trouble-box">
            <div className="trouble-selectors">
              {/* Selector 1: Machine */}
              <div>
                <label className="label">{t('trouble_mach_label')}</label>
                <select
                  value={selectedMachine}
                  onChange={e => handleMachineChange(e.target.value)}
                  style={{ fontWeight: '600' }}
                >
                  {Object.entries(FAULT_DATABASE).map(([k, v]) => (
                    <option key={k} value={k}>{v.name}</option>
                  ))}
                </select>
              </div>

              {/* Selector 2: Symptom */}
              <div>
                <label className="label">{t('trouble_symp_label')}</label>
                <select
                  value={selectedSymptom}
                  onChange={e => setSelectedSymptom(e.target.value)}
                  style={{ fontWeight: '600' }}
                >
                  {machineObj.symptoms.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Diagnostic Output Card */}
            <div className="trouble-result">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Zap className="ic" style={{ color: 'var(--brand)' }} />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{t('trouble_diag_title')}</h3>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>
                  Most Probable Causes:
                </strong>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '4px', fontSize: '0.95rem' }}>
                  {symptomObj.causes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--brand)', display: 'block', marginBottom: '4px' }}>
                  Required Technical Service Action:
                </strong>
                <p style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>{symptomObj.action}</p>
              </div>

              {/* Safety Alert */}
              <div className="safety-alert">
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <ShieldAlert className="ic" style={{ width: '1.3em', height: '1.3em', marginTop: '2px', color: 'var(--alert)' }} />
                  <div>
                    <strong>{t('trouble_safety_title')}:</strong>
                    <p style={{ marginTop: '2px' }}>{symptomObj.safety}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <button className="btn btn-primary btn-lg" onClick={handleBookWithDiagnosis}>
                  <Wrench className="ic" /> {t('trouble_book_btn')}
                </button>
                <a href={`tel:${t('emergency_phone')}`} className="btn btn-outline btn-lg">
                  Consult Lead Engineer By Phone
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
