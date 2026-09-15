import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'

Font.register({
  family: 'Cinzel',
  src: 'https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gt79mT7.ttf',
})

Font.register({
  family: 'Outfit',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1E4W-EiAou6Y.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1FoW-EiAou6Y.ttf', fontWeight: 700 },
  ],
})

const GOLD = '#C9A44A'
const GOLD_LIGHT = '#E8C97E'
const DARK = '#0A0908'
const DARK2 = '#111009'
const DARK3 = '#1A1610'
const TEXT_H = '#F5F0E8'
const TEXT_M = '#C4B9A8'
const TEXT_F = '#7A6E62'
const GREEN = '#22A861'
const WHITE = '#FFFFFF'

const s = StyleSheet.create({
  page: { backgroundColor: DARK, padding: 0, fontFamily: 'Outfit' },

  // Cover
  cover: { flex: 1, backgroundColor: DARK, position: 'relative' },
  coverTop: { height: 3, backgroundColor: GOLD },
  coverInner: { padding: 56, flex: 1 },
  coverPre: { fontFamily: 'Outfit', fontSize: 7, color: GOLD, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 36 },
  coverTitle: { fontFamily: 'Cinzel', fontSize: 34, color: TEXT_H, fontWeight: 700, lineHeight: 1.25, marginBottom: 12 },
  coverSub: { fontFamily: 'Outfit', fontSize: 13, color: GOLD_LIGHT, fontStyle: 'italic', marginBottom: 40 },
  coverDivider: { width: 64, height: 1.5, backgroundColor: GOLD, marginBottom: 40 },
  coverTagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 48 },
  coverTag: { paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#1A1610', borderWidth: 1, borderColor: 'rgba(201,164,74,0.25)', borderRadius: 4 },
  coverTagTxt: { fontFamily: 'Outfit', fontSize: 7, color: TEXT_M, letterSpacing: 0.5 },
  coverMeta: { marginTop: 'auto', paddingTop: 40, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  coverMetaTxt: { fontFamily: 'Outfit', fontSize: 8, color: TEXT_F, lineHeight: 1.6 },
  coverMetaGold: { fontFamily: 'Outfit', fontSize: 8, color: GOLD },

  // Inner pages
  inner: { paddingHorizontal: 48, paddingVertical: 44 },
  pageHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(201,164,74,0.15)' },
  pageHeaderBrand: { fontFamily: 'Cinzel', fontSize: 7, color: GOLD, letterSpacing: 2, textTransform: 'uppercase' },
  pageHeaderChapter: { fontFamily: 'Outfit', fontSize: 7, color: TEXT_F },

  // Chapter heading
  chapterLabel: { fontFamily: 'Outfit', fontSize: 6.5, color: GOLD, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 },
  chapterTitle: { fontFamily: 'Cinzel', fontSize: 22, color: TEXT_H, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 },
  chapterSubtitle: { fontFamily: 'Outfit', fontStyle: 'italic', fontSize: 11, color: GOLD_LIGHT, marginBottom: 20 },
  chapterDivider: { width: 48, height: 1, backgroundColor: GOLD, marginBottom: 22 },

  // Body text
  body: { fontFamily: 'Outfit', fontSize: 9.5, color: TEXT_M, lineHeight: 1.75, marginBottom: 14 },
  bodyBold: { fontFamily: 'Outfit', fontSize: 9.5, color: TEXT_H, fontWeight: 700 },
  lead: { fontFamily: 'Outfit', fontSize: 11, color: TEXT_H, lineHeight: 1.65, marginBottom: 18, fontStyle: 'italic' },

  // Headings
  h3: { fontFamily: 'Cinzel', fontSize: 12, color: TEXT_H, fontWeight: 700, marginBottom: 8, marginTop: 18 },
  h4: { fontFamily: 'Outfit', fontSize: 10, color: GOLD_LIGHT, fontWeight: 700, marginBottom: 6, marginTop: 14 },

  // Callout / highlight box
  callout: { backgroundColor: '#161208', borderLeftWidth: 3, borderLeftColor: GOLD, paddingHorizontal: 16, paddingVertical: 12, marginVertical: 16, borderRadius: 4 },
  calloutLabel: { fontFamily: 'Outfit', fontSize: 6, color: GOLD, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  calloutText: { fontFamily: 'Outfit', fontSize: 9, color: TEXT_H, lineHeight: 1.65 },

  // Green callout
  calloutGreen: { backgroundColor: 'rgba(34,168,97,0.08)', borderLeftWidth: 3, borderLeftColor: GREEN, paddingHorizontal: 16, paddingVertical: 12, marginVertical: 14, borderRadius: 4 },
  calloutGreenText: { fontFamily: 'Outfit', fontSize: 9, color: '#A8E8C8', lineHeight: 1.65 },

  // Bullet points
  bullet: { flexDirection: 'row', gap: 10, marginBottom: 8, alignItems: 'flex-start' },
  bulletDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: GOLD, marginTop: 5, flexShrink: 0 },
  bulletText: { fontFamily: 'Outfit', fontSize: 9.5, color: TEXT_M, lineHeight: 1.65, flex: 1 },
  bulletTextBold: { fontFamily: 'Outfit', fontSize: 9.5, color: TEXT_H, fontWeight: 700 },

  // Numbered list
  numbered: { flexDirection: 'row', gap: 10, marginBottom: 10, alignItems: 'flex-start' },
  numberedIdx: { fontFamily: 'Cinzel', fontSize: 9, color: GOLD, fontWeight: 700, width: 18, flexShrink: 0 },
  numberedText: { fontFamily: 'Outfit', fontSize: 9.5, color: TEXT_M, lineHeight: 1.65, flex: 1 },

  // Stat card row
  statRow: { flexDirection: 'row', gap: 10, marginVertical: 16 },
  statCard: { flex: 1, backgroundColor: '#161208', borderWidth: 1, borderColor: 'rgba(201,164,74,0.18)', borderRadius: 6, padding: 12 },
  statValue: { fontFamily: 'Cinzel', fontSize: 18, color: GOLD, fontWeight: 700, marginBottom: 2 },
  statLabel: { fontFamily: 'Outfit', fontSize: 7.5, color: TEXT_M, lineHeight: 1.5 },

  // Comparison table
  tableHeader: { flexDirection: 'row', backgroundColor: '#1A1610', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  tableRowAlt: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)', backgroundColor: '#0D0C09' },
  tableCell: { flex: 1, paddingHorizontal: 10, paddingVertical: 8 },
  tableCellTxt: { fontFamily: 'Outfit', fontSize: 8.5, color: TEXT_M, lineHeight: 1.5 },
  tableHeaderTxt: { fontFamily: 'Outfit', fontSize: 8, color: GOLD, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Zone card
  zoneCard: { backgroundColor: '#0E0C09', borderWidth: 1, borderColor: 'rgba(201,164,74,0.15)', borderRadius: 6, padding: 10, marginBottom: 8 },
  zoneTitle: { fontFamily: 'Cinzel', fontSize: 10, color: TEXT_H, fontWeight: 700, marginBottom: 3 },
  zoneMeta: { fontFamily: 'Outfit', fontSize: 8, color: TEXT_M, lineHeight: 1.55 },
  zoneYield: { fontFamily: 'Outfit', fontSize: 8, color: GOLD, fontWeight: 700 },

  // Process step
  stepRow: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'flex-start' },
  stepNum: { width: 22, height: 22, borderRadius: 11, backgroundColor: GOLD, flexShrink: 0, alignItems: 'center', justifyContent: 'center' },
  stepNumTxt: { fontFamily: 'Cinzel', fontSize: 8, color: DARK, fontWeight: 700 },
  stepContent: { flex: 1 },
  stepTitle: { fontFamily: 'Cinzel', fontSize: 10, color: TEXT_H, fontWeight: 700, marginBottom: 4 },
  stepText: { fontFamily: 'Outfit', fontSize: 9, color: TEXT_M, lineHeight: 1.6 },

  // Page number footer
  pageFooter: { position: 'absolute', bottom: 24, left: 48, right: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pageFooterTxt: { fontFamily: 'Outfit', fontSize: 7, color: TEXT_F },
  pageFooterGold: { fontFamily: 'Outfit', fontSize: 7, color: GOLD },

  // Section divider
  sectionDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 20 },

  // Warning box
  warningBox: { backgroundColor: 'rgba(201,164,74,0.07)', borderWidth: 1, borderColor: 'rgba(201,164,74,0.2)', borderRadius: 6, padding: 14, marginVertical: 14 },
  warningTitle: { fontFamily: 'Outfit', fontSize: 8, color: GOLD, fontWeight: 700, marginBottom: 4 },
  warningText: { fontFamily: 'Outfit', fontSize: 8.5, color: TEXT_M, lineHeight: 1.6 },

  // Two-col layout
  twoCol: { flexDirection: 'row', gap: 18, marginVertical: 8 },
  colLeft: { flex: 1 },
  colRight: { flex: 1 },
})

function PageHeader({ chapter }: { chapter: string }) {
  return (
    <View style={s.pageHeader}>
      <Text style={s.pageHeaderBrand}>Parva Realty · Indian Investor's Guide</Text>
      <Text style={s.pageHeaderChapter}>{chapter}</Text>
    </View>
  )
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={s.bullet}>
      <View style={s.bulletDot} />
      <Text style={s.bulletText}>{children}</Text>
    </View>
  )
}

