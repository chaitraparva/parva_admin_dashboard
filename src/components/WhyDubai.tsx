import { useInView } from '../hooks/useInView'

const pillars = [
  {
    num: '01',
    title: 'High Rental Yields',
    stat: '8–10% p.a.',
    desc: 'Dubai consistently delivers 8–10% gross rental yields — 3× higher than London, Singapore, and Mumbai. Your property earns from day one.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Tax-Free Income',
    stat: '0% Tax',
    desc: 'No capital gains tax, no income tax on rental revenue, no inheritance tax. Every rupee of return is 100% yours.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
        <path d="M9 14l-4-4 4-4"/><path d="M5 10h11a4 4 0 010 8h-1"/>
        <circle cx="19" cy="5" r="2"/><line x1="19" y1="7" x2="19" y2="12"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'World Safety Rank #1',
    stat: 'Ranked #1',
    desc: "Ranked the world's safest city by Numbeo for five consecutive years. Your family and investment are fully protected.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Global Financial Hub',
    stat: 'Top 3 World',
    desc: 'The financial crossroads between East and West — home to 200+ nationalities and every major global corporation.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Strong Appreciation',
    stat: '10%+ p.a.',
    desc: 'Prime Dubai zones delivered double-digit capital appreciation for 3 consecutive years. The D33 agenda targets 5.8T AED GDP by 2033.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Investor Visa',
    stat: '10-Year Visa',
    desc: 'Properties above AED 2M qualify for a 10-year UAE Golden Visa — live, work, and build wealth without restriction.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/><circle cx="7" cy="15" r="1"/>
      </svg>
    ),
  },
]

export default function WhyDubai() {
  const { ref, visible } = useInView()

  return (
    <div className="py-28 px-6 relative overflow-hidden sec-grad-ab">

      {/* Vertical gold accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom,rgba(201,164,74,0.5),transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-18 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">Why the World Invests Here</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-5">Why Dubai?</h2>
          <div className="gold-divider mx-auto mb-6" />
          <p className="font-outfit text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-m)' }}>
            Dubai is not a destination — it is an economic engine designed to multiply wealth.
            Here is why 200,000+ Indian investors have already committed.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <div
              key={p.num}
              className={`glass card-lift rounded-2xl p-8 flex flex-col gap-5 group relative overflow-hidden ${visible ? `in-view-fade-up d-${i + 1}` : 'opacity-0'}`}
            >
              {/* Roman numeral watermark */}
              <div
                className="absolute top-4 right-5 font-cinzel font-bold pointer-events-none select-none"
                style={{ fontSize: '4rem', color: 'rgba(201,164,74,0.05)', lineHeight: 1 }}
              >
                {p.num}
              </div>

              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,164,74,0.08)', border: '1px solid rgba(201,164,74,0.15)' }}
                >
                  {p.icon}
                </div>
                <div className="font-cinzel text-xl font-semibold text-gradient-gold text-right">{p.stat}</div>
              </div>

              <h3 className="font-cinzel text-base font-semibold tracking-wide" style={{ color: 'var(--text-h)' }}>
                {p.title}
              </h3>

              <p className="font-outfit text-sm leading-relaxed" style={{ color: 'var(--text-m)' }}>
                {p.desc}
              </p>

              {/* Hover underline */}
              <div
                className="h-px w-0 group-hover:w-full transition-all duration-700 mt-auto"
                style={{ background: 'linear-gradient(90deg,#C9A44A,transparent)' }}
              />
            </div>
          ))}
        </div>

        {/* Market strip */}
        <div
          className={`mt-14 glass-gold rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 ${visible ? 'in-view-fade-up d-8' : 'opacity-0'}`}
        >
          <div className="md:text-left text-center">
            <div className="font-cinzel text-xl font-semibold" style={{ color: 'var(--text-h)' }}>
              Dubai Real Estate 2025 — Record Year
            </div>
            <div className="font-outfit text-sm mt-1" style={{ color: 'var(--text-m)' }}>
              4th consecutive year of transaction volume records · D33 agenda in full effect
            </div>
          </div>
          <div className="flex gap-10">
            {[
              { v: '412,000+', l: 'Transactions' },
              { v: 'AED 634B', l: 'Total Value'  },
              { v: '+38%',    l: 'YoY Growth'   },
            ].map(s => (
              <div key={s.v} className="text-center">
                <div className="font-cinzel text-2xl font-semibold text-[#C9A44A]">{s.v}</div>
                <div className="section-label text-[0.52rem] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
