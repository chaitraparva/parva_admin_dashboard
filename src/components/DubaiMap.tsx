import { useState, useEffect, useRef, useCallback } from 'react'
import L from 'leaflet'
import { useInView } from '../hooks/useInView'

type Zone = {
  id: string
  name: string
  catalogueZone: string
  latLng: [number, number]
  properties: number
  yield: string
  appreciation: string
  combinedROI: string
  priceFrom: string
  priceFromAED: string
  type: string
  highlight: string
  tier: string
  description: string
  projects: { name: string; developer: string; price: string; tag: string }[]
}

const zones: Zone[] = [
  {
    id: 'dubai-south',
    name: 'Dubai South',
    catalogueZone: 'Dubai South',
    latLng: [24.8978, 55.1605],
    properties: 2,
    yield: '8.5%', appreciation: '9.3%', combinedROI: '17.8%',
    priceFrom: '₹1.56 Cr', priceFromAED: 'From AED 599K',
    type: 'Off-Plan Apartments',
    highlight: "Al Maktoum Airport — world's future largest airport",
    tier: 'Entry / Mid-Range',
    description: "The fastest-growing master-planned district in Dubai. Al Maktoum International Airport Phase 2 underpins a multi-decade appreciation story. Entry prices are the most accessible in the emirate.",
    projects: [
      { name: 'SAMANA South Haven', developer: 'SAMANA', price: '₹1.56 Cr', tag: 'ENTRY' },
      { name: 'Enre Residence', developer: 'Imtiaz', price: '₹4.92 Cr', tag: 'NEW' },
    ],
  },
  {
    id: 'jvc',
    name: 'Jumeirah Village Circle',
    catalogueZone: 'JVC',
    latLng: [25.0583, 55.2066],
    properties: 2,
    yield: '9.0%', appreciation: '7.4%', combinedROI: '16.4%',
    priceFrom: '₹2.22 Cr', priceFromAED: 'From AED 850K',
    type: 'Apartments',
    highlight: "Dubai's most liquid studio rental market",
    tier: 'Entry / Value',
    description: "JVC consistently records Dubai's highest studio rental yields (9–10%). A central location 15 min from both Marina and Downtown makes it the most reliable yield investment zone.",
    projects: [
      { name: 'Auresta Tower', developer: 'Tiger Properties', price: '₹2.22 Cr', tag: 'HIGH YIELD' },
      { name: 'Serenz', developer: 'Danube', price: '₹2.87 Cr', tag: 'OFF-PLAN' },
    ],
  },
  {
    id: 'downtown',
    name: 'Downtown Dubai',
    catalogueZone: 'Downtown',
    latLng: [25.1972, 55.2744],
    properties: 1,
    yield: '6.8%', appreciation: '14.2%', combinedROI: '21.0%',
    priceFrom: '₹13.03 Cr+', priceFromAED: 'AED 5M+',
    type: 'Branded Residences',
    highlight: 'Burj Khalifa district · Zero parallel supply',
    tier: 'Luxury',
    description: "The global address. Burj Khalifa proximity creates permanent scarcity. Branded residences here carry Dubai's highest capital appreciation floor — over 14% annually.",
    projects: [
      { name: 'Mercedes-Benz Places', developer: 'Binghatti', price: '₹13.03 Cr+', tag: 'BRANDED' },
    ],
  },
  {
    id: 'business-bay',
    name: 'Business Bay',
    catalogueZone: 'Business Bay',
    latLng: [25.1869, 55.2628],
    properties: 1,
    yield: '7.8%', appreciation: '10.5%', combinedROI: '18.3%',
    priceFrom: '₹8.26 Cr', priceFromAED: 'From AED 3.17M',
    type: 'Premium Apartments',
    highlight: 'Dubai Canal frontage · 52-floor skyline tower',
    tier: 'Premium',
    description: "Dubai's financial spine connecting Downtown to DIFC. Canal-front towers with Burj Khalifa sightlines command a structural premium that protects against market cycles.",
    projects: [
      { name: 'Tiger Sky Tower', developer: 'Tiger Properties', price: '₹8.26 Cr', tag: 'PREMIUM' },
    ],
  },
  {
    id: 'meydan',
    name: 'Meydan',
    catalogueZone: 'Meydan',
    latLng: [25.1612, 55.3074],
    properties: 1,
    yield: '6.5%', appreciation: '15.1%', combinedROI: '21.6%',
    priceFrom: '₹18.95 Cr', priceFromAED: 'From AED 7.27M',
    type: 'Ultra Luxury Residences',
    highlight: 'Racecourse address · MBR City · UHNW community',
    tier: 'Luxury',
    description: "Dubai's most prestigious off-Downtown address. Meydan's UHNW neighbour class and racecourse address underpin the highest capital appreciation trajectory in this shortlist at 15.1% p.a.",
    projects: [
      { name: 'The Symphony', developer: 'Imtiaz', price: '₹18.95 Cr', tag: 'ULTRA LUX' },
    ],
  },
  {
    id: 'dubai-islands',
    name: 'Dubai Islands',
    catalogueZone: 'Dubai Islands',
    latLng: [25.2762, 55.3235],
    properties: 2,
    yield: '7.7%', appreciation: '12.4%', combinedROI: '20.1%',
    priceFrom: '₹6.10 Cr', priceFromAED: 'From AED 2.34M',
    type: 'Waterfront & Resort Residences',
    highlight: 'New 5-island masterplan · Hilton, Marriott, Rixos confirmed',
    tier: 'Premium / Luxury',
    description: "Five-island archipelago transforming Dubai's northern coastline. International hotel brands are confirmed — rental premiums will accelerate significantly post-2027 handover dates.",
    projects: [
      { name: 'Sunset Bay Grand', developer: 'Imtiaz', price: '₹6.10 Cr', tag: 'WATERFRONT' },
      { name: 'Portofino Felicita', developer: 'Heart of Europe', price: '₹13.6 Cr+', tag: 'RESORT' },
    ],
  },
  {
    id: 'dubailand',
    name: 'Dubailand',
    catalogueZone: 'Dubailand',
    latLng: [25.0580, 55.3800],
    properties: 1,
    yield: '7.9%', appreciation: '9.4%', combinedROI: '17.3%',
    priceFrom: '₹3.47 Cr', priceFromAED: 'From AED 1.33M',
    type: 'Townhouses',
    highlight: 'Largest master-planned community · Schools & malls operational',
    tier: 'Mid-Range',
    description: "Dubai's largest master-planned zone with schools, malls and leisure facilities already running. Townhouse format at mid-range pricing is extremely rare in this city.",
    projects: [
      { name: 'Bianca', developer: 'Reportage', price: '₹3.47 Cr', tag: 'TOWNHOUSE' },
    ],
  },
  {
    id: 'silicon-oasis',
    name: 'Dubai Silicon Oasis',
    catalogueZone: 'Silicon Oasis',
    latLng: [25.1210, 55.3800],
    properties: 1,
    yield: '8.2%', appreciation: '8.6%', combinedROI: '16.8%',
    priceFrom: '₹4.30 Cr', priceFromAED: 'From AED 1.65M',
    type: 'Apartments',
    highlight: '1,000+ tech companies · Danube 1% payment plan',
    tier: 'Mid-Range',
    description: "Home to 1,000+ technology companies, DSO's white-collar tenant base drives consistent rental demand. Practical pricing with strong connectivity to central Dubai.",
    projects: [
      { name: 'TIMEZ', developer: 'Danube', price: '₹4.30 Cr', tag: 'MID-RANGE' },
    ],
  },
  {
    id: 'academic-city',
    name: 'Academic City',
    catalogueZone: 'Academic City',
    latLng: [25.1090, 55.4060],
    properties: 1,
    yield: '7.5%', appreciation: '9.9%', combinedROI: '17.4%',
    priceFrom: '₹9.56 Cr', priceFromAED: 'From AED 3.67M',
    type: 'Family Apartments',
    highlight: '25+ universities · 50,000 student catchment',
    tier: 'Premium',
    description: "Home to 25+ international university campuses. Academic staff, professors and medical professionals form a stable, quality rental base unlike any other Dubai location.",
    projects: [
      { name: 'Greenz', developer: 'Danube', price: '₹9.56 Cr', tag: 'FAMILY' },
    ],
  },
]

