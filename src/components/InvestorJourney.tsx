import { useInView } from '../hooks/useInView'

const steps = [
  {
    num: '01',
    title: 'Free Consultation',
    period: 'Week 1',
    desc: 'Speak with a Parva senior advisor — no commitment, no pressure. We assess your goals, risk appetite, and ideal investment profile.',
    action: 'Book a call →',
    left: true,
  },
  {
    num: '02',
    title: 'Reserve with ₹10L Deposit',
    period: 'Week 1–2',
    desc: "Pay the fully refundable ₹10,00,000 discovery deposit to lock in your Dubai visit package — flights, hotel, transport, tours.",
    action: 'Reserve now →',
    left: false,
  },
  {
    num: '03',
    title: 'Fly to Dubai',
    period: 'Week 2–4',
    desc: 'Parva arranges and pays for your return flights for you and a companion from your nearest major Indian city.',
    action: 'See package →',
    left: true,
  },
  {
    num: '04',
    title: 'Curated Property Tour',
    period: 'Day 1–2 in Dubai',
    desc: 'Tour 8–12 pre-vetted properties matched to your profile. Visit showrooms, speak with developers, inspect neighbourhoods.',
    action: 'See zones →',
    left: false,
  },
  {
    num: '05',
    title: 'Legal Completion',
    period: 'Day 2–3 in Dubai',
    desc: 'Sign the Sale & Purchase Agreement with our RERA-registered legal team. KYC, title deed and POA handled end-to-end.',
    action: 'Learn more →',
    left: true,
  },
  {
    num: '06',
    title: 'Wealth Growth Begins',
    period: 'From Month 1',
    desc: 'Rental income credited monthly. Annual portfolio reviews. Appreciation tracked. Exit or grow at Year 3 — entirely your choice.',
    action: 'See returns →',
    left: false,
  },
]

export default function InvestorJourney() {
  const { ref, visible } = useInView()

  return (
    <div
      className="py-28 px-6 relative overflow-hidden sec-grad-ab"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-18 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">From Decision to Ownership</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-3">Your Investor Journey</h2>
          <p className="font-playfair italic text-xl mt-3 mb-6" style={{ color: 'rgba(232,201,126,0.7)' }}>
            Six steps. Six weeks. A lifetime of passive income.
          </p>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — left-aligned on mobile, center on desktop */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: '27px',
              background: 'linear-gradient(to bottom,rgba(201,164,74,0.5),rgba(201,164,74,0.08))',
            }}
          />
          <div
            className="hidden md:block absolute top-0 bottom-0 w-px left-1/2 -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom,rgba(201,164,74,0.5),rgba(201,164,74,0.08))' }}
          />

          <div className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`${visible ? `in-view-fade-up d-${i + 1}` : 'opacity-0'}`}
              >
                {/* Mobile layout — always left-aligned */}
                <div className="flex items-start gap-4 md:hidden">
                  <div
                    className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center font-cinzel text-base font-bold z-10"
                    style={{
                      background: 'linear-gradient(135deg,#C9A44A,#E8C97E)',
                      color: '#060606',
                      boxShadow: '0 0 20px rgba(201,164,74,0.35)',
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="glass card-lift rounded-2xl p-5 flex-1">
                    <div className="section-label text-[0.55rem] mb-1.5">{s.period}</div>
                    <h3 className="font-cinzel text-sm font-bold mb-2" style={{ color: 'var(--text-h)' }}>{s.title}</h3>
                    <p className="font-outfit text-sm leading-relaxed" style={{ color: 'var(--text-m)' }}>{s.desc}</p>
                    <button
                      className="font-cinzel text-xs mt-3 text-gradient-gold hover:opacity-80 transition-opacity"
                      onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      {s.action}
                    </button>
                  </div>
                </div>

                {/* Desktop layout — alternating left/right */}
                <div className="hidden md:flex items-center gap-0">
                  <div className={`flex-1 ${s.left ? 'text-right pr-12' : ''}`}>
                    {s.left ? (
                      <div className="glass card-lift rounded-2xl p-6 ml-auto max-w-[340px]">
                        <div className="section-label text-[0.55rem] mb-2">{s.period}</div>
                        <h3 className="font-cinzel text-base font-bold mb-2" style={{ color: 'var(--text-h)' }}>{s.title}</h3>
                        <p className="font-outfit text-sm leading-relaxed" style={{ color: 'var(--text-m)' }}>{s.desc}</p>
                        <button
                          className="font-cinzel text-xs mt-3 text-gradient-gold hover:opacity-80 transition-opacity"
                          onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
                        >{s.action}</button>
                      </div>
                    ) : <div />}
                  </div>
                  <div
                    className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center font-cinzel text-base font-bold z-10"
                    style={{
                      background: 'linear-gradient(135deg,#C9A44A,#E8C97E)',
                      color: '#060606',
                      boxShadow: '0 0 24px rgba(201,164,74,0.4)',
                    }}
                  >{s.num}</div>
                  <div className={`flex-1 pl-12`}>
                    {!s.left ? (
                      <div className="glass card-lift rounded-2xl p-6 max-w-[340px]">
                        <div className="section-label text-[0.55rem] mb-2">{s.period}</div>
                        <h3 className="font-cinzel text-base font-bold mb-2" style={{ color: 'var(--text-h)' }}>{s.title}</h3>
                        <p className="font-outfit text-sm leading-relaxed" style={{ color: 'var(--text-m)' }}>{s.desc}</p>
                        <button
                          className="font-cinzel text-xs mt-3 text-gradient-gold hover:opacity-80 transition-opacity"
                          onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
                        >{s.action}</button>
                      </div>
                    ) : <div />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div
          className={`mt-16 text-center ${visible ? 'in-view-scale d-8' : 'opacity-0'}`}
        >
          <p className="font-playfair italic text-lg mb-6" style={{ color: 'rgba(232,201,126,0.6)' }}>
            Ready to start your journey?
          </p>
          <button
            className="btn-gold"
            onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Begin with a Free Consultation
          </button>
        </div>
      </div>
    </div>
  )
}
