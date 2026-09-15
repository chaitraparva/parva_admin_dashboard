import { useState } from 'react'
import { useInView } from '../hooks/useInView'

type Tab = 'portfolio' | 'income' | 'documents' | 'watchlist' | 'notifications'

const portfolio = [
  {
    name: 'Marina Residences 2B', location: 'Dubai Marina', type: '2 BHK',
    value: '₹1.28 Cr', gain: '+₹18L', gainPct: '+16.4%', yield: '9.1%',
    status: 'Rented', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=280&fit=crop&auto=format',
  },
  {
    name: 'Bay Tower Studio', location: 'Business Bay', type: 'Studio',
    value: '₹62L', gain: '+₹9L', gainPct: '+17.0%', yield: '10.2%',
    status: 'Rented', img: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=280&fit=crop&auto=format',
  },
]

const income = [
  { month: 'Jul 2025', amount: '₹95,600', property: 'Marina 2B', status: 'Received' },
  { month: 'Jun 2025', amount: '₹95,600', property: 'Marina 2B', status: 'Received' },
  { month: 'Jul 2025', amount: '₹53,200', property: 'Bay Studio', status: 'Received' },
  { month: 'Jun 2025', amount: '₹53,200', property: 'Bay Studio', status: 'Received' },
  { month: 'Aug 2025', amount: '₹95,600', property: 'Marina 2B', status: 'Pending' },
]

const docs = [
  { name: 'Sale & Purchase Agreement — Marina 2B.pdf', type: 'Legal', date: 'Jan 2024', size: '2.4 MB' },
  { name: 'Title Deed — Marina Residences.pdf', type: 'Legal', date: 'Feb 2024', size: '1.1 MB' },
  { name: 'EJARI Certificate — Marina 2B.pdf', type: 'Rental', date: 'Mar 2024', size: '842 KB' },
  { name: 'Sale & Purchase Agreement — Bay Tower.pdf', type: 'Legal', date: 'Jun 2024', size: '2.2 MB' },
  { name: 'Rental Income Statement Q2 2025.pdf', type: 'Finance', date: 'Jul 2025', size: '564 KB' },
]

const watchlist = [
  { name: 'Creek Horizon 1BHK', location: 'Creek Harbour', price: '₹98L', yield: '9.4%', change: '+2.3%' },
  { name: 'JLT Studio Premium', location: 'JLT Zone A', price: '₹44L', yield: '10.1%', change: '+1.8%' },
  { name: 'DIFC Signature 1BHK', location: 'DIFC', price: '₹1.8Cr', yield: '8.4%', change: '+4.1%' },
]

const notifications = [
  { icon: '₹', msg: 'Rental income of ₹95,600 credited for Marina 2B — July 2025.', time: '2 days ago', type: 'income' },
  { icon: '📈', msg: 'Portfolio value increased by ₹2.4L this month. Business Bay appreciation +1.1%.', time: '5 days ago', type: 'growth' },
  { icon: '📄', msg: 'Your EJARI renewal for Bay Tower Studio is due in 14 days.', time: '1 week ago', type: 'doc' },
  { icon: '🏠', msg: 'New matching property: Creek Horizon 1BHK at ₹98L with 9.4% yield.', time: '2 weeks ago', type: 'match' },
]

const tabs: { id: Tab; label: string }[] = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'income', label: 'Rental Income' },
  { id: 'documents', label: 'Documents' },
  { id: 'watchlist', label: 'Watchlist' },
  { id: 'notifications', label: 'Alerts' },
]

