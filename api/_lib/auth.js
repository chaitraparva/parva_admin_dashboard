import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const COOKIE_NAME = 'parva_admin_session'
const TOKEN_TTL_SECONDS = 60 * 60 * 8 // 8 hour admin session

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret || secret.length < 16) {
    throw new Error(
      'ADMIN_JWT_SECRET is not set (or too short). Set a long random string in your environment variables.'
    )
  }
  return secret
}

// --- The fixed set of authorized admin accounts ----------------------------
// Each account is its own email + password (bcrypt hash) — no shared login,
// no separate "name" field at sign-in. Configured via numbered env vars:
//   ADMIN_1_EMAIL / ADMIN_1_PASSWORD_HASH / ADMIN_1_NAME
//   ADMIN_2_EMAIL / ADMIN_2_PASSWORD_HASH / ADMIN_2_NAME
//   ADMIN_3_EMAIL / ADMIN_3_PASSWORD_HASH / ADMIN_3_NAME
// (extend with ADMIN_4_*, etc. if a 4th account is ever added)
export function getAdminAccounts() {
  const accounts = []
  for (let i = 1; ; i++) {
    const email = process.env[`ADMIN_${i}_EMAIL`]
    const hash = process.env[`ADMIN_${i}_PASSWORD_HASH`]
    if (!email || !hash) break
    accounts.push({
      email: email.trim().toLowerCase(),
      passwordHash: hash,
      name: process.env[`ADMIN_${i}_NAME`] || email.split('@')[0],
    })
  }
  return accounts
}

// --- Cookie helpers -------------------------------------------------------

export function parseCookies(req) {
  const header = req.headers.cookie
  const out = {}
  if (!header) return out
  header.split(';').forEach(pair => {
    const idx = pair.indexOf('=')
    if (idx === -1) return
    const key = pair.slice(0, idx).trim()
    const val = decodeURIComponent(pair.slice(idx + 1).trim())
    out[key] = val
  })
  return out
}

export function setSessionCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${TOKEN_TTL_SECONDS}`,
  ]
  if (isProd) parts.push('Secure')
  res.setHeader('Set-Cookie', parts.join('; '))
}

export function clearSessionCookie(res) {
  const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
  const parts = [`${COOKIE_NAME}=`, 'Path=/', 'HttpOnly', 'SameSite=Strict', 'Max-Age=0']
  if (isProd) parts.push('Secure')
  res.setHeader('Set-Cookie', parts.join('; '))
}

// --- Login -------------------------------------------------------

// Verifies an email + password against the fixed account list and returns
// { email, name } on success, or null if the email isn't authorized or the
// password doesn't match.
export async function verifyAdminLogin(email, password) {
  const accounts = getAdminAccounts()
  if (!accounts.length) {
    throw new Error('No admin accounts are configured (ADMIN_1_EMAIL / ADMIN_1_PASSWORD_HASH missing).')
  }
  const account = accounts.find(a => a.email === String(email).trim().toLowerCase())
  if (!account) return null
  const ok = await bcrypt.compare(password, account.passwordHash)
  if (!ok) return null
  return { email: account.email, name: account.name }
}

export function issueSessionToken({ email, name }) {
  return jwt.sign({ sub: email, name, role: 'admin' }, getSecret(), {
    expiresIn: TOKEN_TTL_SECONDS,
  })
}

export function verifySessionToken(token) {
  try {
    return jwt.verify(token, getSecret())
  } catch {
    return null
  }
}

export function getSession(req) {
  const cookies = parseCookies(req)
  const token = cookies[COOKIE_NAME]
  if (!token) return null
  return verifySessionToken(token)
}

// --- Very small in-memory brute-force throttle -----------------------------
// Note: serverless functions are stateless across cold starts/instances, so this
// is a best-effort deterrent only. For production-grade protection, put this
// behind Vercel's WAF / a real rate limiter (e.g. Upstash Ratelimit) as well.
const attempts = new Map()
const MAX_ATTEMPTS = 8
const WINDOW_MS = 10 * 60 * 1000

export function isRateLimited(key) {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || now - entry.start > WINDOW_MS) {
    attempts.set(key, { start: now, count: 1 })
    return false
  }
  entry.count += 1
  return entry.count > MAX_ATTEMPTS
}

export function requestIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

// --- Route guard -------------------------------------------------------

// Wrap any admin API handler with this. It rejects the request with 401
// before any property/data logic ever runs, regardless of what the frontend
// does — so the dashboard, its APIs, and inventory operations cannot be
// reached just by opening a URL or editing client-side code.
export function requireAdmin(handler) {
  return async (req, res) => {
    const session = getSession(req)
    if (!session || session.role !== 'admin') {
      res.status(401).json({ error: 'Not authenticated' })
      return
    }
    req.admin = session
    return handler(req, res)
  }
}
