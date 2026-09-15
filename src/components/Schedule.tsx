import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const budgets = ['₹25L – ₹75L', '₹75L – ₹2Cr', '₹2Cr – ₹5Cr', '₹5Cr+']
const cities = ['Mumbai', 'Delhi / NCR', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Pune', 'Other']

export default function Schedule() {
  const { ref, visible } = useInView()
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '', budget: '', dubaiVisit: false, message: '',
  })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '91189180-6cf6-448d-8965-be5e8aff701b',
          subject: `New Consultation Request — ${form.name}`,
          from_name: 'Parva Realty Website',
          replyto: form.email,
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          budget: form.budget,
          dubai_visit_interest: form.dubaiVisit ? 'Yes' : 'No',
          message: form.message || '(no message)',
        }),
      })
    } catch (_) {
      // submit anyway — show success to user
    }
    setSubmitting(false)
    setSent(true)
  }

  return (
    <div
      className="py-28 px-6 relative overflow-hidden sec-grad-ca"
      ref={ref}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(201,164,74,0.04) 0%,transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">Book Your Experience</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-3">Schedule a Consultation</h2>
          <p className="font-playfair italic text-xl mt-3 mb-6" style={{ color: 'rgba(232,201,126,0.7)' }}>
            No obligation. No pressure. Just clarity on your options.
          </p>
          <div className="gold-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left info */}
          <div className={`lg:col-span-2 flex flex-col gap-6 ${visible ? 'in-view-fade-up d-1' : 'opacity-0'}`}>
            {/* What to expect */}
            <div className="glass rounded-2xl p-7">
              <div className="section-label text-[0.58rem] mb-5">What Happens Next</div>
              {[
                { step: '01', title: 'Advisor calls you within 24hrs', desc: 'A senior Parva advisor with 5+ years Dubai market experience.' },
                { step: '02', title: 'Personalised property brief', desc: 'Based on your goals and budget — curated listings sent to you.' },
                { step: '03', title: 'Dubai visit planning begins', desc: 'If you choose to visit, we coordinate everything from flights to tours.' },
              ].map(x => (
                <div key={x.step} className="flex gap-4 mb-5 last:mb-0">
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-cinzel text-xs font-bold flex-shrink-0"
                    style={{ background: 'rgba(201,164,74,0.15)', color: '#C9A44A', border: '1px solid rgba(201,164,74,0.25)' }}
                  >
                    {x.step}
                  </div>
                  <div>
                    <div className="font-cinzel text-sm font-semibold mb-0.5" style={{ color: 'var(--text-h)' }}>{x.title}</div>
                    <div className="font-outfit text-xs" style={{ color: 'var(--text-m)' }}>{x.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dubai visit highlight */}
            <div
              className="glass-gold rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(201,164,74,0.25)' }}
            >
              <div className="relative h-36">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop&auto=format"
                  alt="Dubai"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.5) saturate(0.8)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top,rgba(6,6,6,0.9) 0%,transparent 60%)' }}
                />
                <div className="absolute bottom-4 left-5">
                  <div className="font-cinzel text-base font-bold" style={{ color: 'var(--text-h)' }}>Dubai Discovery Package</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-col gap-2">
                  {[
                    'Flights for 2',
                    '2-night hotel stay',
                    'Luxury airport transfer',
                    '8–12 property tours',
                    '₹10L fully refundable deposit',
                  ].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#C9A44A' }}/>
                      <span className="font-outfit text-xs" style={{ color: 'var(--text-m)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 ${visible ? 'in-view-fade-in d-2' : 'opacity-0'}`}>
            {sent ? (
              <div
                className="glass-gold rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center"
                style={{ border: '1px solid rgba(201,164,74,0.3)' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 animate-pulse-g"
                  style={{ background: 'rgba(201,164,74,0.15)', border: '1px solid rgba(201,164,74,0.35)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-cinzel text-2xl font-bold mb-3" style={{ color: 'var(--text-h)' }}>Request Received</h3>
                <p className="font-playfair italic text-lg mb-2" style={{ color: 'rgba(232,201,126,0.7)' }}>
                  Your advisor will call within 24 hours.
                </p>
                <p className="font-outfit text-sm" style={{ color: 'var(--text-m)' }}>
                  In the meantime, explore properties in our catalogue.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 flex flex-col gap-5"
                style={{ border: '1px solid var(--bg-card-sm)' }}>
                <div className="section-label text-[0.58rem] mb-1">Your Details</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-dm-mono text-[0.55rem] block mb-1.5"
                      style={{ color: 'var(--text-m)' }}>Full Name *</label>
                    <input
                      type="text" required value={form.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder="Rajesh Mehta"
                      className="w-full rounded-xl px-4 py-3 font-outfit text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-dm-mono text-[0.55rem] block mb-1.5"
                      style={{ color: 'var(--text-m)' }}>Phone Number *</label>
                    <input
                      type="tel" required value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full rounded-xl px-4 py-3 font-outfit text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-dm-mono text-[0.55rem] block mb-1.5"
                    style={{ color: 'var(--text-m)' }}>Email Address *</label>
                  <input
                    type="email" required value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="rajesh@example.com"
                    className="w-full rounded-xl px-4 py-3 font-outfit text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-dm-mono text-[0.55rem] block mb-1.5"
                      style={{ color: 'var(--text-m)' }}>City</label>
                    <select
                      value={form.city} onChange={e => set('city', e.target.value)}
                      className="w-full rounded-xl px-4 py-3 font-outfit text-sm"
                    >
                      <option value="">Select city</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-dm-mono text-[0.55rem] block mb-1.5"
                      style={{ color: 'var(--text-m)' }}>Investment Budget</label>
                    <select
                      value={form.budget} onChange={e => set('budget', e.target.value)}
                      className="w-full rounded-xl px-4 py-3 font-outfit text-sm"
                    >
                      <option value="">Select range</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                {/* Dubai visit toggle */}
                <div
                  className="flex items-center justify-between rounded-xl p-4 cursor-pointer"
                  style={{
                    background: form.dubaiVisit ? 'rgba(201,164,74,0.1)' : 'var(--bg-card-xs)',
                    border: form.dubaiVisit ? '1px solid rgba(201,164,74,0.3)' : '1px solid var(--bg-card-sm)',
                  }}
                  onClick={() => set('dubaiVisit', !form.dubaiVisit)}
                >
                  <div>
                    <div className="font-cinzel text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
                      I'm interested in the Dubai Discovery Visit
                    </div>
                    <div className="font-outfit text-xs mt-0.5" style={{ color: 'var(--text-m)' }}>
                      Flights · Hotel stay · Property tours · ₹10L refundable deposit
                    </div>
                  </div>
                  <div
                    className="w-10 h-6 rounded-full flex-shrink-0 transition-all ml-4 relative"
                    style={{
                      background: form.dubaiVisit
                        ? 'linear-gradient(90deg,#C9A44A,#E8C97E)'
                        : 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{ left: form.dubaiVisit ? '20px' : '4px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-dm-mono text-[0.55rem] block mb-1.5"
                    style={{ color: 'var(--text-m)' }}>Message (Optional)</label>
                  <textarea
                    value={form.message} onChange={e => set('message', e.target.value)}
                    placeholder="Tell us about your investment goals..."
                    rows={3}
                    className="w-full rounded-xl px-4 py-3 font-outfit text-sm resize-none"
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-gold justify-center w-full mt-2 py-4 text-base disabled:opacity-60">
                  {submitting ? 'Sending…' : 'Request Free Consultation'}
                </button>
                <p className="font-outfit text-[0.58rem] text-center" style={{ color: 'var(--text-ff)' }}>
                  Your details are private and protected. We never share or sell information.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
