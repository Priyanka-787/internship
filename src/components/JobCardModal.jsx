import { Printer, X, CheckCircle, ShieldCheck } from 'lucide-react'
import { useApp } from '../context.jsx'

export default function JobCardModal({ req, onClose }) {
  const { t } = useApp()
  if (!req) return null

  const printSlip = () => {
    window.print()
  }

  return (
    <div className="jobcard-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="jobcard-title">
      <div className="jobcard-paper" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '16px' }} className="d-print-none">
          <button className="btn btn-primary btn-sm" onClick={printSlip}>
            <Printer className="ic" /> {t('jobcard_print')}
          </button>
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            <X className="ic" /> {t('jobcard_close')}
          </button>
        </div>

        {/* Official Header */}
        <div className="jobcard-header">
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand)' }}>
              Industrial Machine Service Job Card
            </span>
            <h2 id="jobcard-title" style={{ fontSize: '1.5rem', marginTop: '4px' }}>
              Venkata Prasanna Enterprises
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>
              On-Site Inspection & Breakdown Repair Service • Andhra Pradesh, India<br />
              Direct Engineer Hotline: +91 98480 12345 • service@vpe.example
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="jobcard-stamp">{req.status}</span>
            <p style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: '700' }}>
              REF: {req.id}
            </p>
          </div>
        </div>

        {/* Customer & Machine Meta */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBlock: '24px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Client / Mill Details</h4>
            <p><strong>{req.company}</strong></p>
            <p>Contact: {req.contact || req.owner}</p>
            <p>Phone: {req.mobile}</p>
            <p>Location: {req.location}</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Machinery & Service Data</h4>
            <p>Industry: <span style={{ textTransform: 'capitalize' }}>{req.industry} processing</span></p>
            <p>Equipment: <strong>{req.machine || 'Industrial Plant Machine'}</strong></p>
            <p>Date Logged: {new Date(req.createdAt).toLocaleDateString()}</p>
            <p>Scheduled Visit: {req.visit || 'Immediate Triage'}</p>
          </div>
        </div>

        {/* Reported Issue */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.95rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '8px' }}>
            Reported Breakdown / Fault Description
          </h4>
          <p style={{ fontSize: '0.92rem', lineHeight: '1.5', background: '#ffffff', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
            {req.problem || 'Standard preventive maintenance and inspection requested.'}
          </p>
        </div>

        {/* Engineer Findings & Notes */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.95rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '8px' }}>
            Inspection Findings, Action Taken & Spares Used
          </h4>
          <p style={{ fontSize: '0.92rem', lineHeight: '1.5', background: '#ffffff', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
            {req.notes || 'Inspection in progress. Spares and test results will be updated upon completion.'}
          </p>
        </div>

        {/* Cost Summary */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '0.95rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '12px' }}>
            Standard Service Charge Estimation
          </h4>
          <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 0' }}>Base On-Site Inspection & Diagnostic Fee</td>
                <td style={{ textAlign: 'right', fontWeight: '600' }}>₹1,500.00</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 0' }}>Round-Trip Travel & Tool Transit Allowance</td>
                <td style={{ textAlign: 'right', fontWeight: '600' }}>As per distance matrix</td>
              </tr>
              <tr style={{ borderBottom: '2px solid #0f5b47' }}>
                <td style={{ padding: '8px 0' }}>Replacement Spares & Consumables</td>
                <td style={{ textAlign: 'right', fontWeight: '600' }}>At actuals / quoted</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signatures */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', paddingTop: '20px', borderTop: '1px dashed #cbd5e1', fontSize: '0.85rem' }}>
          <div>
            <div style={{ height: '40px' }}></div>
            <div style={{ borderTop: '1px solid #475569', paddingTop: '6px' }}>
              <strong>Authorized Lead Service Engineer</strong><br />
              <span>Venkata Prasanna Enterprises (AP)</span>
            </div>
          </div>
          <div>
            <div style={{ height: '40px' }}></div>
            <div style={{ borderTop: '1px solid #475569', paddingTop: '6px' }}>
              <strong>Client Representative Signature & Seal</strong><br />
              <span>{req.company}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
