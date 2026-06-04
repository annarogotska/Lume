/* NUVEL — content data, typed. Asset paths are absolute (served from /public). */

export interface Studio {
  name: string;
  tagline: string;
  email: string;
  location: string;
}

export interface Stat {
  v: string;
  k: string;
}

export type CaseType = "Website" | "Platform";

export interface CaseMedia {
  src: string;
}

export interface CaseSection {
  label: string;
  body: string;
  media: string;
}

export interface CasePhase {
  label: string;
  detail: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  type: CaseType;
  year: string;
  sector: string;
  role: string;
  duration: string;
  tool: string;
  stack: string[];
  highlights: string[];
  cover: string;
  tldr: string;
  services: string[];
  metrics: Stat[];
  problem: string;
  approach: string;
  result: string;
  takeaway: string;
  sections: CaseSection[];
  phases: CasePhase[];
  media: CaseMedia[];
}

export interface Service {
  key: string;
  n: string;
  title: string;
  lead: string;
  points: string[];
}

export interface ProcessStep {
  n: string;
  t: string;
  d: string;
  days: string;
}

export interface WhyItem {
  t: string;
  d: string;
}

export const STUDIO: Studio = {
  name: "Nuvel",
  tagline: "Design at the speed of thought",
  email: "hello@nuvel.studio",
  location: "Remote-first · Europe",
};

export const STATS: Stat[] = [
  { v: "20+", k: "Products shipped" },
  { v: "1 wk", k: "Typical build" },
  { v: "5", k: "Industries" },
  { v: "3", k: "Locales as standard" },
];

export const CAPS: string[] = [
  "Website Design", "Brand Identity", "Design Systems", "E-commerce",
  "Motion & Interaction", "Front-end Build", "Fintech & Web3 UI", "AI Product Design",
];

