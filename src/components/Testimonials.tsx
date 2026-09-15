import { useInView } from '../hooks/useInView'

const testimonials = [
  {
    name: 'Rajesh Mehta',
    city: 'Mumbai',
    role: 'IT Director',
    investment: '₹1.2 Cr',
    returns: '+18.4%',
    months: '18 months',
    since: 'Feb 2024',
    props: 2,
    img: 'https://images.unsplash.com/photo-1771244688590-1e481dba1b5a?w=200&h=200&fit=crop&auto=format',
    quote: "I was skeptical at first. Buying property in a foreign country felt complicated and risky. Parva made the entire process feel effortless. From the flight to the title deed, everything was handled. My Marina apartment generates ₹95,000/month in rental income — consistently.",
  },
  {
    name: 'Priya Nair',
    city: 'Bengaluru',
    role: 'Entrepreneur',
    investment: '₹85 Lakhs',
    returns: '+21.2%',
    months: '14 months',
    since: 'Apr 2024',
    props: 1,
    img: 'https://images.unsplash.com/photo-1729157660349-21b4e0560989?w=200&h=200&fit=crop&auto=format',
    quote: "The Dubai visit was an experience in itself — hotel stay, luxury car, professional tours. I felt like a VIP throughout. I bought a 1BHK in Business Bay and it has been yielding 9.8% annually. Parva's advisor still calls me every month to update me.",
  },
  {
    name: 'Suresh Agarwal',
    city: 'Ahmedabad',
    role: 'Pharma Businessman',
    investment: '₹3.4 Cr',
    returns: '+24.8%',
    months: '22 months',
    since: 'Oct 2023',
    props: 3,
    img: 'https://images.unsplash.com/photo-1632482150998-df2760232c90?w=200&h=200&fit=crop&auto=format',
    quote: "Compared to the Indian real estate market, Dubai's returns are on another level. No tax, high yield, and 12% appreciation in the first year. Parva's legal team handled every document flawlessly. I've since referred 4 friends from my business network.",
  },
]

const miniQuotes = [
  { name: 'Kiran Shah', city: 'Hyderabad', quote: "The refund policy gave me the confidence. Parva delivered far beyond expectations.", returns: '16.2%' },
  { name: 'Anita Desai', city: 'Delhi', quote: "My advisor Rajesh checks in every quarter with a detailed portfolio review. Exceptional service.", returns: '14.8%' },
  { name: 'Vivek Krishnan', city: 'Chennai', quote: "Zero stress from start to finish. The Dubai visit was the best business trip of my life.", returns: '19.1%' },
]

export default function Testimonials() {
  const { ref, visible } = useInView()

  return (
    <div
      className="py-28 px-6 sec-grad-ab"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">Real Investors · Verified Returns</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-5">Success Stories</h2>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Feature testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`glass card-lift rounded-2xl overflow-hidden flex flex-col ${visible ? `in-view-fade-up d-${i + 1}` : 'opacity-0'}`}
            >
              {/* Gold top accent */}
              <div
                className="h-[2px] flex-shrink-0"
                style={{ background: `linear-gradient(90deg,#C9A44A,${i === 1 ? '#E8C97E' : 'transparent'})` }}
              />

              <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array(5).fill(0).map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="#C9A44A">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <div className="relative flex-1">
                  <svg className="absolute -top-1 -left-1 opacity-15" width="28" height="28" viewBox="0 0 24 24" fill="#C9A44A">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                  </svg>
                  <p className="font-outfit text-sm leading-relaxed pl-3"
                    style={{ color: 'var(--text-m)' }}>
                    {t.quote}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    className="rounded-xl p-3 text-center"
                    style={{ background: 'rgba(201,164,74,0.08)', border: '1px solid rgba(201,164,74,0.18)' }}
                  >
                    <div className="font-cinzel text-sm font-bold text-gradient-gold">{t.investment}</div>
                    <div className="font-dm-mono text-[0.52rem] mt-0.5" style={{ color: 'var(--text-f)' }}>Invested</div>
                  </div>
                  <div
                    className="rounded-xl p-3 text-center"
                    style={{ background: 'rgba(34,168,97,0.1)', border: '1px solid rgba(34,168,97,0.22)' }}
                  >
                    <div className="font-cinzel text-sm font-bold" style={{ color: '#22A861' }}>{t.returns}</div>
                    <div className="font-dm-mono text-[0.52rem] mt-0.5" style={{ color: 'var(--text-f)' }}>in {t.months}</div>
                  </div>
                </div>

                {/* Investor row */}
                <div
                  className="flex items-center gap-3 pt-3"
                  style={{ borderTop: '1px solid var(--bg-card-sm)' }}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#111]">
                    <img src={t.img} alt={t.name} loading="lazy" className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-cinzel text-sm font-semibold truncate" style={{ color: 'var(--text-h)' }}>{t.name}</div>
                    <div className="font-outfit text-xs" style={{ color: 'var(--text-m)' }}>{t.role} · {t.city}</div>
                  </div>
                  <div className="font-dm-mono text-[0.55rem] text-right flex-shrink-0"
                    style={{ color: 'var(--text-f)' }}>
                    {t.props} {t.props > 1 ? 'properties' : 'property'}<br />Since {t.since}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini quotes */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-14 ${visible ? 'in-view-fade-up d-5' : 'opacity-0'}`}>
          {miniQuotes.map(m => (
            <div key={m.name} className="glass rounded-xl p-5 card-lift">
              <p className="font-playfair italic text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-m)' }}>
                "{m.quote}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-cinzel text-sm font-semibold" style={{ color: 'var(--text-h)' }}>{m.name}</div>
                  <div className="font-outfit text-xs" style={{ color: 'var(--text-f)' }}>{m.city}</div>
                </div>
                <div className="text-right">
                  <div className="font-cinzel text-base font-bold" style={{ color: '#22A861' }}>{m.returns}</div>
                  <div className="font-dm-mono text-[0.52rem]" style={{ color: 'var(--text-f)' }}>Returns</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate trust strip */}
        <div
          className={`glass-gold rounded-2xl p-8 flex flex-col md:flex-row items-center justify-around gap-8 text-center ${visible ? 'in-view-scale d-7' : 'opacity-0'}`}
          style={{ border: '1px solid rgba(201,164,74,0.22)' }}
        >
          {[
            { v: '650+', l: 'Satisfied Investors' },
            { v: '98%', l: 'Recommend Parva' },
            { v: '₹500Cr+', l: 'Assets Guided' },
            { v: '0', l: 'Disputed Transactions' },
          ].map(s => (
            <div key={s.v}>
              <div className="font-cinzel text-3xl md:text-4xl font-bold text-gradient-gold">{s.v}</div>
              <div className="section-label text-[0.58rem] mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
