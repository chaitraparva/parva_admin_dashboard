import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import RequireAdmin, { useAdminName } from './RequireAdmin'
import {
  listPropertiesAdmin, createProperty, updateProperty, patchProperty, deleteProperty,
  getAuditLog, getStats, adminLogout,
  type AuditEntry, type DashboardStats,
} from '../store/adminApi'
import type { Property } from '../components/PropertyDetailModal'
import logoImg from '../imports/logo.png'

const TIERS = ['Entry / Value', 'Mid-Range', 'Premium', 'Luxury'] as const
const ZONES = ['JVC', 'Dubai South', 'Business Bay', 'Downtown', 'Dubai Islands', 'Dubailand', 'Silicon Oasis', 'Academic City', 'Meydan', 'Other']

const emptyProperty = (): Omit<Property, 'id'> => ({
  name: '', location: '', type: 'Apartment', bedrooms: 1, unitTypes: '', area: '',
  price: '', priceAED: '', rentalYield: 7, appreciation: 8, developer: '', completion: '',
  tag: 'NEW', tagCol: '#C9A44A', tier: 'Mid-Range', standout: '', description: '',
  image: '', gallery: [], zone: 'JVC', views: 0, floors: 0, totalUnits: 0, availableUnits: 0,
  status: 'available', minDeposit: '', handoverQuarter: '', amenities: [], paymentPlan: [],
})

function ImageUpload({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }
  return (
    <div className="flex flex-col gap-2">
      <label className="admin-label">{label}</label>
      <div className="flex gap-2 items-start">
        {value && <img src={value} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0" style={{ border: '1px solid rgba(201,164,74,0.2)' }} />}
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="cursor-pointer text-center py-2 px-3 rounded-lg font-outfit text-xs transition-all hover:opacity-80" style={{ background: 'rgba(201,164,74,0.1)', border: '1px solid rgba(201,164,74,0.25)', color: '#C9A44A' }}>
            Upload Image
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
          <input type="text" value={typeof value === 'string' && value.startsWith('http') ? value : ''} onChange={e => onChange(e.target.value)} placeholder="Or paste image URL" className="admin-input text-xs" />
        </div>
      </div>
    </div>
  )
}

function GalleryUpload({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    Promise.all(files.map(file => new Promise<string>(res => {
      const reader = new FileReader()
      reader.onload = () => res(reader.result as string)
      reader.readAsDataURL(file)
    }))).then(results => onChange([...value, ...results]))
  }
  return (
    <div className="flex flex-col gap-2">
      <label className="admin-label">Gallery Images ({value.length})</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((img, i) => (
          <div key={i} className="relative group">
            <img src={img} alt="" className="w-16 h-12 object-cover rounded-lg" style={{ border: '1px solid rgba(201,164,74,0.2)' }} />
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
          </div>
        ))}
      </div>
      <label className="cursor-pointer text-center py-2 px-3 rounded-lg font-outfit text-xs transition-all hover:opacity-80 w-fit" style={{ background: 'rgba(201,164,74,0.1)', border: '1px solid rgba(201,164,74,0.25)', color: '#C9A44A' }}>
        + Add Gallery Images
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleFile} />
      </label>
    </div>
  )
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,164,74,0.12)' }}>
      <div className="font-cinzel text-2xl font-bold" style={{ color: accent }}>{value}</div>
      <div className="font-dm-mono text-[0.5rem] tracking-widest uppercase mt-1" style={{ color: 'rgba(240,235,224,0.4)' }}>{label}</div>
    </div>
  )
}

function timeAgo(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
}

type EditState = (Omit<Property, 'id'> & { id?: number }) | null

