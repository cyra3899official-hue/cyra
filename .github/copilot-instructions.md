# CYRA STORE — AI Agent Quickstart

- **Stack:** Next.js 16 (App Router, RSC), React 19, TS 5, Tailwind v4, shadcn/ui primitives, Framer Motion, Lucide. Config in [next.config.mjs](../next.config.mjs) ignores TS build errors and unoptimizes images.
- **Run:** `pnpm dev` → http://localhost:3000, `pnpm build`, `pnpm start`, `pnpm lint`. Path aliases `@/*` in [tsconfig.json](../tsconfig.json).
- **Env:** `.env.local` needs the 6 `NEXT_PUBLIC_FIREBASE_*` keys + server-only `GEMINI_API_KEY`. Do not expose the Gemini key to client code.

## Core Flows
- **Skin Analyzer:** Client UI [components/skin-analyzer.tsx](../components/skin-analyzer.tsx) → validates images (≥200x200, ≤5MB, image MIME) → `fileToBase64` from [lib/firebase.ts](../lib/firebase.ts) → server action [app/actions/gemini-analyze.ts](../app/actions/gemini-analyze.ts) → Gemini returns 8-field `SkinAnalysisResponse` → rendered by [components/skin-analysis-result.tsx](../components/skin-analysis-result.tsx). Knowledge lives in [knowledges/ai-analysis-skin.md](../knowledges/ai-analysis-skin.md); errors fall back to `getMockSkinAnalysis()`.
- **Chatbot:** UI uses server action [app/actions/gemini-chat.ts](../app/actions/gemini-chat.ts) with Gemini 1.5 Flash and the prompt from [knowledges/cyra-skincare-support.md](../knowledges/cyra-skincare-support.md). Persona is "Sister Cyra": Khmer-first tone, friendly emojis, only catalog products.
- **Storefront:** `/shop` page [app/shop/page.tsx](../app/shop/page.tsx) renders hero [components/shop/shop-hero.tsx](../components/shop/shop-hero.tsx) (top 5 from [lib/products.ts](../lib/products.ts)) and Firestore grid [components/shop/product-grid-firestore.tsx](../components/shop/product-grid-firestore.tsx) (reads `products` via `getDocs(collection(db,"products"))`, client-side search/category filter, uses [components/shop/product-card.tsx](../components/shop/product-card.tsx)). Seed helper [components/AdminSeeder.tsx](../components/AdminSeeder.tsx) bulk-writes `lib/products.ts` into Firestore with `writeBatch`.

## Conventions
- Add "use client" on components using hooks/events/motion. Server actions in `app/actions/*` start with `'use server'` and must catch errors, returning structured objects instead of throwing.
- UI imports from `@/components/ui/*`; never edit files under `components/ui/`.
- Styling via Tailwind tokens from [app/globals.css](../app/globals.css); avoid hardcoded colors—use semantic classes like `bg-primary`, `text-foreground`.
- Images use `<img>` with Firebase Storage URLs; do not switch to `next/image`.
- Types: prefer `type` aliases; import React/Next types via `import type ...`.
- Bilingual labels: keep Khmer + English in nav/CTAs (see [components/header.tsx](../components/header.tsx)).

## Data & AI Notes
- Knowledge files in `knowledges/` are the source of truth for prompts and product logic; read them before changing AI behavior.
- Product catalog lives in [lib/products.ts](../lib/products.ts) and seeds Firestore. If Firestore fetch fails in your code, fall back to this list instead of breaking the UI.
- Gemini calls should log minimally and avoid leaking raw errors to users; surface friendly Khmer toasts (e.g., via `sonner`).

## Pitfalls / Do Nots
- Do not edit generated shadcn/ui primitives.
- Do not introduce global state libs; keep state local/lifted.
- Do not hardcode placeholder image URLs or random assets—use Firebase URLs.
- Do not bypass aliases with deep relative imports.

## When Extending
- New page: add under `app/[route]/page.tsx` and include Khmer/English nav entry in [components/header.tsx](../components/header.tsx).
- New product: upload image to Firebase Storage, add to [lib/products.ts](../lib/products.ts), ensure AdminSeeder writes it, and (if AI-relevant) update knowledge files.
- AI updates: adjust prompts in `knowledges/*` and keep server actions within `app/actions/*`; ensure safe fallback responses remain.

Questions or unclear areas? Say what you plan to change and which files you’ll touch so we can refine guidance.
