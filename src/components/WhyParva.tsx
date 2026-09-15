import { useInView } from '../hooks/useInView'

const features = [
  {
    badge: 'FLAGSHIP',
    title: '₹10,00,000 Fully Refundable Discovery Deposit',
    desc: "Reserve your Dubai visit with a refundable deposit. If you visit and don't purchase, you receive back the full amount — only the actual flight cost is retained.",
    gold: true,
  },
  {
    title: 'Flights for 2 from India',
    desc: 'Return flights arranged and paid by Parva from Mumbai, Delhi, Bengaluru, Hyderabad, Chennai or Ahmedabad — for you and one companion.',
    gold: false,
  },
  {
    title: 'Luxury Airport Transfer & Dedicated Advisor',
    desc: 'A senior Parva advisor meets you at Dubai International Airport. A premium vehicle is at your disposal for all transfers throughout the visit.',
    gold: false,
  },
  {
    title: '2-Day Curated Property Tour Programme',
    desc: 'Visit 8–12 personally vetted properties across Downtown, Marina, Business Bay, Palm Jumeirah and Creek Harbour — matched to your goals.',
    gold: false,
  },
  {
    title: 'Hotel Stay, All Meals & Local Travel',
    desc: 'Two nights in a hotel, all meals, and local transportation during the visit — fully covered. You focus on finding your investment.',
    gold: false,
  },
  {
    title: 'Legal Assistance & Complete Documentation',
    desc: 'Our RERA-registered legal team handles the SPA, title deed, POA and KYC — explained in English and Hindi before you sign anything.',
    gold: false,
  },
  {
    title: 'Dedicated Advisor + Post-Purchase Support',
    desc: 'Your advisor remains with you beyond purchase: rental management, tenant finding, annual portfolio reviews and exit planning.',
    gold: false,
  },
]

export default function WhyParva() {
  const { ref, visible } = useInView()

  return (
    <div
      className="py-28 px-6 relative overflow-hidden sec-grad-mix"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle,rgba(201,164,74,0.03) 0%,transparent 70%)',
          transform: 'translate(-50%,-50%)',
        }}
      />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-16 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">What Sets Us Apart</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-3">The Parva Promise</h2>
          <p className="font-playfair italic text-xl md:text-2xl mt-3 mb-6"
            style={{ color: 'rgba(232,201,126,0.7)' }}>
            From your doorstep in India to ownership in Dubai — end to end.
          </p>
          <div className="gold-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: feature list */}
          <div className={`flex flex-col gap-3 ${visible ? 'in-view-slide d-1' : 'opacity-0'}`}>
            {features.map((f) => (
              <div
                key={f.title}
                className={`rounded-2xl p-5 card-lift flex gap-4 ${f.gold ? 'glass-gold' : 'glass'}`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg,#C9A44A,#E8C97E)',
                      boxShadow: '0 0 12px rgba(201,164,74,0.4)',
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#060606" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  {f.badge && (
                    <span
                      className="inline-block mb-2 px-2 py-0.5 rounded-full font-dm-mono text-[0.52rem] tracking-widest uppercase"
                      style={{ background: 'rgba(201,164,74,0.18)', color: '#E8C97E', border: '1px solid rgba(201,164,74,0.3)' }}
                    >
                      {f.badge}
                    </span>
                  )}
                  <div
                    className="font-cinzel text-sm font-semibold tracking-wide mb-1"
                    style={{ color: f.gold ? '#E8C97E' : 'var(--text-h)' }}
                  >
                    {f.title}
                  </div>
                  <p className="font-outfit text-xs leading-relaxed"
                    style={{ color: 'var(--text-m)' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: sticky panel */}
          <div className={`flex flex-col gap-5 lg:sticky lg:top-28 ${visible ? 'in-view-fade-in d-2' : 'opacity-0'}`}>
            {/* Hero image */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ height: '300px', background: '#111', border: '1px solid rgba(201,164,74,0.18)' }}
            >
              <img
                src="https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?w=800&h=600&fit=crop&auto=format"
                alt="Burj Al Arab, Dubai"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.55) saturate(0.85)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top,rgba(6,6,6,0.92) 0%,transparent 55%)' }}
              />
              <div className="absolute bottom-5 left-6 right-6">
                <div className="section-label text-[0.55rem] mb-1">Included in your visit</div>
                <div className="font-cinzel text-lg font-semibold" style={{ color: 'var(--text-h)' }}>
                  Dubai's Finest Properties
                </div>
              </div>
            </div>

            {/* Refund guarantee */}
            <div
              className="glass-gold rounded-2xl p-6"
              style={{ border: '1px solid rgba(201,164,74,0.3)' }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center animate-pulse-g"
                  style={{
                    background: 'rgba(201,164,74,0.12)',
                    border: '1px solid rgba(201,164,74,0.35)',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <div>
                  <div className="font-cinzel text-sm font-semibold text-[#E8C97E] mb-2">Our Money-Back Guarantee</div>
                  <p className="font-outfit text-xs leading-relaxed"
                    style={{ color: 'var(--text-m)' }}>
                    Visit Dubai through the Parva Discovery Package and choose not to purchase —
                    we refund the full ₹10,00,000 minus only the actual flight cost.
                    Hotel, meals, transport, tours: <strong style={{ color: '#C9A44A' }}>all on Parva.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* 6-step mini journey */}
            <div className="glass rounded-2xl p-5" style={{ border: '1px solid var(--bg-card-sm)' }}>
              <div className="section-label text-[0.58rem] mb-4">How It Works</div>
              <div className="flex flex-col gap-0">
                {[
                  'Free Consultation Call',
                  'Pay ₹10L Refundable Deposit',
                  'Fly to Dubai',
                  'Tour & Select Your Property',
                  'Legal Formalities Completed',
                  'Begin Receiving Rental Income',
                ].map((s, i) => (
                  <div key={s} className="flex items-center gap-3 py-2.5 border-b border-[var(--bg-card-xs)] last:border-0">
                    <div
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center font-dm-mono text-[0.58rem] font-bold text-[#060606]"
                      style={{ background: 'linear-gradient(135deg,#C9A44A,#E8C97E)' }}
                    >
                      {i + 1}
                    </div>
                    <span className="font-outfit text-xs" style={{ color: 'var(--text-m)' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
