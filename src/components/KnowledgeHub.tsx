import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { downloadInvestorGuide } from '../lib/downloadGuide'
import { articles, type Article } from '../data/articles'
import ArticleModal from './ArticleModal'

const faqs = [
  {
    q: "Can Indian citizens legally own property in Dubai?",
    a: "Yes. The UAE allows full freehold ownership for foreign nationals in designated zones. Indian investors use the RBI's Liberalised Remittance Scheme (LRS) to send up to $250,000 per year for property purchase — entirely legal.",
  },
  {
    q: "Is rental income taxable in India?",
    a: "Rental income from overseas property must be declared in your Indian tax return as income from other sources. However, Dubai levies no local taxes — you only pay applicable Indian taxes on declared income. Consult a CA for TDS implications.",
  },
  {
    q: "What happens if I visit Dubai and don't buy?",
    a: "You receive a full refund of your ₹10,00,000 discovery deposit minus only the actual cost of your flights. Hotel, meals, transport, and tours are entirely covered by Parva regardless of outcome.",
  },
  {
    q: "How does the 3-year buyback option work?",
    a: "Selected properties are offered with a developer or Parva-backed buyback guarantee at a pre-agreed price at the 3-year mark. This gives you a guaranteed exit if circumstances change — terms are documented in the SPA.",
  },
  {
    q: "Who manages my property after I buy?",
    a: "Parva's Dubai-based property management team handles tenant sourcing, rent collection, maintenance coordination, and regulatory compliance (EJARI registration). A monthly statement is shared with you digitally.",
  },
  {
    q: "Do I need to visit Dubai to complete the purchase?",
    a: "A visit is strongly recommended and is the purpose of our Discovery Package. However, remote purchase is possible via Power of Attorney. Our legal team can handle the full transaction digitally for investors with specific constraints.",
  },
]

