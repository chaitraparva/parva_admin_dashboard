import { useInView } from '../hooks/useInView'

const benefits = [
  { icon: '💰', stat: '3–4%', label: 'Commission Opportunity' },
  { icon: '🏙️', stat: 'Full', label: 'Dubai Property Inventory Access' },
  { icon: '📊', stat: 'Live', label: 'Developer Presentations & Project Info' },
  { icon: '🛫', stat: 'On-ground', label: 'Dubai-Based Sales Support' },
  { icon: '🗓️', stat: 'Managed', label: 'Site-Visit Coordination' },
  { icon: '📚', stat: 'Ready', label: 'Training & Marketing Material' },
  { icon: '🤝', stat: 'Dedicated', label: 'Client Handling Assistance' },
  { icon: '🌐', stat: 'Global', label: 'International Real Estate Exposure' },
]

const comparison = [
  { factor: 'Residential rental yield', dubai: '~5–7%', india: '~2–4%' },
  { factor: 'Capital appreciation', dubai: 'Strong (avg. 10% YoY) — Knight Frank', india: 'Strong in select cities, location dependent' },
  { factor: 'Tax environment', dubai: 'No UAE personal income tax*', india: 'Rental income & capital gains can be taxed' },
  { factor: 'Currency diversification', dubai: 'AED pegged to USD', india: 'INR exposure' },
  { factor: 'Market', dubai: 'Global, international buyers & HNIs', india: 'Primarily domestic' },
  { factor: 'Best for', dubai: 'Income + International diversification', india: 'End-use + Long-term India exposure' },
]

const idealPartners = [
  'Real estate brokers',
  'Wealth managers',
  'Chartered Accountants',
  'Financial consultants',
  'Immigration consultants',
  'Insurance advisors',
  'HNI relationship managers',
  'Entrepreneurs with strong networks',
]

