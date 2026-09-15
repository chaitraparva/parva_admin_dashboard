import { useEffect } from 'react'
import type { Article, ArticleSection } from '../data/articles'

function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl p-4 text-center"
          style={{ background: 'rgba(201,164,74,0.07)', border: '1px solid rgba(201,164,74,0.18)' }}
        >
          <div className="font-cinzel text-2xl font-bold mb-1" style={{ color: '#C9A44A' }}>{s.value}</div>
          <div className="font-outfit text-xs leading-snug" style={{ color: '#9A8D7E' }}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <table className="w-full text-left min-w-[480px]">
        <thead>
          <tr style={{ background: 'rgba(201,164,74,0.1)' }}>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-outfit text-xs font-bold uppercase tracking-wider" style={{ color: '#C9A44A' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.025)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 font-outfit text-sm leading-relaxed" style={{ color: j === 0 ? '#F0EBE0' : '#9A8D7E' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Section({ s }: { s: ArticleSection }) {
  switch (s.type) {
    case 'lead':
      return <p className="font-playfair italic text-lg md:text-xl leading-relaxed mb-8" style={{ color: '#E8C97E' }}>{s.text}</p>

    case 'h2':
      return (
        <div className="mt-12 mb-5">
          <h2 className="font-cinzel text-xl md:text-2xl font-bold" style={{ color: '#F5F0E8' }}>{s.text}</h2>
          <div className="mt-3 h-px w-12" style={{ background: '#C9A44A' }} />
        </div>
      )

    case 'h3':
      return <h3 className="font-cinzel text-base md:text-lg font-semibold mt-8 mb-3" style={{ color: '#E8C97E' }}>{s.text}</h3>

    case 'body':
      return <p className="font-outfit text-base leading-relaxed mb-5" style={{ color: '#B8AC9E' }}>{s.text}</p>

    case 'callout':
      return (
        <div className="my-7 rounded-xl px-6 py-5" style={{ background: 'rgba(201,164,74,0.07)', borderLeft: '3px solid #C9A44A' }}>
          <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#C9A44A' }}>{s.label}</div>
          <p className="font-outfit text-sm leading-relaxed" style={{ color: '#D0C8BA' }}>{s.text}</p>
        </div>
      )

    case 'callout-green':
      return (
        <div className="my-7 rounded-xl px-6 py-5" style={{ background: 'rgba(34,168,97,0.07)', borderLeft: '3px solid #22A861' }}>
          <p className="font-outfit text-sm leading-relaxed" style={{ color: '#A8E8C8' }}>{s.text}</p>
        </div>
      )

    case 'bullets':
      return (
        <ul className="my-5 flex flex-col gap-3">
          {s.items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#C9A44A' }} />
              <span className="font-outfit text-sm leading-relaxed" style={{ color: '#B8AC9E' }}>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'stat-row':
      return <StatRow stats={s.stats} />

    case 'table':
      return <Table headers={s.headers} rows={s.rows} />

    case 'sources':
      return (
        <div className="mt-14 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="font-outfit text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#5A5046' }}>Sources & References</div>
          <ol className="flex flex-col gap-2">
            {s.items.map((item, i) => (
              <li key={i} className="flex gap-2 items-baseline">
                <span className="font-dm-mono text-[0.6rem] flex-shrink-0" style={{ color: '#5A5046' }}>{i + 1}.</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-outfit text-xs hover:opacity-80 transition-opacity"
                  style={{ color: '#7A6E62' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )

    default:
      return null
  }
}

export default function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto"
      style={{ background: 'rgba(6,6,6,0.92)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-3xl mx-auto my-8 rounded-3xl overflow-hidden"
        style={{ background: '#0D0C0A', border: '1px solid rgba(201,164,74,0.15)', boxShadow: '0 40px 120px rgba(0,0,0,0.85)' }}
      >
        {/* Hero image */}
        <div className="relative h-56 md:h-72 overflow-hidden">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.55) saturate(0.7)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0D0C0A 0%, transparent 55%)' }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(13,12,10,0.75)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C4B9A8" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Tag */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full font-dm-mono text-[0.58rem] tracking-widest uppercase"
            style={{ background: 'rgba(201,164,74,0.9)', color: '#060606' }}>
            {article.tag}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-12 pb-12">
          {/* Title area */}
          <div className="py-8 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <h1 className="font-cinzel text-2xl md:text-3xl font-bold leading-tight mb-4" style={{ color: '#F5F0E8' }}>
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-outfit text-xs" style={{ color: '#7A6E62' }}>{article.author}</span>
              <span className="w-1 h-1 rounded-full" style={{ background: '#5A5046' }} />
              <span className="font-outfit text-xs" style={{ color: '#7A6E62' }}>{article.date}</span>
              <span className="w-1 h-1 rounded-full" style={{ background: '#5A5046' }} />
              <span className="font-dm-mono text-[0.65rem]" style={{ color: '#C9A44A' }}>{article.mins}</span>
            </div>
          </div>

          {/* Article body */}
          <div className="pt-8">
            {article.sections.map((s, i) => (
              <Section key={i} s={s} />
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-10 rounded-2xl p-6 text-center"
            style={{ background: 'rgba(201,164,74,0.07)', border: '1px solid rgba(201,164,74,0.18)' }}
          >
            <p className="font-cinzel text-base font-semibold mb-1" style={{ color: '#F5F0E8' }}>
              Ready to explore Dubai investment?
            </p>
            <p className="font-outfit text-sm mb-4" style={{ color: '#9A8D7E' }}>
              Book a free 30-minute consultation with a Parva Realty advisor.
            </p>
            <button
              onClick={() => {
                onClose()
                setTimeout(() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' }), 200)
              }}
              className="btn-gold"
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
