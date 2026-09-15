import { useInView } from '../hooks/useInView'

const pillars = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Verified Developers Only',
    desc: 'Every property in our catalogue is from RERA-registered, DED-licensed UAE developers with 5+ year track records. No off-market risk.',
    stat: '14 Developers',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h10M7 12h6"/>
      </svg>
    ),
    title: 'Full Legal Transparency',
    desc: 'We share every document before signing — SPA, title deed, developer escrow certificate, RERA project registration. No surprises.',
    stat: '100% Disclosed',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4"/>
        <path d="M20 21a8 8 0 10-16 0"/>
        <path d="M16 13l2 2 4-4"/>
      </svg>
    ),
    title: 'Dedicated India & Dubai Teams',
    desc: 'Local advisors in Mumbai, Delhi and Bengaluru. Dubai-based relationship managers. One point of contact throughout.',
    stat: '48 Advisors',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4"/>
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
      </svg>
    ),
    title: 'Post-Purchase Support',
    desc: 'Rental management, tenant sourcing, annual reviews, resale support, exit planning. We stay with you — not just through the sale.',
    stat: 'Lifetime Support',
  },
]

const developers = [
  { name: 'Emaar Properties', since: '1997', projects: 24 },
  { name: 'DAMAC', since: '2002', projects: 18 },
  { name: 'Meraas', since: '2007', projects: 12 },
  { name: 'Nakheel', since: '2000', projects: 9 },
  { name: 'Sobha Realty', since: '1976', projects: 7 },
  { name: 'Ellington Properties', since: '2014', projects: 11 },
]

const badges = [
  { label: 'RERA Registered', sub: 'Real Estate Regulatory Agency' },
  { label: 'DED Licensed', sub: 'Dept. of Economic Development, Dubai' },
  { label: 'RBI Compliant', sub: 'LRS outward remittance compliant' },
  { label: 'FEMA Compliant', sub: 'Foreign Exchange Management Act' },
]

export default function TrustCentre() {
  const { ref, visible } = useInView()

  return (
    <div
      className="py-28 px-6 sec-grad-ba"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">Verified. Transparent. Protected.</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-3">Trust Centre</h2>
          <p className="font-playfair italic text-xl mt-3 mb-6" style={{ color: 'rgba(232,201,126,0.7)' }}>
            Your investment is backed by the highest standards in Indian and UAE real estate law.
          </p>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`glass card-lift rounded-2xl p-7 flex gap-5 ${visible ? `in-view-fade-up d-${i + 1}` : 'opacity-0'}`}
            >
              <div
                className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(201,164,74,0.08)', border: '1px solid rgba(201,164,74,0.15)' }}
              >
                {p.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-cinzel text-base font-semibold" style={{ color: 'var(--text-h)' }}>{p.title}</h3>
                  <span
                    className="flex-shrink-0 font-dm-mono text-[0.55rem] font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(201,164,74,0.1)', color: '#C9A44A', border: '1px solid rgba(201,164,74,0.22)' }}
                  >
                    {p.stat}
                  </span>
                </div>
                <p className="font-outfit text-sm leading-relaxed" style={{ color: 'var(--text-m)' }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Developer grid */}
        <div className={`mb-14 ${visible ? 'in-view-fade-up d-5' : 'opacity-0'}`}>
          <div className="section-label text-[0.58rem] text-center mb-6">Verified Developer Partners</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {developers.map(d => (
              <div
                key={d.name}
                className="glass card-lift rounded-xl p-4 text-center flex flex-col gap-2"
              >
                <div
                  className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center"
                  style={{ background: 'rgba(201,164,74,0.08)', border: '1px solid rgba(201,164,74,0.12)' }}
                >
                  <span className="font-cinzel text-xs font-bold" style={{ color: '#C9A44A' }}>
                    {d.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="font-cinzel text-[0.6rem] font-semibold leading-tight" style={{ color: 'var(--text-h)' }}>{d.name}</div>
                <div className="font-dm-mono text-[0.5rem]" style={{ color: 'var(--text-f)' }}>Est. {d.since}</div>
                <div className="font-dm-mono text-[0.52rem] font-semibold" style={{ color: '#C9A44A' }}>{d.projects} projects</div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance badges */}
        <div
          className={`glass-gold rounded-2xl p-8 ${visible ? 'in-view-scale d-7' : 'opacity-0'}`}
          style={{ border: '1px solid rgba(201,164,74,0.2)' }}
        >
          <div className="section-label text-[0.58rem] text-center mb-6">Regulatory Compliance</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map(b => (
              <div
                key={b.label}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-xl"
                style={{ background: 'var(--bg-card-xs)', border: '1px solid rgba(201,164,74,0.12)' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201,164,74,0.12)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <div className="font-cinzel text-sm font-bold" style={{ color: '#E8C97E' }}>{b.label}</div>
                <div className="font-outfit text-[0.6rem]" style={{ color: 'var(--text-m)' }}>{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
