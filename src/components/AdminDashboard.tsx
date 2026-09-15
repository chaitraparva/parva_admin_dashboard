import { useState } from 'react'

type AdminTab = 'leads' | 'funnel' | 'properties' | 'investors'

const leads = [
  { name: 'Arjun Sharma', city: 'Mumbai', budget: '₹1.5Cr', score: 92, status: 'hot', source: 'WhatsApp', since: '2h ago', expanded: false },
  { name: 'Meera Patel', city: 'Surat', budget: '₹65L', score: 78, status: 'warm', source: 'Website Form', since: '5h ago', expanded: false },
  { name: 'Karthik Naidu', city: 'Bengaluru', budget: '₹2.2Cr', score: 95, status: 'hot', source: 'Referral', since: '1d ago', expanded: false },
  { name: 'Sunita Agarwal', city: 'Delhi', budget: '₹85L', score: 61, status: 'warm', source: 'Google Ads', since: '2d ago', expanded: false },
  { name: 'Vijay Bhatia', city: 'Ahmedabad', budget: '₹4Cr+', score: 88, status: 'hot', source: 'Event', since: '3d ago', expanded: false },
  { name: 'Pooja Khanna', city: 'Hyderabad', budget: '₹50L', score: 44, status: 'cold', source: 'Social Media', since: '5d ago', expanded: false },
]

const funnel = [
  { stage: 'Website Visitors', count: 28420, drop: null },
  { stage: 'Form Submissions', count: 1842, drop: '93.5% drop' },
  { stage: 'Qualified Leads', count: 412, drop: '77.7% drop' },
  { stage: 'Consultation Calls', count: 148, drop: '64.1% drop' },
  { stage: 'Dubai Visits', count: 72, drop: '51.4% drop' },
  { stage: 'Conversions', count: 38, drop: '47.2% drop' },
]

const properties = [
  { name: 'Marina Residences 2B', location: 'Dubai Marina', views: 4820, enquiries: 284, bookings: 12, conversion: '4.2%' },
  { name: 'Bay Tower Studio', location: 'Business Bay', views: 3940, enquiries: 312, bookings: 18, conversion: '5.8%' },
  { name: 'Creek Horizon 1BHK', location: 'Creek Harbour', views: 2890, enquiries: 198, bookings: 9, conversion: '4.5%' },
  { name: 'JLT Studio Premium', location: 'JLT Zone A', views: 2210, enquiries: 184, bookings: 14, conversion: '7.6%' },
  { name: 'DIFC Signature 1BHK', location: 'DIFC', views: 1980, enquiries: 96, bookings: 5, conversion: '5.2%' },
]

const investorStats = [
  { city: 'Mumbai', pct: 34, investors: 221 },
  { city: 'Delhi / NCR', pct: 22, investors: 143 },
  { city: 'Bengaluru', pct: 18, investors: 117 },
  { city: 'Hyderabad', pct: 11, investors: 72 },
  { city: 'Ahmedabad', pct: 9, investors: 59 },
  { city: 'Others', pct: 6, investors: 38 },
]

const statusColors: Record<string, string> = {
  hot: '#EF4444',
  warm: '#F97316',
  cold: '#4A9ED4',
}