export default function KnowledgeHub() {
  const { ref, visible } = useInView()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openArticle, setOpenArticle] = useState<Article | null>(null)
  const [showDownload, setShowDownload] = useState(false)
  const [dlForm, setDlForm] = useState({ name: '', email: '', phone: '' })
  const [dlSent, setDlSent] = useState(false)
  const [dlSubmitting, setDlSubmitting] = useState(false)
  const setDl = (k: string, v: string) => setDlForm(f => ({ ...f, [k]: v }))

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault()
    if (!dlForm.name || !dlForm.email.includes('@')) return
    setDlSubmitting(true)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '91189180-6cf6-448d-8965-be5e8aff701b',
          subject: `Guide Download Request — ${dlForm.name}`,
          from_name: 'Parva Realty Website',
          replyto: dlForm.email,
          name: dlForm.name,
          email: dlForm.email,
          phone: dlForm.phone || '(not provided)',
          request_type: 'Indian Investor Guide Download',
        }),
      })
    } catch (_) {
      // show success regardless
    }
    // trigger PDF download
    try {
      await downloadInvestorGuide(dlForm.name)
    } catch (_) {
      // download failure is non-fatal
    }
    setDlSubmitting(false)
    setDlSent(true)
  }

  return (
    <>
    <div
      className="py-28 px-6 sec-grad-ab"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">Education First</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-3">Investor Knowledge Hub</h2>
          <p className="font-playfair italic text-xl mt-3 mb-6" style={{ color: 'rgba(232,201,126,0.7)' }}>
            Make the most informed investment decision of your life.
          </p>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {articles.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setOpenArticle(a)}
              className={`glass card-lift rounded-2xl overflow-hidden flex flex-col cursor-pointer group text-left ${visible ? `in-view-fade-up d-${i + 1}` : 'opacity-0'}`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={a.img} alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: 'brightness(0.6) saturate(0.8)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top,rgba(6,6,6,0.7) 0%,transparent 60%)' }}
                />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full font-dm-mono text-[0.52rem] tracking-wide uppercase"
                  style={{ background: 'rgba(201,164,74,0.85)', color: '#060606' }}
                >
                  {a.tag}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="font-cinzel text-sm font-semibold leading-snug" style={{ color: 'var(--text-h)' }}>
                  {a.title}
                </h3>
                <p className="font-outfit text-xs leading-relaxed flex-1" style={{ color: 'var(--text-m)' }}>
                  {a.excerpt}
                </p>
                <div className="flex items-center justify-between pt-2"
                  style={{ borderTop: '1px solid var(--bg-card-sm)' }}>
                  <span className="font-dm-mono text-[0.52rem]" style={{ color: 'var(--text-f)' }}>{a.mins}</span>
                  <span className="font-cinzel text-[0.6rem] text-gradient-gold group-hover:opacity-70 transition-opacity">
                    Read Article →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Download guide CTA */}
        <div
          className={`glass-gold rounded-2xl p-8 mb-14 flex flex-col md:flex-row items-center gap-6 justify-between ${visible ? 'in-view-scale d-4' : 'opacity-0'}`}
          style={{ border: '1px solid rgba(201,164,74,0.22)' }}
        >
          <div>
            <div className="section-label text-[0.58rem] mb-2">Free Download</div>
            <div className="font-cinzel text-xl md:text-2xl font-bold mb-1" style={{ color: 'var(--text-h)' }}>
              The Indian Investor's Guide to Dubai Real Estate
            </div>
            <div className="font-outfit text-sm" style={{ color: 'var(--text-m)' }}>
              23-page comprehensive guide · Legal, financial, and market intelligence
            </div>
          </div>
          <button className="btn-gold flex-shrink-0" onClick={() => { setShowDownload(true); setDlSent(false) }}>
            Download Free Guide
          </button>
        </div>

        {/* FAQ */}
        <div className={`${visible ? 'in-view-fade-up d-5' : 'opacity-0'}`}>
          <div className="section-label text-[0.58rem] text-center mb-8">Frequently Asked Questions</div>
          <div className="flex flex-col gap-3 max-w-3xl mx-auto">
            {faqs.map((f, i) => (
              <div
                key={f.q}
                className="glass rounded-xl overflow-hidden"
                style={{ border: '1px solid var(--bg-card-sm)' }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 transition-all"
                  style={{
                    background: openFaq === i ? 'rgba(201,164,74,0.06)' : 'transparent',
                  }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-cinzel text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
                    {f.q}
                  </span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#C9A44A" strokeWidth="2"
                    className="flex-shrink-0 transition-transform"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="font-outfit text-sm leading-relaxed" style={{ color: 'var(--text-m)' }}>
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Download guide modal */}
    {openArticle && (
      <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
    )}

    {showDownload && (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: 'rgba(6,6,6,0.88)', backdropFilter: 'blur(12px)' }}
        onClick={e => { if (e.target === e.currentTarget) setShowDownload(false) }}
      >
        <div className="relative w-full max-w-md rounded-3xl p-8"
          style={{ background: 'linear-gradient(180deg,#111009 0%,#0a0a09 100%)', border: '1px solid rgba(201,164,74,0.25)', boxShadow: '0 40px 120px rgba(0,0,0,0.8)' }}>
          <button onClick={() => setShowDownload(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-m)" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {dlSent ? (
            <div className="text-center flex flex-col items-center gap-5 py-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(34,168,97,0.15)', border: '1.5px solid rgba(34,168,97,0.3)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22A861" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold mb-2" style={{ color: 'var(--text-h)' }}>Your Guide is Downloading</h3>
                <p className="font-outfit text-sm leading-relaxed" style={{ color: 'var(--text-m)' }}>
                  The 23-page <strong style={{ color: '#C9A44A' }}>Indian Investor's Guide to Dubai Real Estate</strong> has been downloaded to your device. A Parva advisor will also follow up at <strong style={{ color: '#C9A44A' }}>{dlForm.email}</strong> with personalised insights.
                </p>
              </div>
                    <button onClick={() => setShowDownload(false)} className="btn-outline-gold">Close</button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="section-label text-[0.58rem] mb-2">Free Download</div>
                <h3 className="font-cinzel text-xl font-bold mb-1" style={{ color: 'var(--text-h)' }}>
                  The Indian Investor's Guide to Dubai Real Estate
                </h3>
                <p className="font-outfit text-sm" style={{ color: 'var(--text-m)' }}>
                  23 pages · Legal, financial &amp; market intelligence · Downloads instantly to your device
                </p>
              </div>
              <form onSubmit={handleDownload} className="flex flex-col gap-4">
                <div>
                  <label className="block font-dm-mono text-[0.58rem] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-f)' }}>Full Name *</label>
                  <input type="text" value={dlForm.name} onChange={e => setDl('name', e.target.value)} placeholder="Arjun Sharma" required />
                </div>
                <div>
                  <label className="block font-dm-mono text-[0.58rem] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-f)' }}>Email Address *</label>
                  <input type="email" value={dlForm.email} onChange={e => setDl('email', e.target.value)} placeholder="arjun@email.com" required />
                </div>
                <div>
                  <label className="block font-dm-mono text-[0.58rem] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-f)' }}>Phone (Optional)</label>
                  <input type="tel" value={dlForm.phone} onChange={e => setDl('phone', e.target.value)} placeholder="+91 98765 43210" />
                </div>
                <button type="submit" disabled={dlSubmitting} className="btn-gold justify-center mt-2 disabled:opacity-60">
                  {dlSubmitting ? 'Preparing Guide…' : 'Download the Free Guide'}
                </button>
                <p className="text-center font-outfit text-[0.62rem]" style={{ color: 'var(--text-ff)' }}>
                  No spam. Unsubscribe anytime. Your details are never sold.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    )}
    </>
  )
}