const tierColor: Record<string, string> = {
  'Entry / Value':    '#4A7C59',
  'Entry / Mid-Range':'#4A7C59',
  'Mid-Range':        '#3A72A8',
  'Premium':          '#7B5EA7',
  'Premium / Luxury': '#9B5EA7',
  'Luxury':           '#C9A44A',
}

const yieldColor = (y: string) => {
  const v = parseFloat(y)
  if (v >= 9)  return '#22A861'
  if (v >= 8)  return '#C9A44A'
  return '#7B5EA7'
}

function makeIcon(zone: Zone, isActive: boolean) {
  const col = yieldColor(zone.yield)
  const size = isActive ? 64 : 52
  const half = size / 2
  const shortName = zone.name.split(' ').length > 2
    ? zone.name.split(' ').slice(0, 2).join(' ')
    : zone.name
  const line2 = zone.name.split(' ').length > 2
    ? zone.name.split(' ').slice(2).join(' ')
    : ''

  const pulse = isActive
    ? `<div style="position:absolute;inset:-8px;border-radius:50%;border:1.5px solid ${col};opacity:0.35;animation:parva-pulse 2s ease-out infinite;"></div>
       <div style="position:absolute;inset:-4px;border-radius:50%;border:1px solid ${col};opacity:0.55;animation:parva-pulse 2s ease-out 0.4s infinite;"></div>`
    : ''

  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;cursor:pointer;">
        ${pulse}
        <div style="
          width:${size}px;height:${size}px;border-radius:50%;
          background:${col}${isActive ? '28' : '14'};
          border:${isActive ? '2' : '1.5'}px solid ${col};
          display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;
          box-shadow:0 0 ${isActive ? '24px' : '10px'} ${col}${isActive ? '55' : '30'};
          font-family:'DM Mono',monospace;
          transition:all 0.3s;
        ">
          <div style="color:${col};font-size:${isActive ? 11 : 9}px;font-weight:bold;line-height:1;">${zone.yield}</div>
          <div style="color:rgba(255,255,255,${isActive ? '0.85' : '0.55'});font-size:${isActive ? 7 : 6}px;text-align:center;padding:0 3px;line-height:1.2;">${shortName}</div>
          ${line2 ? `<div style="color:rgba(255,255,255,${isActive ? '0.7' : '0.4'});font-size:${isActive ? 6 : 5}px;text-align:center;padding:0 3px;line-height:1.2;">${line2}</div>` : ''}
          ${zone.properties > 1 && !isActive ? `<div style="position:absolute;top:-3px;right:-3px;width:14px;height:14px;background:#C9A44A;border-radius:50%;font-size:8px;color:#060606;font-weight:bold;display:flex;align-items:center;justify-content:center;">${zone.properties}</div>` : ''}
        </div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [half, half],
  })
}

