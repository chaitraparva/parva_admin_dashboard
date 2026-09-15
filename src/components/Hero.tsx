import { useEffect, useState } from 'react'

const stats = [
  { value: '₹500Cr+', label: 'Assets Under Guidance' },
  { value: '650+',    label: 'Indian Investors'       },
  { value: '9.4%',   label: 'Avg. Annual Yield'      },
  { value: '0',       label: 'Disputed Transactions'  },
]

const ticker = [
  '🏙 Downtown Dubai · Studio from ₹68L · 9.1% yield',
  '🌊 Dubai Marina · 2BR from ₹1.2Cr · 8.9% yield',
  '💼 Business Bay · 1BR from ₹54L · 10.1% yield',
  '🌴 Palm Jumeirah · Villa from ₹4.8Cr · 7.2% yield',
  '🌆 Creek Harbour · 2BR from ₹98L · 9.4% yield',
  '✨ DIFC Residences · 2BR from ₹1.8Cr · 8.4% yield',
]

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#040404]">

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1462007895615-c8c073bebcd8?w=1920&h=1080&fit=crop&auto=format"
          alt="Dubai skyline at night"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.38) saturate(0.75)', transform: 'scale(1.04)' }}
        />
        <div className="hero-overlay absolute inset-0" />
        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 40%, transparent 20%, rgba(6,6,6,0.6) 100%)' }}
        />
      </div>

      {/* Cinematic scan line */}
      <div
        className="absolute inset-x-0 h-px pointer-events-none z-20"
        style={{
          background: 'linear-gradient(90deg,transparent,rgba(201,164,74,0.6),transparent)',
          animation: 'scanLine 8s ease-in-out infinite',
          top: 0,
        }}
      />

      {/* Gold horizontal accent */}
      <div
        className="absolute top-[72px] inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(201,164,74,0.12) 30%,rgba(201,164,74,0.12) 70%,transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 pt-28 pb-44">

        {/* Eyebrow label */}
        <div
          className={`section-label mb-7 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          Exclusive Investment Platform &nbsp;·&nbsp; Dubai &nbsp;·&nbsp; Est. 2021
        </div>

        {/* Main headline – Cinzel for brand weight */}
        <h1
          className="section-heading leading-[1.06] mb-3"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 6rem)' }}
        >
          <span
            className={`block transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.2s', color: '#F0EBE0' }}
          >
            Own Premium
          </span>
          <span
            className={`block animate-shimmer-text transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.35s' }}
          >
            Dubai Real Estate
          </span>
        </h1>

        {/* Editorial sub – Playfair italic */}
        <p
          className={`font-playfair italic transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
            color: 'rgba(232,201,126,0.85)',
            transitionDelay: '0.5s',
            letterSpacing: '0.02em',
          }}
        >
          Starting from <strong style={{ fontStyle: 'normal', color: '#E8C97E' }}>₹25 Lakhs</strong> &nbsp;·&nbsp; Tax-Free &nbsp;·&nbsp; Up to 10% Annual Returns
        </p>

        {/* Body copy */}
        <p
          className={`font-outfit text-sm md:text-base max-w-lg mt-4 mb-10 leading-relaxed transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ color: 'rgba(221,217,210,0.5)', transitionDelay: '0.62s' }}
        >
          A complete concierge experience — from your doorstep in India to ownership in Dubai.
          Flights, hotel stay, curated tours and a money-back guarantee.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.75s' }}
        >
          <button className="btn-gold" onClick={() => scrollTo('#properties')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
            Explore Properties
          </button>
          <button className="btn-outline-gold" onClick={() => scrollTo('#consultation')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Talk to an Expert
          </button>
        </div>

        {/* Trust badges */}
        <div
          className={`flex items-center gap-5 mt-10 transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '0.9s' }}
        >
          {['RERA Certified', 'Emaar Partner', 'DAMAC Approved', '650+ Investors'].map(b => (
            <div key={b} className="flex items-center gap-1.5">
              <div
                className="w-1 h-1 rounded-full"
                style={{ background: '#C9A44A', boxShadow: '0 0 6px rgba(201,164,74,0.8)' }}
              />
              <span className="font-dm-mono text-[0.55rem] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(221,217,210,0.38)' }}>
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="relative z-10 border-t"
        style={{
          background: 'rgba(6,6,6,0.78)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderColor: 'rgba(201,164,74,0.12)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(255,255,255,0.05)]">
            {stats.map((s, i) => (
              <div
                key={s.value}
                className={`flex flex-col items-center py-5 px-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: `${0.9 + i * 0.1}s` }}
              >
                <div className="font-cinzel text-2xl md:text-3xl font-semibold text-gradient-gold">{s.value}</div>
                <div className="section-label text-[0.55rem] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live ticker */}
      <div
        className="relative z-10 overflow-hidden py-2.5"
        style={{ background: 'rgba(201,164,74,0.04)', borderTop: '1px solid rgba(201,164,74,0.08)' }}
      >
        <div className="animate-ticker flex gap-16 whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="font-dm-mono text-[0.62rem] tracking-wider"
              style={{ color: 'rgba(201,164,74,0.6)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollTo('#why-dubai')}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 animate-float flex flex-col items-center gap-2 group"
        style={{ opacity: loaded ? 0.45 : 0, transition: 'opacity 1s 1.2s' }}
      >
        <span className="font-dm-mono text-[0.52rem] tracking-[0.25em] uppercase text-[#C9A44A] group-hover:opacity-100">Scroll</span>
        <div
          className="w-6 h-10 rounded-full border border-[rgba(201,164,74,0.4)] flex items-start justify-center pt-2"
        >
          <div
            className="w-1 h-2 rounded-full bg-[#C9A44A]"
            style={{ animation: 'fadeUp 1.5s ease-in-out infinite' }}
          />
        </div>
      </button>
    </div>
  )
}
