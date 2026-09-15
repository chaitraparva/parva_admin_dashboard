export type ArticleSection =
  | { type: 'lead'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'body'; text: string }
  | { type: 'callout'; label: string; text: string }
  | { type: 'callout-green'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'stat-row'; stats: { value: string; label: string }[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'sources'; items: { label: string; url: string }[] }

export interface Article {
  id: string
  tag: string
  title: string
  excerpt: string
  mins: string
  img: string
  author: string
  date: string
  sections: ArticleSection[]
}

export const articles: Article[] = [
  // ─────────────────────────────────────────────────────────────
  // ARTICLE 1
  // ─────────────────────────────────────────────────────────────
  {
    id: 'indian-investors-dubai-2025',
    tag: 'Market Insight',
    title: 'Dubai Real Estate 2025: Why Indian Investors Are Leading the Wave',
    excerpt: 'Over 200,000 Indian nationals now own property in Dubai. We break down the macro forces behind this shift and why the opportunity window remains wide open.',
    mins: '7 min read',
    img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&h=600&fit=crop&auto=format',
    author: 'Parva Realty Research Desk',
    date: 'June 2025',
    sections: [
      {
        type: 'lead',
        text: "For three consecutive years, Indian nationals have topped Dubai Land Department's foreign buyer rankings — outpacing buyers from the United Kingdom, Russia, China, and Pakistan combined. This is not a passing trend. It is the convergence of structural forces that have been building for a decade, and they are not going away.",
      },
      {
        type: 'stat-row',
        stats: [
          { value: '#1', label: 'Nationality of foreign buyers in Dubai, 2022–2024 (DLD)' },
          { value: '3.5M+', label: 'Indian nationals living in the UAE today' },
          { value: '$4.1B', label: 'LRS remittances for overseas property in FY2024 (RBI)' },
          { value: '17.4%', label: 'Dubai residential price growth in 2024 (ValuStrat)' },
        ],
      },
      {
        type: 'h2',
        text: 'The Numbers Behind the Narrative',
      },
      {
        type: 'body',
        text: "According to the Dubai Land Department's 2024 annual report, Indians accounted for 21% of all foreign real estate transactions by value — more than any other nationality. The total value of Indian buyer transactions in Dubai exceeded AED 31 billion (approximately ₹70,000 crore) in 2024 alone. These are not speculative figures. They are registered transaction data from one of the world's most transparent property registries.",
      },
      {
        type: 'body',
        text: "On the India side, the Reserve Bank of India's LRS outflow data corroborates this. Remittances classified under 'purchase of immovable property abroad' reached $4.1 billion in FY2024, up from $2.3 billion in FY2022 — a 78% increase in two years. The overwhelming majority of this flow goes to the UAE, and specifically to Dubai.",
      },
      {
        type: 'h2',
        text: 'Why Dubai, and Why Now?',
      },
      {
        type: 'h3',
        text: '1. The Yield Differential Is Structural, Not Cyclical',
      },
      {
        type: 'body',
        text: "Mumbai's average gross rental yield sits at 2.1–2.8% across prime localities (Knight Frank India, 2024). Dubai's Business Bay and JLT regularly deliver 9–11% gross yields on comparable unit types. This is not a market aberration — it reflects Dubai's unique position as a city with enormous demand (nearly 90% of residents are tenants) and relatively constrained supply in quality zones.",
      },
      {
        type: 'body',
        text: "After accounting for Dubai's zero rental income tax versus India's slab-rate taxation (up to 30%), the net effective yield differential for a 30% tax bracket Indian investor can be 6× or more. On a ₹2 crore investment, this difference amounts to ₹10–12 lakhs in annual post-tax income.",
      },
      {
        type: 'h3',
        text: '2. The Rupee Depreciation Multiplier',
      },
      {
        type: 'body',
        text: "The Indian rupee has depreciated against the US dollar at an average rate of 3.8% per year over the past 20 years (RBI data). Since the UAE dirham is pegged to the USD at a fixed rate of 3.67 since 1997, every Dubai property held by an Indian investor automatically appreciates in rupee terms at this rate — independent of any property price movement.",
      },
      {
        type: 'callout',
        label: 'The Currency Compounding Effect',
        text: "A Dubai apartment purchased in January 2015 for AED 800,000 (₹1.33 crore at the time) would now convert to approximately ₹1.83 crore — a 37% gain in INR terms purely from currency movement, even before accounting for property price appreciation or rental income. Dubai residential prices also rose 67% between 2020 and 2024 (CBRE), compounding the return significantly further.",
      },
      {
        type: 'h3',
        text: '3. The Indian Community Effect',
      },
      {
        type: 'body',
        text: "3.5 million Indians live in the UAE, making them the single largest national group in the country. This creates a deep, liquid rental market for Indian investors' properties. An Indian-owned apartment in JLT or Business Bay can be leased to an Indian professional within days of listing — a cultural familiarity and demand pool that simply does not exist for Indian investors buying in London, New York, or Sydney.",
      },
      {
        type: 'h3',
        text: '4. Legal Framework Maturity',
      },
      {
        type: 'body',
        text: "Both India's outbound investment framework (RBI LRS) and Dubai's foreign ownership laws have matured significantly. RERA's escrow mandates protect off-plan buyers. The DLD's blockchain-based registry provides instant, fraud-resistant title verification. And India's DTAA with the UAE ensures no double taxation on income. The legal infrastructure supporting this transaction corridor is now among the most robust in global cross-border real estate.",
      },
      {
        type: 'h2',
        text: 'The Market Conditions in 2025',
      },
      {
        type: 'body',
        text: "Dubai's residential market has been in a sustained bull cycle since Q3 2020. ValuStrat's Price Index recorded 17.4% year-on-year growth for 2024, with some off-plan zones (Dubai South, Dubai Islands) recording 25–30% appreciation. The question most Indian investors ask is: have I missed the rally?",
      },
      {
        type: 'body',
        text: "The short answer is: probably not. Dubai's population is projected to grow from 3.7 million today to 5.8 million by 2040 (Dubai Statistics Centre). The new Al Maktoum International Airport — set to be the world's largest when complete — anchors Dubai South as a multi-decade growth corridor. And supply in the most desirable zones (Downtown, Business Bay, Palm) remains structurally constrained by geography and zoning.",
      },
      {
        type: 'callout-green',
        text: "Knight Frank's Wealth Report 2024 ranked Dubai as the world's top destination for ultra-high-net-worth individual (UHNWI) relocation for the second consecutive year. The influx of global wealth — from Europe, Russia, and increasingly Southeast Asia — creates a floor under Dubai property prices that did not exist a decade ago.",
      },
      {
        type: 'h2',
        text: 'Who Is Buying and What Are They Buying?',
      },
      {
        type: 'body',
        text: "Parva Realty's own client data aligns with broader market trends. The majority of Indian buyers in 2024 fall into three profiles: (1) salaried professionals with ₹1–3 crore to invest, targeting JVC and Business Bay studios/1BRs as yield assets; (2) business owners seeking currency diversification and portfolio balance, targeting ₹5–15 crore properties in Business Bay and Palm; and (3) entrepreneurs targeting the AED 2M+ threshold for the 10-year Golden Visa.",
      },
      {
        type: 'body',
        text: "Off-plan properties represent 73% of Indian buyer transactions (DLD, 2024), driven by developer payment plans that allow phased investment under the RBI's $250,000 annual LRS cap. The typical Indian investor funds a ₹2–4 crore Dubai property over 2–3 financial years — a structure that is both legal and increasingly common.",
      },
      {
        type: 'h2',
        text: 'The Outlook',
      },
      {
        type: 'body',
        text: "The macro tailwinds — population growth, airport expansion, global wealth migration, and India's growing HNI base — point to continued strength. Yield compression in the most liquid zones (JLT, Business Bay) is gradually underway as capital continues to flow in, but still offers exceptional returns relative to Indian domestic alternatives. The window of 9–11% gross yields in prime zones is unlikely to remain open indefinitely.",
      },
      {
        type: 'body',
        text: "For the Indian investor who has been watching from the sidelines, the question is no longer whether Dubai makes sense. The question is which zone, which product type, and which payment plan fits your financial plan. That is the question Parva Realty exists to answer.",
      },
      {
        type: 'sources',
        items: [
          { label: 'Dubai Land Department — Annual Transaction Report 2024', url: 'https://www.dubailand.gov.ae' },
          { label: 'Reserve Bank of India — LRS Outflow Data FY2024', url: 'https://www.rbi.org.in' },
          { label: 'Knight Frank — The Wealth Report 2024', url: 'https://www.knightfrank.com/wealthreport' },
          { label: 'ValuStrat — Dubai Price Index Q4 2024', url: 'https://www.valustrat.com' },
          { label: 'CBRE — Dubai Residential Market Report 2024', url: 'https://www.cbre.com' },
          { label: 'Dubai Statistics Centre — Population Projections 2040', url: 'https://www.dsc.gov.ae' },
          { label: 'Knight Frank India — India Real Estate Outlook 2024', url: 'https://www.knightfrank.co.in' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ARTICLE 2
  // ─────────────────────────────────────────────────────────────
  {
    id: 'rbi-lrs-fema-guide',
    tag: 'Legal Guide',
    title: 'RBI LRS & FEMA: Your Complete Guide to Sending Money to Dubai',
    excerpt: "India's Liberalised Remittance Scheme allows up to $250,000 per year. Here is exactly how to use it to fund your Dubai property investment — legally and efficiently.",
    mins: '12 min read',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop&auto=format',
    author: 'Parva Realty Legal & Compliance Team',
    date: 'May 2025',
    sections: [
      {
        type: 'lead',
        text: "The single most common reason Indian investors delay or abandon a Dubai property investment is uncertainty about how to legally move money abroad. The framework is simpler than most assume — and has been used by hundreds of thousands of Indian residents without incident. This guide covers everything you need to know.",
      },
      {
        type: 'callout',
        label: 'Important Disclaimer',
        text: "This article is for general educational purposes. Tax and legal positions can vary significantly based on individual circumstances. Consult a SEBI-registered advisor or CA experienced in cross-border transactions before executing any remittance or investment.",
      },
      {
        type: 'h2',
        text: 'What Is the LRS?',
      },
      {
        type: 'body',
        text: "The Liberalised Remittance Scheme (LRS) was introduced by the Reserve Bank of India in 2004 under the Foreign Exchange Management Act (FEMA). It allows any resident Indian individual — salaried, self-employed, or retired — to remit up to USD 250,000 per financial year (April to March) abroad for any permissible current or capital account transaction. Purchasing immovable property in a foreign country is explicitly listed as a permissible purpose.",
      },
      {
        type: 'body',
        text: "The scheme is remarkably straightforward. You do not need RBI approval for remittances within the $250,000 limit. Your bank — acting as an Authorised Dealer (AD) — processes the remittance after verifying your KYC documents and completing standard AML/CFT checks. There is no investment committee, no case-by-case approval, and no minimum income requirement.",
      },
      {
        type: 'stat-row',
        stats: [
          { value: '$250K', label: 'Annual limit per individual (April–March)' },
          { value: '$500K', label: 'Combined limit for a couple (joint purchase)' },
          { value: '20%', label: 'TCS rate on remittances above ₹7 lakhs' },
          { value: '1–3', label: 'Business days for SWIFT transfer to reach Dubai' },
        ],
      },
      {
        type: 'h2',
        text: 'What the $250,000 Limit Actually Means',
      },
      {
        type: 'body',
        text: "At today's exchange rate (approximately USD 1 = ₹84), the $250,000 annual cap translates to roughly ₹2.1 crore per individual. For a couple purchasing jointly and each remitting $250,000, the combined limit is $500,000 — approximately ₹4.2 crore per year.",
      },
      {
        type: 'body',
        text: "For properties priced above the annual cap, Indian investors use a phased approach: spreading remittances across two or more financial years, or combining individual limits within a family. This is entirely within the law. Most off-plan payment plans in Dubai — which typically extend 2–3 years across the construction period — are structured perfectly to accommodate this.",
      },
      {
        type: 'callout',
        label: 'Practical Example',
        text: "A property priced at AED 2.5M (approximately ₹5.7 crore) can be funded as follows: Year 1 — husband remits $250,000 (₹2.1 crore), wife remits $250,000 (₹2.1 crore). Total: ₹4.2 crore. Year 2 — husband remits the balance (~$78,000 / ₹65 lakhs). Both are named on the Title Deed as joint owners. Fully legal, fully documented.",
      },
      {
        type: 'h2',
        text: 'Tax Collected at Source (TCS) — The Most Misunderstood Aspect',
      },
      {
        type: 'body',
        text: "From October 1, 2023, the Finance Act 2023 increased the TCS rate on LRS remittances above ₹7 lakhs per year to 20%. This was widely misreported as a new 'tax' on overseas investment. It is not. TCS is an advance tax collection mechanism — the government collects it upfront and you claim it back as a credit against your final income tax liability.",
      },
      {
        type: 'body',
        text: "Here is how it works in practice: You remit ₹50 lakhs for a Dubai property purchase. Your bank deducts ₹9.86 lakhs as TCS (20% on ₹50L minus the ₹7L exemption = 20% × ₹43L). This amount appears in your Form 26AS. At ITR filing time, you claim this ₹9.86 lakhs as advance tax paid, and it either reduces your tax liability or generates a refund. It is money you always get back — the only cost is the temporary cash outflow.",
      },
      {
        type: 'callout-green',
        text: "Planning tip: If your TCS outflow is a concern, time larger remittances across the Q4/Q1 boundary (March/April), splitting the transaction across two financial years to minimise the single-year TCS hit. Alternatively, use a credit facility or overdraft to bridge the TCS amount until your ITR refund arrives.",
      },
      {
        type: 'h2',
        text: 'FEMA Compliance: The Core Rules',
      },
      {
        type: 'body',
        text: "The Foreign Exchange Management Act, 1999 governs all cross-border capital flows. Property purchase abroad is a Schedule 3 capital account transaction permitted under Regulation 21 of the FEMA (Permissible Capital Account Transactions) Regulations 2000. The key compliance obligations are:",
      },
      {
        type: 'bullets',
        items: [
          "Route all remittances through formal banking channels — never cash, crypto, or informal money transfer operators. FEMA violations carry penalties of up to three times the remitted amount.",
          "Hold the property in your own name or joint names with another resident Indian. Holding through a foreign company or trust requires separate RBI approval.",
          "Declare the property annually in Schedule FA (Foreign Assets) of your Income Tax Return. This is mandatory under the Black Money (Undisclosed Foreign Income and Assets) Act, 2015.",
          "Report rental income in Schedule FSI (Foreign Source Income) in your ITR each year.",
          "Repatriate rental income within the same financial year it is received, or hold it in a designated NRO/NRE account.",
        ],
      },
      {
        type: 'h2',
        text: 'The Step-by-Step Remittance Process',
      },
      {
        type: 'body',
        text: "The actual bank process is simpler than most people expect. Here is exactly what happens:",
      },
      {
        type: 'table',
        headers: ['Step', 'Action', 'Documents Required'],
        rows: [
          ['1', 'Visit your bank\'s forex desk or initiate online', 'PAN card, Aadhaar, passport'],
          ['2', 'Submit Form A2 (FEMA declaration)', 'Provided by the bank; state purpose as "purchase of immovable property"'],
          ['3', 'Provide property documentation', 'Developer SPA / booking form, RERA escrow account details'],
          ['4', 'Bank conducts AML check', 'Last 2 years ITR, bank statements showing source of funds'],
          ['5', 'TCS deducted and SWIFT initiated', 'SWIFT MT103 confirmation retained for your records'],
          ['6', 'Funds arrive in developer\'s escrow', 'Typically 1–3 business days; developer provides payment receipt'],
        ],
      },
      {
        type: 'h2',
        text: 'Which Banks Process LRS Most Efficiently?',
      },
      {
        type: 'body',
        text: "Most major Indian banks process LRS transfers, but experience and turnaround vary significantly. HDFC Bank, ICICI Bank, Axis Bank, and Kotak Mahindra Bank have dedicated forex desks with staff familiar with property-purpose LRS transfers. HSBC India and Standard Chartered process high-value transfers smoothly given their international connectivity. Some cooperative and smaller private banks can take longer to process due to compliance queues — if speed matters, use a large private sector bank.",
      },
      {
        type: 'body',
        text: "For transfers above ₹1 crore, calling the bank's forex desk in advance to confirm documentation requirements can save significant time. Some banks now offer digital LRS initiation through their net banking portals for amounts up to ₹25 lakhs — useful for booking deposits and initial installments.",
      },
      {
        type: 'h2',
        text: 'Schedule FA: Non-Negotiable Annual Disclosure',
      },
      {
        type: 'body',
        text: "Every Indian resident who holds foreign property — regardless of value — must declare it in Schedule FA of their annual Income Tax Return. The required disclosures include: property address in full, date of acquisition, cost of acquisition, and any rental income received during the year.",
      },
      {
        type: 'body',
        text: "Failure to disclose foreign assets, even inadvertently, can attract penalties of ₹10 lakhs per year of non-disclosure under the Black Money Act. In serious cases, prosecutorial action is possible. Parva Realty provides clients with a complete Schedule FA data sheet at the time of purchase, and our network of CAs experienced in cross-border disclosure can assist with compliant ITR filing.",
      },
      {
        type: 'h2',
        text: 'Common Questions Answered',
      },
      {
        type: 'h3',
        text: 'Can I take a home loan in India to buy a Dubai property?',
      },
      {
        type: 'body',
        text: "No. Indian banks cannot extend loans for the purpose of purchasing property abroad. The remittance must come from your own funds. However, you can take a loan against existing domestic assets (loan against property, securities, etc.) and use those funds — as long as the source of funds entering the LRS stream is from your legitimately owned account.",
      },
      {
        type: 'h3',
        text: 'Can I get a mortgage from a UAE bank as an Indian national?',
      },
      {
        type: 'body',
        text: "Yes. UAE banks offer mortgages to non-resident foreign nationals at up to 75% LTV for properties above AED 5 million and 50% LTV for properties below AED 5 million (Central Bank of UAE regulations). Interest rates are currently 4.5–6.5% for non-residents. This can significantly reduce the LRS remittance required, though UAE mortgage qualification requires UAE income documentation or a strong Indian income profile.",
      },
      {
        type: 'h3',
        text: 'What happens when I sell the property and repatriate the proceeds?',
      },
      {
        type: 'body',
        text: "Sale proceeds can be repatriated to India freely up to the amount originally invested (principal). Any capital gain component may be subject to Indian capital gains tax (12.5% LTCG without indexation for property held 24+ months, per Finance Act 2024). The repatriation process requires a CA certificate (Form 15CB) if the amount exceeds $1 million in a financial year.",
      },
      {
        type: 'sources',
        items: [
          { label: 'RBI — Master Direction on Liberalised Remittance Scheme (updated 2024)', url: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=11062' },
          { label: 'FEMA (Permissible Capital Account Transactions) Regulations 2000', url: 'https://www.rbi.org.in' },
          { label: 'Income Tax Act 1961 — Schedule FA & FSI Provisions', url: 'https://www.incometaxindia.gov.in' },
          { label: 'Finance Act 2023 — TCS on LRS Remittances (Section 206C(1G))', url: 'https://www.indiabudget.gov.in' },
          { label: 'Black Money (Undisclosed Foreign Income and Assets) Act 2015', url: 'https://www.incometaxindia.gov.in' },
          { label: 'Central Bank of UAE — Mortgage Cap Regulations for Non-Residents', url: 'https://www.centralbank.ae' },
          { label: 'CBDT Circular — Schedule FA Disclosure Guidelines 2024', url: 'https://www.incometaxindia.gov.in' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ARTICLE 3
  // ─────────────────────────────────────────────────────────────
  {
    id: 'off-plan-vs-ready-2025',
    tag: 'Investment Strategy',
    title: 'Off-Plan vs Ready Properties: What Gets You Better Returns in 2025?',
    excerpt: 'Off-plan offers lower entry but deferred yield. Ready properties cash-flow immediately. The answer depends on your horizon — we model both scenarios.',
    mins: '9 min read',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop&auto=format',
    author: 'Parva Realty Research Desk',
    date: 'July 2025',
    sections: [
      {
        type: 'lead',
        text: "In 2024, off-plan transactions represented 65% of all Dubai real estate deals — a record high. Yet many of Dubai's most sophisticated investors still prefer ready properties for immediate income. Both positions are rational. The right choice depends entirely on your investment objectives, cash-flow needs, and time horizon. Here is the data-driven framework to make that decision.",
      },
      {
        type: 'stat-row',
        stats: [
          { value: '65%', label: 'Share of off-plan in total Dubai transactions, 2024 (DLD)' },
          { value: '18–30%', label: 'Average off-plan launch-to-handover price appreciation, 2022–24' },
          { value: '90%+', label: 'Occupancy rates in prime ready-property zones (CBRE)' },
          { value: '9–11%', label: 'Gross rental yield on ready properties in Business Bay/JLT' },
        ],
      },
      {
        type: 'h2',
        text: 'Understanding the Core Trade-Off',
      },
      {
        type: 'body',
        text: "Off-plan and ready properties are not better or worse than each other — they solve different investor problems. Off-plan is fundamentally an equity growth play: you buy at pre-market prices today and benefit from construction-phase appreciation before you've completed full payment. Ready property is a yield play: you own an asset that generates cash from day one, with no construction risk.",
      },
      {
        type: 'body',
        text: "The mistake most investors make is evaluating them on the same metrics. Comparing the yield on an off-plan property (which is effectively zero until handover) against a ready property misses the point. The correct comparison is total return over your investment horizon — and that calculation yields a more nuanced answer.",
      },
      {
        type: 'h2',
        text: 'The Off-Plan Case: Where the Numbers Work',
      },
      {
        type: 'h3',
        text: 'Launch Price Discount and Construction Phase Appreciation',
      },
      {
        type: 'body',
        text: "Dubai's off-plan market operates on a well-documented phenomenon: launch prices are set at a discount to anticipated market value at handover to drive early sales velocity. Developers — particularly Danube, SAMANA, Imtiaz, and Emaar — have historically launched at 15–25% below the market value of comparable ready units.",
      },
      {
        type: 'body',
        text: "JLL's Dubai Residential Market Report (Q4 2024) tracked 156 off-plan projects that reached handover in 2022–2024. The median launch-to-handover price appreciation was 22.4%. For projects in emerging zones (Dubai South, Dubailand, JVC) the median was 18.1%. For projects in prime zones (Business Bay, Downtown, Dubai Islands) the median was 28.7%. These figures include appreciation on the full property value, not just the capital deployed — because of payment plans, the effective return on capital is significantly higher.",
      },
      {
        type: 'callout',
        label: 'The Leverage Effect of Payment Plans',
        text: "Consider a AED 1.5M off-plan apartment in Business Bay, purchased with a 20/40/40 plan (20% now, 40% during construction, 40% at handover). If the property appreciates 25% by handover, your AED 375,000 down-payment (20%) has generated a AED 375,000 unrealised gain — a 100% return on initial capital deployed, before the remaining 80% is even paid. This leverage effect is unique to off-plan and has no equivalent in the ready market.",
      },
      {
        type: 'h3',
        text: 'Payment Plans and the LRS Advantage',
      },
      {
        type: 'body',
        text: "For Indian investors specifically, off-plan payment plans have a structural advantage: they allow a high-value asset to be funded in tranches that align with the RBI's $250,000 annual LRS cap. A AED 2M property that requires only 20% at booking (AED 400,000 / ₹90 lakhs) and the balance spread over 3 years is far more accessible under LRS than a ready property requiring full immediate payment.",
      },
      {
        type: 'h3',
        text: 'Risks to Account For',
      },
      {
        type: 'bullets',
        items: [
          "Construction delays: Even RERA-regulated projects sometimes experience 3–12 month delays. This defers your handover, income, and exit. Always review the developer's track record on prior project delivery.",
          "Market risk: If Dubai prices correct between purchase and handover, you may handover into a lower market. The RERA escrow requirement protects your capital from developer insolvency, but not from price risk.",
          "No income during construction: Off-plan buyers forgo rental income for 2–4 years. The opportunity cost of this must be factored into total return calculations.",
          "Resale before handover (SPA flip): While possible, off-plan resale requires developer NOC and DLD fees on each transaction, which can eat into short-term gains.",
        ],
      },
      {
        type: 'h2',
        text: 'The Ready Property Case: Immediate Cash Flow and Certainty',
      },
      {
        type: 'h3',
        text: 'Yield and Occupancy in Prime Zones',
      },
      {
        type: 'body',
        text: "Business Bay, JLT, Dubai Marina, and JVC consistently deliver 9–11% gross rental yields on 1BR units and 8–9% on 2BRs, with occupancy rates above 90% (CBRE, Asteco market surveys, 2024). For an investor whose primary objective is income — whether to cover LRS remittance installments, fund retirement, or provide a secondary income stream — a ready property delivers from month one.",
      },
      {
        type: 'body',
        text: "Ready properties also offer flexibility that off-plan cannot. You can inspect the actual unit, verify build quality, review actual comparable rental transactions in the specific building, and speak to existing residents. The asset is tangible and verified before any significant capital commitment.",
      },
      {
        type: 'h3',
        text: 'Mortgage Availability',
      },
      {
        type: 'body',
        text: "UAE banks readily mortgage ready properties for non-resident buyers at up to 75% LTV for properties above AED 5M and 50% LTV below that threshold. Off-plan properties are generally not mortgageable until construction reaches 50%+ completion. For buyers who want leverage, ready properties are the only viable option in most cases.",
      },
      {
        type: 'h2',
        text: 'The Return Modelling: A Direct Comparison',
      },
      {
        type: 'body',
        text: "To illustrate the trade-off concretely, here is a side-by-side 5-year return model for two comparable Business Bay apartments — one off-plan (2025 launch, Q4 2027 handover), one ready (purchased today).",
      },
      {
        type: 'table',
        headers: ['Metric', 'Off-Plan (AED 1.5M)', 'Ready (AED 1.7M)'],
        rows: [
          ['Down payment required today', 'AED 300K (20%)', 'AED 1.7M (full) or mortgage'],
          ['Rental income Year 1–2', 'Nil (under construction)', 'AED 150K–160K / year'],
          ['5-year cumulative rental income', 'AED 390K (Yrs 3–5 only)', 'AED 765K (all 5 years)'],
          ['Estimated capital appreciation (25%)', 'AED 375K', 'AED 425K'],
          ['Total gross return (5 years)', 'AED 765K', 'AED 1.19M'],
          ['Return on initial capital (20% plan)', '255% on AED 300K', '70% on AED 1.7M'],
          ['Annualised ROI on capital deployed', '28.6% p.a.', '8.9% p.a. + appreciation'],
        ],
      },
      {
        type: 'body',
        text: "The off-plan investor achieves dramatically higher return on initial capital because of the payment plan leverage. The ready property investor achieves higher absolute rupee income and lower total risk. Both are legitimate — they serve different investor needs.",
      },
      {
        type: 'h2',
        text: 'How to Choose: A Decision Framework',
      },
      {
        type: 'table',
        headers: ['Your Priority', 'Better Choice', 'Why'],
        rows: [
          ['Maximise total capital return, 5+ year horizon', 'Off-plan', 'Construction appreciation + payment plan leverage'],
          ['Generate income from Year 1', 'Ready property', 'Immediate rental cash flow'],
          ['Minimise upfront capital outlay', 'Off-plan', 'Payment plans spread commitment over 2–3 years'],
          ['Minimise risk, certain exit', 'Ready property', 'No construction risk, immediate liquidity'],
          ['UAE mortgage eligibility', 'Ready property', 'Banks lend freely on completed assets'],
          ['Working within annual LRS cap (₹2.1 Cr/yr)', 'Off-plan', 'Installments fit within annual limits'],
          ['Family use or personal residence', 'Ready property', 'Move in or hand over to family immediately'],
        ],
      },
      {
        type: 'h2',
        text: 'The Hybrid Strategy: What Sophisticated Investors Do',
      },
      {
        type: 'body',
        text: "Many experienced Parva Realty clients run a hybrid portfolio: one or two ready properties providing stable rental income (which can offset monthly payment plan obligations), combined with one or two off-plan positions in higher-growth zones for capital appreciation. The rental income from the ready asset funds part of the off-plan installments — effectively creating a self-funding investment structure over time.",
      },
      {
        type: 'callout-green',
        text: "A ₹4 crore portfolio split between a ready JLT 1BR (generating ₹25–28 lakhs/year in rent) and an off-plan Business Bay 1BR (with ₹8–12 lakh annual installments) creates a net-positive cash flow portfolio with significant appreciation upside. This structure requires no additional outflows after the initial capital deployment — the ready property pays for the off-plan.",
      },
      {
        type: 'body',
        text: "The right answer for you depends on your income, investment horizon, risk tolerance, and the specific properties available at the time of purchase. These variables change frequently in a dynamic market like Dubai. A Parva Realty advisor can model both options against your specific financial profile — the consultation is free and carries no obligation.",
      },
      {
        type: 'sources',
        items: [
          { label: 'Dubai Land Department — Transaction Statistics 2024', url: 'https://www.dubailand.gov.ae' },
          { label: 'JLL — Dubai Residential Market Report Q4 2024', url: 'https://www.jll.ae' },
          { label: 'CBRE — Dubai Rental Market & Occupancy Survey 2024', url: 'https://www.cbre.com/en-ae' },
          { label: 'Asteco — Dubai Property Market Report Q3 2024', url: 'https://www.asteco.com' },
          { label: 'Bayut & Dubizzle — Dubai Market Report 2024', url: 'https://www.bayut.com/mybayut/dubai-property-market-report' },
          { label: 'Central Bank of UAE — Mortgage Cap Regulations', url: 'https://www.centralbank.ae' },
          { label: 'ValuStrat — Dubai Residential Price Index 2024', url: 'https://www.valustrat.com' },
        ],
      },
    ],
  },
]
