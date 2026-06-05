# Sizeup — Product Requirements Document

**Version:** 1.0  
**Status:** Draft  
**Author:** Founder  
**Last updated:** June 2026

---

## 1. Product overview

### 1.1 One-liner
Sizeup generates investor-ready market sizing reports — TAM/SAM/SOM estimates, CAGR projections, and competitive snapshots — in under 30 seconds, for free.

### 1.2 Problem statement
Pre-seed and seed founders preparing to fundraise need credible market size numbers for their pitch decks. Today their options are:

- **Generic AI (ChatGPT, Gemini, Claude):** Fast but produces hallucinated figures with no sources. Falls apart under investor questioning.
- **Professional reports (IBISWorld, Gartner, Forrester):** Accurate but cost $500–$5,000 per report. Irrational spend for a pre-revenue startup.
- **DIY research:** Accurate if done well, but takes 2–3 days of cross-referencing SEC filings, earnings calls, and industry publications. Most founders don't have the skill or time.

The gap between "free but wrong" and "expensive but right" is where Sizeup lives.

### 1.3 Solution
A web app where a founder describes their market in plain English and receives a structured, source-cited report with TAM/SAM/SOM estimates, a CAGR growth rate, and a top competitor overview — all exportable to PDF within minutes.

### 1.4 Why now
- LLM APIs (Claude, OpenAI) now make it practical to synthesise and narrate structured research at low cost
- SEC EDGAR, Yahoo Finance, and public company filings are freely accessible via API
- Founders are increasingly AI-native and expect instant research tools

---

## 2. Goals and non-goals

### 2.1 Goals (v1)
- A founder can go from a market description to a downloadable PDF report in under 5 minutes
- Every figure in the report has a methodology note or source citation
- The tool is honest about data confidence — it distinguishes between high-confidence (public company data) and estimated figures (CAGR, market size)
- The app is fully functional as a learning project and can be deployed and shared publicly
- The codebase is clean enough to showcase on GitHub

### 2.2 Non-goals (v1 — explicitly out of scope)
- Private company financial data (Crunchbase, PitchBook)
- User accounts, saved report history, or dashboards
- Mobile app (iOS / Android)
- API access for third-party developers
- Real-time stock prices or live financial feeds
- Custom report templates
- Multi-language support
- Monetisation / payment processing

---

## 3. Target users

### 3.1 Primary persona — the fundraising founder

| Attribute | Description |
|---|---|
| Who | Pre-seed or seed-stage founder, solo or small team (1–5 people) |
| Context | Preparing a pitch deck or investor update for the first time |
| Goal | Put a credible market size number in their deck |
| Technical level | Low to medium. Knows what TAM means, doesn't know how to calculate it |
| Budget | Near zero for tools |
| Trigger | Investor asks "how big is this market?" and they don't have a good answer |
| Where they hang out | YC forums, Indie Hackers, Startup School, Twitter/X founder communities |

### 3.2 Secondary persona — the curious researcher

| Attribute | Description |
|---|---|
| Who | The builder himself — exploring startup ideas, doing investment background checks |
| Context | Casual research on industries, not always for fundraising |
| Goal | Quick orientation on a market before going deeper |
| Value | Primary user = the tool gets built and stays maintained |

---

## 4. Core features (v1)

### 4.1 Feature list

| Feature | Priority | Tier | Notes |
|---|---|---|---|
| Plain-English market input | P0 | Free | Single text field, no sign-up required |
| Geography selector | P1 | Free | Global / US / Europe / Other. Defaults to Global |
| Named competitor input | P2 | Free | Optional field to pre-seed competitor table |
| TAM / SAM / SOM estimates | P0 | Free | Three numbers with methodology note and confidence rating |
| CAGR & growth rate estimate | P0 | Free | 5-year estimate derived from public revenue data + cited sources |
| Top 5 public competitors | P1 | Free | Revenue, market cap, YoY growth from live filings |
| Market narrative summary | P2 | Free | 2–3 paragraph written overview of the market |
| Confidence rating per section | P0 | Free | High / Medium / Low with one-line explanation |
| PDF export | P0 | Free (v1) | Clean formatted report download |
| Live generation status messages | P1 | Free | "Searching SEC filings… Analysing growth trends…" |
| Error / low-confidence state | P1 | Free | Honest message when data is sparse for niche markets |

> **Note on free vs premium:** For v1, all features are free. The goal is to learn, ship, and get real user feedback. Monetisation gates are a v2 decision.

---

## 5. Report specification

### 5.1 Report sections (in order)

