import { useEffect, useRef, useState } from 'react'
import { useApp } from '../context.jsx'
export default function AuthDialog() {
  const { t, authMode, setAuthMode, setUser, toast } = useApp()
  const ref = useRef(), [f, setF] = useState({ name: '', id: '', pass: '', role: 'customer' }), [err, setErr] = useState('')
  const up = authMode === 'up'
  useEffect(() => { const d = ref.current; if (authMode && !d.open) { setErr(''); d.showModal() } if (!authMode && d.open) d.close() }, [authMode])
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => {
    e.preventDefault()
    if (!f.id.trim() || !f.pass || (up && !f.name.trim())) return setErr(t('a_err'))
    setUser({ id: f.id.trim().toLowerCase(), name: f.name.trim() || f.id.trim(), role: f.role })
    setF({ name: '', id: '', pass: '', role: 'customer' }); setAuthMode(null); toast(t('a_welcome'))
  }
  return (
    <dialog ref={ref} aria-labelledby="authTitle" onClose={() => setAuthMode(null)} onClick={e => e.target === ref.current && setAuthMode(null)}>
      <form className="dlg" onSubmit={submit} noValidate>
        <div className="dlg-head"><h2 id="authTitle">{up ? t('auth_up_h') : t('signin')}</h2><button className="x" type="button" aria-label={t('a_close')} onClick={() => setAuthMode(null)}>×</button></div>
        <div className="fields">
          {up && <div className="field"><label htmlFor="an">{t('a_name')}</label><input id="an" value={f.name} onChange={set('name')} autoComplete="name" /></div>}
          <div className="field"><label htmlFor="ai">{t('a_id')}</label><input id="ai" value={f.id} onChange={set('id')} autoComplete="username" /></div>
          <div className="field"><label htmlFor="ap">{t('a_pass')}</label><input id="ap" type="password" value={f.pass} onChange={set('pass')} autoComplete={up ? 'new-password' : 'current-password'} /></div>
          <div><span className="label">{t('a_role')}</span>
            <div className="roles">{[['customer', 'a_customer'], ['engineer', 'a_engineer']].map(([v, k]) =>
              <label key={v}><input type="radio" name="role" value={v} checked={f.role === v} onChange={set('role')} /><span>{t(k)}</span></label>)}</div></div>
        </div>
        {err && <p className="err" role="alert">{err}</p>}
        <div className="form-actions"><button className="btn btn-primary" type="submit">{up ? t('signup') : t('signin')}</button></div>
        <button className="linkbtn" type="button" onClick={() => { setAuthMode(up ? 'in' : 'up'); setErr('') }}>{up ? t('a_switch_in') : t('a_switch_up')}</button>
        <p className="demo-note">{t('a_demo')}</p>
      </form>
    </dialog>
  )
}
