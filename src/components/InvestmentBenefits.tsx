import { useInView } from '../hooks/useInView'

const stats = [
  { value: '₹25L', label: 'Entry Investment', sub: 'Minimum threshold', color: '#C9A44A' },
  { value: '10%', label: 'Rental Yield p.a.', sub: 'Avg across prime zones', color: '#22A861' },
  { value: '10%+', label: 'Capital Appreciation', sub: 'Projected per annum', color: '#4A9ED4' },
  { value: '3 Yrs', label: 'Optional Exit', sub: 'Buyback guarantee available', color: '#C9A44A' },
]

const tiers = [
  {
    name: 'Starter', price: '₹25 – 85 Lakhs',
    features: ['1 BHK Apartments', 'Business Bay / JLT', '9–10% Rental Yield', 'Full legal support', 'Advisor-assigned'],
    highlight: false,
  },
  {
    name: 'Premium', price: '₹85L – 2 Crore',
    features: ['2 BHK & Penthouse', 'Marina / Downtown', '10%+ Rental Yield', 'Priority advisory', '3-year buyback option', 'Exclusive club access'],
    highlight: true,
  },
  {
    name: 'Elite', price: '₹2 Crore+',
    features: ['Villas & Signature Apts', 'Palm / Creek / DIFC', 'Golden Visa eligible', 'Dedicated RM', 'Off-plan pre-allotment', 'Portfolio advisory'],
    highlight: false,
  },
]

export default function InvestmentBenefits() {
  const { ref, visible } = useInView()

  return (
    <div
      className="py-28 px-6 relative overflow-hidden sec-grad-ba"
      ref={ref}
    >
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(201,164,74,0.04) 0%,transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">Wealth Architecture</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-3">Investment Benefits</h2>
          <p className="font-playfair italic text-xl md:text-2xl mt-3 mb-6"
            style={{ color: 'rgba(232,201,126,0.7)' }}>
            Passive income. Capital growth. Zero tax. On your terms.
          </p>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`glass card-lift rounded-2xl p-7 flex flex-col items-center text-center gap-2 relative overflow-hidden ${visible ? `in-view-scale d-${i + 1}` : 'opacity-0'}`}
            >
              <div
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: `linear-gradient(90deg,transparent,${s.color},transparent)` }}
              />
              <div className="font-cinzel text-3xl md:text-4xl font-bold mt-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="font-cinzel text-sm font-semibold tracking-wide" style={{ color: 'var(--text-h)' }}>
                {s.label}
              </div>
              <div className="font-dm-mono text-[0.55rem]" style={{ color: 'var(--text-f)' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Growth projection */}
        <div
          className={`glass-gold rounded-2xl p-8 mb-14 flex flex-col lg:flex-row gap-8 items-center ${visible ? 'in-view-fade-up d-5' : 'opacity-0'}`}
          style={{ border: '1px solid rgba(201,164,74,0.2)' }}
        >
          <div className="flex-1">
            <div className="section-label text-[0.58rem] mb-2">Example Investment Return</div>
            <div className="font-cinzel text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-h)' }}>
              ₹50L invested → ₹78L in 3 years
            </div>
            <p className="font-outfit text-sm leading-relaxed" style={{ color: 'var(--text-m)' }}>
              Based on 10% annual rental yield + 10% annual appreciation compounded over 36 months.
              Fully passive — no tenant management required. Monthly rental directly credited to your account.
            </p>
          </div>
          <div className="flex-shrink-0 w-full lg:w-72 flex flex-col gap-3">
            {[
              { label: 'Year 0', value: '₹50,00,000', bar: 33, col: '#C9A44A' },
              { label: 'Year 1', value: '₹60,00,000', bar: 55, col: '#C9A44A' },
              { label: 'Year 2', value: '₹68,40,000', bar: 74, col: '#E8C97E' },
              { label: 'Year 3', value: '₹78,17,000', bar: 100, col: '#22A861' },
            ].map((r, ri) => (
              <div key={r.label} className="flex items-center gap-3">
                <div className="font-dm-mono text-[0.58rem] w-12 text-right flex-shrink-0"
                  style={{ color: 'var(--text-m)' }}>
                  {r.label}
                </div>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-card-sm)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${r.bar}%`,
                      background: `linear-gradient(90deg,${r.col},${r.col}cc)`,
                      animation: visible ? `barGrow 0.9s cubic-bezier(0.16,1,0.3,1) ${ri * 0.12}s both` : 'none',
                    }}
                  />
                </div>
                <div className="font-cinzel text-xs font-semibold flex-shrink-0 w-28 text-right" style={{ color: r.col }}>
                  {r.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment tiers */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 ${visible ? 'in-view-fade-up d-6' : 'opacity-0'}`}>
          {tiers.map(t => (
            <div
              key={t.name}
              className={`rounded-2xl flex flex-col overflow-hidden card-lift ${t.highlight ? 'glass-gold' : 'glass'}`}
              style={{
                border: t.highlight
                  ? '1px solid rgba(201,164,74,0.38)'
                  : '1px solid var(--bg-card-sm)',
              }}
            >
              {t.highlight && (
                <div
                  className="py-1.5 text-center font-dm-mono text-[0.58rem] tracking-widest uppercase"
                  style={{ background: 'linear-gradient(90deg,#C9A44A,#E8C97E)', color: '#060606' }}
                >
                  Most Popular
                </div>
              )}
              <div className="p-7 flex flex-col gap-5 flex-1">
                <div>
                  <div className="font-cinzel text-lg font-bold mb-1" style={{ color: 'var(--text-h)' }}>{t.name}</div>
                  <div className="font-cinzel text-xl font-bold text-gradient-gold">{t.price}</div>
                </div>
                <div className="flex flex-col gap-2.5 flex-1">
                  {t.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{
                          background: t.highlight ? 'linear-gradient(135deg,#C9A44A,#E8C97E)' : 'rgba(201,164,74,0.15)',
                          border: t.highlight ? 'none' : '1px solid rgba(201,164,74,0.3)',
                        }}
                      >
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="none"
                          stroke={t.highlight ? '#060606' : '#C9A44A'} strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span className="font-outfit text-xs" style={{ color: 'var(--text-m)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={t.highlight ? 'btn-gold w-full justify-center' : 'btn-outline-gold w-full justify-center'}
                  onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Here
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
