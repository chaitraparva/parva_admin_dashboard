import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const instruments = [
  { id: 'dubai', label: 'Dubai Real Estate', yield: 10, apprec: 10, color: '#C9A44A', desc: 'via Parva' },
  { id: 'fd', label: 'Fixed Deposit', yield: 7, apprec: 0, color: '#4A9ED4', desc: 'SBI 2-yr FD' },
  { id: 'mf', label: 'Mutual Funds', yield: 0, apprec: 13, color: '#A78BFA', desc: 'NIFTY 50 Index avg' },
  { id: 'india', label: 'Indian Real Estate', yield: 2.5, apprec: 6, color: '#F97316', desc: 'Tier-1 city avg' },
]

const years = [1, 3, 5, 10]

function compound(principal: number, ratePercent: number, n: number) {
  return principal * Math.pow(1 + ratePercent / 100, n)
}

export default function ROICalculator() {
  const { ref, visible } = useInView()
  const [amount, setAmount] = useState(50)
  const [period, setPeriod] = useState(3)

  const principal = amount * 100000

  const results = instruments.map(ins => {
    const total = compound(principal, ins.yield + ins.apprec, period)
    return { ...ins, total, gain: total - principal }
  })
  const maxTotal = Math.max(...results.map(r => r.total))
  const dubaiResult = results.find(r => r.id === 'dubai')!

  return (
    <div
      className="py-28 px-6 sec-grad-ab"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-14 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
          <div className="section-label mb-5">Wealth Comparison Engine</div>
          <h2 className="section-heading text-4xl md:text-6xl mb-3">ROI Calculator</h2>
          <p className="font-playfair italic text-xl mt-3 mb-6" style={{ color: 'rgba(232,201,126,0.7)' }}>
            See what your capital could earn — across every investment class.
          </p>
          <div className="gold-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Controls */}
          <div className={`lg:col-span-2 flex flex-col gap-6 ${visible ? 'in-view-slide d-1' : 'opacity-0'}`}>
            <div className="glass rounded-2xl p-7">
              <div className="section-label text-[0.58rem] mb-4">Investment Amount</div>
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <span className="font-cinzel text-3xl font-bold text-gradient-gold">
                    ₹{amount} Lakhs
                  </span>
                  <span className="font-dm-mono text-xs self-end" style={{ color: 'var(--text-f)' }}>
                    ₹25L – ₹500L
                  </span>
                </div>
                <input
                  type="range" min="25" max="500" step="25" value={amount}
                  onChange={e => setAmount(+e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between font-dm-mono text-[0.52rem] mt-1"
                  style={{ color: 'var(--text-ff)' }}>
                  <span>₹25L</span><span>₹500L</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-6">
                {[25, 50, 100, 200].map(v => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className="py-2 rounded-xl font-dm-mono text-[0.62rem] font-semibold transition-all"
                    style={{
                      background: amount === v ? 'rgba(201,164,74,0.18)' : 'var(--bg-card-sm)',
                      border: amount === v ? '1px solid rgba(201,164,74,0.35)' : '1px solid var(--bg-card-sm)',
                      color: amount === v ? '#C9A44A' : 'var(--text-m)',
                    }}
                  >
                    ₹{v}L
                  </button>
                ))}
              </div>

              <div className="section-label text-[0.58rem] mb-3">Investment Horizon</div>
              <div className="grid grid-cols-4 gap-2">
                {years.map(y => (
                  <button
                    key={y}
                    onClick={() => setPeriod(y)}
                    className="py-2.5 rounded-xl font-dm-mono text-[0.62rem] font-semibold transition-all"
                    style={{
                      background: period === y ? 'rgba(201,164,74,0.18)' : 'var(--bg-card-sm)',
                      border: period === y ? '1px solid rgba(201,164,74,0.35)' : '1px solid var(--bg-card-sm)',
                      color: period === y ? '#C9A44A' : 'var(--text-m)',
                    }}
                  >
                    {y}Y
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-gold rounded-2xl p-6" style={{ border: '1px solid rgba(201,164,74,0.28)' }}>
              <div className="section-label text-[0.55rem] mb-2">Parva Dubai Projection</div>
              <div className="font-cinzel text-3xl font-bold text-gradient-gold mb-1">
                ₹{(dubaiResult.total / 100000).toFixed(1)}L
              </div>
              <div className="font-outfit text-sm mb-4" style={{ color: 'var(--text-m)' }}>
                from ₹{amount}L over {period} year{period > 1 ? 's' : ''}
              </div>
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl p-3 text-center" style={{ background: 'rgba(201,164,74,0.1)' }}>
                  <div className="font-cinzel text-base font-bold" style={{ color: '#E8C97E' }}>
                    ₹{(dubaiResult.gain / 100000).toFixed(1)}L
                  </div>
                  <div className="font-dm-mono text-[0.5rem] mt-0.5" style={{ color: 'var(--text-f)' }}>Total Gain</div>
                </div>
                <div className="flex-1 rounded-xl p-3 text-center" style={{ background: 'rgba(34,168,97,0.1)' }}>
                  <div className="font-cinzel text-base font-bold" style={{ color: '#22A861' }}>
                    {((dubaiResult.gain / principal) * 100).toFixed(0)}%
                  </div>
                  <div className="font-dm-mono text-[0.5rem] mt-0.5" style={{ color: 'var(--text-f)' }}>ROI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div className={`lg:col-span-3 glass rounded-2xl p-7 flex flex-col gap-6 ${visible ? 'in-view-fade-in d-2' : 'opacity-0'}`}>
            <div className="section-label text-[0.58rem]">Comparison at {period} Year{period > 1 ? 's' : ''}</div>
            <div className="flex flex-col gap-6 flex-1 justify-center">
              {results.map((r, ri) => (
                <div key={r.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-cinzel text-sm font-semibold" style={{ color: 'var(--text-h)' }}>{r.label}</span>
                      <span className="font-dm-mono text-[0.52rem] ml-2" style={{ color: 'var(--text-f)' }}>{r.desc}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-cinzel text-base font-bold" style={{ color: r.color }}>
                        ₹{(r.total / 100000).toFixed(1)}L
                      </div>
                      <div className="font-dm-mono text-[0.5rem]" style={{ color: 'var(--text-f)' }}>
                        +₹{(r.gain / 100000).toFixed(1)}L ({((r.gain / principal) * 100).toFixed(0)}%)
                      </div>
                    </div>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-card-sm)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: visible ? `${(r.total / maxTotal) * 100}%` : '0%',
                        background: r.id === 'dubai' ? 'linear-gradient(90deg,#C9A44A,#E8C97E)' : r.color,
                        transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${ri * 0.12}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-4"
              style={{ background: 'var(--bg-card-xs)', border: '1px solid var(--bg-card-sm)' }}
            >
              <div className="section-label text-[0.5rem] mb-2">Assumptions</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {instruments.map(ins => (
                  <div key={ins.id} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ins.color }} />
                    <div>
                      <div className="font-dm-mono text-[0.5rem] font-semibold" style={{ color: ins.color }}>
                        {ins.yield + ins.apprec}% p.a.
                      </div>
                      <div className="font-dm-mono text-[0.45rem]" style={{ color: 'var(--text-f)' }}>
                        {ins.label.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-outfit text-[0.5rem] mt-2" style={{ color: 'var(--text-ff)' }}>
                Projections are illustrative. Dubai: 10% rental + 10% appreciation. Past performance not indicative of future results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