**Section 1 — Market identity**
- Market name (as interpreted by the tool, with a disambiguation note if needed)
- Geography scope
- Report generated date
- Confidence tier for overall report: High / Medium / Low

**Section 2 — Market size**
- TAM (Total Addressable Market): global revenue opportunity if every potential customer used a solution
- SAM (Serviceable Addressable Market): the portion the product could realistically reach given geography, segment, and distribution
- SOM (Serviceable Obtainable Market): realistic capture in years 1–3
- Methodology note for each number (1–2 sentences explaining how it was derived)
- Confidence rating per number

**Section 3 — Growth rate**
- 5-year CAGR estimate (expressed as a percentage range, not a single point)
- Historical revenue trend of top 3 public players over 3 years
- Key growth drivers (2–4 bullet points: regulatory tailwinds, technological shifts, demographic trends, etc.)
- Confidence rating

**Section 4 — Competitive landscape**
- Table of top 5 public companies in the space
- Columns: Company name, Revenue (latest FY), YoY revenue growth, Market cap, 1-line positioning
- Data source noted per row (e.g. "SEC 10-K filing, FY2024")
- Note on private competitor blind spot: "This table covers public companies only. Significant private players may exist that are not reflected here."

**Section 5 — Data sources**
- Bulleted list of all sources used: SEC filings, earnings call transcripts, public press releases, web search citations
- Methodology transparency statement (2–3 sentences on how the tool works)

### 5.2 Report tone and style
- Written for a non-expert founder, not an analyst
- No jargon without explanation
- Honest about uncertainty — "estimated," "approximately," "based on public data" are used freely
- Avoids single-point false precision (uses ranges: "$4.2B–$6.1B" not "$5.3B")
- Investor-ready but not overconfident

### 5.3 PDF export spec
- A4 / Letter format, print-friendly
- Clean typographic layout: section headers, data tables, source footnotes
- Sizeup logo / branding in footer
- Generated date and market name in header
- No more than 4–6 pages for a typical report

---

## 6. Data sources and methodology

### 6.1 Data pipeline (v1 — web search approach)
For v1, all market data is retrieved at query time using Claude's web search capability. No pre-built database or custom ETL pipeline is required. This approach trades some reliability for speed of build — acceptable for a learning project.

**Sources queried per report:**
- SEC EDGAR (public company financials via web search or EDGAR full-text search API)
- Yahoo Finance / Macrotrends (revenue and market cap data)
- Earnings call transcripts (via public sources: Motley Fool, Seeking Alpha summaries)
- Industry press and news (for growth driver bullets)
- Google Trends data (as a proxy signal for market momentum)

### 6.2 Confidence rating logic

| Rating | Criteria |
|---|---|
| High | 3+ named public companies with verifiable EDGAR filings found. Revenue trend is consistent and recent (within 2 years). |
| Medium | 1–2 public companies found. Market size derived from adjacent sector data or cited analyst estimate. |
| Low | No public comparable found. Market size is estimated from proxy signals. Clearly flagged as speculative. |

### 6.3 Known data gaps (honest limitations)
- Private company revenue is not available and is not estimated
- Niche or very early-stage markets (e.g. AI agent infrastructure, web3 sub-sectors) will consistently return Low confidence
- CAGR figures are derived, not sourced from licensed analyst research
- Data is current as of query date but not continuously updated (no caching or refresh mechanism in v1)

---

## 7. User experience

### 7.1 User flow

```
Landing page
    ↓
Single input: "Describe your market in plain English"
    ↓
Optional: Geography dropdown + Known competitors field
    ↓
"Generate report" button
    ↓
Loading screen with live status messages (~20–40 seconds)
    ↓
Report view: all sections rendered on-page
    ↓
"Download PDF" button → PDF export
```

### 7.2 Input field guidance
- Placeholder text: "e.g. HR software for small businesses, electric scooter rentals, B2B cybersecurity for healthcare"
- Character limit: 300 characters (encourages specificity without being restrictive)
- Validation: non-empty, at least 5 characters

### 7.3 Loading state
Show live status messages during generation to manage the 20–40 second wait time and build trust:
1. "Understanding your market…"
2. "Searching public financial filings…"
3. "Identifying major players…"
4. "Estimating market size and growth…"
5. "Building your report…"

### 7.4 Error states

| Scenario | Message shown |
|---|---|
| Market too vague ("technology") | "Try being more specific — e.g. 'project management software for remote teams'" |
| No public data found | "We found limited public data for this market. The report below uses estimated figures — confidence is low." |
| API failure | "Something went wrong generating your report. Please try again." |
| Input too short | "Tell us a bit more about the market you're researching." |

