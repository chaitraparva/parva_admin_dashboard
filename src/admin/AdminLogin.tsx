import { useState } from 'react'
import { useNavigate } from 'react-router'
import { adminLogin } from '../store/adminApi'
import logoImg from '../imports/logo.png'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await adminLogin(email.trim(), password)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#060606' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ background: '#000', border: '1px solid rgba(201,164,74,0.35)', boxShadow: '0 0 24px rgba(201,164,74,0.2)' }}
          >
            <img src={logoImg} alt="Parva Realty" className="w-10 h-10 object-contain" style={{ mixBlendMode: 'lighten' }} />
          </div>
          <div className="font-cinzel text-xl font-bold tracking-widest" style={{ color: '#F0EBE0' }}>PARVA REALTY</div>
          <div className="font-dm-mono text-[0.52rem] tracking-[0.3em] mt-1" style={{ color: '#C9A44A' }}>ADMIN PORTAL</div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,164,74,0.15)' }}
        >
          <h1 className="font-cinzel text-lg font-bold mb-1" style={{ color: '#F0EBE0' }}>Sign In</h1>
          <p className="font-outfit text-sm mb-6" style={{ color: 'rgba(240,235,224,0.45)' }}>Authorized administrators only</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="font-dm-mono text-[0.52rem] tracking-widest uppercase block mb-2" style={{ color: 'rgba(201,164,74,0.7)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="you@parvarealty.ae"
                autoComplete="username"
                className="w-full rounded-xl px-4 py-3 font-outfit text-sm outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,164,74,0.2)', color: '#F0EBE0' }}
              />
            </div>

            <div>
              <label className="font-dm-mono text-[0.52rem] tracking-widest uppercase block mb-2" style={{ color: 'rgba(201,164,74,0.7)' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl px-4 py-3 font-outfit text-sm outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,164,74,0.2)', color: '#F0EBE0' }}
              />
            </div>

            {error && (
              <p className="font-outfit text-xs" style={{ color: '#EF4444' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password || !email}
              className="btn-gold justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p className="text-center font-dm-mono text-[0.48rem] mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
          © 2026 Parva Realty · Admin Access Only
        </p>
      </div>
    </div>
  )
}