export default function DubaiMap() {
  const [active, setActive] = useState<Zone>(zones[0])
  const { ref, visible } = useInView()
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())

  // Stable handler so we can update active zone from marker clicks
  const handleZoneClick = useCallback((zone: Zone) => {
    setActive(zone)
  }, [])

  // Initialize Leaflet map once (guard against StrictMode double-invoke)
  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return
    // StrictMode runs cleanup + re-run; Leaflet adds _leaflet_id to the container,
    // so check for an already-initialized instance on the DOM element
    if ((container as HTMLElement & { _leaflet_id?: number })._leaflet_id) return
    if (leafletMapRef.current) return

    const map = L.map(container, {
      center: [25.08, 55.25],
      zoom: 10,
      zoomControl: false,
      attributionControl: true,
    })

    // Add custom zoom control to bottom-left
    L.control.zoom({ position: 'bottomleft' }).addTo(map)

    // ESRI Dark Gray Canvas — free, no API key, no authentication
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles © <a href="https://www.esri.com/" style="color:#C9A44A">Esri</a>',
        maxZoom: 16,
      },
    ).addTo(map)

    // Markers
    zones.forEach(zone => {
      const marker = L.marker(zone.latLng, {
        icon: makeIcon(zone, zone.id === zones[0].id),
        zIndexOffset: zone.id === zones[0].id ? 1000 : 0,
      })

      marker.on('click', () => handleZoneClick(zone))

      // Tooltip with project names
      marker.bindTooltip(
        `<div style="background:rgba(10,10,8,0.95);border:1px solid rgba(201,164,74,0.35);border-radius:10px;padding:8px 12px;font-family:'DM Mono',monospace;min-width:160px;">
          <div style="color:#C9A44A;font-size:9px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">${zone.name}</div>
          ${zone.projects.map(p => `<div style="color:rgba(221,217,210,0.75);font-size:8px;line-height:1.5;">${p.name}</div>`).join('')}
          <div style="color:#22A861;font-size:8px;margin-top:3px;font-weight:bold;">Yield ${zone.yield}</div>
        </div>`,
        { className: 'parva-tooltip', offset: [0, -4], opacity: 1 }
      )

      marker.addTo(map)
      markersRef.current.set(zone.id, marker)
    })

    leafletMapRef.current = map

    return () => {
      map.remove()
      leafletMapRef.current = null
      markersRef.current.clear()
    }
  }, [handleZoneClick])

  // After the in-view animation plays, Leaflet needs to re-measure
  useEffect(() => {
    if (!visible || !leafletMapRef.current) return
    const t = setTimeout(() => leafletMapRef.current?.invalidateSize(), 650)
    return () => clearTimeout(t)
  }, [visible])

  // Update marker icons + pan when active changes
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const zone = zones.find(z => z.id === id)!
      const isActive = id === active.id
      marker.setIcon(makeIcon(zone, isActive))
      marker.setZIndexOffset(isActive ? 1000 : 0)
    })

    if (leafletMapRef.current) {
      leafletMapRef.current.panTo(active.latLng, { animate: true, duration: 0.7 })
    }
  }, [active])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const i = zones.findIndex(z => z.id === active.id)
        setActive(zones[(i + 1) % zones.length])
      }
      if (e.key === 'ArrowLeft') {
        const i = zones.findIndex(z => z.id === active.id)
        setActive(zones[(i - 1 + zones.length) % zones.length])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active])

  const handleViewProperties = () => {
    window.dispatchEvent(new CustomEvent('parva:filterZone', { detail: { zone: active.catalogueZone } }))
    setTimeout(() => {
      document.querySelector('#properties')?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  return (
    <>
      {/* Leaflet overrides + pulse animation */}
      <style>{`
        .leaflet-container { background: #07090f !important; }
        .leaflet-tile-pane { filter: saturate(1.1) brightness(1.05); }
        @keyframes parva-pulse {
          0%   { opacity: 0.7; transform: scale(0.95); }
          70%  { opacity: 0;   transform: scale(1.4); }
          100% { opacity: 0;   transform: scale(1.4); }
        }
        .parva-tooltip .leaflet-tooltip-content { padding: 0; }
        .parva-tooltip { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
        .leaflet-tooltip.parva-tooltip::before { display: none !important; }
        .leaflet-control-zoom a {
          background: rgba(10,10,8,0.9) !important;
          border-color: rgba(201,164,74,0.3) !important;
          color: #C9A44A !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(201,164,74,0.15) !important;
        }
        .leaflet-control-attribution {
          background: rgba(6,6,6,0.7) !important;
          color: rgba(221,217,210,0.4) !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: #C9A44A !important; }
      `}</style>

      <div className="py-28 px-6 sec-grad-ba" ref={ref}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className={`text-center mb-14 ${visible ? 'in-view-fade-up d-0' : 'opacity-0'}`}>
            <div className="section-label mb-5">Prime Investment Zones</div>
            <h2 className="section-heading text-4xl md:text-6xl mb-5">Interactive Dubai Map</h2>
            <div className="gold-divider mx-auto mb-6" />
            <p className="font-outfit text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-m)' }}>
              9 investment zones · 12 personally vetted projects. Click any marker to explore actual yields, live project data, and appreciation forecasts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* ── Leaflet Map ── */}
            <div
              className={`lg:col-span-2 rounded-2xl overflow-hidden relative ${visible ? 'in-view-scale d-1' : 'opacity-0'}`}
              style={{
                height: '520px',
                border: '1px solid rgba(201,164,74,0.18)',
              }}
            >
              <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

              {/* Keyboard hint */}
              <div
                className="absolute top-3 left-3 z-[1000] font-dm-mono text-[0.5rem] tracking-widest uppercase px-2 py-1 rounded pointer-events-none"
                style={{ color: 'rgba(201,164,74,0.55)', background: 'rgba(6,6,6,0.7)' }}
              >
                ← → arrow keys · click to select
              </div>

              {/* Yield legend */}
              <div
                className="absolute bottom-8 right-3 z-[1000] rounded-xl p-3 flex flex-col gap-2 pointer-events-none"
                style={{ background: 'rgba(6,6,6,0.82)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}
              >
                <div className="section-label text-[0.5rem] mb-0.5">Yield</div>
                {[
                  { col: '#22A861', l: '≥ 9%' },
                  { col: '#C9A44A', l: '8–9%' },
                  { col: '#7B5EA7', l: '< 8%' },
                ].map(x => (
                  <div key={x.l} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: x.col }}/>
                    <span className="font-dm-mono text-[0.55rem]" style={{ color: 'var(--text-m)' }}>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Zone detail panel ── */}
            <div className={`flex flex-col gap-4 ${visible ? 'in-view-fade-up d-2' : 'opacity-0'}`}>

              {/* Active zone card */}
              <div className="glass-gold rounded-2xl p-6" style={{ border: '1px solid rgba(201,164,74,0.28)' }}>

                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <div
                    className="px-2.5 py-0.5 rounded-full font-dm-mono text-[0.5rem] tracking-widest font-bold uppercase"
                    style={{
                      background: `${tierColor[active.tier] ?? '#C9A44A'}18`,
                      color: tierColor[active.tier] ?? '#C9A44A',
                      border: `1px solid ${tierColor[active.tier] ?? '#C9A44A'}40`,
                    }}
                  >
                    {active.tier}
                  </div>
                  <span className="font-dm-mono text-[0.52rem]" style={{ color: 'var(--text-ff)' }}>
                    {active.type}
                  </span>
                </div>

                <h3 className="font-cinzel text-xl font-bold mb-1" style={{ color: 'var(--text-h)' }}>
                  {active.name}
                </h3>

                <div
                  className="inline-block mb-3 px-2.5 py-1 rounded-full font-outfit text-[0.6rem] leading-tight"
                  style={{ background: 'rgba(201,164,74,0.1)', color: '#E8C97E', border: '1px solid rgba(201,164,74,0.22)' }}
                >
                  {active.highlight}
                </div>

                <p className="font-outfit text-xs leading-relaxed mb-4" style={{ color: 'var(--text-m)' }}>
                  {active.description}
                </p>

                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {[
                    { l: 'Rental Yield',    v: active.yield,         col: '#22A861' },
                    { l: 'Capital Apprec.', v: active.appreciation,  col: '#C9A44A' },
                    { l: 'Combined ROI',    v: active.combinedROI,   col: '#E8C97E' },
                    { l: 'Price From',      v: active.priceFrom,     col: '#C9A44A' },
                  ].map(s => (
                    <div key={s.l} className="glass rounded-xl p-3">
                      <div className="font-cinzel text-lg font-bold leading-none mb-0.5" style={{ color: s.col }}>{s.v}</div>
                      <div className="font-dm-mono text-[0.5rem] tracking-widest uppercase" style={{ color: 'var(--text-f)' }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                <div className="font-dm-mono text-[0.58rem] mb-4" style={{ color: 'var(--text-ff)' }}>
                  {active.priceFromAED} · AED 1 ≈ ₹26.06
                </div>

                <button className="btn-gold w-full justify-center" onClick={handleViewProperties}>
                  View {active.properties} {active.properties === 1 ? 'Project' : 'Projects'} in {active.name.split(' ').slice(0, 2).join(' ')}
                </button>
              </div>

              {/* Projects in this zone */}
              <div className="glass rounded-2xl p-4">
                <div className="section-label text-[0.55rem] mb-3">
                  Projects in {active.name}
                </div>
                <div className="flex flex-col gap-2">
                  {active.projects.map(p => (
                    <div key={p.name} className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div>
                        <div className="font-cinzel text-xs font-semibold leading-tight" style={{ color: 'var(--text-h)' }}>
                          {p.name}
                        </div>
                        <div className="font-dm-mono text-[0.52rem] mt-0.5" style={{ color: 'var(--text-ff)' }}>
                          by {p.developer}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-cinzel text-xs font-bold" style={{ color: '#C9A44A' }}>{p.price}</div>
                        <div className="font-dm-mono text-[0.48rem] mt-0.5 px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(201,164,74,0.1)', color: '#C9A44A' }}>
                          {p.tag}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All zones quick-list */}
              <div className="glass rounded-2xl p-4">
                <div className="section-label text-[0.55rem] mb-3">All 9 Investment Zones</div>
                <div className="flex flex-col gap-1">
                  {zones.map(z => (
                    <button
                      key={z.id}
                      onClick={() => setActive(z)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl transition-all"
                      style={{
                        background: active.id === z.id ? 'rgba(201,164,74,0.1)' : 'transparent',
                        border: active.id === z.id ? '1px solid rgba(201,164,74,0.22)' : '1px solid transparent',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: yieldColor(z.yield) }}/>
                        <span className="font-outfit text-xs text-left"
                          style={{ color: active.id === z.id ? '#C9A44A' : 'var(--text-m)' }}>
                          {z.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {z.properties > 1 && (
                          <span className="font-dm-mono text-[0.5rem] px-1.5 py-0.5 rounded"
                            style={{ background: 'rgba(201,164,74,0.1)', color: '#C9A44A' }}>
                            {z.properties}
                          </span>
                        )}
                        <span className="font-dm-mono text-[0.6rem] font-semibold"
                          style={{ color: yieldColor(z.yield) }}>
                          {z.yield}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
