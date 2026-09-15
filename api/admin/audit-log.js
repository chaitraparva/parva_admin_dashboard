import { requireAdmin } from '../_lib/auth.js'
import { query } from '../_lib/db.js'

export default requireAdmin(async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const limit = Math.min(parseInt(req.query?.limit, 10) || 100, 500)

  const result = await query(
    `SELECT id, property_id, property_name, admin_name, action, field, old_value, new_value, created_at
     FROM audit_log
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit]
  )

  res.status(200).json({ entries: result.rows })
})
