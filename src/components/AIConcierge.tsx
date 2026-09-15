import { useState, useRef, useEffect } from 'react'

type Msg = { from: 'user' | 'ai'; text: string }

const INITIAL: Msg[] = [
  { from: 'ai', text: "Namaste! I'm Parva AI — your personal Dubai property concierge. Ask me anything about investing, yields, legal requirements, or the Dubai Discovery package." },
]

const RESPONSES: Record<string, string> = {
  yield: "Prime Dubai zones currently deliver 8–10% gross rental yields — roughly 3× what you'd earn on a Mumbai apartment. Business Bay and JLT typically top the chart at 10%+.",
  tax: "Zero. Dubai levies no income tax on rental revenue, no capital gains tax, and no inheritance tax. You may owe applicable Indian income tax on declared foreign income, so consulting a CA is advisable.",
  start: "Our minimum investment is ₹25 Lakhs — that gets you a studio in JLT or Business Bay. We recommend beginning with a free consultation call, followed by the Dubai Discovery visit if you'd like to inspect properties in person.",
  visa: "Properties above AED 2 Million (roughly ₹4.5 Cr) qualify for UAE's 10-year Golden Visa — giving you the right to live, work and invest freely.",
  refund: "The ₹10,00,000 Discovery Deposit is fully refundable if you choose not to purchase after visiting Dubai. Only the actual flight cost is deducted — hotel, meals, transport, and tours are all covered by Parva.",
  default: "Great question. A Parva advisor can give you a personalised answer on that — shall I connect you, or would you like to book a free consultation?",
}

function getResponse(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('yield') || m.includes('return') || m.includes('rental')) return RESPONSES.yield
  if (m.includes('tax') || m.includes('taxe')) return RESPONSES.tax
  if (m.includes('start') || m.includes('minimum') || m.includes('begin') || m.includes('how much')) return RESPONSES.start
  if (m.includes('visa') || m.includes('golden')) return RESPONSES.visa
  if (m.includes('refund') || m.includes('deposit') || m.includes('money back')) return RESPONSES.refund
  return RESPONSES.default
}

export default function AIConcierge() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  function send() {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMsgs(m => [...m, { from: 'user', text }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, { from: 'ai', text: getResponse(text) }])
    }, 900)
  }

  return (
    <>
      {/* WhatsApp button */}
      <a
        href="https://wa.me/971564227855?text=Hi%20Parva%2C%20I%27d%20like%20to%20know%20more%20about%20Dubai%20property%20investment"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 right-5 z-40 flex items-center justify-center w-12 h-12 rounded-full transition-all hover:scale-110"
        style={{
          background: '#25D366',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
        }}
        title="Chat on WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M11.997 0C5.373 0 0 5.373 0 11.997c0 2.117.553 4.103 1.522 5.828L.057 23.998l6.338-1.661A11.944 11.944 0 0011.997 24C18.62 24 24 18.62 24 11.997 24 5.374 18.62 0 11.997 0zm0 21.818a9.818 9.818 0 01-5.003-1.369l-.359-.213-3.762.986 1.003-3.662-.234-.376A9.817 9.817 0 012.18 11.997c0-5.417 4.4-9.818 9.817-9.818 5.418 0 9.818 4.401 9.818 9.818 0 5.418-4.4 9.821-9.818 9.821z"/>
        </svg>
      </a>

      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-8 right-5 z-40 flex items-center justify-center w-12 h-12 rounded-full transition-all hover:scale-110"
        style={{
          background: open ? '#131313' : 'linear-gradient(135deg,#C9A44A,#E8C97E)',
          boxShadow: '0 4px 24px rgba(201,164,74,0.45)',
          border: '1px solid rgba(201,164,74,0.4)',
        }}
        title="AI Concierge"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A44A" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#060606" strokeWidth="1.8">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-40 w-80 md:w-96 rounded-2xl overflow-hidden flex flex-col"
          style={{
            maxHeight: '480px',
            background: 'rgba(13,12,10,0.97)',
            border: '1px solid rgba(201,164,74,0.25)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
            backdropFilter: 'blur(28px)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 p-4"
            style={{ borderBottom: '1px solid rgba(201,164,74,0.12)' }}
          >
            <div
              className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#C9A44A,#E8C97E)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#060606" strokeWidth="1.8">
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
            </div>
            <div>
              <div className="font-cinzel text-sm font-semibold" style={{ color: 'var(--text-h)' }}>Parva AI Concierge</div>
              <div className="font-outfit text-[0.58rem] flex items-center gap-1" style={{ color: '#22A861' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#22A861]" />
                Online · Responds instantly
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ minHeight: 0 }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-3 font-outfit text-xs leading-relaxed"
                  style={
                    m.from === 'user'
                      ? { background: 'rgba(201,164,74,0.15)', color: 'var(--text-h)', border: '1px solid rgba(201,164,74,0.25)', borderBottomRightRadius: '4px' }
                      : { background: 'var(--bg-card-xs)', color: 'var(--text-b)', border: '1px solid var(--border-subtle)', borderBottomLeftRadius: '4px' }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
                  style={{ background: 'var(--bg-card-xs)', border: '1px solid var(--border-subtle)' }}
                >
                  {[0, 1, 2].map(j => (
                    <div key={j}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: '#C9A44A',
                        animation: `pulseGold 1s ${j * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div
            className="px-4 pb-2 flex gap-2 flex-wrap"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            {['Rental yields?', 'How to start?', 'Visa info?'].map(q => (
              <button
                key={q}
                onClick={() => { setInput(q); }}
                className="mt-2 font-outfit text-[0.58rem] px-2.5 py-1 rounded-full transition-all"
                style={{ background: 'rgba(201,164,74,0.1)', color: '#C9A44A', border: '1px solid rgba(201,164,74,0.2)' }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            className="flex gap-2 p-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about Dubai investment..."
              className="flex-1 rounded-xl px-3 py-2.5 font-outfit text-xs"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-h)' }}
            />
            <button
              onClick={send}
              className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#C9A44A,#E8C97E)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#060606" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
