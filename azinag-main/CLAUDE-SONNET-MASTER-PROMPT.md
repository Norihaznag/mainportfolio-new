# Claude Sonnet Master Prompt

Paste the prompt below into Claude Sonnet with this repo attached.

```text
You are a senior conversion-focused product marketer, CRO strategist, direct-response copywriter, Meta ads strategist, and Next.js redesign engineer. Work from the actual codebase, not assumptions.

Context:
- Brand: Azinag
- Current repo: Next.js marketing site for a founder-led software studio
- Current positioning is wrong for this task: it targets foreign startup founders and sells web apps / desktop apps / Android apps
- Replace that positioning instead of softening it
- Keep the existing Next.js foundation if useful, but rewrite the marketing system around a Morocco-local lead funnel

Business goal:
Turn Azinag into a French + Arabic lead-generation website for Morocco-local restaurants, cafes, and small food-service businesses, optimized for profitable booked calls first and WhatsApp second.

Market defaults:
- Geography: Guelmim, Tan-Tan, Sidi Ifni, and Tiznit
- Audience: restaurant owners, cafe owners, snack owners, small food-service operators
- Languages: French first, Arabic support second
- Primary CTA: book a call
- Secondary CTA: WhatsApp
- Offer model: productized low-ticket packages in MAD, not custom premium software

Offer ladder defaults:
1. Starter: one-page presence/menu website
2. Growth: multi-page site with menu, gallery, map, WhatsApp, and booking/contact flow
3. Premium: ordering/reservation-ready site

Trust stack:
- founder-led
- fixed pricing
- fast turnaround
- mobile-first
- Google Maps integration
- WhatsApp integration
- local proof and simple ROI messaging

Creative direction:
- local, practical, proof-heavy
- no stock-photo agency look
- use before/after screens, ugly menu pain, slow-site pain, no-Google-presence pain, missed-booking pain, missed-WhatsApp-lead pain

Important market constraints:
- Guelmim alone is likely too small for sustained paid-social optimization, so keep the local edge but design campaigns for Guelmim + nearby cities
- Optimize for profitability, lead quality, and fast iteration
- Do not promise unrealistic income or "huge money"

Your job:
1. Audit the current repo and identify what positioning, copy, offers, pages, and CTAs must be removed, replaced, or demoted.
2. Redesign the website strategy for the local restaurant/cafe niche.
3. Produce concrete website copy direction and conversion structure.
4. Produce a Meta ads strategy and creative pack tailored to the same funnel.
5. Produce tracking and measurement requirements.
6. Produce a 90-day launch plan.

Output requirements:
- Be concrete, decisive, and implementation-ready
- No generic advice
- Use short sections, bullets, and tables only when useful
- Write copy, offers, ad angles, and page blocks ready to implement
- If you make assumptions, state them briefly and continue
- Do not ask me questions unless you are blocked by a missing repo fact

Return your answer in exactly these sections:

1. Repo Audit
- List the current pages/components/messages that conflict with the new funnel
- State what should be deleted, rewritten, reused, or demoted
- Mention likely file targets in this repo when relevant

2. Positioning
- One-sentence positioning
- Primary ICP
- Top pains
- Why this offer wins locally
- Core objections and how the site should answer them

3. Offer Ladder In MAD
- Name each package
- Target customer
- Deliverables
- Turnaround
- Suggested price range in MAD
- Upgrade path
- What is intentionally excluded

4. Homepage Conversion Blueprint
- Section-by-section homepage structure in order
- Goal of each section
- Exact messaging direction for each block
- Hero headline options in French
- Supporting Arabic options where useful
- CTA labels
- Proof ideas
- FAQ topics
- Mobile-first conversion notes

5. Site Map And Page Strategy
- Which pages should exist
- Which current pages should be removed or redirected
- What each page must do to move the lead toward a booked call
- Recommended landing-page strategy for ads

6. Visual And UX Direction
- Design style
- Color and trust direction
- What imagery to use
- What to avoid
- How to make the site feel local, credible, and not cheap

7. Meta Ads Strategy
- Campaign structure for the first 90 days
- Objectives
- Geography
- Audience logic
- Budget split
- Retargeting setup
- Lead form vs landing page recommendation
- Kill rules and scale rules

8. Creative Pack
- At least 3 ad angles
- At least 3 creative formats
- For each angle: hook, headline, primary text, CTA, and visual concept
- Include at least one before/after concept, one founder-face concept, and one proof/testimonial-style concept

9. Measurement Plan
- UTM structure
- Meta Pixel event plan
- Booked-call tracking
- WhatsApp click tracking
- Funnel KPIs by stage
- Weekly review dashboard recommendations

10. 90-Day Rollout
- Week-by-week order of operations
- What to launch first
- What to test next
- What to keep, cut, and scale

11. Acceptance Criteria
- Homepage clarity in under 5 seconds
- One dominant CTA above the fold
- Offer understandable by non-technical restaurant owners
- French and Arabic hierarchy coherent on mobile
- Strong message match between ad, landing page, and CTA
- At least 3 ad angles and 3 creative formats
- Clear kill/scale rules based on CPL, booked-call rate, and close rate

Final instruction:
Base everything on this actual repo. If existing copy conflicts with the local restaurant/cafe offer, replace it completely. Preserve only what still serves the new funnel.
```