### 7.5 Report page design principles
- Sections are clearly delineated with headers
- Confidence badges (High / Medium / Low) appear inline next to each key figure
- Methodology notes are collapsed by default, expandable on click, so they don't overwhelm the main reading experience
- The PDF export button is persistent and visible at the top and bottom of the report

---

## 8. Technical specification

### 8.1 Recommended stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js (App Router) | Industry standard, great docs, easy to learn, deploys to Vercel in one click |
| Styling | Tailwind CSS | Utility-first, fast to prototype, excellent Next.js integration |
| Backend / API routes | Next.js API routes | No separate backend needed for v1. All server logic lives in `/app/api/` |
| AI / report generation | Anthropic Claude API (claude-sonnet-4-6) | Web search capability for live data retrieval. Structured output for report sections |
| PDF generation | `@react-pdf/renderer` or `html2pdf.js` | Both are learnable in a weekend. `react-pdf` gives more control; `html2pdf` is simpler to start |
| Hosting | Vercel | Free tier, zero-config deployment from GitHub, custom domain support |
| Environment variables | `.env.local` + Vercel env vars | For ANTHROPIC_API_KEY and any future API keys |
| Version control | GitHub | Public repo — doubles as portfolio piece |

### 8.2 Project structure
```
sizeup/
├── app/
│   ├── page.tsx              # Landing page + input form
│   ├── report/
│   │   └── page.tsx          # Report display page
│   └── api/
│       ├── generate/
│       │   └── route.ts      # Main report generation endpoint
│       └── export-pdf/
│           └── route.ts      # PDF generation endpoint
├── components/
│   ├── InputForm.tsx         # Market input form component
│   ├── LoadingState.tsx      # Animated loading with status messages
│   ├── ReportView.tsx        # Full report renderer
│   ├── ReportSection.tsx     # Individual section with confidence badge
│   ├── CompetitorTable.tsx   # Competitor data table
│   └── ExportButton.tsx      # PDF download trigger
├── lib/
│   ├── claude.ts             # Anthropic API client + prompt functions
│   ├── reportSchema.ts       # TypeScript types for report data structure
│   └── prompts.ts            # All Claude prompt templates
├── public/
│   └── logo.svg
├── .env.local                # ANTHROPIC_API_KEY (never committed)
└── README.md
```

### 8.3 API design

**POST `/api/generate`**

Request:
```json
{
  "market": "HR software for small businesses",
  "geography": "Global",
  "competitors": ["BambooHR", "Gusto"]
}
```

Response:
```json
{
  "reportId": "uuid",
  "marketName": "HR Software for SMBs",
  "generatedAt": "2026-06-04T12:00:00Z",
  "overallConfidence": "Medium",
  "sections": {
    "marketSize": {
      "tam": { "value": "$18B–$24B", "methodology": "...", "confidence": "Medium" },
      "sam": { "value": "$6B–$9B", "methodology": "...", "confidence": "Medium" },
      "som": { "value": "$80M–$200M", "methodology": "...", "confidence": "Low" }
    },
    "growthRate": {
      "cagr": "11%–14%",
      "period": "2024–2029",
      "drivers": ["...", "..."],
      "confidence": "Medium"
    },
    "competitors": [
      {
        "name": "Workday",
        "revenue": "$7.3B",
        "yoyGrowth": "+16%",
        "marketCap": "$52B",
        "positioning": "Enterprise HR suite",
        "source": "SEC 10-K FY2024"
      }
    ],
    "narrative": "...",
    "sources": ["...", "..."]
  }
}
```

### 8.4 Claude prompt strategy

The report is generated via a single structured prompt to Claude with web search enabled. Key prompt design principles:

- Instruct Claude to return strictly valid JSON matching the report schema
- Explicitly instruct Claude to cite sources inline and flag confidence per section
- Include instructions to use ranges not point estimates for market size and CAGR
- Include a fallback instruction: if insufficient data is found, set `confidence: "Low"` and explain why rather than fabricating figures
- Temperature: 0.2 (low, for factual consistency)

### 8.5 Rate limiting (basic, v1)
- Limit to 5 report generations per IP address per 24 hours via a simple in-memory counter or Vercel Edge middleware
- Prevents API cost abuse on the free tier before any auth is in place

---

## 9. Success metrics

Since v1 has no monetisation and no user accounts, success is measured qualitatively:

| Metric | Target |
|---|---|
| App is deployed and publicly accessible | Yes |
| A complete report generates end-to-end without errors | For >80% of reasonable market queries |
| PDF exports cleanly | Yes |
| Report is accurate enough that the builder would share it | Subjective — builder's own judgment |
| GitHub repo is clean, documented, and portfolio-ready | Yes |
| Something was learned at each stage of the build | Ongoing |

---

## 10. Build sequence (recommended learning order)

This sequence is designed for a solo learner — each phase ships something real and teaches a new skill.

### Phase 1 — Static shell (Week 1–2)
- Set up Next.js project + Tailwind CSS + deploy to Vercel
- Build the input form page (no functionality yet)
- Build a static report page with hardcoded dummy data
- **Learning goal:** Next.js routing, components, Tailwind, Vercel deployment

### Phase 2 — AI integration (Week 3–4)
- Connect Anthropic API via `/api/generate` route
- Send the market input to Claude, get back raw text
- Display the raw response on the report page
- **Learning goal:** API routes in Next.js, environment variables, fetch, async/await, Claude API basics

### Phase 3 — Structured output (Week 5–6)
- Refine the Claude prompt to return structured JSON
- Parse the JSON and render each report section as a component
- Add confidence badges and collapsible methodology notes
- **Learning goal:** Prompt engineering, JSON parsing, TypeScript types, component composition

### Phase 4 — PDF export (Week 7–8)
- Implement PDF generation from the report data
- Add download button
- Style the PDF to be clean and presentable
- **Learning goal:** Working with a PDF library, file downloads in the browser

### Phase 5 — Polish and ship (Week 9–10)
- Add loading state with live status messages
- Implement basic rate limiting
- Write README with setup instructions
- Clean up code for GitHub
- Share the link somewhere (Indie Hackers, Twitter, a friend who's a founder)
- **Learning goal:** UX polish, error handling, documentation, shipping

---

## 11. Open questions (decisions deferred to v2)

These are explicitly not answered in v1. Revisit after launch.

1. **Free vs premium gate:** What's the conversion mechanism if monetisation is added? Pay-per-report or monthly subscription?
2. **User accounts:** Should reports be saveable? Requires auth (Supabase or Clerk).
3. **Data pipeline:** Replace web search with a proper EDGAR + Yahoo Finance ETL for higher reliability?
4. **Private company data:** Crunchbase or PitchBook API partnership for Series A / professional tier?
5. **Report refresh:** Can a user re-run a report to get updated data? Cache strategy?
6. **Competitor tracking:** A future feature — monitor a saved market for changes over time?
7. **Positioning section:** Input your own startup to get a "where you fit" competitive map?

---

## 12. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Claude API costs exceed budget | Medium | High | Rate limit to 5 reports/IP/day. Monitor usage via Anthropic dashboard. Estimated ~$0.05–0.15 per report at Sonnet pricing. |
| Report quality is too low to be useful | Medium | Medium | Invest time in prompt engineering. Run 20 manual test queries before calling v1 done. |
| Claude hallucinated figures in report | Medium | High | Instruct Claude to cite sources per figure. Low-confidence flag catches cases where no data was found. |
| Scope creep delays shipping | High | Medium | Enforce the non-goals list. If a new idea comes up, log it in a `FUTURE.md` file and keep building. |
| Learning curve blocks progress | Medium | Medium | Build in phases. Each phase has a deployable output. Never be more than a week from something working. |

---

## Appendix A — Example report output (target quality bar)

**Market:** HR software for small businesses (1–50 employees), Global

**Overall confidence:** Medium

**TAM:** $18B–$24B  
*Derived from global HR software market revenue reported by Workday, SAP SuccessFactors, and ADP in their FY2024 10-K filings, adjusted for SMB segment share (~28%) based on public earnings call commentary. Confidence: Medium.*

**SAM:** $5B–$8B  
*English-speaking markets (US, UK, AU, CA) where SMB HR software adoption is highest. Based on US representing ~55% of global SMB HR spend per multiple earnings calls. Confidence: Medium.*

**SOM (Year 1–3):** $10M–$80M  
*Realistic capture for a new entrant with no existing distribution. Benchmarked against BambooHR's reported early growth trajectory and comparable SaaS SMB tools. Confidence: Low — highly dependent on go-to-market execution.*

**CAGR (2024–2029):** 10%–14%  
*Workday grew 16% YoY (FY2024), Rippling ~30% (estimated, private), ADP SMB segment 8%. Adjacent HCM market growing at ~12% per multiple public estimates. Range reflects uncertainty in SMB-specific segment. Confidence: Medium.*

---

*End of document. Version 1.0.*