export default function InvestorDashboard() {
  const { ref, visible } = useInView()
  const [tab, setTab] = useState<Tab>('portfolio')

  return (
    <div
      className="py-28 px-6 sec-grad-ab"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">Your Private Portal</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-3">Investor Dashboard</h2>
          <p className="font-playfair italic text-xl mt-3 mb-6" style={{ color: 'rgba(232,201,126,0.7)' }}>
            Track performance. Download documents. Stay in control.
          </p>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Top stats row */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ${visible ? 'in-view-fade-up d-1' : 'opacity-0'}`}>
          {[
            { l: 'Portfolio Value', v: '₹1.90 Cr', sub: '+₹27L total gain', col: '#C9A44A' },
            { l: 'Monthly Rental', v: '₹1,48,800', sub: 'Both properties', col: '#22A861' },
            { l: 'Avg. Rental Yield', v: '9.65%', sub: 'Portfolio weighted', col: '#4A9ED4' },
            { l: 'Properties Owned', v: '2', sub: 'Dubai Marina · Business Bay', col: '#C9A44A' },
          ].map(s => (
            <div key={s.l} className="glass rounded-2xl p-5 relative overflow-hidden">
              <div
                className="absolute top-0 inset-x-0 h-[2px]"
                style={{ background: `linear-gradient(90deg,transparent,${s.col},transparent)` }}
              />
              <div className="font-cinzel text-2xl font-bold mb-1" style={{ color: s.col }}>{s.v}</div>
              <div className="font-cinzel text-xs font-semibold mb-0.5" style={{ color: 'var(--text-h)' }}>{s.l}</div>
              <div className="font-dm-mono text-[0.52rem]" style={{ color: 'var(--text-f)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={`glass rounded-2xl overflow-hidden ${visible ? 'in-view-fade-in d-2' : 'opacity-0'}`}>
          {/* Tab bar */}
          <div
            className="flex border-b overflow-x-auto"
            style={{ borderColor: 'var(--bg-card-sm)' }}
          >
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-5 py-4 font-cinzel text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
                style={{
                  color: tab === t.id ? '#C9A44A' : 'var(--text-m)',
                  borderBottom: tab === t.id ? '2px solid #C9A44A' : '2px solid transparent',
                  background: tab === t.id ? 'rgba(201,164,74,0.05)' : 'transparent',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">
            {tab === 'portfolio' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {portfolio.map(p => (
                  <div key={p.name} className="glass-dark rounded-xl overflow-hidden">
                    <div className="relative h-40">
                      <img src={p.img} alt={p.name} loading="lazy"
                        className="w-full h-full object-cover" style={{ filter: 'brightness(0.55)' }}/>
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(6,6,6,0.85) 0%,transparent 60%)' }}/>
                      <div className="absolute top-3 right-3">
                        <span
                          className="font-dm-mono text-[0.52rem] px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(34,168,97,0.85)', color: 'white' }}
                        >
                          {p.status}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4">
                        <div className="font-cinzel text-sm font-semibold" style={{ color: 'var(--text-h)' }}>{p.name}</div>
                        <div className="font-dm-mono text-[0.52rem]" style={{ color: 'var(--text-m)' }}>{p.location} · {p.type}</div>
                      </div>
                    </div>
                    <div className="p-4 grid grid-cols-3 gap-3">
                      {[
                        { l: 'Current Value', v: p.value, col: '#C9A44A' },
                        { l: 'Total Gain', v: `${p.gain} (${p.gainPct})`, col: '#22A861' },
                        { l: 'Rental Yield', v: p.yield, col: '#4A9ED4' },
                      ].map(s => (
                        <div key={s.l} className="text-center">
                          <div className="font-cinzel text-xs font-bold" style={{ color: s.col }}>{s.v}</div>
                          <div className="font-dm-mono text-[0.48rem] mt-0.5" style={{ color: 'var(--text-f)' }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'income' && (
              <div>
                <div className="section-label text-[0.55rem] mb-4">Rental Income Ledger</div>
                <div className="flex flex-col gap-2">
                  {income.map((r, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{ background: 'var(--bg-card-xs)', border: '1px solid var(--bg-card-sm)' }}>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: r.status === 'Received' ? '#22A861' : '#C9A44A' }}
                        />
                        <div>
                          <div className="font-outfit text-sm" style={{ color: 'var(--text-h)' }}>{r.property}</div>
                          <div className="font-dm-mono text-[0.52rem]" style={{ color: 'var(--text-f)' }}>{r.month}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-cinzel text-sm font-bold" style={{ color: r.status === 'Received' ? '#22A861' : '#C9A44A' }}>
                          {r.amount}
                        </div>
                        <div className="font-dm-mono text-[0.5rem]" style={{ color: 'var(--text-f)' }}>{r.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'documents' && (
              <div>
                <div className="section-label text-[0.55rem] mb-4">Document Vault</div>
                <div className="flex flex-col gap-2">
                  {docs.map(d => (
                    <div key={d.name} className="flex items-center justify-between px-4 py-3 rounded-xl gap-4"
                      style={{ background: 'var(--bg-card-xs)', border: '1px solid var(--bg-card-sm)' }}>
                      <div className="flex items-center gap-3 min-w-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                        <div className="min-w-0">
                          <div className="font-outfit text-xs truncate" style={{ color: 'var(--text-h)' }}>{d.name}</div>
                          <div className="font-dm-mono text-[0.48rem]" style={{ color: 'var(--text-f)' }}>
                            {d.type} · {d.date} · {d.size}
                          </div>
                        </div>
                      </div>
                      <button className="flex-shrink-0 font-dm-mono text-[0.55rem] text-[#C9A44A] hover:opacity-70 transition-opacity">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'watchlist' && (
              <div>
                <div className="section-label text-[0.55rem] mb-4">Saved Properties</div>
                <div className="flex flex-col gap-3">
                  {watchlist.map(w => (
                    <div key={w.name} className="flex items-center justify-between px-5 py-4 rounded-xl"
                      style={{ background: 'var(--bg-card-xs)', border: '1px solid var(--bg-card-sm)' }}>
                      <div>
                        <div className="font-cinzel text-sm font-semibold" style={{ color: 'var(--text-h)' }}>{w.name}</div>
                        <div className="font-outfit text-xs" style={{ color: 'var(--text-m)' }}>{w.location}</div>
                      </div>
                      <div className="flex gap-6 items-center">
                        <div className="text-center">
                          <div className="font-cinzel text-sm font-bold" style={{ color: '#C9A44A' }}>{w.price}</div>
                          <div className="font-dm-mono text-[0.48rem]" style={{ color: 'var(--text-f)' }}>Price</div>
                        </div>
                        <div className="text-center">
                          <div className="font-cinzel text-sm font-bold" style={{ color: '#22A861' }}>{w.yield}</div>
                          <div className="font-dm-mono text-[0.48rem]" style={{ color: 'var(--text-f)' }}>Yield</div>
                        </div>
                        <div
                          className="text-xs font-cinzel font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(34,168,97,0.12)', color: '#22A861', border: '1px solid rgba(34,168,97,0.2)' }}
                        >
                          {w.change}
                        </div>
                        <button
                          className="btn-outline-gold py-1.5 px-3 text-xs"
                          onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
                        >Enquire</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'notifications' && (
              <div>
                <div className="section-label text-[0.55rem] mb-4">Recent Alerts</div>
                <div className="flex flex-col gap-3">
                  {notifications.map((n, i) => (
                    <div key={i} className="flex gap-4 px-4 py-4 rounded-xl"
                      style={{ background: 'var(--bg-card-xs)', border: '1px solid var(--bg-card-sm)' }}>
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm"
                        style={{ background: 'rgba(201,164,74,0.12)', border: '1px solid rgba(201,164,74,0.2)' }}
                      >
                        {n.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-outfit text-sm leading-relaxed" style={{ color: 'var(--text-m)' }}>{n.msg}</p>
                        <div className="font-dm-mono text-[0.5rem] mt-1" style={{ color: 'var(--text-f)' }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
