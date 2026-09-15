import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { adminMe } from '../store/adminApi'

// This only controls what renders in the browser. The actual security
// boundary lives server-side: every /api/admin/* and mutating /api/properties/*
// route independently checks the session cookie before touching the database,
// so the dashboard's data can't be reached just by loading /admin or by
// disabling/patching this component.
export default function RequireAdmin({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'checking' | 'ok' | 'denied'>('checking')
  const [adminName, setAdminName] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    adminMe().then(res => {
      if (cancelled) return
      if (res.authenticated) {
        setAdminName(res.name || '')
        setStatus('ok')
      } else {
        setStatus('denied')
        navigate('/admin/login')
      }
    })
    return () => { cancelled = true }
  }, [navigate])

  if (status !== 'ok') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#060606' }}>
        <p className="font-outfit text-sm" style={{ color: 'rgba(240,235,224,0.4)' }}>
          {status === 'checking' ? 'Checking access…' : 'Redirecting to sign in…'}
        </p>
      </div>
    )
  }

  return <AdminNameContext.Provider value={adminName}>{children}</AdminNameContext.Provider>
}

import { createContext, useContext } from 'react'
export const AdminNameContext = createContext<string>('')
export const useAdminName = () => useContext(AdminNameContext)