function Numbered({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <View style={s.numbered}>
      <Text style={s.numberedIdx}>{n}.</Text>
      <Text style={s.numberedText}><Text style={{ color: TEXT_H, fontWeight: 700 }}>{title}</Text>{body ? ` — ${body}` : ''}</Text>
    </View>
  )
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <View style={s.stepRow}>
      <View style={s.stepNum}>
        <Text style={s.stepNumTxt}>{n}</Text>
      </View>
      <View style={s.stepContent}>
        <Text style={s.stepTitle}>{title}</Text>
        <Text style={s.stepText}>{body}</Text>
      </View>
    </View>
  )
}

export default function InvestorGuidePDF() {
  return (
    <Document
      title="The Indian Investor's Guide to Dubai Real Estate — Parva Realty"
      author="Parva Realty"
      subject="Dubai Property Investment for Indian Investors"
      creator="Parva Realty"
    >
      {/* ═══ PAGE 1: COVER ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.coverTop} />
        <View style={s.coverInner}>
          <Text style={s.coverPre}>Parva Realty · Exclusive Research</Text>
          <Text style={s.coverTitle}>
            {"The Indian Investor's\nGuide to Dubai\nReal Estate"}
          </Text>
          <Text style={s.coverSub}>
            Complete intelligence for Indian citizens investing in Dubai property — legal, financial, and strategic.
          </Text>
          <View style={s.coverDivider} />

          <View style={s.coverTagRow}>
            {[
              'RBI LRS & FEMA Framework',
              'Tax Strategy (UAE + India)',
              'Off-Plan Payment Plans',
              'Zone-by-Zone ROI Data',
              'Step-by-Step Purchase Guide',
              'Post-Purchase Management',
              'Repatriation of Funds',
              'Golden Visa Eligibility',
            ].map((tag) => (
              <View style={s.coverTag} key={tag}>
                <Text style={s.coverTagTxt}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={s.statRow}>
            <View style={s.statCard}>
              <Text style={s.statValue}>8–12%</Text>
              <Text style={s.statLabel}>Gross rental yields in prime Dubai zones</Text>
            </View>
            <View style={s.statCard}>
              <Text style={s.statValue}>$250K</Text>
              <Text style={s.statLabel}>Annual LRS remittance limit per individual</Text>
            </View>
            <View style={s.statCard}>
              <Text style={s.statValue}>0%</Text>
              <Text style={s.statLabel}>Capital gains & income tax in Dubai</Text>
            </View>
            <View style={s.statCard}>
              <Text style={s.statValue}>3.5M+</Text>
              <Text style={s.statLabel}>Indian nationals living in UAE today</Text>
            </View>
          </View>

          <View style={s.coverMeta}>
            <Text style={s.coverMetaTxt}>
              Prepared exclusively for Parva Realty clients · 2025 Edition
              {'\n'}
              <Text style={s.coverMetaGold}>invest@parvarealty.ae  ·  +971 56 422 7855  ·  Office 3404, Aspin Commercial Tower, Sheikh Zayed Road, Dubai</Text>
            </Text>
            <Text style={{ ...s.coverMetaTxt, marginTop: 8 }}>
              This guide is for informational purposes only and does not constitute financial or legal advice. All investment decisions should be made after independent due diligence and consultation with qualified advisors.
            </Text>
          </View>
        </View>
      </Page>

      {/* ═══ PAGE 2: CONTENTS & INTRODUCTION ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.inner}>
          <PageHeader chapter="Contents & Introduction" />

          <Text style={s.chapterLabel}>What's Inside</Text>
          <Text style={s.chapterTitle}>Table of Contents</Text>
          <View style={s.chapterDivider} />

          {[
            ['01', 'Why Dubai Is the Right Move for Indian Investors', '3'],
            ['02', 'Understanding the Legal Framework', '5'],
            ['03', 'Dubai Investment Zones — Where to Buy', '7'],
            ['04', 'Off-Plan vs Ready Properties', '9'],
            ['05', 'Understanding the Numbers — ROI Deep Dive', '11'],
            ['06', 'Transferring Money from India: LRS Process', '13'],
            ['07', 'The Step-by-Step Purchase Process', '15'],
            ['08', 'Post-Purchase: Rental, Management & Repatriation', '17'],
            ['09', 'Tax Planning for Indian Property Owners', '19'],
            ['10', 'Common Mistakes & How to Avoid Them', '21'],
            ['11', 'The Parva Realty Advantage', '23'],
          ].map(([num, title, page]) => (
            <View key={num} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 9, paddingBottom: 9, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' }}>
              <Text style={{ fontFamily: 'Cinzel', fontSize: 8, color: GOLD, width: 22 }}>{num}</Text>
              <Text style={{ fontFamily: 'Outfit', fontSize: 9.5, color: TEXT_H, flex: 1 }}>{title}</Text>
              <Text style={{ fontFamily: 'Outfit', fontSize: 9, color: TEXT_F }}>{page}</Text>
            </View>
          ))}

          <View style={{ marginTop: 28 }}>
            <Text style={s.chapterLabel}>From the Desk of Parva Realty</Text>
            <Text style={s.chapterTitle}>Introduction</Text>
            <View style={s.chapterDivider} />
            <Text style={s.lead}>
              Dubai has quietly become the single most compelling real estate market for Indian investors. The combination of zero capital gains tax, yields 3–4× higher than Mumbai, a stable dollar-pegged currency, and a rapidly growing economy have created a window of opportunity that we believe will not remain this wide for long.
            </Text>
            <Text style={s.body}>
              In the past five years, Indian nationals have become the largest foreign buyer group in Dubai real estate, surpassing buyers from the UK, Russia, and China. This is not a coincidence — it is the result of a fundamental alignment between what Dubai offers and what the Indian investor needs: security, yield, currency diversification, and a pathway to residency.
            </Text>
            <Text style={s.body}>
              This guide has been written to demystify the entire process — from understanding India's RBI LRS framework to navigating RERA regulations in Dubai, from structuring your first purchase to repatriating rental income back to India. We have distilled years of experience advising over 650 Indian investors into this comprehensive reference document.
            </Text>
            <View style={s.callout}>
              <Text style={s.calloutLabel}>How to Use This Guide</Text>
              <Text style={s.calloutText}>
                Read it cover to cover for a complete understanding, or navigate directly to the chapter most relevant to your current stage. Every chapter concludes with an actionable summary. When you are ready to take the next step, a Parva advisor is available at invest@parvarealty.ae or +971 56 422 7855.
              </Text>
            </View>
          </View>
        </View>
        <View style={s.pageFooter}>
          <Text style={s.pageFooterTxt}>© 2025 Parva Realty  ·  Confidential</Text>
          <Text style={s.pageFooterGold}>2</Text>
        </View>
      </Page>

      {/* ═══ PAGE 3: WHY DUBAI ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.inner}>
          <PageHeader chapter="Chapter 01 — Why Dubai" />

          <Text style={s.chapterLabel}>Chapter 01</Text>
          <Text style={s.chapterTitle}>Why Dubai Is the Right Move for Indian Investors</Text>
          <Text style={s.chapterSubtitle}>"Not just another market — a fundamentally different asset class."</Text>
          <View style={s.chapterDivider} />

          <Text style={s.lead}>
            When you invest in Dubai real estate, you are not simply buying property in another country. You are accessing a zero-tax jurisdiction, anchored to the US dollar, in one of the world's fastest-growing cities — from one of the world's fastest-growing economies.
          </Text>

          <Text style={s.h3}>The Structural Advantages</Text>

          <Bullet>Zero income tax on rental revenue. Dubai levies no taxes on property income of any kind. Contrast this with India, where rental income is added to your total income and taxed at your applicable slab rate — potentially 30%+.</Bullet>
          <Bullet>Zero capital gains tax. When you sell your Dubai property at a profit, you keep 100% of the gain. In India, long-term capital gains on property are taxed at 20% with indexation.</Bullet>
          <Bullet>Zero inheritance tax. Wealth transfers to your heirs face no estate or inheritance tax in the UAE — unlike many Western jurisdictions where estate taxes can erode generational wealth.</Bullet>
          <Bullet>AED is pegged to USD at 3.67. The dirham has maintained this peg since 1997, giving you effective USD exposure. With the Indian rupee having depreciated ~50% against the USD over the past 15 years, your Dubai property automatically appreciates in INR terms even without any nominal price movement.</Bullet>
          <Bullet>High rental yields — 8 to 12% gross in prime zones. Mumbai's rental yield averages 2–3%. Business Bay and JLT in Dubai routinely deliver 10–12%. This differential is structural, not cyclical.</Bullet>

          <Text style={s.h3}>The Currency Mathematics</Text>
          <Text style={s.body}>
            This point deserves special attention. If you purchased a Dubai apartment in 2010 for AED 500,000 (approximately ₹60 Lakhs at the then exchange rate), that same AED 500,000 today would convert to over ₹1.14 Crore — a 90% gain in INR terms due to rupee depreciation alone, even before any property appreciation or rental income.
          </Text>

          <View style={s.callout}>
            <Text style={s.calloutLabel}>The Rupee Depreciation Argument</Text>
            <Text style={s.calloutText}>
              The Indian rupee has lost approximately 3–4% of its value against the USD every year on average over the past two decades. A Dubai property priced in AED (USD-pegged) thus provides a natural, passive currency hedge on your rupee savings — without requiring any speculative currency position.
            </Text>
          </View>

          <Text style={s.h3}>The India-Dubai Macro Connection</Text>
          <Bullet>3.5 million Indian nationals live in the UAE — the largest expatriate community. This creates an enormous rental demand base for Indian investors' properties.</Bullet>
          <Bullet>Direct flights from 30+ Indian cities to Dubai make inspections, visits, and property management oversight practical.</Bullet>
          <Bullet>Dubai's real estate regulator RERA and the Dubai Land Department (DLD) provide investor protections that rival or exceed many developed markets.</Bullet>
          <Bullet>The UAE's 10-year Golden Visa, available for property investments above AED 2 Million (~₹4.5 Crore), gives you the right to reside, work, and access world-class healthcare and education in the UAE.</Bullet>

          <View style={s.calloutGreen}>
            <Text style={s.calloutGreenText}>
              India's $250 billion annual remittance market has made the RBI's LRS (Liberalised Remittance Scheme) one of the most used pathways for legal overseas investment. In 2024, real estate remittances under LRS exceeded $3.1 billion — the highest ever recorded.
            </Text>
          </View>
        </View>
        <View style={s.pageFooter}>
          <Text style={s.pageFooterTxt}>© 2025 Parva Realty  ·  Confidential</Text>
          <Text style={s.pageFooterGold}>3</Text>
        </View>
      </Page>

      {/* ═══ PAGE 4: LEGAL FRAMEWORK ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.inner}>
          <PageHeader chapter="Chapter 02 — Legal Framework" />

          <Text style={s.chapterLabel}>Chapter 02</Text>
          <Text style={s.chapterTitle}>Understanding the Legal Framework</Text>
          <Text style={s.chapterSubtitle}>"Invest confidently within India's regulatory guardrails and Dubai's strong property laws."</Text>
          <View style={s.chapterDivider} />

          <Text style={s.h3}>India Side: RBI's Liberalised Remittance Scheme (LRS)</Text>
          <Text style={s.body}>
            The RBI's LRS allows every Indian resident (adult individual) to remit up to USD 250,000 per financial year overseas for any current or capital account transaction — including purchasing immovable property abroad. This is the primary legal channel used by Indian investors to fund Dubai property purchases.
          </Text>

          <Text style={s.h4}>Key LRS Rules to Know</Text>
          <Bullet>The $250,000 limit is per individual, per financial year (April to March). A couple can therefore send $500,000 together without any additional approvals.</Bullet>
          <Bullet>Minors can also remit under LRS, subject to parental / guardian sign-off — useful for family property structures.</Bullet>
          <Bullet>The remittance must be made through an Authorised Dealer (AD) bank in India. Your bank will require Form A2 and supporting KYC documents.</Bullet>
          <Bullet>Tax Collected at Source (TCS) at 20% applies to LRS remittances above ₹7 Lakhs per year. This TCS is fully adjustable against your final income tax liability — it is not an additional tax, but an advance tax collection.</Bullet>
          <Bullet>Gifts and loans to close relatives abroad have separate, lower limits. For property investment, always route funds as your own direct purchase.</Bullet>

          <View style={s.callout}>
            <Text style={s.calloutLabel}>TCS Note — Important for Tax Filing</Text>
            <Text style={s.calloutText}>
              From October 2023, LRS remittances above ₹7 Lakhs attract 20% TCS. If you remit ₹50 Lakhs for a property purchase, your bank will collect ₹10 Lakhs as TCS. This will be reflected in Form 26AS and can be claimed as a credit in your income tax return. Engage a CA familiar with foreign assets (Schedule FA in ITR) before filing.
            </Text>
          </View>

          <Text style={s.h3}>India Side: FEMA Compliance</Text>
          <Text style={s.body}>
            The Foreign Exchange Management Act (FEMA) governs all cross-border capital flows by Indian residents. Property purchase abroad is a capital account transaction permitted under FEMA. The key requirement is that:
          </Text>
          <Bullet>All remittances are routed through banking channels (not cash or hawala).</Bullet>
          <Bullet>The property is purchased in your name (or joint names with another resident Indian).</Bullet>
          <Bullet>Rental income earned must be held in an NRE/NRO account or repatriated as per FEMA rules.</Bullet>
          <Bullet>Annual disclosure of foreign assets is made in Schedule FA of your income tax return.</Bullet>

          <Text style={s.h3}>UAE Side: Freehold Ownership for Foreigners</Text>
          <Text style={s.body}>
            Dubai law permits foreign nationals (including Indians) to own freehold property — meaning full, unrestricted ownership with the ability to sell, lease, or inherit — in designated freehold zones. These zones cover virtually all of Dubai's modern development areas including Downtown, Business Bay, Dubai Marina, Palm Jumeirah, JLT, JVC, Dubai Creek Harbour, Dubai Hills, and Dubai South.
          </Text>

          <Text style={s.h3}>RERA — Regulatory Authority for Real Estate</Text>
          <Bullet>All developers and brokers must be RERA registered and licensed.</Bullet>
          <Bullet>Off-plan project funds are held in RERA-mandated escrow accounts — protecting buyers from developer insolvency.</Bullet>
          <Bullet>SPA (Sale & Purchase Agreement) is standardised and legally enforceable.</Bullet>
          <Bullet>Property is registered at the Dubai Land Department (DLD) which issues the official Title Deed.</Bullet>

          <View style={s.warningBox}>
            <Text style={s.warningTitle}>Important: Declare Your Foreign Asset</Text>
            <Text style={s.warningText}>
              Indian tax law requires all residents to disclose foreign assets in Schedule FA of their annual ITR. Failure to disclose overseas property can attract severe penalties under the Black Money (Undisclosed Foreign Income and Assets) and Imposition of Tax Act, 2015 — including imprisonment. All Parva-facilitated purchases are fully documented for clean disclosure.
            </Text>
          </View>
        </View>
        <View style={s.pageFooter}>
          <Text style={s.pageFooterTxt}>© 2025 Parva Realty  ·  Confidential</Text>
          <Text style={s.pageFooterGold}>5</Text>
        </View>
      </Page>

      {/* ═══ PAGE 5: INVESTMENT ZONES ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.inner}>
          <PageHeader chapter="Chapter 03 — Investment Zones" />

          <Text style={s.chapterLabel}>Chapter 03</Text>
          <Text style={s.chapterTitle}>Dubai Investment Zones — Where to Buy</Text>
          <Text style={s.chapterSubtitle}>"Location determines yield, appreciation, and liquidity. Choose with data."</Text>
          <View style={s.chapterDivider} />

          <Text style={s.body}>
            Dubai is not a uniform market. Each zone has distinct characteristics in terms of entry price, rental yield, occupancy rates, capital appreciation potential, and tenant demographics. Here is a data-driven breakdown of the key zones for Indian investors.
          </Text>

          <View style={s.twoCol}>
            <View style={s.colLeft}>
              <View style={s.zoneCard}>
                <Text style={s.zoneTitle}>Business Bay</Text>
                <Text style={s.zoneMeta}>Entry: AED 700K–2.5M{'\n'}Yield: <Text style={s.zoneYield}>9–11% gross</Text>{'\n'}Tenant: Corporate, young professionals{'\n'}Best for: Yield-focused investors</Text>
              </View>
              <View style={s.zoneCard}>
                <Text style={s.zoneTitle}>JLT (Jumeirah Lake Towers)</Text>
                <Text style={s.zoneMeta}>Entry: AED 500K–1.5M{'\n'}Yield: <Text style={s.zoneYield}>9–12% gross</Text>{'\n'}Tenant: Indian expat community, professionals{'\n'}Best for: High yield, quick let-up</Text>
              </View>
              <View style={s.zoneCard}>
                <Text style={s.zoneTitle}>Downtown Dubai</Text>
                <Text style={s.zoneMeta}>Entry: AED 1.5M–10M+{'\n'}Yield: <Text style={s.zoneYield}>6–8% gross</Text>{'\n'}Tenant: High-income professionals, tourists{'\n'}Best for: Capital appreciation + prestige</Text>
              </View>
              <View style={s.zoneCard}>
                <Text style={s.zoneTitle}>JVC (Jumeirah Village Circle)</Text>
                <Text style={s.zoneMeta}>Entry: AED 400K–1.2M{'\n'}Yield: <Text style={s.zoneYield}>8–10% gross</Text>{'\n'}Tenant: Young families, working professionals{'\n'}Best for: Affordable entry, solid yield</Text>
              </View>
            </View>
            <View style={s.colRight}>
              <View style={s.zoneCard}>
                <Text style={s.zoneTitle}>Dubai Marina</Text>
                <Text style={s.zoneMeta}>Entry: AED 900K–4M{'\n'}Yield: <Text style={s.zoneYield}>7–9% gross</Text>{'\n'}Tenant: Expats, short-term holiday lets{'\n'}Best for: Lifestyle + Airbnb potential</Text>
              </View>
              <View style={s.zoneCard}>
                <Text style={s.zoneTitle}>Dubai Creek Harbour</Text>
                <Text style={s.zoneMeta}>Entry: AED 800K–3M{'\n'}Yield: <Text style={s.zoneYield}>7–9% gross</Text>{'\n'}Tenant: Families, waterfront community{'\n'}Best for: Long-term capital appreciation</Text>
              </View>
              <View style={s.zoneCard}>
                <Text style={s.zoneTitle}>Dubai South / Expo City</Text>
                <Text style={s.zoneMeta}>Entry: AED 400K–1.5M{'\n'}Yield: <Text style={s.zoneYield}>8–11% gross</Text>{'\n'}Tenant: Airport workers, Al Maktoum growth{'\n'}Best for: Long-horizon appreciation play</Text>
              </View>
              <View style={s.zoneCard}>
                <Text style={s.zoneTitle}>Dubai Islands</Text>
                <Text style={s.zoneMeta}>Entry: AED 1.2M–8M{'\n'}Yield: <Text style={s.zoneYield}>7–9% gross (projected)</Text>{'\n'}Tenant: Luxury, ultra-HNI{'\n'}Best for: Premium off-plan early entry</Text>
              </View>
            </View>
          </View>

          <Text style={s.h3}>Zone Selection Strategy</Text>
          <Text style={s.body}>
            Your optimal zone depends on three variables: investment horizon, risk appetite, and primary objective (yield vs appreciation). As a general framework:
          </Text>
          <Bullet>Yield-maximisers (want income from year 1): Business Bay, JLT, or JVC offer the highest gross yields with stable occupancy above 90%.</Bullet>
          <Bullet>Appreciation-seekers (10-year horizon): Downtown, Dubai Islands, and Dubai Creek Harbour have the strongest track records for capital value growth.</Bullet>
          <Bullet>Balanced approach: Business Bay and Dubai Marina offer a middle path — solid yields with genuine appreciation upside.</Bullet>
          <Bullet>Budget-conscious entry (under ₹1 Crore): JVC and Dubai South provide genuine Dubai real estate exposure at entry points accessible to most Indian investors.</Bullet>

          <View style={s.calloutGreen}>
            <Text style={s.calloutGreenText}>
              Parva Realty has active relationships with the leading developers in each of these zones. We can provide zone-specific inventory, current pricing, and payment plan structures for any of the above areas on request.
            </Text>
          </View>
        </View>
        <View style={s.pageFooter}>
          <Text style={s.pageFooterTxt}>© 2025 Parva Realty  ·  Confidential</Text>
          <Text style={s.pageFooterGold}>7</Text>
        </View>
      </Page>

      {/* ═══ PAGE 6: OFF-PLAN vs READY ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.inner}>
          <PageHeader chapter="Chapter 04 — Off-Plan vs Ready" />

          <Text style={s.chapterLabel}>Chapter 04</Text>
          <Text style={s.chapterTitle}>Off-Plan vs Ready Properties</Text>
          <Text style={s.chapterSubtitle}>"Two fundamentally different risk-return profiles. Choose based on your horizon."</Text>
          <View style={s.chapterDivider} />

          <View style={s.tableHeader}>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>Factor</Text></View>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>Off-Plan</Text></View>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>Ready Property</Text></View>
          </View>
          {[
            ['Entry Price', 'Typically 10–20% below market value at launch', 'Current market price — no discount'],
            ['Payment Structure', '10–70% during construction; balance on handover', 'Full payment at purchase (or mortgage)'],
            ['Rental Income', 'Deferred until handover (1–4 years)', 'Immediate — from month 1 post-purchase'],
            ['Capital Appreciation', 'High potential — buy at pre-market prices', 'Moderate — already at market price'],
            ['Risk Profile', 'Construction risk; developer risk', 'Lower risk — asset exists and is tangible'],
            ['Mortgage Eligibility', 'Limited — most banks fund ready properties', 'Full mortgage available (up to 75% LTV for non-residents)'],
            ['Flexibility', 'Can sell SPA before handover (flipping)', 'Can sell or rent immediately'],
            ['Best For', 'Investors with 3–5 year horizon, capital growth focus', 'Investors wanting immediate income and lower risk'],
          ].map(([f, o, r], i) => (
            <View key={f} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
              <View style={s.tableCell}><Text style={{ ...s.tableCellTxt, color: TEXT_H, fontWeight: 700 }}>{f}</Text></View>
              <View style={s.tableCell}><Text style={s.tableCellTxt}>{o}</Text></View>
              <View style={s.tableCell}><Text style={s.tableCellTxt}>{r}</Text></View>
            </View>
          ))}

          <Text style={s.h3}>Understanding Off-Plan Payment Plans</Text>
          <Text style={s.body}>
            Dubai's off-plan market is driven by developer-structured payment plans that make entry extremely accessible. Unlike many global markets where you pay 100% upfront, Dubai developers spread payments over the construction period — and often beyond.
          </Text>
          <Text style={s.h4}>Common Payment Plan Structures</Text>
          <Bullet>10/80/10 Plan: 10% booking deposit → 80% in installments during construction → 10% on handover. Extremely cash-flow friendly.</Bullet>
          <Bullet>Post-Handover Plans: 60% during construction, 40% paid over 2–3 years after handover. You can rent the unit to fund post-handover payments — effectively using your tenant's rent to pay the developer.</Bullet>
          <Bullet>1% Monthly Plans: Some developers offer 1% of purchase price per month over 3–5 years. A AED 1.5M apartment = AED 15,000/month — often below the rental yield the property generates.</Bullet>

          <View style={s.callout}>
            <Text style={s.calloutLabel}>The Post-Handover Play</Text>
            <Text style={s.calloutText}>
              The most popular structure for Indian investors: purchase off-plan with a post-handover plan. At handover, the property is leased. Rental income covers part or all of the remaining installments, creating a near-self-funding investment after an initial equity injection of 20–30%.
            </Text>
          </View>

          <Text style={s.h3}>Developer Due Diligence</Text>
          <Text style={s.body}>
            Not all Dubai developers are equal. Before committing to any off-plan project, verify:
          </Text>
          <Bullet>RERA registration number for the specific project (check on the Dubai REST app).</Bullet>
          <Bullet>Escrow account number — funds must go into a registered escrow account, not directly to the developer's operating account.</Bullet>
          <Bullet>Developer track record: previous project delivery timelines, quality, and financial health.</Bullet>
          <Bullet>Project completion guarantee: the DLD registers charges against the project to protect buyers in case of developer failure.</Bullet>
          <Text style={s.body}>
            Parva Realty only presents properties from RERA-verified developers with a proven track record of on-time delivery and high construction quality.
          </Text>
        </View>
        <View style={s.pageFooter}>
          <Text style={s.pageFooterTxt}>© 2025 Parva Realty  ·  Confidential</Text>
          <Text style={s.pageFooterGold}>9</Text>
        </View>
      </Page>

      {/* ═══ PAGE 7: ROI NUMBERS ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.inner}>
          <PageHeader chapter="Chapter 05 — ROI Deep Dive" />

          <Text style={s.chapterLabel}>Chapter 05</Text>
          <Text style={s.chapterTitle}>Understanding the Numbers — ROI Deep Dive</Text>
          <Text style={s.chapterSubtitle}>"The math is compelling. Here is why."</Text>
          <View style={s.chapterDivider} />

          <Text style={s.lead}>
            Let us model a real investment scenario to illustrate the full return picture for an Indian investor purchasing a Dubai property today.
          </Text>

          <Text style={s.h3}>Worked Example: AED 1.2 Million Apartment in Business Bay</Text>
          <View style={s.callout}>
            <Text style={s.calloutLabel}>Investment Assumptions</Text>
            <Text style={s.calloutText}>
              Property: 1 BHK, Business Bay{'\n'}
              Purchase price: AED 1,200,000 (approx. ₹2.74 Crore at AED 1 = ₹22.8){'\n'}
              Down payment: AED 360,000 (30%){'\n'}
              Annual gross rent: AED 120,000 (10% gross yield){'\n'}
              Annual service charges: AED 18,000 (1.5%){'\n'}
              Net yield after charges: ~8.5% = AED 102,000/year{'\n'}
              5-year conservative capital appreciation: 30% = AED 360,000 gain
            </Text>
          </View>

          <Text style={s.h4}>5-Year Return Projection (INR Terms)</Text>
          <View style={s.tableHeader}>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>Return Component</Text></View>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>AED</Text></View>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>INR (approx.)</Text></View>
          </View>
          {[
            ['Net rental income (5 yrs)', 'AED 510,000', '₹1.16 Cr'],
            ['Capital appreciation (30%)', 'AED 360,000', '₹82 L'],
            ['Currency gain (INR depreciation ~15%)', '—', '₹41 L (on principal)'],
            ['Total gross return', 'AED 870,000', '₹1.98 Cr+'],
            ['Total ROI on 30% down payment (₹62.5L)', '—', '317% in 5 years'],
          ].map(([f, a, r], i) => (
            <View key={f} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
              <View style={s.tableCell}><Text style={{ ...s.tableCellTxt, color: i === 4 ? GOLD : TEXT_H }}>{f}</Text></View>
              <View style={s.tableCell}><Text style={{ ...s.tableCellTxt, color: i === 4 ? GOLD : TEXT_M }}>{a}</Text></View>
              <View style={s.tableCell}><Text style={{ ...s.tableCellTxt, color: i === 4 ? GOLD : TEXT_M, fontWeight: i === 4 ? 700 : 400 }}>{r}</Text></View>
            </View>
          ))}

          <Text style={{ ...s.body, marginTop: 14, fontSize: 8, fontStyle: 'italic', color: TEXT_F }}>
            Projections are illustrative and based on historical averages. Actual returns vary. Currency conversion assumes continued rupee depreciation at historical rates.
          </Text>

          <Text style={s.h3}>Dubai vs India: Investment Comparison</Text>
          <View style={s.tableHeader}>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>Metric</Text></View>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>Dubai Property</Text></View>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>Mumbai Property</Text></View>
          </View>
          {[
            ['Gross Rental Yield', '8–12%', '2–3%'],
            ['Capital Gains Tax', '0%', '20% (LTCG with indexation)'],
            ['Rental Income Tax', '0% (in UAE)', 'As per income slab (up to 30%)'],
            ['Entry Costs (stamp duty etc.)', '~4% DLD fee', '5–7% stamp duty'],
            ['Occupancy Rates (prime zones)', '90–95%', '60–75%'],
            ['Currency exposure', 'USD-pegged', 'INR only'],
            ['Title deed / legal process', 'Simple, fast (2–4 weeks)', 'Complex, slow (2–6 months)'],
          ].map(([f, d, m], i) => (
            <View key={f} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
              <View style={s.tableCell}><Text style={{ ...s.tableCellTxt, color: TEXT_H, fontWeight: 700 }}>{f}</Text></View>
              <View style={s.tableCell}><Text style={{ ...s.tableCellTxt, color: GREEN }}>{d}</Text></View>
              <View style={s.tableCell}><Text style={s.tableCellTxt}>{m}</Text></View>
            </View>
          ))}

          <View style={s.calloutGreen}>
            <Text style={s.calloutGreenText}>
              Net effective yield advantage: An Indian investor in a Dubai property earning 8.5% net, compared to a Mumbai investor earning 2.5% gross and paying 30% tax on it (net: ~1.75%), is earning nearly 5× the after-tax rental return per rupee invested.
            </Text>
          </View>
        </View>
        <View style={s.pageFooter}>
          <Text style={s.pageFooterTxt}>© 2025 Parva Realty  ·  Confidential</Text>
          <Text style={s.pageFooterGold}>11</Text>
        </View>
      </Page>

      {/* ═══ PAGE 8: LRS PROCESS ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.inner}>
          <PageHeader chapter="Chapter 06 — LRS Fund Transfer Process" />

          <Text style={s.chapterLabel}>Chapter 06</Text>
          <Text style={s.chapterTitle}>Transferring Money from India: The LRS Process</Text>
          <Text style={s.chapterSubtitle}>"Simple, legal, and used by thousands of Indian investors every year."</Text>
          <View style={s.chapterDivider} />

          <Text style={s.body}>
            The most common concern among first-time Indian overseas property investors is: "How do I legally send money to Dubai?" The answer is straightforward — the RBI's Liberalised Remittance Scheme (LRS) has been designed precisely for this purpose.
          </Text>

          <Text style={s.h3}>Step-by-Step LRS Remittance Process</Text>
          <Step n={1} title="Open a Foreign Currency Account (if required)" body="Most major Indian banks allow LRS transfers from existing savings accounts. Some investors prefer to maintain an NRE or NRO account, but a resident savings account works for property purchase remittances." />
          <Step n={2} title="Obtain Your Tax PAN and ITR" body="You will need a valid PAN card and typically the last 2 years of ITRs for compliance. Your bank's AD (Authorised Dealer) forex desk will request these." />
          <Step n={3} title="Submit Form A2" body="This is the RBI's prescribed form for overseas remittances. Your bank will provide it. You declare the purpose (immovable property purchase abroad) and the recipient details (developer's escrow account in Dubai)." />
          <Step n={4} title="Provide Supporting Documents" body="SPA or booking form from the Dubai developer, DLD property registration receipt, and a copy of your passport. The bank's compliance team will verify these." />
          <Step n={5} title="Initiate the Wire Transfer" body="Your bank will process the SWIFT wire transfer to the developer's escrow account in Dubai. Processing typically takes 1–3 business days." />
          <Step n={6} title="Receive Transfer Confirmation" body="Keep the bank's FEMA declaration and the SWIFT confirmation for your records — these are critical for filing Schedule FA in your ITR." />

          <View style={s.callout}>
            <Text style={s.calloutLabel}>TCS — Plan Your Tax Cash Flow</Text>
            <Text style={s.calloutText}>
              For remittances above ₹7 Lakhs per year, your bank will collect TCS at 20%. On a ₹50 Lakh transfer, this means ₹10 Lakhs is blocked as advance tax. This is credited against your income tax liability and refunded/adjusted in your ITR. Plan your remittance timing to align with your tax year and consult a CA if TCS cash outflow is a concern.
            </Text>
          </View>

          <Text style={s.h3}>Documents Checklist for LRS Remittance</Text>
          <Bullet>Valid Indian Passport</Bullet>
          <Bullet>PAN Card</Bullet>
          <Bullet>Last 2 years' Income Tax Returns (ITR)</Bullet>
          <Bullet>Form A2 (provided by your bank)</Bullet>
          <Bullet>Developer's Sale and Purchase Agreement (SPA) or booking form</Bullet>
          <Bullet>Developer's RERA registration certificate for the project</Bullet>
          <Bullet>Escrow account details from the developer</Bullet>
          <Bullet>Source of funds declaration (bank statement showing the funds in your account)</Bullet>

          <Text style={s.h3}>Splitting Remittances Across Years</Text>
          <Text style={s.body}>
            For larger investments, multiple individuals (spouses, adult children) can each remit up to $250,000, effectively enabling a family to move up to $500,000–$750,000 per financial year. This is commonly used for higher-value property purchases and is entirely within FEMA guidelines provided each person genuinely co-invests in the property and is listed on the Title Deed.
          </Text>

          <View style={s.warningBox}>
            <Text style={s.warningTitle}>Never Use Hawala or Informal Channels</Text>
            <Text style={s.warningText}>
              We occasionally hear of investors using informal money transfer channels to avoid TCS or documentation requirements. This is a serious FEMA violation carrying penalties up to 3× the remitted amount and potential imprisonment. All Parva-facilitated purchases use the formal banking route with complete documentation.
            </Text>
          </View>
        </View>
        <View style={s.pageFooter}>
          <Text style={s.pageFooterTxt}>© 2025 Parva Realty  ·  Confidential</Text>
          <Text style={s.pageFooterGold}>13</Text>
        </View>
      </Page>

      {/* ═══ PAGE 9: PURCHASE PROCESS ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.inner}>
          <PageHeader chapter="Chapter 07 — Step-by-Step Purchase Process" />

          <Text style={s.chapterLabel}>Chapter 07</Text>
          <Text style={s.chapterTitle}>The Step-by-Step Purchase Process</Text>
          <Text style={s.chapterSubtitle}>"From property selection to receiving your Title Deed — typically 2–4 weeks."</Text>
          <View style={s.chapterDivider} />

          <Text style={s.lead}>
            Unlike India's notoriously complex property registration process, Dubai's real estate transaction system is remarkably efficient. A typical purchase — from signing to Title Deed — can be completed in 2–4 weeks.
          </Text>

          <Step n={1} title="Property Selection & Due Diligence" body="Identify the property with your Parva advisor. We conduct a full due diligence check: developer credentials, RERA escrow status, project status, and market comparables. You receive a detailed property report before making any payment." />
          <Step n={2} title="Booking Form & Token Payment" body="Sign the booking form and pay the token (typically 5–10% of purchase price) to reserve the unit. For off-plan, this is paid into the developer's RERA escrow account. For ready properties, it is paid to the seller's account with an agreed SPA timeline." />
          <Step n={3} title="Sale & Purchase Agreement (SPA)" body="A formal SPA is executed between buyer and seller (or buyer and developer). Review the SPA carefully — payment schedule, handover date, penalty clauses for late completion, and snagging resolution procedure. Parva's legal team assists with SPA review." />
          <Step n={4} title="Remittance via LRS" body="Transfer the purchase funds from India to the developer's Dubai escrow account via formal banking channels (as detailed in Chapter 06). Retain all SWIFT confirmations." />
          <Step n={5} title="DLD Registration & 4% Transfer Fee" body="The property is registered at the Dubai Land Department. The DLD charges a 4% transfer fee on the transaction value, payable once. This fee is split 50/50 between buyer and seller in ready transactions, or entirely paid by the buyer for off-plan (negotiable)." />
          <Step n={6} title="Title Deed Issuance" body="The DLD issues the electronic Title Deed in your name. This is the definitive proof of ownership, recorded in the government's property registry. A physical copy is also available on request." />
          <Step n={7} title="Property Handover (Off-Plan)" body="At project completion, conduct a snagging inspection with the developer. The developer must resolve all snags (defects) before handover. RERA protects buyers against defects for a defined warranty period post-handover." />

          <Text style={s.h3}>One-Time Costs to Budget For</Text>
          <View style={s.tableHeader}>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>Cost Item</Text></View>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>Amount</Text></View>
            <View style={s.tableCell}><Text style={s.tableHeaderTxt}>Notes</Text></View>
          </View>
          {[
            ['DLD Transfer Fee', '4% of purchase price', 'One-time, mandatory'],
            ['DLD Admin Fee', 'AED 4,200–5,250', 'Flat fee per transaction'],
            ['Broker Commission', '2% of purchase price', 'Paid by buyer in most cases'],
            ['Legal / Conveyancing', 'AED 5,000–15,000', 'Optional but recommended'],
            ['Title Deed Fee', 'AED 250–500', 'Nominal DLD charge'],
            ['Total Estimated Costs', '~5–6% of purchase price', 'Budget accordingly'],
          ].map(([f, a, n], i) => (
            <View key={f} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
              <View style={s.tableCell}><Text style={{ ...s.tableCellTxt, color: TEXT_H }}>{f}</Text></View>
              <View style={s.tableCell}><Text style={{ ...s.tableCellTxt, color: GOLD }}>{a}</Text></View>
              <View style={s.tableCell}><Text style={s.tableCellTxt}>{n}</Text></View>
            </View>
          ))}

          <View style={s.callout}>
            <Text style={s.calloutLabel}>Remote Purchase is Possible</Text>
            <Text style={s.calloutText}>
              Indian investors can complete the full purchase process remotely via a Power of Attorney (POA). The POA must be notarised in India and attested by the UAE Embassy. Parva's legal team can arrange and manage this process. However, we strongly recommend a Dubai visit to inspect the property and meet the developer — this is the purpose of our Discovery Package.
            </Text>
          </View>
        </View>
        <View style={s.pageFooter}>
          <Text style={s.pageFooterTxt}>© 2025 Parva Realty  ·  Confidential</Text>
          <Text style={s.pageFooterGold}>15</Text>
        </View>
      </Page>

      {/* ═══ PAGE 10: POST-PURCHASE & TAX ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.inner}>
          <PageHeader chapter="Chapters 08 & 09 — Post-Purchase & Tax Planning" />

          <Text style={s.chapterLabel}>Chapter 08</Text>
          <Text style={s.chapterTitle}>Post-Purchase: Rental, Management & Repatriation</Text>
          <View style={{ height: 14 }} />

          <Text style={s.h3}>Setting Up for Rental Income</Text>
          <Bullet>EJARI Registration: All rental contracts in Dubai must be registered on the EJARI system (Dubai's official tenancy contract registry). Your property manager handles this, and it protects both landlord and tenant.</Bullet>
          <Bullet>Short-term vs Long-term: Long-term leases (1 year) provide stable income. Short-term (Airbnb / holiday let) can yield 20–30% more but requires a DTCM (Dubai Tourism) licence and active management. Parva can arrange both.</Bullet>
          <Bullet>Property Management: For non-resident owners, Parva's Dubai-based team handles tenant sourcing, rent collection, maintenance, and EJARI renewals for a fee of 8–10% of annual rent — far lower than the 15–20% typical of Mumbai managers.</Bullet>

          <Text style={s.h3}>Repatriating Rental Income to India</Text>
          <Text style={s.body}>
            Rental income earned in Dubai can be repatriated to India freely. The recommended route is:
          </Text>
          <Bullet>Open a Non-Resident Ordinary (NRO) account in India. Rental income repatriated from abroad should be credited here.</Bullet>
          <Bullet>NRO repatriation to a resident account: Up to $1 million per financial year can be repatriated from an NRO account after payment of applicable Indian taxes. A CA certificate (Form 15CB) is required.</Bullet>
          <Bullet>The income is declared in Schedule FA and Schedule FSI of your ITR, and Indian taxes are calculated at your applicable slab rate, with credit for any taxes paid abroad (though Dubai has none).</Bullet>

          <View style={s.sectionDivider} />

          <Text style={s.chapterLabel}>Chapter 09</Text>
          <Text style={s.chapterTitle}>Tax Planning for Indian Property Owners</Text>
          <View style={{ height: 8 }} />

          <Text style={s.h3}>Your Tax Obligations in India</Text>
          <Bullet>Rental Income: Declared as income from other sources in your ITR. Taxed at your applicable income tax slab. Standard deduction of 30% is available on annual rental income even for foreign property (Section 24).</Bullet>
          <Bullet>Capital Gains on Sale: Long-term capital gains (held 24+ months) are taxed at 12.5% without indexation (as per Finance Act 2024) or 20% with indexation — whichever is more beneficial.</Bullet>
          <Bullet>Schedule FA Disclosure: Foreign assets must be declared annually in Schedule FA of the ITR. Include property address, acquisition date, cost, and any rental income received.</Bullet>
          <Bullet>Schedule FSI: Foreign source income (rental income from Dubai) must be reported in Schedule FSI with tax computation.</Bullet>
          <Bullet>DTAA Benefit: India and UAE have a Double Taxation Avoidance Agreement (DTAA). As Dubai levies no tax on property income, the DTAA primarily protects you from double taxation in the event UAE introduces taxes in future.</Bullet>

          <View style={s.callout}>
            <Text style={s.calloutLabel}>Practical Tax Planning Tip</Text>
            <Text style={s.calloutText}>
              Many Indian investors hold Dubai property in the name of a UAE-based company (LLC or Free Zone entity). This can provide additional tax planning opportunities, but involves setup costs and annual compliance. Discuss this structure with a CA or tax advisor before proceeding — Parva can refer you to qualified practitioners.
            </Text>
          </View>

          <Text style={s.h3}>Golden Visa and Tax Residency</Text>
          <Text style={s.body}>
            If you invest AED 2 Million or more (approximately ₹4.5 Crore) and obtain the UAE 10-year Golden Visa, you may qualify as a UAE tax resident. UAE tax residents are not subject to Indian tax on foreign-source income, provided you meet the non-resident criteria under Indian tax law (spend fewer than 182 days in India in a financial year). This is a significant tax planning opportunity for high-net-worth investors.
          </Text>
        </View>
        <View style={s.pageFooter}>
          <Text style={s.pageFooterTxt}>© 2025 Parva Realty  ·  Confidential</Text>
          <Text style={s.pageFooterGold}>17</Text>
        </View>
      </Page>

      {/* ═══ PAGE 11: MISTAKES & PARVA ═══ */}
      <Page size="A4" style={s.page}>
        <View style={s.inner}>
          <PageHeader chapter="Chapters 10 & 11 — Common Mistakes & Parva Realty" />

          <Text style={s.chapterLabel}>Chapter 10</Text>
          <Text style={s.chapterTitle}>Common Mistakes and How to Avoid Them</Text>
          <View style={s.chapterDivider} />

          <Numbered n="01" title="Buying from an unregistered broker" body="Always verify broker registration on the RERA website. Unregistered brokers operate outside regulatory oversight and cannot legally represent properties." />
          <Numbered n="02" title="Not verifying the escrow account" body="For off-plan, your payment must go to a RERA-registered escrow account — not the developer's operating account. Demand the escrow account number and verify it on the Dubai REST app before any transfer." />
          <Numbered n="03" title="Ignoring service charges" body="Dubai properties carry annual service charges (community maintenance, facilities, security). These typically run 1–2% of property value per year. Factor these into your yield calculations." />
          <Numbered n="04" title="Remitting informally to avoid TCS" body="Using hawala or informal channels to avoid the 20% TCS is a serious FEMA violation. The TCS is not a loss — it is adjustable against your tax liability and refundable." />
          <Numbered n="05" title="Not disclosing the asset in ITR" body="Forgetting (or ignoring) Schedule FA disclosure is the single biggest compliance risk for Indian overseas property owners. The Black Money Act penalties are severe." />
          <Numbered n="06" title="Choosing location based on glossy brochures" body="Yield and occupancy data matter more than developer marketing. Ask for historical occupancy rates and comparable rental transactions in the specific building and zone." />
          <Numbered n="07" title="Signing the SPA without legal review" body="The SPA is a legally binding document. Even a quick review by a UAE-licensed lawyer (1–2 hours, AED 2,000–5,000) can identify clauses that expose you to unnecessary risk." />
          <Numbered n="08" title="Underestimating total acquisition cost" body="Budget ~5–6% of purchase price for DLD fees, broker commission, and legal costs on top of the property price. Many investors are surprised by these." />

          <View style={s.sectionDivider} />

          <Text style={s.chapterLabel}>Chapter 11</Text>
          <Text style={s.chapterTitle}>The Parva Realty Advantage</Text>
          <View style={s.chapterDivider} />

          <Text style={s.lead}>
            We built Parva Realty specifically for the Indian investor who is sophisticated enough to recognise the Dubai opportunity, but needs a trusted bridge between India and Dubai to navigate it safely and profitably.
          </Text>

          <View style={s.twoCol}>
            <View style={s.colLeft}>
              <Text style={s.h4}>End-to-End Service</Text>
              <Text style={s.body}>From first consultation to post-handover property management — Parva handles every step. You never need to navigate Dubai's property market alone.</Text>
              <Text style={s.h4}>Curated Developer Access</Text>
              <Text style={s.body}>We have direct relationships with 50+ Dubai developers across all price points and zones. We negotiate pricing, payment plan flexibility, and exclusive inventory that is unavailable to walk-in buyers.</Text>
              <Text style={s.h4}>India-Based Advisory Team</Text>
              <Text style={s.body}>Our advisors are Indian professionals who understand both the Indian financial system (LRS, FEMA, TCS) and Dubai's property market — a combination that is genuinely rare.</Text>
            </View>
            <View style={s.colRight}>
              <Text style={s.h4}>Dubai Discovery Package</Text>
              <Text style={s.body}>We sponsor a 3-night, 4-day trip to Dubai for serious investors — flights and hotel covered. You inspect properties in person, meet developers, and experience the city before committing a rupee.</Text>
              <Text style={s.h4}>Legal & Compliance Support</Text>
              <Text style={s.body}>Our network of UAE lawyers and Indian CAs ensures your purchase is clean, documented, and compliant — from SPA review to ITR disclosure.</Text>
              <Text style={s.h4}>Post-Purchase Management</Text>
              <Text style={s.body}>Dubai-based team manages your property end-to-end: tenant sourcing, EJARI, maintenance, and monthly reporting. You invest from India; we operate from Dubai.</Text>
            </View>
          </View>

          <View style={{ height: 20 }} />

          <View style={{ backgroundColor: '#161208', borderWidth: 1, borderColor: GOLD, borderRadius: 8, padding: 20 }}>
            <Text style={{ fontFamily: 'Cinzel', fontSize: 14, color: TEXT_H, fontWeight: 700, marginBottom: 10, textAlign: 'center' }}>Ready to Take the Next Step?</Text>
            <Text style={{ fontFamily: 'Outfit', fontSize: 9.5, color: TEXT_M, lineHeight: 1.7, textAlign: 'center', marginBottom: 14 }}>
              Book a complimentary 30-minute consultation with a Parva advisor. We will review your investment goals, budget, and timeline, and recommend the 2–3 properties most likely to deliver your target outcome.
            </Text>
            <Text style={{ fontFamily: 'Outfit', fontSize: 9, color: GOLD, textAlign: 'center', lineHeight: 1.8 }}>
              invest@parvarealty.ae  ·  +971 56 422 7855  ·  +971 4 272 6685
            </Text>
            <Text style={{ fontFamily: 'Outfit', fontSize: 9, color: TEXT_F, textAlign: 'center', marginTop: 4 }}>
              Office 3404, Aspin Commercial Tower, Sheikh Zayed Road, Dubai, UAE
            </Text>
          </View>
        </View>
        <View style={s.pageFooter}>
          <Text style={s.pageFooterTxt}>© 2025 Parva Realty  ·  invest@parvarealty.ae  ·  All rights reserved</Text>
          <Text style={s.pageFooterGold}>23</Text>
        </View>
      </Page>
    </Document>
  )
}
