import { verifyAdminLogin, issueSessionToken, setSessionCookie, isRateLimited, requestIp } from '../_lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const ip = requestIp(req)
  if (isRateLimited(`login:${ip}`)) {
    res.status(429).json({ error: 'Too many attempts. Please wait a few minutes and try again.' })
    return
  }

  const { email, password } = req.body || {}

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' })
    return
  }

  let account
  try {
    account = await verifyAdminLogin(email, password)
  } catch (err) {
    res.status(500).json({ error: err.message })
    return
  }

  if (!account) {
    res.status(401).json({ error: 'Invalid email or password.' })
    return
  }

  const token = issueSessionToken(account)
  setSessionCookie(res, token)
  res.status(200).json({ authenticated: true, name: account.name, email: account.email })
}
