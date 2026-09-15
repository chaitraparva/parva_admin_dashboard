import { query } from '../_lib/db.js'
import { rowToProperty, propertyToRow } from '../_lib/mapper.js'
import { logChange } from '../_lib/audit.js'
import { getSession } from '../_lib/auth.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Public: anyone visiting the website can read the live inventory.
    const result = await query(`SELECT * FROM properties ORDER BY id ASC`)
    res.status(200).json({ properties: result.rows.map(rowToProperty) })
    return
  }

  if (req.method === 'POST') {
    // Creating inventory is an admin-only action.
    const session = getSession(req)
    if (!session || session.role !== 'admin') {
      res.status(401).json({ error: 'Not authenticated' })
      return
    }

    const body = req.body || {}
    if (!body.name || !body.location) {
      res.status(400).json({ error: 'Property name and location are required.' })
      return
    }

    const row = propertyToRow(body)
    const cols = Object.keys(row)
    const values = Object.values(row)
    const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ')

    const insertResult = await query(
      `INSERT INTO properties (${cols.join(', ')}) VALUES (${placeholders}) RETURNING *`,
      values
    )
    const created = insertResult.rows[0]

    await logChange({
      propertyId: created.id,
      propertyName: created.name,
      adminName: session.name,
      action: 'created',
      field: null,
      oldValue: null,
      newValue: created.name,
    })

    res.status(201).json({ property: rowToProperty(created) })
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
}