function ScoreRing({ score }: { score: number }) {
  const r = 14
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const col = score >= 80 ? '#22A861' : score >= 60 ? '#C9A44A' : '#EF4444'
  return (
    <svg width="38" height="38" viewBox="0 0 38 38">
      <circle cx="19" cy="19" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3"/>
      <circle cx="19" cy="19" r={r} fill="none" stroke={col} strokeWidth="3"
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ / 4}
        strokeLinecap="round"/>
      <text x="19" y="23" textAnchor="middle" fontSize="8" fill={col} fontFamily="DM Mono" fontWeight="bold">
        {score}
      </text>
    </svg>
  )
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<AdminTab>('leads')
  const [expanded, setExpanded] = useState<number | null>(null)

  const tabs = [
    { id: 'leads' as AdminTab, label: 'Live Leads' },
    { id: 'funnel' as AdminTab, label: 'Conversion Funnel' },
    { id: 'properties' as AdminTab, label: 'Property Analytics' },
    { id: 'investors' as AdminTab, label: 'Investor Insights' },
  ]

  return (
    <div className="glass rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,164,74,0.2)' }}>
      {/* Admin header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{
          background: 'linear-gradient(90deg,rgba(201,164,74,0.08),rgba(201,164,74,0.03))',
          borderBottom: '1px solid rgba(201,164,74,0.15)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#22A861] animate-pulse" />
          <span className="font-cinzel text-sm font-bold" style={{ color: '#C9A44A' }}>Admin Dashboard</span>
          <span className="font-dm-mono text-[0.52rem] px-2 py-0.5 rounded"
            style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}>
            RESTRICTED
          </span>
        </div>
        <div className="font-dm-mono text-[0.55rem]" style={{ color: 'var(--text-f)' }}>
          Live · Updated 2 min ago
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0" style={{ borderBottom: '1px solid var(--bg-card-sm)' }}>
        {[
          { l: 'Total Leads', v: '1,842', col: '#C9A44A' },
          { l: 'Hot Leads', v: '94', col: '#EF4444' },
          { l: 'Conversions', v: '38', col: '#22A861' },
          { l: 'Rev. This Month', v: '₹4.2Cr', col: '#C9A44A' },
        ].map((s, i) => (
          <div
            key={s.l}
            className="px-6 py-5 text-center"
            style={{ borderRight: i < 3 ? '1px solid var(--bg-card-sm)' : 'none' }}
          >
            <div className="font-cinzel text-xl font-bold" style={{ color: s.col }}>{s.v}</div>
            <div className="font-dm-mono text-[0.52rem] mt-0.5" style={{ color: 'var(--text-f)' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b overflow-x-auto" style={{ borderColor: 'var(--bg-card-sm)' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-5 py-3.5 font-cinzel text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all"
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
        {tab === 'leads' && (
          <div className="flex flex-col gap-2">
            {leads.map((l, i) => (
              <div
                key={l.name}
                className="rounded-xl overflow-hidden transition-all"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--bg-card-sm)' }}
              >
                <div
                  className="flex items-center gap-4 px-4 py-3.5 cursor-pointer"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <ScoreRing score={l.score}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel text-sm font-semibold" style={{ color: 'var(--text-h)' }}>{l.name}</span>
                      <span
                        className="font-dm-mono text-[0.48rem] px-1.5 py-0.5 rounded uppercase tracking-widest"
                        style={{ background: `${statusColors[l.status]}20`, color: statusColors[l.status] }}
                      >
                        {l.status}
                      </span>
                    </div>
                    <div className="font-dm-mono text-[0.52rem] mt-0.5" style={{ color: 'var(--text-f)' }}>
                      {l.city} · {l.budget} · via {l.source}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-dm-mono text-[0.5rem]" style={{ color: 'var(--text-f)' }}>{l.since}</div>
                  </div>
                </div>

                {expanded === i && (
                  <div
                    className="px-4 pb-4 flex gap-3"
                    style={{ borderTop: '1px solid var(--bg-card-sm)' }}
                  >
                    <button
                      className="btn-gold py-1.5 px-4 text-xs"
                      style={{ fontSize: '0.65rem' }}
                    >
                      Assign Advisor
                    </button>
                    <button
                      className="btn-outline-gold py-1.5 px-4 text-xs"
                      style={{ fontSize: '0.65rem' }}
                    >
                      Call Now
                    </button>
                    <button
                      className="py-1.5 px-4 rounded-xl font-cinzel text-xs transition-all"
                      style={{ background: 'rgba(34,168,97,0.12)', color: '#22A861', border: '1px solid rgba(34,168,97,0.2)', fontSize: '0.65rem' }}
                    >
                      Mark Converted
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'funnel' && (
          <div className="flex flex-col gap-3">
            {funnel.map((f, i) => (
              <div key={f.stage} className="flex items-center gap-4">
                <div className="font-dm-mono text-[0.55rem] w-36 text-right flex-shrink-0"
                  style={{ color: 'var(--text-m)' }}>
                  {f.stage}
                </div>
                <div className="flex-1 h-9 rounded-xl overflow-hidden relative" style={{ background: 'var(--bg-card-sm)' }}>
                  <div
                    className="h-full rounded-xl flex items-center pl-4"
                    style={{
                      width: `${(f.count / funnel[0].count) * 100}%`,
                      background: `linear-gradient(90deg,rgba(201,164,74,${1 - i * 0.12}),rgba(201,164,74,${0.8 - i * 0.1}))`,
                      minWidth: '80px',
                    }}
                  >
                    <span className="font-cinzel text-xs font-bold text-[#060606]">
                      {f.count.toLocaleString()}
                    </span>
                  </div>
                </div>
                {f.drop && (
                  <div className="font-dm-mono text-[0.5rem] w-20 flex-shrink-0" style={{ color: '#EF4444' }}>
                    {f.drop}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'properties' && (
          <div>
            <div className="grid grid-cols-5 gap-2 px-4 mb-2">
              {['Property', 'Views', 'Enquiries', 'Bookings', 'Conversion'].map(h => (
                <div key={h} className="font-dm-mono text-[0.5rem] uppercase tracking-widest"
                  style={{ color: 'var(--text-f)' }}>
                  {h}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {properties.map((p, i) => (
                <div
                  key={p.name}
                  className="grid grid-cols-5 gap-2 px-4 py-3.5 rounded-xl items-center"
                  style={{ background: 'var(--bg-card-xs)', border: '1px solid var(--bg-card-sm)' }}
                >
                  <div>
                    <div className="font-cinzel text-xs font-semibold" style={{ color: 'var(--text-h)' }}>{p.name}</div>
                    <div className="font-dm-mono text-[0.48rem]" style={{ color: 'var(--text-f)' }}>{p.location}</div>
                  </div>
                  <div className="font-cinzel text-sm font-bold" style={{ color: '#C9A44A' }}>{p.views.toLocaleString()}</div>
                  <div className="font-cinzel text-sm font-bold" style={{ color: '#4A9ED4' }}>{p.enquiries}</div>
                  <div className="font-cinzel text-sm font-bold" style={{ color: '#22A861' }}>{p.bookings}</div>
                  <div className="font-cinzel text-sm font-bold" style={{ color: '#E8C97E' }}>{p.conversion}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'investors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="section-label text-[0.58rem] mb-5">Investor Geography</div>
              <div className="flex flex-col gap-3">
                {investorStats.map(c => (
                  <div key={c.city} className="flex items-center gap-3">
                    <div className="font-dm-mono text-[0.55rem] w-24 flex-shrink-0" style={{ color: 'var(--text-m)' }}>
                      {c.city}
                    </div>
                    <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-card-sm)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${c.pct}%`, background: 'linear-gradient(90deg,#C9A44A,#E8C97E)' }}
                      />
                    </div>
                    <div className="font-dm-mono text-[0.55rem] w-10 text-right flex-shrink-0" style={{ color: '#C9A44A' }}>
                      {c.pct}%
                    </div>
                    <div className="font-dm-mono text-[0.5rem] w-8 text-right flex-shrink-0" style={{ color: 'var(--text-f)' }}>
                      {c.investors}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label text-[0.58rem] mb-5">Key Metrics</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: 'Avg. Investment', v: '₹76L' },
                  { l: 'LTV (Lifetime Value)', v: '₹1.8Cr' },
                  { l: 'Referral Rate', v: '34%' },
                  { l: 'Avg. Time to Close', v: '18 days' },
                  { l: 'Repeat Investors', v: '28%' },
                  { l: 'NPS Score', v: '82 / 100' },
                ].map(m => (
                  <div key={m.l} className="glass rounded-xl p-4">
                    <div className="font-cinzel text-base font-bold" style={{ color: '#C9A44A' }}>{m.v}</div>
                    <div className="font-dm-mono text-[0.5rem] mt-0.5" style={{ color: 'var(--text-f)' }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