function DashboardInner() {
  const navigate = useNavigate()
  const adminName = useAdminName()
  const [properties, setProperties] = useState<Property[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<EditState>(null)
  const [isNew, setIsNew] = useState(false)
  const [saved, setSaved] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [tab, setTab] = useState<'inventory' | 'log'>('inventory')
  const [search, setSearch] = useState('')
  const [zoneFilter, setZoneFilter] = useState('All')
  const [tierFilter, setTierFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState<'All' | 'available' | 'unavailable'>('All')

  const refreshAll = async () => {
    const [props, s, log] = await Promise.all([listPropertiesAdmin(), getStats(), getAuditLog()])
    setProperties(props)
    setStats(s)
    setAuditLog(log)
  }

  useEffect(() => {
    refreshAll().finally(() => setLoading(false))
  }, [])

  const logout = async () => { await adminLogout(); navigate('/admin/login') }

  const startEdit = (p: Property) => { setEditing({ ...p, gallery: [...(p.gallery as string[])] }); setIsNew(false) }
  const startNew = () => { setEditing({ ...emptyProperty(), gallery: [] }); setIsNew(true) }

  const saveEdit = async () => {
    if (!editing) return
    try {
      if (isNew) {
        await createProperty(editing)
      } else if (editing.id) {
        await updateProperty(editing.id, editing)
      }
      setEditing(null)
      setSaved('Changes saved successfully')
      setTimeout(() => setSaved(''), 2500)
      await refreshAll()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Save failed')
    }
  }

  const removeProperty = async (id: number) => {
    try {
      await deleteProperty(id)
      setDeleteConfirm(null)
      await refreshAll()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  const toggleStatus = async (p: Property) => {
    const next = p.status === 'unavailable' ? 'available' : 'unavailable'
    try {
      await patchProperty(p.id, { status: next })
      await refreshAll()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed')
    }
  }

  const updateAvailableUnits = async (p: Property, value: number) => {
    try {
      await patchProperty(p.id, { availableUnits: value })
      await refreshAll()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed')
    }
  }

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (zoneFilter !== 'All' && p.zone !== zoneFilter) return false
      if (tierFilter !== 'All' && p.tier !== tierFilter) return false
      if (statusFilter !== 'All' && (p.status || 'available') !== statusFilter) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.developer.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [properties, zoneFilter, tierFilter, statusFilter, search])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: '#060606', color: 'rgba(240,235,224,0.4)' }}>Loading inventory…</div>
  }

  // ---- Edit / New property form ----
  if (editing !== null) {
    return (
      <div className="min-h-screen" style={{ background: '#060606', color: '#F0EBE0' }}>
        <style>{`
          .admin-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(201,164,74,0.2); color: #F0EBE0; border-radius: 10px; padding: 10px 14px; font-family: var(--font-outfit, sans-serif); font-size: 0.875rem; width: 100%; outline: none; transition: border-color 0.2s; }
          .admin-input:focus { border-color: rgba(201,164,74,0.5); }
          .admin-label { font-family: var(--font-dm-mono, monospace); font-size: 0.52rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(201,164,74,0.7); display: block; margin-bottom: 4px; }
          textarea.admin-input { resize: vertical; min-height: 80px; }
        `}</style>

        <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between" style={{ background: 'rgba(6,6,6,0.95)', borderBottom: '1px solid rgba(201,164,74,0.12)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setEditing(null)} className="font-outfit text-sm hover:opacity-70 transition-opacity" style={{ color: '#C9A44A' }}>← Back</button>
            <div className="w-px h-4" style={{ background: 'rgba(201,164,74,0.2)' }} />
            <span className="font-cinzel text-sm font-bold" style={{ color: '#F0EBE0' }}>{isNew ? 'Add New Property' : `Edit: ${editing.name}`}</span>
          </div>
          <button onClick={saveEdit} className="btn-gold">Save Property</button>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-8">

          <section>
            <h2 className="font-cinzel text-base font-bold mb-4 pb-2" style={{ color: '#C9A44A', borderBottom: '1px solid rgba(201,164,74,0.15)' }}>Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="admin-label">Property Name *</label><input className="admin-input" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="e.g. Auresta Tower" /></div>
              <div><label className="admin-label">Developer *</label><input className="admin-input" value={editing.developer} onChange={e => setEditing({ ...editing, developer: e.target.value })} placeholder="e.g. Tiger Properties" /></div>
              <div><label className="admin-label">Location *</label><input className="admin-input" value={editing.location} onChange={e => setEditing({ ...editing, location: e.target.value })} placeholder="e.g. Jumeirah Village Circle" /></div>
              <div><label className="admin-label">Zone</label>
                <select className="admin-input" value={editing.zone} onChange={e => setEditing({ ...editing, zone: e.target.value })}>
                  {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
                </select>
              </div>
              <div><label className="admin-label">Property Type</label><input className="admin-input" value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value })} placeholder="e.g. Apartment" /></div>
              <div><label className="admin-label">Unit Types</label><input className="admin-input" value={editing.unitTypes} onChange={e => setEditing({ ...editing, unitTypes: e.target.value })} placeholder="e.g. Studio / 1BR / 2BR" /></div>
              <div><label className="admin-label">Tier</label>
                <select className="admin-input" value={editing.tier} onChange={e => setEditing({ ...editing, tier: e.target.value as Property['tier'] })}>
                  {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div><label className="admin-label">Tag Label</label><input className="admin-input" value={editing.tag} onChange={e => setEditing({ ...editing, tag: e.target.value })} placeholder="e.g. HIGH YIELD" /></div>
            </div>
          </section>

          <section>
            <h2 className="font-cinzel text-base font-bold mb-4 pb-2" style={{ color: '#C9A44A', borderBottom: '1px solid rgba(201,164,74,0.15)' }}>Availability & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className="admin-label">Total Units</label><input className="admin-input" type="number" value={editing.totalUnits} onChange={e => setEditing({ ...editing, totalUnits: parseInt(e.target.value) || 0 })} /></div>
              <div><label className="admin-label">Available Units</label><input className="admin-input" type="number" value={editing.availableUnits ?? 0} onChange={e => setEditing({ ...editing, availableUnits: parseInt(e.target.value) || 0 })} /></div>
              <div><label className="admin-label">Status</label>
                <select className="admin-input" value={editing.status ?? 'available'} onChange={e => setEditing({ ...editing, status: e.target.value as 'available' | 'unavailable' })}>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable / Sold Out</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-cinzel text-base font-bold mb-4 pb-2" style={{ color: '#C9A44A', borderBottom: '1px solid rgba(201,164,74,0.15)' }}>Pricing & Returns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="admin-label">Price (INR)</label><input className="admin-input" value={editing.price} onChange={e => setEditing({ ...editing, price: e.target.value })} placeholder="e.g. ₹2.22 Cr" /></div>
              <div><label className="admin-label">Price (AED)</label><input className="admin-input" value={editing.priceAED} onChange={e => setEditing({ ...editing, priceAED: e.target.value })} placeholder="e.g. ~AED 850K" /></div>
              <div><label className="admin-label">Rental Yield (%)</label><input className="admin-input" type="number" step="0.1" value={editing.rentalYield} onChange={e => setEditing({ ...editing, rentalYield: parseFloat(e.target.value) })} /></div>
              <div><label className="admin-label">Appreciation (%)</label><input className="admin-input" type="number" step="0.1" value={editing.appreciation} onChange={e => setEditing({ ...editing, appreciation: parseFloat(e.target.value) })} /></div>
              <div><label className="admin-label">Min Deposit</label><input className="admin-input" value={editing.minDeposit} onChange={e => setEditing({ ...editing, minDeposit: e.target.value })} placeholder="e.g. ₹10L (AED 40K)" /></div>
              <div><label className="admin-label">Area Range</label><input className="admin-input" value={editing.area} onChange={e => setEditing({ ...editing, area: e.target.value })} placeholder="e.g. 480 – 750 sq ft" /></div>
            </div>
          </section>

          <section>
            <h2 className="font-cinzel text-base font-bold mb-4 pb-2" style={{ color: '#C9A44A', borderBottom: '1px solid rgba(201,164,74,0.15)' }}>Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div><label className="admin-label">Completion Quarter</label><input className="admin-input" value={editing.completion} onChange={e => setEditing({ ...editing, completion: e.target.value })} placeholder="e.g. Q2 2027" /></div>
              <div><label className="admin-label">Floors</label><input className="admin-input" type="number" value={editing.floors} onChange={e => setEditing({ ...editing, floors: parseInt(e.target.value) })} /></div>
              <div><label className="admin-label">Handover Quarter</label><input className="admin-input" value={editing.handoverQuarter} onChange={e => setEditing({ ...editing, handoverQuarter: e.target.value })} placeholder="e.g. Q2 2027" /></div>
            </div>
            <div className="flex flex-col gap-4">
              <div><label className="admin-label">Standout (short pitch)</label><textarea className="admin-input" value={editing.standout} onChange={e => setEditing({ ...editing, standout: e.target.value })} placeholder="One compelling reason to invest..." /></div>
              <div><label className="admin-label">Full Description</label><textarea className="admin-input" style={{ minHeight: '120px' }} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Detailed property description..." /></div>
            </div>
          </section>

          <section>
            <h2 className="font-cinzel text-base font-bold mb-4 pb-2" style={{ color: '#C9A44A', borderBottom: '1px solid rgba(201,164,74,0.15)' }}>Amenities</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {(editing.amenities || []).map((a, i) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-outfit text-xs" style={{ background: 'rgba(201,164,74,0.08)', border: '1px solid rgba(201,164,74,0.2)', color: '#C9A44A' }}>
                  {a}
                  <button type="button" onClick={() => setEditing({ ...editing, amenities: editing.amenities.filter((_, j) => j !== i) })} className="hover:opacity-60 transition-opacity">×</button>
                </span>
              ))}
            </div>
            <input
              className="admin-input"
              placeholder="Add amenity and press Enter"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  const val = (e.target as HTMLInputElement).value.trim()
                  if (val) { setEditing({ ...editing, amenities: [...(editing.amenities || []), val] }); (e.target as HTMLInputElement).value = '' }
                }
              }}
            />
          </section>

          <section>
            <h2 className="font-cinzel text-base font-bold mb-4 pb-2" style={{ color: '#C9A44A', borderBottom: '1px solid rgba(201,164,74,0.15)' }}>Payment Plan</h2>
            <div className="flex flex-col gap-2 mb-3">
              {(editing.paymentPlan || []).map((pp, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,164,74,0.1)' }}>
                  <input className="admin-input flex-1" value={pp.milestone} onChange={e => { const p = [...editing.paymentPlan]; p[i] = { ...p[i], milestone: e.target.value }; setEditing({ ...editing, paymentPlan: p }) }} />
                  <input className="admin-input w-20" type="number" value={pp.pct} onChange={e => { const p = [...editing.paymentPlan]; p[i] = { ...p[i], pct: parseInt(e.target.value) }; setEditing({ ...editing, paymentPlan: p }) }} />
                  <span className="font-dm-mono text-xs" style={{ color: 'rgba(201,164,74,0.6)' }}>%</span>
                  <button type="button" onClick={() => setEditing({ ...editing, paymentPlan: editing.paymentPlan.filter((_, j) => j !== i) })} className="text-red-400 hover:opacity-70 transition-opacity text-lg leading-none">×</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setEditing({ ...editing, paymentPlan: [...(editing.paymentPlan || []), { milestone: '', pct: 0 }] })} className="font-outfit text-xs px-4 py-2 rounded-lg transition-all hover:opacity-80" style={{ background: 'rgba(201,164,74,0.08)', border: '1px solid rgba(201,164,74,0.2)', color: '#C9A44A' }}>
              + Add Milestone
            </button>
          </section>

          <section>
            <h2 className="font-cinzel text-base font-bold mb-4 pb-2" style={{ color: '#C9A44A', borderBottom: '1px solid rgba(201,164,74,0.15)' }}>Images</h2>
            <div className="flex flex-col gap-5">
              <ImageUpload label="Hero / Cover Image *" value={typeof editing.image === 'string' ? editing.image : ''} onChange={v => setEditing({ ...editing, image: v })} />
              <GalleryUpload value={editing.gallery as string[]} onChange={v => setEditing({ ...editing, gallery: v })} />
            </div>
          </section>

          <div className="flex gap-3 pb-8">
            <button onClick={saveEdit} className="btn-gold flex-1 justify-center">Save Property</button>
            <button onClick={() => setEditing(null)} className="flex-1 font-outfit text-sm py-3 rounded-xl transition-all hover:opacity-80" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,235,224,0.5)' }}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  // ---- Main dashboard ----
  return (
    <div className="min-h-screen" style={{ background: '#060606', color: '#F0EBE0' }}>
      <style>{`
        .admin-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(201,164,74,0.2); color: #F0EBE0; border-radius: 10px; padding: 9px 12px; font-family: var(--font-outfit,sans-serif); font-size: 0.8rem; width: 100%; outline: none; }
        .admin-label { font-family: var(--font-dm-mono,monospace); font-size: 0.52rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(201,164,74,0.7); display: block; margin-bottom: 4px; }
      `}</style>

      <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between flex-wrap gap-3" style={{ background: 'rgba(6,6,6,0.95)', borderBottom: '1px solid rgba(201,164,74,0.12)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#000', border: '1px solid rgba(201,164,74,0.25)' }}>
            <img src={logoImg} alt="" className="w-6 h-6 object-contain" style={{ mixBlendMode: 'lighten' }} />
          </div>
          <div>
            <div className="font-cinzel text-sm font-bold" style={{ color: '#F0EBE0' }}>Admin Dashboard</div>
            <div className="font-dm-mono text-[0.45rem] tracking-widest" style={{ color: '#C9A44A' }}>PARVA REALTY · PROPERTY MANAGEMENT</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-outfit text-xs" style={{ color: 'rgba(240,235,224,0.4)' }}>Signed in as <b style={{ color: '#C9A44A' }}>{adminName}</b></span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="font-outfit text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80" style={{ border: '1px solid rgba(201,164,74,0.2)', color: 'rgba(201,164,74,0.7)' }}>View Site ↗</a>
          <button onClick={logout} className="font-outfit text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,235,224,0.4)' }}>Sign Out</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Summary cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            <StatCard label="Total Properties" value={stats.total_properties} accent="#F0EBE0" />
            <StatCard label="Available Inventory" value={stats.total_available_units} accent="#22A861" />
            <StatCard label="Sold / Unavailable" value={stats.sold_or_unavailable_units} accent="#EF4444" />
            <StatCard label="Recently Added" value={stats.recently_added} accent="#C9A44A" />
            <StatCard label="Recently Updated" value={stats.recently_updated} accent="#3A72A8" />
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setTab('inventory')} className="font-outfit text-xs px-4 py-2 rounded-lg transition-all" style={{ background: tab === 'inventory' ? 'rgba(201,164,74,0.15)' : 'transparent', border: '1px solid rgba(201,164,74,0.2)', color: tab === 'inventory' ? '#C9A44A' : 'rgba(240,235,224,0.5)' }}>Inventory</button>
          <button onClick={() => setTab('log')} className="font-outfit text-xs px-4 py-2 rounded-lg transition-all" style={{ background: tab === 'log' ? 'rgba(201,164,74,0.15)' : 'transparent', border: '1px solid rgba(201,164,74,0.2)', color: tab === 'log' ? '#C9A44A' : 'rgba(240,235,224,0.5)' }}>Change Log</button>
        </div>

        {saved && (
          <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl font-outfit text-sm flex items-center gap-2" style={{ background: 'rgba(34,168,97,0.15)', border: '1px solid rgba(34,168,97,0.4)', color: '#22A861' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            {saved}
          </div>
        )}

        {tab === 'inventory' && (
          <>
            {/* Search + filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="font-cinzel text-2xl font-bold mb-1" style={{ color: '#F0EBE0' }}>Property Inventory</h1>
                <p className="font-outfit text-sm" style={{ color: 'rgba(240,235,224,0.4)' }}>{filtered.length} of {properties.length} properties</p>
              </div>
              <button onClick={startNew} className="btn-gold">+ Add Property</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
              <input className="admin-input" placeholder="Search name, developer, location…" value={search} onChange={e => setSearch(e.target.value)} />
              <select className="admin-input" value={zoneFilter} onChange={e => setZoneFilter(e.target.value)}>
                <option value="All">All Zones</option>
                {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
              <select className="admin-input" value={tierFilter} onChange={e => setTierFilter(e.target.value)}>
                <option value="All">All Tiers</option>
                {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select className="admin-input" value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}>
                <option value="All">All Statuses</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable / Sold Out</option>
              </select>
            </div>

            {/* Property grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(p => (
                <div key={p.id} className="rounded-2xl overflow-hidden transition-all hover:shadow-lg group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,164,74,0.12)' }}>
                  <div className="relative h-40 overflow-hidden bg-[#111]">
                    <img src={typeof p.image === 'string' ? p.image : ''} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter: 'brightness(0.8)' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(6,6,6,0.7) 0%,transparent 50%)' }} />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="font-dm-mono text-[0.48rem] tracking-widest px-2 py-1 rounded-full" style={{ background: p.tagCol + '22', border: `1px solid ${p.tagCol}55`, color: p.tagCol }}>{p.tag}</span>
                      {p.status === 'unavailable' && (
                        <span className="font-dm-mono text-[0.48rem] tracking-widest px-2 py-1 rounded-full text-white" style={{ background: 'rgba(239,68,68,0.85)' }}>SOLD OUT</span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <button onClick={() => startEdit(p)} className="px-3 py-1.5 rounded-lg font-outfit text-xs transition-all hover:opacity-90" style={{ background: 'rgba(201,164,74,0.9)', color: '#060606' }}>Edit</button>
                      <button onClick={() => setDeleteConfirm(p.id)} className="px-3 py-1.5 rounded-lg font-outfit text-xs transition-all hover:opacity-90" style={{ background: 'rgba(239,68,68,0.85)', color: '#fff' }}>Delete</button>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="font-cinzel text-sm font-bold mb-0.5 truncate" style={{ color: '#F0EBE0' }}>{p.name}</div>
                    <div className="font-outfit text-xs mb-3" style={{ color: 'rgba(240,235,224,0.45)' }}>{p.developer} · {p.location}</div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(201,164,74,0.06)', border: '1px solid rgba(201,164,74,0.12)' }}>
                        <div className="font-cinzel text-xs font-bold" style={{ color: '#C9A44A' }}>{p.rentalYield}%</div>
                        <div className="font-dm-mono text-[0.42rem] mt-0.5" style={{ color: 'rgba(240,235,224,0.3)' }}>YIELD</div>
                      </div>
                      <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(34,168,97,0.06)', border: '1px solid rgba(34,168,97,0.15)' }}>
                        <div className="font-cinzel text-xs font-bold" style={{ color: '#22A861' }}>{p.appreciation}%</div>
                        <div className="font-dm-mono text-[0.42rem] mt-0.5" style={{ color: 'rgba(240,235,224,0.3)' }}>APPREC.</div>
                      </div>
                      <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="font-cinzel text-xs font-bold truncate" style={{ color: '#F0EBE0' }}>{p.tier.split('/')[0].trim()}</div>
                        <div className="font-dm-mono text-[0.42rem] mt-0.5" style={{ color: 'rgba(240,235,224,0.3)' }}>TIER</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="font-cinzel text-sm font-bold" style={{ color: '#C9A44A' }}>{p.price}</div>
                      <div className="font-dm-mono text-[0.48rem]" style={{ color: 'rgba(240,235,224,0.35)' }}>{p.priceAED}</div>
                    </div>

                    {/* Inventory quick controls */}
                    <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <input
                        type="number"
                        className="admin-input flex-1 text-xs"
                        value={p.availableUnits ?? 0}
                        min={0}
                        onChange={e => updateAvailableUnits(p, parseInt(e.target.value) || 0)}
                      />
                      <span className="font-dm-mono text-[0.55rem]" style={{ color: 'rgba(240,235,224,0.35)' }}>/ {p.totalUnits} avail.</span>
                      <button
                        onClick={() => toggleStatus(p)}
                        className="ml-auto px-2.5 py-1.5 rounded-lg font-outfit text-[0.65rem] font-semibold transition-all whitespace-nowrap"
                        style={{
                          background: p.status === 'unavailable' ? 'rgba(34,168,97,0.15)' : 'rgba(239,68,68,0.12)',
                          border: `1px solid ${p.status === 'unavailable' ? 'rgba(34,168,97,0.4)' : 'rgba(239,68,68,0.3)'}`,
                          color: p.status === 'unavailable' ? '#22A861' : '#EF4444',
                        }}
                      >
                        {p.status === 'unavailable' ? 'Mark Available' : 'Mark Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full text-center py-12 font-outfit text-sm" style={{ color: 'rgba(240,235,224,0.35)' }}>No properties match your filters.</p>
              )}
            </div>
          </>
        )}

        {tab === 'log' && (
          <div className="flex flex-col gap-2">
            <h1 className="font-cinzel text-2xl font-bold mb-4" style={{ color: '#F0EBE0' }}>Change Log</h1>
            {auditLog.length === 0 && (
              <p className="font-outfit text-sm" style={{ color: 'rgba(240,235,224,0.35)' }}>No changes recorded yet.</p>
            )}
            {auditLog.map(entry => (
              <div key={entry.id} className="rounded-xl p-4 flex flex-col gap-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,164,74,0.1)' }}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-outfit text-sm" style={{ color: '#F0EBE0' }}>
                    <b style={{ color: '#C9A44A' }}>{entry.admin_name}</b>{' '}
                    {entry.action === 'created' && <>added <b>{entry.property_name}</b></>}
                    {entry.action === 'deleted' && <>deleted <b>{entry.property_name}</b></>}
                    {entry.action === 'status_changed' && <>changed status of <b>{entry.property_name}</b></>}
                    {entry.action === 'updated' && <>updated <b>{entry.property_name}</b> — {entry.field}</>}
                  </span>
                  <span className="font-dm-mono text-[0.6rem]" style={{ color: 'rgba(240,235,224,0.35)' }}>{timeAgo(entry.created_at)}</span>
                </div>
                {(entry.old_value !== null || entry.new_value !== null) && entry.action !== 'created' && entry.action !== 'deleted' && (
                  <div className="font-outfit text-xs" style={{ color: 'rgba(240,235,224,0.5)' }}>
                    {entry.old_value ?? '—'} → {entry.new_value ?? '—'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6" style={{ background: '#0d0c09', border: '1px solid rgba(239,68,68,0.3)' }}>
            <h3 className="font-cinzel text-base font-bold mb-2" style={{ color: '#F0EBE0' }}>Delete Property?</h3>
            <p className="font-outfit text-sm mb-6" style={{ color: 'rgba(240,235,224,0.5)' }}>
              "{properties.find(p => p.id === deleteConfirm)?.name}" will be permanently removed from the inventory.
            </p>
            <div className="flex gap-3">
              <button onClick={() => removeProperty(deleteConfirm)} className="flex-1 py-2.5 rounded-xl font-outfit text-sm transition-all hover:opacity-80" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#EF4444' }}>Yes, Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl font-outfit text-sm transition-all hover:opacity-80" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,235,224,0.5)' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <RequireAdmin>
      <DashboardInner />
    </RequireAdmin>
  )
}
