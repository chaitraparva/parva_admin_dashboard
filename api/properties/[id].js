import { query } from '../_lib/db.js'
import { rowToProperty, propertyToRow } from '../_lib/mapper.js'
import { logChange, logFieldDiffs } from '../_lib/audit.js'
import { getSession } from '../_lib/auth.js'

export default async function handler(req, res) {
  const id = parseInt(req.query.id, 10)
  if (!id) {
    res.status(400).json({ error: 'Invalid property id' })
    return
  }

  if (req.method === 'GET') {
    const result = await query(`SELECT * FROM properties WHERE id = $1`, [id])
    if (!result.rows.length) {
      res.status(404).json({ error: 'Property not found' })
      return
    }
    res.status(200).json({ property: rowToProperty(result.rows[0]) })
    return
  }

  // Every write below is admin-only.
  const session = getSession(req)
  if (!session || session.role !== 'admin') {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }

  const existing = await query(`SELECT * FROM properties WHERE id = $1`, [id])
  if (!existing.rows.length) {
    res.status(404).json({ error: 'Property not found' })
    return
  }
  const oldRow = existing.rows[0]

  if (req.method === 'PUT') {
    const row = propertyToRow(req.body || {})
    const cols = Object.keys(row)
    const values = Object.values(row)
    const setClause = cols.map((c, i) => `${c} = $${i + 1}`).join(', ')

    const updateResult = await query(
      `UPDATE properties SET ${setClause}, updated_at = now() WHERE id = $${cols.length + 1} RETURNING *`,
      [...values, id]
    )
    const newRow = updateResult.rows[0]

    await logFieldDiffs({
      propertyId: id,
      propertyName: newRow.name,
      adminName: session.name,
      oldRow,
      newRow,
    })

    res.status(200).json({ property: rowToProperty(newRow) })
    return
  }

  if (req.method === 'PATCH') {
    // Fast path for the common "flip availability" / "update quantity" actions
    // used directly from the property grid, without opening the full edit form.
    const { status, availableUnits } = req.body || {}
    const updates = []
    const values = []
    let i = 1

    if (status !== undefined) {
      updates.push(`status = $${i++}`)
      values.push(status === 'unavailable' ? 'unavailable' : 'available')
    }
    if (availableUnits !== undefined) {
      updates.push(`available_units = $${i++}`)
      values.push(Math.max(0, parseInt(availableUnits, 10) || 0))
    }
    if (!updates.length) {
      res.status(400).json({ error: 'Nothing to update' })
      return
    }

    values.push(id)
    const updateResult = await query(
      `UPDATE properties SET ${updates.join(', ')}, updated_at = now() WHERE id = $${i} RETURNING *`,
      values
    )
    const newRow = updateResult.rows[0]

    if (status !== undefined && oldRow.status !== newRow.status) {
      await logChange({
        propertyId: id,
        propertyName: newRow.name,
        adminName: session.name,
        action: 'status_changed',
        field: 'status',
        oldValue: oldRow.status,
        newValue: newRow.status,
      })
    }
    if (availableUnits !== undefined && oldRow.available_units !== newRow.available_units) {
      await logChange({
        propertyId: id,
        propertyName: newRow.name,
        adminName: session.name,
        action: 'updated',
        field: 'available_units',
        oldValue: String(oldRow.available_units),
        newValue: String(newRow.available_units),
      })
    }

    res.status(200).json({ property: rowToProperty(newRow) })
    return
  }

  if (req.method === 'DELETE') {
    await query(`DELETE FROM properties WHERE id = $1`, [id])
    await logChange({
      propertyId: id,
      propertyName: oldRow.name,
      adminName: session.name,
      action: 'deleted',
      field: null,
      oldValue: oldRow.name,
      newValue: null,
    })
    res.status(200).json({ ok: true })
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
}
