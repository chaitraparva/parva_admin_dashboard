import type { Property } from '../components/PropertyDetailModal'

// Public property feed. Reads live from the database via the API — the same
// data source the Admin Dashboard writes to — so any change an admin makes
// (add, edit, delete, availability, quantity) shows up here immediately for
// every visitor, not just in the browser that made the change.
export async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch('/api/properties')
    if (!res.ok) throw new Error('Failed to load properties')
    const data = await res.json()
    return data.properties as Property[]
  } catch (err) {
    console.error('getProperties failed:', err)
    return []
  }
}
