# Anchor Real Estate Group — Landing Page

Marketing site for **Anchor Real Estate Group**, a multipurpose cooperative
society in Abuja, Federal Capital Territory (Tier 1 Cooperative, FCTA By-Laws
No. R11913).

The Society is not a developer or an estate agency. It mobilises member capital
in ₦5,000 ownership slots and deploys it across housing, tourism, warehousing,
financing and a digital cooperative platform. The page exists to make that
proposition legible and to convert prospective members, so accuracy and trust
signals matter more here than polish.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

The page is fully static — every section prerenders, and the only client
JavaScript is the masthead (scroll state, section tracking, compact menu) and a
small scroll-reveal wrapper.

## Structure

```
src/
  app/
    layout.tsx      fonts, metadata, no-JS reveal fallback
    page.tsx        section composition + Organization JSON-LD
    globals.css     design tokens and custom utilities
    icon.svg        favicon (crest)
  components/       one component per numbered section
  lib/content.ts    all copy and figures
```

### Editing copy

Change [`src/lib/content.ts`](src/lib/content.ts) — not the components. Every
figure, name and address on the page comes from that file, so the site can be
checked against the Society's own documents in one place.

Items the Society has not ratified or filled are flagged in the data (for
example `email.provisional`, and `vacant` on an office) and the page renders
those states explicitly rather than hiding them.

## Design notes

The palette and typographic register are taken from the Society's printed
identity: deep forest green, gold hairline rules, an uncoated cream ground, and
a formal crest. Type is Source Serif 4 for display, IBM Plex Sans for running
text, and IBM Plex Mono for labels and legal notes — the register of an annual
report rather than a product page. There is one fixed light theme by design.

Structure is carried by rules and numbered sections instead of cards and
shadows, and figures are set in tabular lining numerals so columns align.

## Content provenance

All content derives from the Society's infographic, which cites the Minutes of
Meeting of 20 August 2026 and the Strategic Meeting Report & Implementation
Brief of 15 August 2026.

Two constraints follow from that and should be preserved:

- **Vision, Mission and Core Values are proposed, pending Board adoption.** The
  page says so next to them.
- **No investment-return language.** Slot prices, dues and the 1% holding cap
  are facts and belong on the page. Yield, ROI or "guaranteed returns" framing
  does not — it is unsupported by the source material and creates regulatory
  exposure for a cooperative soliciting member capital.

## Known gaps for the client

- The published contact address is a personal Gmail account. On a page inviting
  ₦500,000 minimum commitments this undercuts the other trust signals; a domain
  mailbox should replace it. It is marked `provisional` in the content file and
  labelled "Interim address" on the page.
- Financial Secretary and Assistant Secretary are unfilled and render as dashed
  offices in the org chart.
- Membership eligibility criteria and application forms do not exist yet, so
  "How to Join" ends at registering interest with the Secretariat rather than a
  form.
- `metadataBase` in `src/app/layout.tsx` is a placeholder domain — set it to the
  real one before launch, and add an Open Graph image.
