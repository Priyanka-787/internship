import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { T } from './i18n.js'
import * as store from './store.js'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const s = localStorage.getItem('vpe-lang')
      return T[s] ? s : 'en'
    } catch {
      return 'en'
    }
  })

  const [theme, setTheme] = useState(store.getTheme)
  const [user, setUserState] = useState(store.getUser)
  const [requests, setRequests] = useState(store.getRequests)
  const [toastMsg, setToast] = useState('')
  const [authMode, setAuthMode] = useState(null)
  const [trackQuery, setTrackQuery] = useState('')
  const timer = useRef()

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('vpe-lang', lang)
    } catch {}
  }, [lang])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    store.saveTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const t = useCallback(
    k => T[lang]?.[k] ?? T.en[k] ?? k,
    [lang]
  )

  const toast = useCallback(m => {
    setToast(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 4500)
  }, [])

  const setUser = u => {
    setUserState(u)
    store.saveUser(u)
  }

  const persist = fn =>
    setRequests(prev => {
      const next = fn(prev)
      store.saveRequests(next)
      return next
    })

  const addRequest = r => persist(p => [r, ...p])

  const updateRequest = (id, patch) =>
    persist(p =>
      p.map(r => {
        if (r.id === id) {
          const updatedHistory = r.history ? [...r.history] : []
          if (patch.status && patch.status !== r.status) {
            updatedHistory.push({
              status: patch.status,
              time: new Date().toISOString(),
              note: patch.notes || `Status changed to ${patch.status}`
            })
          }
          return { ...r, ...patch, history: updatedHistory }
        }
        return r
      })
    )

  return (
    <Ctx.Provider
      value={{
        lang,
        setLang,
        theme,
        toggleTheme,
        t,
        user,
        setUser,
        requests,
        addRequest,
        updateRequest,
        toast,
        toastMsg,
        authMode,
        setAuthMode,
        trackQuery,
        setTrackQuery
      }}
    >
      {children}
    </Ctx.Provider>
  )
}
