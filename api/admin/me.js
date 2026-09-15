import { getSession } from '../_lib/auth.js'

export default async function handler(req, res) {
  const session = getSession(req)
  if (!session || session.role !== 'admin') {
    res.status(401).json({ authenticated: false })
    return
  }
  res.status(200).json({ authenticated: true, name: session.name, email: session.sub })
}
