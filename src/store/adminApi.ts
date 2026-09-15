import type { Property } from '../components/PropertyDetailModal'

async function handle(res: Response) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  return handle(res) as Promise<{ authenticated: true; name: string; email: string }>
}

export async function adminLogout() {
  await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
}

export async function adminMe(): Promise<{ authenticated: boolean; name?: string }> {
  const res = await fetch('/api/admin/me', { credentials: 'include' })
  if (res.status === 401) return { authenticated: false }
  return handle(res)
}

export async function listPropertiesAdmin(): Promise<Property[]> {
  const res = await fetch('/api/properties', { credentials: 'include' })
  const data = await handle(res)
  return data.properties
}

export async function createProperty(p: Omit<Property, 'id'>): Promise<Property> {
  const res = await fetch('/api/properties', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(p),
  })
  const data = await handle(res)
  return data.property
}

export async function updateProperty(id: number, p: Omit<Property, 'id'>): Promise<Property> {
  const res = await fetch(`/api/properties/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(p),
  })
  const data = await handle(res)
  return data.property
}

export async function patchProperty(
  id: number,
  patch: { status?: 'available' | 'unavailable'; availableUnits?: number }
): Promise<Property> {
  const res = await fetch(`/api/properties/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(patch),
  })
  const data = await handle(res)
  return data.property
}

export async function deleteProperty(id: number): Promise<void> {
  const res = await fetch(`/api/properties/${id}`, { method: 'DELETE', credentials: 'include' })
  await handle(res)
}

export type AuditEntry = {
  id: number
  property_id: number | null
  property_name: string | null
  admin_name: string
  action: string
  field: string | null
  old_value: string | null
  new_value: string | null
  created_at: string
}

export async function getAuditLog(limit = 100): Promise<AuditEntry[]> {
  const res = await fetch(`/api/admin/audit-log?limit=${limit}`, { credentials: 'include' })
  const data = await handle(res)
  return data.entries
}

export type DashboardStats = {
  total_properties: number
  total_available_units: number
  sold_or_unavailable_units: number
  recently_added: number
  recently_updated: number
  recentlyAddedList: { id: number; name: string; created_at: string }[]
  recentlyUpdatedList: { id: number; name: string; updated_at: string }[]
}

export async function getStats(): Promise<DashboardStats> {
  const res = await fetch('/api/admin/stats', { credentials: 'include' })
  return handle(res)
}
