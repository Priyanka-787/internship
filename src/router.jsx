import { useState, useEffect, createContext, useContext, useCallback } from 'react'

const RouterContext = createContext({
  path: '/',
  query: {},
  navigate: () => {},
  params: {}
})

function parseHash(hash) {
  const clean = hash.replace(/^#\/?/, '')
  const [pathname, queryString] = clean.split('?')
  const path = '/' + (pathname || '')
  const query = {}
  if (queryString) {
    new URLSearchParams(queryString).forEach((val, key) => {
      query[key] = val
    })
  }
  return { path: path.replace(/\/+$/, '') || '/', query }
}

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(() => {
    if (typeof window === 'undefined') return { path: '/', query: {} }
    return parseHash(window.location.hash)
  })

  useEffect(() => {
    const handleHash = () => {
      const parsed = parseHash(window.location.hash)
      setRoute(parsed)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', handleHash)
    // If no hash is set, default to #/
    if (!window.location.hash) {
      window.location.hash = '#/'
    }
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const navigate = useCallback((to, queryParams = {}) => {
    let cleanTo = to.startsWith('/') ? to : '/' + to
    const qs = new URLSearchParams(queryParams).toString()
    const targetHash = `#${cleanTo}${qs ? '?' + qs : ''}`
    if (window.location.hash === targetHash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.hash = targetHash
    }
  }, [])

  return (
    <RouterContext.Provider value={{ path: route.path, query: route.query, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  return useContext(RouterContext)
}

export function Link({ to, query, className = '', children, onClick, ...props }) {
  const { navigate } = useRouter()
  const cleanTo = to.startsWith('/') ? to : '/' + to
  const qs = query ? '?' + new URLSearchParams(query).toString() : ''
  const href = `#${cleanTo}${qs}`

  const handleClick = e => {
    if (onClick) onClick(e)
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault()
      navigate(cleanTo, query)
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export function NavLink({ to, className = '', activeClassName = 'active', children, ...props }) {
  const { path } = useRouter()
  const cleanTo = to.startsWith('/') ? to : '/' + to
  const isActive = path === cleanTo || (cleanTo !== '/' && path.startsWith(cleanTo))

  const finalClass = `${className} ${isActive ? activeClassName : ''}`.trim()

  return (
    <Link to={cleanTo} className={finalClass} aria-current={isActive ? 'page' : undefined} {...props}>
      {children}
    </Link>
  )
}
