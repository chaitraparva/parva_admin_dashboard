import { useInView } from '../hooks/useInView'

const tiers = [
  {
    name: 'Gold',
    threshold: '₹25L – ₹1 Crore',
    color: '#C9A44A',
    perks: [
      'Dedicated advisor (48hr SLA)',
      'Dubai Discovery Package',
      'Monthly rental statements',
      'Annual portfolio review',
      'Legal & documentation support',
      'Investor community access',
    ],
  },
  {
    name: 'Platinum',
    threshold: '₹1 Crore – ₹3 Crore',
    color: '#DDD9D2',
    perks: [
      'Senior dedicated RM (24hr SLA)',
      'Priority Dubai access & lounge',
      'Quarterly portfolio reviews',
      'Pre-launch property allocations',
      'Concierge rental management',
      'Tax & CA consultation',
      'Referral bonus programme',
      'Exclusive event invitations',
    ],
    highlight: true,
  },
  {
    name: 'Black',
    threshold: '₹3 Crore+',
    color: 'var(--text-h)',
    perks: [
      'Executive VP-level advisor',
      'Unlimited Dubai visits arranged',
      'Off-plan developer introductions',
      'UAE Golden Visa facilitation',
      'Multi-property portfolio strategy',
      'Private wealth management access',
      'Priority resale & exit planning',
      'Exclusive Black member dinners',
    ],
  },
]

export default function InvestorClub() {
  const { ref, visible } = useInView()

  return (
    <div
      className="py-28 px-6 relative overflow-hidden sec-grad-ca"
      ref={ref}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%,rgba(201,164,74,0.04) 0%,transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">For Serious Investors</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-3">Exclusive Investor Club</h2>
          <p className="font-playfair italic text-xl mt-3 mb-6" style={{ color: 'rgba(232,201,126,0.7)' }}>
            Three tiers. Lifetime membership. Unmatched access.
          </p>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-2xl flex flex-col overflow-hidden card-lift relative ${visible ? `in-view-scale d-${i + 1}` : 'opacity-0'}`}
              style={{
                background: t.highlight
                  ? 'linear-gradient(160deg,rgba(201,164,74,0.04) 0%,rgba(201,164,74,0.04) 100%)'
                  : 'var(--bg-card-xs)',
                border: `1px solid ${t.color}28`,
              }}
            >
              {t.highlight && (
                <div
                  className="py-1.5 text-center font-dm-mono text-[0.58rem] tracking-widest uppercase"
                  style={{ background: 'linear-gradient(90deg,#DDD9D2,#C9A44A)', color: '#060606' }}
                >
                  Most Chosen
                </div>
              )}

              {/* Top accent */}
              <div
                className="h-[3px]"
                style={{
                  background: t.highlight
                    ? `linear-gradient(90deg,${t.color},#C9A44A,${t.color})`
                    : `linear-gradient(90deg,transparent,${t.color},transparent)`,
                }}
              />

              <div className="p-8 flex flex-col gap-6 flex-1">
                {/* Badge */}
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                    style={{
                      background: `${t.color}12`,
                      border: `1px solid ${t.color}28`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                    <span className="font-dm-mono text-[0.6rem] tracking-widest uppercase" style={{ color: t.color }}>
                      {t.name} Member
                    </span>
                  </div>

                  <div className="font-cinzel text-3xl font-bold mb-1" style={{ color: t.color }}>
                    {t.name}
                  </div>
                  <div className="font-outfit text-sm" style={{ color: 'var(--text-m)' }}>
                    Portfolio: {t.threshold}
                  </div>
                </div>

                {/* Perks */}
                <div className="flex flex-col gap-2.5 flex-1">
                  {t.perks.map(p => (
                    <div key={p} className="flex items-start gap-2.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                        style={{ background: `${t.color}20`, border: `1px solid ${t.color}40` }}
                      >
                        <div className="w-1 h-1 rounded-full" style={{ background: t.color }} />
                      </div>
                      <span className="font-outfit text-xs leading-relaxed" style={{ color: 'var(--text-m)' }}>
                        {p}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full justify-center py-3 rounded-xl font-cinzel text-sm font-semibold transition-all"
                  style={{
                    background: t.highlight ? 'linear-gradient(135deg,#DDD9D2,#C9A44A)' : `${t.color}12`,
                    color: t.highlight ? '#060606' : t.color,
                    border: t.highlight ? 'none' : `1px solid ${t.color}30`,
                  }}
                  onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Enquire About {t.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div
          className={`glass rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 ${visible ? 'in-view-fade-up d-5' : 'opacity-0'}`}
        >
          <div className="text-center md:text-left">
            <div className="font-cinzel text-lg font-bold mb-1" style={{ color: 'var(--text-h)' }}>
              Already an investor?
            </div>
            <div className="font-outfit text-sm" style={{ color: 'var(--text-m)' }}>
              Log in to access your investor dashboard, portfolio, and documents.
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="btn-outline-gold"
              onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Enquire Now
            </button>
            <button
              className="btn-gold"
              onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Become a Member
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
