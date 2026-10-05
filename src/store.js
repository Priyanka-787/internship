// Persistence layer with rich initial seed data for demonstration and production readiness.
const read = (k, d) => {
  try {
    const val = localStorage.getItem(k)
    return val !== null ? JSON.parse(val) : d
  } catch {
    return d
  }
}

const write = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch {}
}

export const getUser = () => read('vpe-user', null)
export const saveUser = u => u ? write('vpe-user', u) : (() => { try { localStorage.removeItem('vpe-user') } catch {} })()

export const DEFAULT_REQUESTS = [
  {
    id: 'VPE-REQ-4821',
    company: 'Sri Lakshmi Modern Rice Mill',
    owner: 'M. Venkateswara Rao',
    contact: 'M. Venkateswara Rao',
    mobile: '9848012345',
    location: 'Rajahmundry, East Godavari',
    industry: 'rice',
    machine: '50 HP De-husker Elevator Motor',
    problem: 'Motor tripping on thermal overload after 20 minutes continuous run. High heat observed near drive coupling.',
    priority: 'High',
    since: '2026-10-04',
    status: 'Scheduled',
    visit: '2026-10-07',
    notes: 'Preliminary diagnosis: phase current unbalance or tight bearing. Bringing replacement 32A thermal overload relay and SKF bearings.',
    hasVoice: true,
    userId: 'demo@vpe.com',
    createdAt: '2026-10-04T09:30:00.000Z',
    history: [
      { status: 'New', time: '2026-10-04T09:30:00.000Z', note: 'Service request registered via online portal.' },
      { status: 'Acknowledged', time: '2026-10-04T10:15:00.000Z', note: 'Lead engineer called customer and completed remote triage.' },
      { status: 'Scheduled', time: '2026-10-04T12:00:00.000Z', note: 'Field visit scheduled for Oct 7 morning with required spares.' }
    ],
    review: null
  },
  {
    id: 'VPE-REQ-3914',
    company: 'Annapurna Synthetic Textiles Ltd',
    owner: 'K. Sridhar Reddy',
    contact: 'K. Sridhar Reddy',
    mobile: '9989045678',
    location: 'Guntur Industrial Estate',
    industry: 'cloth',
    machine: 'Air-Jet Weaving Loom Drive Inverter',
    problem: 'Inverter error code E-04 (Overvoltage during deceleration cycle). Production line stopped on Loom #4.',
    priority: 'Urgent',
    since: '2026-10-02',
    status: 'Completed',
    visit: '2026-10-03',
    notes: 'Replaced burnt dynamic braking resistor unit. Recalibrated deceleration ramp and tested loom under 650 RPM full load for 2 hours. Operational sign-off received.',
    hasVoice: false,
    userId: null,
    createdAt: '2026-10-02T08:15:00.000Z',
    history: [
      { status: 'New', time: '2026-10-02T08:15:00.000Z', note: 'Urgent breakdown reported.' },
      { status: 'Acknowledged', time: '2026-10-02T08:30:00.000Z', note: 'Emergency dispatch confirmed.' },
      { status: 'InProgress', time: '2026-10-03T10:00:00.000Z', note: 'Engineer on site. Dismantled faulty resistor module.' },
      { status: 'Completed', time: '2026-10-03T14:30:00.000Z', note: 'Repaired and certified operational.' }
    ],
    review: {
      rating: 5,
      text: 'Engineer arrived within 3 hours of our emergency breakdown. Found the inverter resistor defect right away and restarted our loom before the next shift. Outstanding service!',
      approved: true
    }
  },
  {
    id: 'VPE-REQ-5102',
    company: 'Sai Export Cashew Processors',
    owner: 'P. Ramachandra Murthy',
    contact: 'P. Ramachandra Murthy',
    mobile: '9440156789',
    location: 'Palasa, Srikakulam',
    industry: 'cashew',
    machine: 'Rotary Cashew Roaster & Burner Unit',
    problem: 'Roaster burner temperature fluctuating beyond set limit (180°C). Heating thermocouple reading erratic.',
    priority: 'Medium',
    since: '2026-09-26',
    status: 'Completed',
    visit: '2026-09-28',
    notes: 'Replaced shielded K-type thermocouple probe, cleaned gas burner injector nozzles, and calibrated PID digital temperature controller.',
    hasVoice: true,
    userId: null,
    createdAt: '2026-09-26T11:00:00.000Z',
    history: [
      { status: 'New', time: '2026-09-26T11:00:00.000Z', note: 'Request submitted.' },
      { status: 'Scheduled', time: '2026-09-27T10:00:00.000Z', note: 'Visit scheduled.' },
      { status: 'Completed', time: '2026-09-28T16:00:00.000Z', note: 'Sensor replaced & calibrated.' }
    ],
    review: {
      rating: 5,
      text: 'Very systematic diagnostic approach. The temperature control is now rock-steady and zero defective roasting batches since the repair.',
      approved: true
    }
  },
  {
    id: 'VPE-REQ-6240',
    company: 'Godavari Agro Foods & Parboil',
    owner: 'N. Satyanarayana',
    contact: 'N. Satyanarayana',
    mobile: '9885067890',
    location: 'Tanuku, West Godavari',
    industry: 'rice',
    machine: 'Paddy Pre-cleaner Vibratory Sieve',
    problem: 'Excessive mechanical vibration and rattling noise from eccentric counterweight shaft bearing.',
    priority: 'High',
    since: '2026-10-05',
    status: 'InProgress',
    visit: '2026-10-06',
    notes: 'Inspected bearing housing. Spherical roller bearing 22212 procured. On-site press fit replacement scheduled.',
    hasVoice: false,
    userId: null,
    createdAt: '2026-10-05T07:20:00.000Z',
    history: [
      { status: 'New', time: '2026-10-05T07:20:00.000Z', note: 'Request submitted.' },
      { status: 'InProgress', time: '2026-10-05T13:00:00.000Z', note: 'Inspection completed, bearing assembly underway.' }
    ],
    review: null
  }
]

export const getRequests = () => read('vpe-requests', DEFAULT_REQUESTS)
export const saveRequests = r => write('vpe-requests', r)

export const getTheme = () => {
  try {
    return localStorage.getItem('vpe-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  } catch {
    return 'light'
  }
}
export const saveTheme = t => {
  try { localStorage.setItem('vpe-theme', t) } catch {}
}
