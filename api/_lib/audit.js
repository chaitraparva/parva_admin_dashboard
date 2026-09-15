import { query } from './db.js'

// Fields worth recording a before/after line for. (Internal bookkeeping fields
// like updated_at/created_at are excluded.)
export const TRACKED_FIELDS = [
  'name', 'location', 'type', 'bedrooms', 'unit_types', 'area', 'price', 'price_aed',
  'rental_yield', 'appreciation', 'developer', 'completion', 'tag', 'tag_col', 'tier',
  'standout', 'description', 'image', 'gallery', 'zone', 'views', 'floors',
  'total_units', 'available_units', 'status', 'min_deposit', 'handover_quarter', 'amenities', 'payment_plan',
]

function stringify(v) {
  if (v === null || v === undefined) return ''
  if (typeof v === 'object') return JSON.stringify(v)
  return String(v)
}

export async function logChange({ propertyId, propertyName, adminName, action, field, oldValue, newValue }) {
  await query(
    `INSERT INTO audit_log (property_id, property_name, admin_name, action, field, old_value, new_value)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [propertyId, propertyName, adminName, action, field ?? null, oldValue ?? null, newValue ?? null]
  )
}

// Compares an old row and a new row (both in DB snake_case shape) and writes
// one audit_log entry per changed field.
export async function logFieldDiffs({ propertyId, propertyName, adminName, oldRow, newRow }) {
  for (const field of TRACKED_FIELDS) {
    const before = stringify(oldRow[field])
    const after = stringify(newRow[field])
    if (before !== after) {
      await logChange({
        propertyId,
        propertyName,
        adminName,
        action: 'updated',
        field,
        oldValue: before,
        newValue: after,
      })
    }
  }
}