export const CASES: CaseStudy[] = [
  {
    id: "veyrun",
    client: "Veyrun",
    title: "A running brand, from blank canvas to checkout, in one week",
    type: "Website",
    year: "2026",
    sector: "E-commerce · Running",
    role: "Solo · brand, design, full front-end & tests",
    duration: "1 week",
    tool: "Claude Code + Claude Design",
    stack: ["React 18.3", "TypeScript 5.9", "Vite 6.3", "react-router 7", "Tailwind v4", "Lingui v5 (EN/DE/ES)", "Zod 4", "Vitest 4", "Playwright", "Lighthouse CI"],
    highlights: [
      "Liquid-glass design system, built from scratch",
      "26 routes on one shared React template",
      "13-provider context tree + localStorage mock backend",
      "55 unit tests + 11 end-to-end specs",
      "Internationalised EN/DE/ES (~546 strings)",
      "Lighthouse budgets enforced in CI — LCP < 2.5s, CLS < 0.1",
    ],
    cover: "/assets/cases/Veyrun1.png",
    tldr: "A digital-first running brand taken end-to-end — brand, storefront, checkout and admin — across 26 routes in a single week.",
    services: ["Brand Identity", "E-commerce", "Front-end Build", "i18n"],
    metrics: [
      { v: "1 wk", k: "Brand → checkout" },
      { v: "26", k: "Routes shipped" },
      { v: "3", k: "Languages (EN/DE/ES)" },
    ],
    problem: "A new performance-running brand had nothing — no logo, no store, no checkout — and a launch date that wouldn't move. They needed a complete commercial presence, not a deck of ideas, and they needed it live before their first product drop. Most studios quote a quarter for that. Veyrun had a week.",
    approach: "We treated speed as a design constraint, not an excuse to cut corners. One liquid-glass design system and a single canonical component set on a shared React template let design and build move in lockstep. A localStorage mock backend meant the full 26-route experience — storefront, product, cart, checkout, admin — could be designed, built and tested before any infrastructure existed.",
    result: "A complete, multilingual storefront shipped end-to-end in one week — brand to checkout to admin — backed by 55 unit tests, 11 end-to-end specs and Lighthouse performance budgets enforced in CI. Veyrun went from blank canvas to a sellable store ready for launch day, with a system their own team can run and extend.",
    takeaway: "Need to be in-market yesterday? We compress the whole journey — brand, store, checkout, admin — into one tight sprint, without sacrificing the craft or the tests that keep it standing.",
    sections: [
      {
        label: "The challenge",
        body: "The brief was simple, which made it dangerous: make it feel like an art-direction site and perform like a tight React build — for a fictitious UK running label — and ship it fast. Art-direction invites indulgence; performance punishes it. The real question was never “can I make it pretty” or “can I make it fast,” but where to spend the budget so it reads as editorial without the front-end paying for it.",
        media: "/assets/cases/Veyrun2.mp4",
      },
      {
        label: "Understanding the audience",
        body: "The buyer is design-aware, 28–45, running four to six sessions a week — they’ve seen every hero carousel and tune them out on sight. So the question got concrete: what is the minimum a runner needs to decide? Three numbers — drop, stack height, and plate stiffness. Every product page bends toward surfacing those fast, then getting out of the way.",
        media: "/assets/cases/Veyrun3.mp4",
      },
      {
        label: "One idea, held everywhere",
        body: "Liquid glass over a single green pulse. Glass surfaces layered on soft 3D product renders — backdrop-blur with saturation, glass-on-glass depth, subtle inner gradients. The language borrows from visionOS but warms it with editorial type, so it never reads as cold OS chrome. I prototyped twelve glass variants directly in code, because the line between “premium” and “uncertain” is only visible in motion, against real product shots.",
        media: "/assets/cases/Veyrun4.mp4",
      },
      {
        label: "Built as a system",
        body: "It’s barely an interface — it’s a small system. One header, one canonical footer, one shared product card, every component earning its place on more than one page. Five reusable patterns do the heavy lifting, each defined once and propagated everywhere: category-aware URLs, an auto-rotating hero, a live drop countdown with zero layout shift, spec-led editorial motion, and a global image-fallback observer so nothing ever renders a broken frame.",
        media: "/assets/cases/Veyrun5.mp4",
      },
    ],
    phases: [
      { label: "Days 1–2 · Brand & system", detail: "Logo, palette, type pairing, glass tokens, and the core component set." },
      { label: "Days 3–4 · Storefront", detail: "Home, hero rotation, catalogue, product detail, and search." },
      { label: "Day 5 · Commerce & auth", detail: "Cart, mock-backed checkout, account, and order history." },
      { label: "Days 6–7 · Admin & polish", detail: "Owner admin, a motion pass, accessibility, and the full test suite green." },
    ],
    media: [
      { src: "/assets/cases/Veyrun2.mp4" },
      { src: "/assets/cases/Veyrun3.mp4" },
      { src: "/assets/cases/Veyrun4.mp4" },
      { src: "/assets/cases/Veyrun5.mp4" },
    ],
  },
  {
    id: "rivel",
    client: "Rivel",
    title: "A children's bookstore that feels like a magazine, not a warehouse",
    type: "Website",
    year: "2026",
    sector: "E-commerce · Editorial",
    role: "Solo · brand, design, full SPA & tests",
    duration: "1.5 weeks",
    tool: "Claude Code + Claude Design",
    stack: ["React 18", "TypeScript", "Vite 6", "React Router v7", "Tailwind v4", "Lingui v5 (EN/DE/ES)", "Zod", "GSAP + CustomEase", "Playwright", "Stripe"],
    highlights: [
      "22 screens with role-based routing",
      "15-rule architecture template (149 LOC max per file)",
      "6-phase page-transition system (GSAP + React Router)",
      "68 Playwright E2E tests across 3 device targets",
      "3 locales, 900+ localised strings",
      "Mock-first — designed and tested with no backend dependency",
    ],
    cover: "/assets/cases/Rivel_cover.png",
    tldr: "A curated digital children's bookstore — 22 screens, a signature page-transition language, and 68 end-to-end tests.",
    services: ["Brand Identity", "E-commerce SPA", "Motion", "QA"],
    metrics: [
      { v: "22", k: "Screens" },
      { v: "68", k: "E2E tests" },
      { v: "1.5 wk", k: "Solo build" },
    ],
    problem: "Most online bookstores feel like warehouses — endless grids, zero soul. Rivel wanted the opposite: a curated shelf you'd want to linger in on a slow Sunday morning, a shop that reads like a magazine, not a stockroom. The hard part isn't the catalogue — it's making browsing feel like a pleasure worth returning to.",
    approach: "The signature isn't a logo — it's a transition. We made the navigation itself the curtain between pages: a 6-phase GSAP page-transition system that turns browsing into a sequence of small, deliberate reveals. A 15-rule architecture template kept 22 screens coherent, and weekly curated collections give the shop a reason to be visited again.",
    result: "A 22-screen SPA across three locales, 900+ localised strings, and 68 Playwright tests on three device targets — a near-complete product shipped solo in a week and a half. Calm, editorial, and unmistakably its own.",
    takeaway: "If your product lives or dies on how it feels to move through, we design the motion and the merchandising together — so the experience itself becomes the reason people stay and come back.",
    sections: [
      {
        label: "The problem",
        body: "A children’s-literature bookshop has a split audience and a split job: parents buy, children are the reason. The store has to read as editorial — closer to a magazine than a catalogue — without losing the plumbing a real shop needs underneath: search, filters, cart, checkout, account. The design question was where the editorial voice earns its keep, and where it steps aside for the reliable mechanics of buying a book.",
        media: "/assets/cases/Rivel1.mp4",
      },
      {
        label: "Catalogue — find a book, fast",
        body: "The catalogue is the real shop, so it opens fast and filters hard. One template drives every listing — filter by age, theme and language, read straight from the URL, so any filtered view is a shareable, bookmarkable link. Lazy-loaded covers keep the grid quick even when the catalogue runs long.",
        media: "/assets/cases/Rivel2.mp4",
      },
      {
        label: "Book detail — flip before you pay",
        body: "Every book gets the editorial treatment: sample spreads, reader age, theme and language up front, and a clear path to the cart without making anyone wade through marketing copy. The decision is parent-led, so the page earns trust before it asks for anything.",
        media: "/assets/cases/Rivel3.mp4",
      },
      {
        label: "Collections — the editorial layer",
        body: "Collections are the magazine inside the shop: hand-picked, themed groupings refreshed on a cadence, each with its own landing page and voice. This is where Rivel stops feeling like a store and starts feeling like something you’d browse on a slow morning.",
        media: "/assets/cases/Rivel5.mp4",
      },
    ],
    phases: [
      { label: "Foundation · brand & architecture", detail: "Visual language, the 22-page IA, and a 15-rule architecture template." },
      { label: "Storefront & catalogue", detail: "Listings, filters, book detail, and search — the core shopping loop." },
      { label: "The transition system", detail: "A 6-phase GSAP page-transition where the navigation itself becomes the curtain between pages." },
      { label: "Commerce, i18n & tests", detail: "Stripe checkout, 3 locales / 900+ strings, and 68 Playwright specs across three devices." },
    ],
    media: [
      { src: "/assets/cases/Rivel1.mp4" },
      { src: "/assets/cases/Rivel2.mp4" },
      { src: "/assets/cases/Rivel3.mp4" },
      { src: "/assets/cases/Rivel5.mp4" },
      { src: "/assets/cases/Rivel6.mp4" },
      { src: "/assets/cases/Rivel7.png" },
    ],
  },
  {
    id: "knowlio",
    client: "Knowlio",
    title: "A tutor marketplace that leads with the person, not the price",
    type: "Platform",
    year: "2025",
    sector: "EdTech · Marketplace",
    role: "Lead designer + front-end",
    duration: "1.5 weeks",
    tool: "Claude Code + Figma",
    stack: ["Next.js 16 (App Router, RSC)", "React 19", "TypeScript 5.9", "Tailwind v4", "Supabase", "TanStack Query 5", "Zustand 5", "react-hook-form + Zod", "Framer Motion 12", "next-intl 4", "Stripe"],
    highlights: [
      "Editorial brand — cream / ink / lime, Playfair + DM Sans",
      "8-component custom animation library",
      "Dual roles: student + tutor dashboards, separate onboarding",
      "Server Components by default, client islands for animation",
      "Zod schemas shared across front-end and back-end",
      "DBS-verification flow + Stripe payouts",
    ],
    cover: "/assets/cases/Knowlio1.png",
    tldr: "An editorial-feel UK tutor marketplace — full brand, design system, an 8-component animation library and the entire front-end.",
    services: ["Brand", "Design System", "Animation Library", "Next.js Front-end"],
    metrics: [
      { v: "28", k: "Figma frames" },
      { v: "8", k: "Animation components" },
      { v: "2", k: "Role dashboards" },
    ],
    problem: "Tutor marketplaces lead with price and feel like dashboards — and parents don't hand their kids to a spreadsheet. Knowlio had to earn trust first, then close the booking, on a single surface that could do both jobs without feeling like two different products.",
    approach: "Cream and ink with one neon-lime signal, Playfair italic for voice — an editorial surface that earns the trust. Then a transactional surface that closes it: a 4-step booking modal and dual student/tutor dashboards. Every page knows which job it's doing, and an 8-component custom animation library keeps the whole thing feeling alive rather than templated.",
    result: "A full marketplace delivered as lead designer + front-end: 28 Figma frames, server-first Next.js, and Zod schemas handed to the backend as the contract. A product that reads like a magazine and converts like a checkout.",
    takeaway: "Building a marketplace? We make the emotional case and the transactional one on the same surface — so users trust you long before they reach the pay button.",
    sections: [
      {
        label: "The problem",
        body: "UK tutoring sites sell trust badly — they compress a tutor into a search-results row: a price, a star rating, a “book now.” It reads like a spreadsheet of strangers. I pulled apart six of them — Preply, italki, Tutorful, MyTutor, Superprof, Wyzant — and three levers surfaced as what parents actually decide on: DBS verification, response time, and lesson packs. Those became the trust signals the whole direction pivots on.",
        media: "/assets/cases/Knowlio2.mp4",
      },
      {
        label: "Editorial, not transactional",
        body: "Knowlio looks like a magazine, not a dashboard. Cream and ink, a single neon-lime accent used as a signal rather than a fill, Playfair italic for voice. The whole product runs on one tension: the editorial surface earns the trust, the transactional surface closes the booking. Where most marketplaces lead with the price, Knowlio leads with the person.",
        media: "/assets/cases/Knowlio3.mp4",
      },
      {
        label: "The trust surface",
        body: "The tutor profile is where the booking is earned: DBS verification shown with a date and reference, reviews surfaced with context, qualifications and teaching style up front. Everything on the page answers the one question a parent is really asking — can I trust this person with an hour of my child’s time?",
        media: "/assets/cases/Knowlio5.mp4",
      },
      {
        label: "A 4-step booking, two dashboards",
        body: "Subject & level → date & time → details → review. One decision per screen, live totals, state held so a back-step never loses progress. Behind it, dual dashboards: students rebook in a tap and keep a wishlist; tutors get the more polished half — a drag-to-block schedule and Stripe Connect payouts. If the supply side doesn’t feel professional, the marketplace never fills.",
        media: "/assets/cases/Knowlio6.mp4",
      },
    ],
    phases: [
      { label: "Research & positioning", detail: "A competitor teardown of six marketplaces, and the trust levers that set the direction." },
      { label: "Brand & design system", detail: "The editorial visual language plus an 8-component custom animation library." },
      { label: "Core flows", detail: "Catalogue, the tutor profile trust surface, and the 4-step booking wizard." },
      { label: "Dashboards & hand-off", detail: "Student + tutor dashboards, shared Zod schemas, server-first Next.js." },
    ],
    media: [
      { src: "/assets/cases/Knowlio2.mp4" },
      { src: "/assets/cases/Knowlio3.mp4" },
      { src: "/assets/cases/Knowlio5.mp4" },
      { src: "/assets/cases/Knowlio6.mp4" },
      { src: "/assets/cases/Knowlio8.png" },
      { src: "/assets/cases/Knowlio9.png" },
    ],
  },
  {
    id: "genly",
    client: "Genly",
    title: "Four AI tools, one coherent product surface",
    type: "Website",
    year: "2026",
    sector: "AI · SaaS",
    role: "Lead designer · Figma",
    duration: "Ongoing",
    tool: "Figma",
    stack: ["Figma", "FigJam", "Design tokens", "Auto-layout components", "i18n (EN/UA/DE)", "Multi-currency (£/€/$)", "Engineering hand-off"],
    highlights: [
      "100% designed in Figma",
      "One product surface across four AI tools",
      "Multilingual + multi-currency from launch",
      "Token-aware account header — single source of truth",
      "Coming-soon carousel with honest labelling",
      "Token-based design system built for the platform",
    ],
    cover: "/assets/cases/Genly_cover.png",
    tldr: "An AI platform — chatbot plus audio, image and video studios — unified across one multilingual, multi-currency surface.",
    services: ["Brand", "Marketing Site", "Product UI", "Design Tokens"],
    metrics: [
      { v: "4", k: "AI tools, one surface" },
      { v: "3", k: "Locales (EN/UA/DE)" },
      { v: "£/€/$", k: "Multi-currency" },
    ],
    problem: "Four AI tools — chat, plus audio, image and video studios — risk feeling like four different products bolted together. Genly needed one coherent surface, from the marketing site all the way into each studio, across three languages and three currencies, from day one.",
    approach: "A token-based design system built for the platform, with a token-aware account header as the single source of truth. Multilingual and multi-currency from launch. Honest coming-soon labelling for tools still in the oven — clarity over hype, so users always know where they stand.",
    result: "A live platform where all four tools feel like one product — fully designed in Figma and handed to in-house engineering with auto-layout components and design tokens they can keep building on without us in the room.",
    takeaway: "Scaling a multi-tool product? Design tokens and one account-aware shell keep every surface consistent as you add the next tool — and the one after that — so growth never costs you coherence.",
    sections: [
      {
        label: "The brief",
        body: "One home for the AI tools the client was rolling out — chatbot, audio studio, image studio, video studio — that reads as one product rather than four. The audience: professionals automating their workflow, not “AI enthusiasts.” The bar was a marketing surface that earns trust on first scroll, multilingual, with a token-aware account header showing a real balance, not a fake counter.",
        media: "/assets/cases/Genly1.png",
      },
      {
        label: "The entry surface",
        body: "The chatbot is the first tool a new user touches, so a glass-card mock of the chat input lives on the landing page — the user sees the product working before they ever sign in.",
        media: "/assets/cases/Genly2.png",
      },
      {
        label: "Studios — audio, image, video",
        body: "An accordion opens the three creation tools side-by-side with a single hero render. Pick one and you land in a tool that wears the same shell as the marketing site — so the product never feels like four things bolted together.",
        media: "/assets/cases/Genly3.png",
      },
      {
        label: "One system, handed off clean",
        body: "100% designed in Figma — every screen, every state, on a token-based design system built for the platform. Currency and language live in the nav; the account header carries one token balance, modelled as a single source of truth. Engineering shipped straight from the Figma file, tokens shared in a defined export so spacing and colour never drift.",
        media: "/assets/cases/Genly4.png",
      },
    ],
    phases: [
      { label: "Brand & tokens", detail: "Visual language and a token-based design system built specifically for the platform." },
      { label: "Marketing surface", detail: "A landing experience that earns trust on first scroll, multilingual from the start." },
      { label: "In-product UI", detail: "All four tools on one shared shell, with a token-aware account header." },
      { label: "Hand-off", detail: "Auto-layout components and a defined token export to in-house engineering." },
    ],
    media: [
      { src: "/assets/cases/Genly1.png" },
      { src: "/assets/cases/Genly2.png" },
      { src: "/assets/cases/Genly3.png" },
      { src: "/assets/cases/Genly4.png" },
    ],
  },
  {
    id: "payment",
    client: "Payment Gateway",
    title: "Crypto payments that feel calm and certain",
    type: "Platform",
    year: "2025",
    sector: "Fintech · Crypto",
    role: "Lead UX/UI designer · ongoing",
    duration: "2024 → present",
    tool: "Figma",
    stack: ["Figma", "FigJam", "Design tokens", "Engineering hand-off"],
    highlights: [
      "Token-based design system",
      "Merchant dashboard rebuild",
      "Dedicated mobile checkout",
      "~14-state error & edge-case library",
      "KYB-aware merchant onboarding",
      "Merchant-facing analytics & reports",
    ],
    cover: "/assets/cases/Payment1.png",
    tldr: "A crypto payment-gateway interface — accepting, converting and settling digital currency without the usual fintech anxiety.",
    services: ["Product Design", "Fintech UI", "Design System"],
    metrics: [
      { v: "End-to-end", k: "Accept → settle" },
      { v: "Crypto", k: "Payment rails" },
      { v: "1 system", k: "Component set" },
    ],
    problem: "Crypto payments are full of irreversible, high-stakes moments — one wrong address, one missed confirmation, and the money is gone. The interface had to make accepting, converting and settling digital currency feel calm and certain, not nerve-racking.",
    approach: "We designed every flow — transaction, conversion, settlement — around confirmation and clarity. High-stakes actions are legible at a glance, with one consistent component system so nothing ever surprises the user. Certainty, by design, at every step that matters.",
    result: "A complete payment-gateway product surface that turns a nervy fintech task into a confident, legible flow — from accept to convert to settle, end to end.",
    takeaway: "If your product carries real financial risk, we design for confidence first — clear states, no surprises, trust your users can feel before they commit to the irreversible.",
    sections: [
      {
        label: "The brief",
        body: "A licensed European platform bridging banking and crypto: a business IBAN for fiat — SEPA, SWIFT, mass payments — alongside a gateway to accept crypto online, in-store and via terminal. The bar was the trust quality of a regulated bank, for a product moving real money across 50+ countries. Every screen serves two readers at once — the merchant moving fast through a daily flow, and the compliance reviewer who has to audit it later.",
        media: "/assets/cases/Payment2.png",
      },
      {
        label: "A token system, built to scale",
        body: "Designed entirely in Figma on a token-based system — colour, type, spacing, radii, elevation, motion. One component library across the IBAN wallet, the crypto-acceptance gateway, checkout and onboarding. From the same base I produced 6+ white-label versions for partners — a new partner brand is a token swap, not a redesign, which is what made shipping that many viable.",
        media: "/assets/cases/Payment4.png",
      },
      {
        label: "Merchant dashboard",
        body: "Balances across fiat and crypto, transactions, payouts, mass payments, team access — a lot of data fighting for one screen. I led with the two questions a business asks daily — how much do I hold, and what’s moving — and pushed the rest behind progressive disclosure, so the dashboard reads as a control surface, not a spreadsheet.",
        media: "/assets/cases/Payment3.png",
      },
      {
        label: "Mobile wallet & KYB onboarding",
        body: "A wallet designed for a thumb: large numeric input, one purpose per screen, every failure mode named and given a next move. Business onboarding and KYB split into discrete, save-able stages so a compliance team can review without losing context — each stage states what it needs up front, so nothing surprises the merchant mid-flow.",
        media: "/assets/cases/Payment5.png",
      },
    ],
    phases: [
      { label: "Phase 1 · Audit + checkout", detail: "Reworked the conversion surface first." },
      { label: "Phase 2 · Merchant dashboard", detail: "The daily control surface, rebuilt around the two questions that matter." },
      { label: "Phase 3 · Mobile wallet & checkout", detail: "A thumb-first wallet and a dedicated mobile checkout." },
      { label: "Phase 4 · Onboarding & scale", detail: "KYB onboarding plus 6+ white-label versions from one token base." },
    ],
    media: [
      { src: "/assets/cases/Payment2.png" },
      { src: "/assets/cases/Payment4.png" },
      { src: "/assets/cases/Payment3.png" },
      { src: "/assets/cases/Payment5.png" },
      { src: "/assets/cases/Payment6.png" },
    ],
  },
  {
    id: "dexplanet",
    client: "DexPlanet",
    title: "A whole Web3 suite in one design language",
    type: "Platform",
    year: "2025",
    sector: "Crypto · Web3",
    role: "Lead UX/UI designer · OmiSoft",
    duration: "6 months",
    tool: "Figma",
    stack: ["Figma", "React", "Redux Toolkit", "Solidity", "Ethereum", "BSC", "Node.js", "Express", "MongoDB"],
    highlights: [
      "5 services in one platform — DEX, NFT marketplace, launchpad, liquidity pools, yield farming",
      "Phased rollout — early revenue before full launch",
      "Helped the client raise $200K",
      "Wallet integration + liquidity management",
      "Trading mechanics: AMM, swaps, pools",
      "One design system spanning every service",
    ],
    cover: "/assets/cases/PlanetDex1.png",
    tldr: "DEX trading and swap, an NFT marketplace, and a launchpad with vesting — three products, one tokenised system.",
    services: ["Product Design", "Design System", "Web3 UI"],
    metrics: [
      { v: "3-in-1", k: "DEX · NFT · Launchpad" },
      { v: "Swap", k: "+ wallet connect" },
      { v: "Tokenised", k: "Design system" },
    ],
    problem: "Web3 products bury users in jargon and risk — and three different tools usually means three different mental models to learn. DexPlanet needed trading, NFTs and a launchpad to feel like one coherent, trustworthy place, not a bundle of unrelated dapps.",
    approach: "A single tokenised design system spanning the DEX swap and wallet-connect, an NFT marketplace browse-and-detail flow, and a launchpad with IDO and vesting schedules. Consistent components doing very different jobs — so users learn the product once and feel at home everywhere.",
    result: "One design language carrying an entire crypto product suite, from a user's first swap to a full token launch. Less jargon, more confidence, one place that feels built on purpose.",
    takeaway: "Got several products under one brand? We build a single tokenised system that makes them feel like a family — so every new launch starts ahead instead of from scratch.",
    sections: [
      {
        label: "The brief",
        body: "A Saudi DeFi startup’s flagship — five services on one chain: DEX, NFT marketplace, launchpad, liquidity pools and yield farming. The bar: the trade quality of an established DEX without the Web3-bro aesthetic — calm, legible, trustworthy enough to move real money through. Five services under one brand is a coherence problem before it’s a screen problem: each tool needs its own register while still feeling like one product.",
        media: "/assets/cases/PlanetDex2.png",
      },
      {
        label: "The swap surface",
        body: "An AMM swap with price impact, slippage and route preview surfaced before the user commits. The flow is wallet-first — nothing is interactive until you’re connected, so there are no fictional “what if” states. Verified-token filtering is on by default, keeping scam tokens out of the happy path without the user having to think about it.",
        media: "/assets/cases/PlanetDex3.png",
      },
      {
        label: "NFT marketplace",
        body: "Browse, list, buy, place offers. The listing flow names the gas cost up front and asks for approval in a single sentence — no surprise wallet pop-ups mid-flow. A first-time buyer can finish a purchase without leaving for docs.",
        media: "/assets/cases/PlanetDex4.png",
      },
      {
        label: "Launchpad — IDO & vesting",
        body: "IDO presales with vesting shown as a real schedule, not a paragraph of legalese. Allocation, claim status and KYC-gating split into clear steps. The launchpad needed its own component vocabulary — once it had one, the whole flow got clearer.",
        media: "/assets/cases/PlanetDex5.png",
      },
    ],
    phases: [
      { label: "Phase 1 · Foundation", detail: "Research and a competitor audit; brand and design system; the wallet-connect flow designed first — everything depends on it." },
      { label: "Phase 2 · DEX + NFT", detail: "The two revenue-bearing services first, handed to engineering in parallel for an early launch." },
      { label: "Phase 3 · Pools + farming", detail: "Liquidity surfaces, the farming dashboard, and an impermanent-loss explainer." },
      { label: "Phase 4 · Launchpad & polish", detail: "IDO and vesting, KYC-gating, and a wallet drawer covering every failure mode." },
    ],
    media: [
      { src: "/assets/cases/PlanetDex2.png" },
      { src: "/assets/cases/PlanetDex3.png" },
      { src: "/assets/cases/PlanetDex4.png" },
      { src: "/assets/cases/PlanetDex5.png" },
      { src: "/assets/cases/PlanetDex6.png" },
    ],
  },
];

