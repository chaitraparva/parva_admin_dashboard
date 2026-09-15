import { requireAdmin } from '../_lib/auth.js'
import { query } from '../_lib/db.js'

export default requireAdmin(async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const totals = await query(`
    SELECT
      COUNT(*)::int                                              AS total_properties,
      COALESCE(SUM(available_units) FILTER (WHERE status = 'available'), 0)::int AS total_available_units,
      COALESCE(SUM(total_units) FILTER (WHERE status = 'unavailable'), 0)::int
        + COALESCE(SUM(GREATEST(total_units - available_units, 0)) FILTER (WHERE status = 'available'), 0)::int
                                                                    AS sold_or_unavailable_units,
      COUNT(*) FILTER (WHERE created_at > now() - interval '7 days')::int AS recently_added,
      COUNT(*) FILTER (WHERE updated_at > now() - interval '7 days' AND updated_at <> created_at)::int AS recently_updated
    FROM properties
  `)

  const recentAdded = await query(
    `SELECT id, name, created_at FROM properties ORDER BY created_at DESC LIMIT 5`
  )
  const recentUpdated = await query(
    `SELECT id, name, updated_at FROM properties WHERE updated_at <> created_at ORDER BY updated_at DESC LIMIT 5`
  )

  res.status(200).json({
    ...totals.rows[0],
    recentlyAddedList: recentAdded.rows,
    recentlyUpdatedList: recentUpdated.rows,
  })
})
