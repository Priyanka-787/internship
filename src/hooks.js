import { useEffect, useRef, useState, useCallback } from 'react'
export function useRecorder(onDemo) {
  const [state, setState] = useState('idle'), [secs, setSecs] = useState(0), [url, setUrl] = useState(null)
  const r = useRef({ mr: null, stream: null, chunks: [], timer: null, demo: false })
  const stop = useCallback(() => {
    clearInterval(r.current.timer)
    const { mr, demo } = r.current
    if (!demo && mr && mr.state !== 'inactive') try { mr.stop() } catch {}
    setSecs(s => Math.max(1, s)); setState('done')
  }, [])
  const start = async () => {
    r.current.chunks = []; r.current.demo = false; setSecs(0)
    if (url) URL.revokeObjectURL(url); setUrl(null)
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw new Error('unsupported')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      mr.ondataavailable = e => e.data?.size && r.current.chunks.push(e.data)
      mr.onstop = () => { setUrl(URL.createObjectURL(new Blob(r.current.chunks, { type: mr.mimeType || 'audio/webm' }))); stream.getTracks().forEach(t => t.stop()) }
      mr.start(); Object.assign(r.current, { mr, stream })
    } catch { r.current.demo = true; onDemo?.() }
    setState('recording')
    r.current.timer = setInterval(() => setSecs(s => s + 1), 1000)
  }
  useEffect(() => { if (state === 'recording' && secs >= 120) stop() }, [secs, state, stop])
  useEffect(() => () => { clearInterval(r.current.timer); r.current.stream?.getTracks().forEach(t => t.stop()) }, [])
  const reset = () => { clearInterval(r.current.timer); r.current.stream?.getTracks().forEach(t => t.stop()); setState('idle'); setSecs(0); setUrl(null) }
  return { state, secs, url, start, stop, reset }
}