export const SERVICES: Service[] = [
  {
    key: "websites",
    n: "01",
    title: "Websites",
    lead: "Our core. Marketing sites, storefronts, portfolios and landing pages — designed and built to feel fast, look fearless, and convert.",
    points: [
      "Brand-driven art direction & UI",
      "Webflow, headless or hand-coded",
      "Motion & interaction design",
      "Performance & SEO baked in",
      "Multilingual from launch",
      "A CMS your team will actually use",
    ],
  },
  {
    key: "crm",
    n: "02",
    title: "Platforms & CRM",
    lead: "Marketplaces, dashboards, fintech and Web3 interfaces, and custom CRMs — designed around how your team and users really work.",
    points: [
      "Pipelines, dashboards & internal tools",
      "Marketplaces & client portals",
      "Fintech & crypto product UI",
      "Design systems & component libraries",
      "Front-end build on your stack",
    ],
  },
  {
    key: "brand",
    n: "03",
    title: "Brand & Systems",
    lead: "The connective tissue — identity, design systems and motion language that keep everything coherent as you grow.",
    points: [
      "Visual identity & guidelines",
      "Scalable design systems",
      "Custom animation libraries",
    ],
  },
];

export const PROCESS: ProcessStep[] = [
  { n: "01", t: "Spark", d: "A focused kickoff. We pin down the goal, the audience and the one thing this project must achieve — then sketch fast.", days: "Day 1–2" },
  { n: "02", t: "Shape", d: "Art direction and key screens. You see real design — not lorem wireframes — within the first few days.", days: "Day 3–5" },
  { n: "03", t: "Build", d: "Design and build move together on a shared, tested template. Daily previews mean no big-reveal surprises.", days: "Day 5–10" },
  { n: "04", t: "Launch", d: "We ship — tested, multilingual, performance-budgeted — hand over a system you can run yourself, and stay on call.", days: "Day 10–14" },
];

export const WHY: WhyItem[] = [
  { t: "Fast by design", d: "Whole products ship in one to two weeks. Speed isn't a discount on quality — it's the result of a tight, opinionated, test-backed process." },
  { t: "Creative on purpose", d: "We don't ship templates. Every project gets real art direction, a signature idea, and a brand that's truly its own." },
  { t: "Built to run", d: "You leave with a clean, tested, editable system — a site or platform your team can own without calling us for every change." },
];