export default function ChannelPartner() {
  const { ref, visible } = useInView(0.05)

  return (
    <div className="py-28 px-6 sec-a relative overflow-hidden" ref={ref} id="channel-partner">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%,rgba(201,164,74,0.04),transparent)' }}
      />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-16 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">For Real Estate Professionals</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-4">
            Take Your Business <span className="text-gradient-gold">Global</span>
          </h2>
          <p className="font-playfair italic text-xl mb-3" style={{ color: 'rgba(232,201,126,0.7)' }}>
            Become a Dubai Real Estate Channel Partner
          </p>
          <p className="font-outfit text-base max-w-2xl mx-auto mb-6" style={{ color: 'var(--text-m)' }}>
            You already have the clients. We give you the Dubai opportunity.
          </p>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Benefits grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 ${visible ? 'in-view-fade-up d-1' : 'opacity-0'}`}>
          {benefits.map((b) => (
            <div
              key={b.label}
              className="glass card-lift rounded-2xl p-5 text-center flex flex-col items-center gap-2"
              style={{ border: '1px solid rgba(201,164,74,0.12)' }}
            >
              <div className="text-2xl">{b.icon}</div>
              <div className="font-cinzel text-base font-bold text-gradient-gold">{b.stat}</div>
              <div className="font-outfit text-xs leading-snug" style={{ color: 'var(--text-m)' }}>{b.label}</div>
            </div>
          ))}
        </div>

        {/* Two-column: comparison + numbers */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 ${visible ? 'in-view-fade-up d-2' : 'opacity-0'}`}>

          {/* Dubai vs India table */}
          <div className="glass rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,164,74,0.15)' }}>
            <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(201,164,74,0.1)', background: 'rgba(201,164,74,0.05)' }}>
              <div className="section-label text-[0.6rem]">Dubai vs India</div>
              <div className="font-cinzel text-base font-bold mt-1" style={{ color: 'var(--text-h)' }}>Investment Return Story</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,164,74,0.1)' }}>
                    <th className="px-4 py-3 text-left font-dm-mono text-[0.52rem] tracking-widest uppercase" style={{ color: 'var(--text-ff)' }}>Factor</th>
                    <th className="px-4 py-3 text-left font-dm-mono text-[0.52rem] tracking-widest uppercase" style={{ color: '#C9A44A' }}>Dubai</th>
                    <th className="px-4 py-3 text-left font-dm-mono text-[0.52rem] tracking-widest uppercase" style={{ color: 'var(--text-ff)' }}>India</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr
                      key={row.factor}
                      style={{ borderBottom: i < comparison.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    >
                      <td className="px-4 py-3 font-outfit text-xs" style={{ color: 'var(--text-m)' }}>{row.factor}</td>
                      <td className="px-4 py-3 font-outfit text-xs font-medium" style={{ color: '#C9A44A' }}>{row.dubai}</td>
                      <td className="px-4 py-3 font-outfit text-xs" style={{ color: 'var(--text-f)' }}>{row.india}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2" style={{ borderTop: '1px solid rgba(201,164,74,0.08)' }}>
              <p className="font-dm-mono text-[0.48rem]" style={{ color: 'var(--text-ff)' }}>Source: Knight Frank 2025 Market View. Figures are indicative. Not financial advice.</p>
            </div>
          </div>

          {/* The numbers */}
          <div className="flex flex-col gap-4">
            <div
              className="glass-gold rounded-2xl p-6"
              style={{ border: '1px solid rgba(201,164,74,0.25)' }}
            >
              <div className="section-label text-[0.6rem] mb-3">The Simple Numbers Investors Understand</div>
              <div className="font-cinzel text-lg font-bold mb-5" style={{ color: 'var(--text-h)' }}>₹3 Crore Property</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="font-dm-mono text-[0.52rem] tracking-widest uppercase mb-2" style={{ color: 'var(--text-ff)' }}>India · 2–3% yield</div>
                  <div className="font-cinzel text-xl font-bold" style={{ color: 'var(--text-h)' }}>₹6–9 Lakh</div>
                  <div className="font-outfit text-xs mt-1" style={{ color: 'var(--text-m)' }}>per year gross rent</div>
                </div>
                <div className="rounded-xl p-4" style={{ background: 'rgba(201,164,74,0.08)', border: '1px solid rgba(201,164,74,0.25)' }}>
                  <div className="font-dm-mono text-[0.52rem] tracking-widest uppercase mb-2" style={{ color: '#C9A44A' }}>Dubai · 6–7% yield</div>
                  <div className="font-cinzel text-xl font-bold text-gradient-gold">₹18–21 Lakh</div>
                  <div className="font-outfit text-xs mt-1" style={{ color: 'var(--text-m)' }}>per year gross rent</div>
                </div>
              </div>
              <div
                className="mt-4 rounded-xl p-4 text-center"
                style={{ background: 'rgba(34,168,97,0.1)', border: '1px solid rgba(34,168,97,0.25)' }}
              >
                <div className="font-cinzel text-3xl font-bold" style={{ color: '#22A861' }}>≈ 2–3×</div>
                <div className="font-outfit text-xs mt-1" style={{ color: 'var(--text-m)' }}>Higher gross rental income on the same investment</div>
              </div>
            </div>

            {/* Quote */}
            <div className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(201,164,74,0.12)' }}>
              <svg className="opacity-20 mb-3" width="28" height="28" viewBox="0 0 24 24" fill="#C9A44A">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
              </svg>
              <p className="font-playfair italic text-sm leading-relaxed" style={{ color: 'var(--text-m)' }}>
                "You don't need to move to Dubai to build a Dubai real-estate business. Partner with us in India, partner with us in Dubai, and turn your network into an international income opportunity."
              </p>
              <div className="mt-3 font-cinzel text-xs font-semibold" style={{ color: '#C9A44A' }}>— Parva Realty Leadership</div>
            </div>
          </div>
        </div>

        {/* Ideal Partners + CTA */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${visible ? 'in-view-fade-up d-3' : 'opacity-0'}`}>

          {/* Ideal Partners */}
          <div className="glass rounded-2xl p-6" style={{ border: '1px solid rgba(201,164,74,0.12)' }}>
            <div className="section-label text-[0.6rem] mb-4">Ideal Partners</div>
            <div className="flex flex-wrap gap-2">
              {idealPartners.map(p => (
                <span
                  key={p}
                  className="font-outfit text-xs px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(201,164,74,0.08)', border: '1px solid rgba(201,164,74,0.2)', color: 'var(--text-m)' }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="glass-gold rounded-2xl p-8 flex flex-col justify-between"
            style={{ border: '1px solid rgba(201,164,74,0.3)' }}
          >
            <div>
              <div className="section-label text-[0.6rem] mb-3">Partner · Grow · Earn Global</div>
              <h3 className="font-cinzel text-2xl font-bold mb-3" style={{ color: 'var(--text-h)' }}>
                Let's Partner for a Bigger Tomorrow
              </h3>
              <p className="font-outfit text-sm leading-relaxed mb-6" style={{ color: 'var(--text-m)' }}>
                Register as a Parva channel partner and start earning 3–4% commission on every Dubai property your clients invest in.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/971564227855?text=Hi%20Parva%2C%20I%27d%20like%20to%20become%20a%20channel%20partner"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex-1 text-center justify-center"
              >
                Register as Partner →
              </a>
              <a
                href="mailto:invest@parvarealty.ae?subject=Channel Partner Enquiry"
                className="flex-1 text-center font-cinzel text-xs tracking-widest uppercase py-3 px-5 rounded-xl transition-all hover:opacity-80"
                style={{ border: '1px solid rgba(201,164,74,0.3)', color: '#C9A44A' }}
              >
                Email Us
              </a>
            </div>
            <div className="mt-4 flex flex-col gap-1.5">
              <div className="font-dm-mono text-[0.5rem]" style={{ color: 'var(--text-ff)' }}>🌐 www.parvarealty.ae</div>
              <div className="font-dm-mono text-[0.5rem]" style={{ color: 'var(--text-ff)' }}>📞 +971 56 422 7853</div>
              <div className="font-dm-mono text-[0.5rem]" style={{ color: 'var(--text-ff)' }}>✉️ invest@parvarealty.ae</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
