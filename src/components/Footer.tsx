import { useInView } from '../hooks/useInView'
import logoImg from '../imports/logo.png'

const links = {
  Properties: ['Downtown Dubai', 'Dubai Marina', 'Business Bay', 'Palm Jumeirah', 'JLT', 'Creek Harbour'],
  Services: ['Free Consultation', 'Dubai Visit Package', 'Legal Assistance', 'Property Management', 'Rental Services', 'Exit Advisory'],
  Company: ['About Parva', 'Our Team', 'Investor Club', 'Press & Media', 'Careers', 'Partner With Us'],
  Resources: ['Knowledge Hub', 'Investment Guide', 'ROI Calculator', 'Market Reports', 'FAQ', 'Contact'],
}

export default function Footer() {
  const { ref, visible } = useInView(0.05)

  return (
    <footer
      className="relative overflow-hidden pt-20 pb-10 px-6 sec-a"
      ref={ref}
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,164,74,0.5),transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className={`flex flex-col lg:flex-row gap-12 mb-14 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          {/* Brand */}
          <div className="lg:w-72 flex-shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
                style={{ background: '#000', boxShadow: '0 0 14px rgba(201,164,74,0.2)', border: '1px solid rgba(201,164,74,0.25)' }}
              >
                <img
                  src={logoImg}
                  alt="Parva Realty"
                  className="w-8 h-8 object-contain"
                  style={{ filter: 'brightness(1.15) contrast(1.1)', mixBlendMode: 'lighten' }}
                />
              </div>
              <div>
                <div className="font-cinzel text-base font-bold" style={{ color: 'var(--text-h)' }}>Parva Realty</div>
                <div className="font-dm-mono text-[0.5rem] tracking-widest uppercase" style={{ color: 'rgba(201,164,74,0.6)' }}>
                  Dubai Property Investment
                </div>
              </div>
            </div>
            <p className="font-outfit text-xs leading-relaxed mb-6" style={{ color: 'var(--text-m)' }}>
              India's most trusted gateway to Dubai real estate. Over 650 Indian investors. ₹500Cr+ in assets guided.
              Offices in Mumbai, Delhi and Dubai.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2.5 mb-6">
              <div className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.8" className="flex-shrink-0 mt-0.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13a19.8 19.8 0 01-3.07-8.67A2 2 0 012 2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <div>
                  <div className="font-outfit text-xs" style={{ color: 'var(--text-m)' }}>+971 4 272 6685</div>
                  <div className="font-dm-mono text-[0.48rem]" style={{ color: 'var(--text-ff)' }}>Landline</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.8" className="flex-shrink-0 mt-0.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                <div>
                  <div className="font-outfit text-xs" style={{ color: 'var(--text-m)' }}>+971 56 422 7855</div>
                  <div className="font-dm-mono text-[0.48rem]" style={{ color: 'var(--text-ff)' }}>Mobile</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.8" className="flex-shrink-0 mt-0.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <div>
                  <div className="font-outfit text-xs" style={{ color: 'var(--text-m)' }}>invest@parvarealty.ae</div>
                  <div className="font-dm-mono text-[0.48rem]" style={{ color: 'var(--text-ff)' }}>Email</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.8" className="flex-shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <div className="font-outfit text-xs leading-relaxed" style={{ color: 'var(--text-m)' }}>
                    Office 3404, Aspin Commercial Tower<br />Sheikh Zayed Road, Dubai, UAE
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {['Instagram', 'LinkedIn', 'YouTube'].map(s => (
                <div
                  key={s}
                  className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                  style={{ background: 'rgba(201,164,74,0.1)', border: '1px solid rgba(201,164,74,0.18)' }}
                  title={s}
                >
                  <span className="font-cinzel text-[0.5rem] font-bold" style={{ color: '#C9A44A' }}>
                    {s[0]}
                  </span>
                </div>
              ))}
              <a
                href="https://wa.me/971564227855?text=Hi%20Parva%2C%20I%27d%20like%20to%20know%20more%20about%20Dubai%20property%20investment"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)' }}
                title="WhatsApp"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(links).map(([col, items]) => (
              <div key={col}>
                <div className="section-label text-[0.58rem] mb-4">{col}</div>
                <div className="flex flex-col gap-2">
                  {items.map(item => (
                    <a
                      key={item}
                      href="#"
                      className="font-outfit text-xs transition-colors hover:opacity-100"
                      style={{ color: 'var(--text-m)' }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance badges */}
        <div
          className={`flex flex-wrap gap-3 mb-8 ${visible ? 'in-view-fade-up d-2' : 'opacity-0'}`}
        >
          {[
            'RERA Registered · UAE',
            'DED Licensed · Dubai',
            'RBI LRS Compliant',
            'FEMA Compliant',
          ].map(b => (
            <div
              key={b}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: 'var(--bg-card-xs)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#22A861" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="font-dm-mono text-[0.52rem]" style={{ color: 'var(--text-m)' }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-4 pt-6 ${visible ? 'in-view-fade-up d-3' : 'opacity-0'}`}
          style={{ borderTop: '1px solid var(--bg-card-sm)' }}
        >
          <div className="font-dm-mono text-[0.52rem]" style={{ color: 'var(--text-ff)' }}>
            © 2025 Parva Realty · RERA Reg. No. UAE/RERA/2024-0421 · CIN: U70200MH2022PTC387241
          </div>
          <div className="font-dm-mono text-[0.52rem]" style={{ color: 'var(--text-ff)' }}>
            Investment projections are illustrative and not guaranteed. Past performance is not indicative of future results.
          </div>
        </div>
      </div>
    </footer>
  )
}
