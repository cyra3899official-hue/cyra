# CYRA STORE — AI Coding Agent Guide

This guide makes agents immediately productive in this Next.js 16 skincare e-commerce app. Keep changes minimal, aligned with existing patterns, and reference files via `@/*` aliases.

## Architecture & Stack
- **Framework:** Next.js 16 App Router (RSC enabled), React 19, TS 5.
- **UI:** shadcn/ui primitives in `components/ui`, Tailwind v4, Lucide icons, Framer Motion.
- **Data/AI:** Firebase Storage for product images, Gemini 1.5 Flash for skin analysis & chatbot via server actions.
- **Database:** Firestore `products` collection (see `components/AdminSeeder.tsx` for seeding).
- **Config:** [next.config.mjs](../next.config.mjs) (TS errors ignored, images unoptimized, Khmer font via `next/font/google`).

## Run & Dev Workflows
- **Commands:** `pnpm dev` (http://localhost:3000), `pnpm build`, `pnpm start`, `pnpm lint` (see [package.json](../package.json)).
- **Environment:** Create `.env.local` with `NEXT_PUBLIC_*` Firebase keys (6 values) + `GEMINI_API_KEY` (server-only, never client-side).
- **Path Aliases:** Use `@/components/*`, `@/lib/*`, `@/hooks/*`, `@/app/*` (defined in [tsconfig.json](../tsconfig.json)).

## Conventions That Matter
- **Client Components:** Add `"use client"` at the top when using hooks (useState, useRef, useEffect), event handlers, motion, or browser APIs (FileReader, URL.createObjectURL). Examples: [skin-analyzer.tsx](../components/skin-analyzer.tsx), [floating-chatbot.tsx](../components/floating-chatbot.tsx).
- **Server Actions:** Place in `app/actions/*.ts`, mark with `'use server'` at top. Used for Gemini API calls (image analysis, chat), Firestore writes. Examples: [gemini-analyze.ts](../app/actions/gemini-analyze.ts), [gemini-chat.ts](../app/actions/gemini-chat.ts).
- **shadcn/ui:** Import from `@/components/ui/*`; never edit files under `components/ui/`.
- **Styling:** Tailwind v4 utilities + CSS variables from [app/globals.css](../app/globals.css) (e.g., `bg-primary`, `text-foreground`).
- **Images:** Use `<img>` tags with Firebase Storage URLs; never use `next/image`. Client-side validation enforced (min 200x200px, max 5MB).
- **Types:** Prefer `type` for prop interfaces; import React/Next as `import type ...`.
- **Bilingual UI:** All nav/CTAs are Khmer + English. Keep labels consistent: "Shop"/"ឈានដល់", "Home"/"ទំព័រដើម", "Contact Us"/"ទាក់ទងយើងខ្ញុំ".

## Core Features & Data Flows

### 1. Skin Analyzer (វិភាគស្បែក)
- **Component:** [skin-analyzer.tsx](../components/skin-analyzer.tsx) (client) → [skin-analysis-result.tsx](../components/skin-analysis-result.tsx) (display)
- **Flow:** User uploads image → validate (200x200px min, 5MB max, via `validateImage()`) → `fileToBase64()` helper → POST to server action [gemini-analyze.ts](../app/actions/gemini-analyze.ts) → Gemini analyzes via 8-point protocol → results with product recommendation
- **Key Files:** [knowledges/ai-analysis-skin.md](../knowledges/ai-analysis-skin.md) (diagnostic rules + product mapping), [lib/firebase.ts](../lib/firebase.ts) (fileToBase64 helper)
- **Response Structure:** Follows `SkinAnalysisResponse` interface: problem, rootCauses[], thingsToAvoid[], keyIngredients[], solutionStrategy, lifestyleTips[], expectedResults, recommendedProduct{}

### 2. Floating Chatbot (សូត្របាទ "Sister Cyra")
- **Component:** [floating-chatbot.tsx](../components/floating-chatbot.tsx) (client, Sheet-based UI)
- **Flow:** User message → call server action [gemini-chat.ts](../app/actions/gemini-chat.ts) with conversation history → Gemini responds with system prompt from [knowledges/cyra-skincare-support.md](../knowledges/cyra-skincare-support.md) → chat history maintained client-side (useState)
- **Persona:** Sister Cyra — warm, empathetic, Khmer-first language + friendly emojis, expert skincare knowledge
- **Response:** Always include `message` (string); optionally `suggestAnalyzer` (boolean) to encourage skin analysis

### 3. Shop/Storefront (ហាង)
- **Page:** [app/shop/page.tsx](../app/shop/page.tsx) with [components/shop/shop-hero.tsx](../components/shop/shop-hero.tsx) + [components/shop/search-filter-bar.tsx](../components/shop/search-filter-bar.tsx)
- **Grid Component:** [components/shop/product-grid-firestore.tsx](../components/shop/product-grid-firestore.tsx) — reads live from Firestore `products` collection via `getDocs(collection(db, "products"))`
- **Product Card:** [components/shop/product-card.tsx](../components/shop/product-card.tsx) displays name, price, image, benefit
- **Filtering:** Search + category filter applied client-side in `FirestoreProductGrid` (matches name, benefit, or category)
- **Seed Data Fallback:** If Firestore unavailable, falls back to [lib/products.ts](../lib/products.ts) catalog
- **Admin Seeding:** Use [components/AdminSeeder.tsx](../components/AdminSeeder.tsx) (visible UI button) to write product data into Firestore via `writeBatch()` pattern

### 4. Knowledge Files (CRITICAL — AI Backbone)
- **[knowledges/ai-analysis-skin.md](../knowledges/ai-analysis-skin.md):** 8-point diagnostic protocol, acne/pigmentation/texture rules, visual evidence classification, product recommendation logic for skin analysis
- **[knowledges/cyra-skincare-support.md](../knowledges/cyra-skincare-support.md):** Sister Cyra persona, business info (payment, shipping), complete product knowledge base with usage instructions

## Examples Aligned to Codebase

### Component Patterns
\`\`\`tsx
// Client component with hooks & Framer Motion
"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function MyComponent() {
  const [state, setState] = useState(false)
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} />
}
\`\`\`

### Server Action Pattern
\`\`\`typescript
// app/actions/my-action.ts
'use server'
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export async function fetchData() {
  try {
    const snap = await getDocs(collection(db, "products"))
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (error) {
    // Always catch & return structured error, never throw raw errors to client
    return { error: "Failed to fetch", message: error.message }
  }
}
\`\`\`

### UI & Styling
- **Import UI:** `import { Button } from "@/components/ui/button"`
- **Class merging:** `className={cn("base-class", isActive && "text-primary")}` (cn from `@/lib/utils.ts`)
- **Tailwind + CSS vars:** `bg-primary` uses color from [app/globals.css](../app/globals.css)

### Common Helpers
- **File to Base64:** `const base64 = await fileToBase64(file)` (from [lib/firebase.ts](../lib/firebase.ts)) — used for Gemini image analysis
- **Toast notifications:** `import { toast } from 'sonner'; toast.success("Success!")` or `toast.error("Failed")`
- **Firestore read:** `const snap = await getDocs(collection(db, "products")); const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))`

## Internationalization Notes
- Khmer + English labels in nav/components; CTA often Khmer (e.g., "ពិនិត្យស្បែកមុខ"). Keep bilingual wording consistent when adding UI.
- Font: Noto Sans Khmer loaded in `app/layout.tsx` via `next/font/google`.

## Integration Details

### Gemini AI Integration
- Use `@google/generative-ai` package; instantiate in server actions with `new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)`
- Model: `gemini-1.5-flash` — used for both skin analysis and chatbot responses
- **Key Pattern:** Load prompts from knowledge files at request time (see `loadSkinAnalysisRules()` in [gemini-analyze.ts](../app/actions/gemini-analyze.ts))
- **Never expose** `GEMINI_API_KEY` to client; keep in `.env.local` (server-only)
- **Error handling:** Server actions must catch API errors and return structured responses (`{error: "...", message: "..."}`) rather than throwing

### Firebase Setup
- Initialize via [lib/firebase.ts](../lib/firebase.ts); exports `db`, `storage`, `auth`
- **Storage URLs:** Product images stored as Firebase Storage direct URLs: `https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{filename}?alt=media`
- **File helper:** Use `fileToBase64(file)` from [lib/firebase.ts](../lib/firebase.ts) to convert File → base64 for Gemini API calls
- **Auth:** GoogleAuthProvider available; currently minimal auth setup (future expansion possible)

### Firestore Data Patterns
- **Read:** `const snap = await getDocs(collection(db, "products")); const docs = snap.docs.map(d => ({id: d.id, ...d.data()}))`
- **Write:** Use `writeBatch()` for bulk operations (see [AdminSeeder.tsx](../components/AdminSeeder.tsx) pattern)
- **Collections:** Currently only `products` collection in use; schema flexible (images as URLs, prices as strings/numbers)
- **Rules (Dev):** Currently allow all read/write for `products` collection; restrict in production

## AI Error Handling & Fallbacks

**Critical Pattern:** Server actions MUST catch all errors and return structured responses. Never throw raw errors to the client.

- **Missing Knowledge Files:** If `knowledges/ai-analysis-skin.md` or `knowledges/cyra-skincare-support.md` cannot be read, server actions (`gemini-analyze.ts`, `gemini-chat.ts`) MUST fall back to hardcoded safe-mode prompts (prevent crashes). Store fallback prompts as string constants in the server action file.
- **Gemini API Timeouts/Errors:** Catch errors in server actions and return a structured error response (e.g., `{ error: "API Error", message: "..." }`). Client-side: Catch errors and display user-friendly Khmer toast via `toast.error("សូមព្យាយាមម្តងទៀត អូ។")` instead of raw HTTP 500.
- **Image Processing Failures:** Client-side validation catches most issues (size, dimensions). If server-side fails, return error structure; UI shows toast. Never expose raw stack traces to user.
- **Firestore Unavailable:** If `getDocs(collection(db, "products"))` fails, fall back to `lib/products.ts` seed data. Log error server-side but don't break the shop UI.

## Pitfalls to Avoid
- Do not edit components/ui generated primitives.
- Do not hardcode colors; use semantic tokens.
- Do not add global state libs; keep state local/lifted.
- Do not break alias usage; avoid relative deep paths.
- Do not expose raw API errors or stack traces to the UI; always wrap in user-friendly Khmer messages.

## When Adding Features
- **New page:** Create `app/[route]/page.tsx`, add nav item in [components/header.tsx](../components/header.tsx) with both English and Khmer labels.
- **New product:** Upload image to Firebase Storage, add to [lib/products.ts](../lib/products.ts) catalog, update [components/AdminSeeder.tsx](../components/AdminSeeder.tsx) to seed to Firestore, update knowledge files as needed.
- **AI updates:** Adjust prompts in `knowledges/*`, keep server actions in `app/actions/*`, test with fallback prompts enabled.

## Dynamic Storefront (Firestore)
- **Status:** `/shop` page ALREADY uses `FirestoreProductGrid` (in `components/shop/product-grid-firestore.tsx`), reading live from Firestore `products` collection.
- **Seeding:** Use `components/AdminSeeder.tsx` (visible in UI as admin tool button) to write product data into Firestore via `writeBatch()`.
- **Fallback:** `lib/products.ts` contains seed catalog and serves as fallback if Firestore unavailable.
- **Pattern:** `getDocs(collection(db, "products"))` returns docs; map via `snap.docs.map(d => ({ id: Number(d.id), ...d.data() }))`.
- **Filtering:** Search + category filter applied client-side in `FirestoreProductGrid` (matches name/benefit/category).

## Admin Flows (MVP)
- Seeder: Use `components/AdminSeeder.tsx` to write product data into Firestore (`products` collection) via `db` from `lib/firebase.ts`.
- Future: A full Admin Dashboard (Update/Delete UI) will replace Seeder; until then, avoid hardcoding products in UI components.

## Environment & Firebase Rules
- `.env.local` keys (server/dev):
\`\`\`bash
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

# Server-only
GEMINI_API_KEY=xxx
\`\`\`
- Firestore Rules (development only — relax later for production):
\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{doc} {
      allow read, write: if true; // dev-only, open access
    }
  }
}
\`\`\`
- Production guidance: require auth for writes, restrict reads if needed; keep product images as Firebase Storage URLs stored in each product doc.
## 🧠 CRITICAL: AI Logic & Data Rules

### 1. The "Sister Cyra" Persona & Knowledge Base
- **Source of Truth:** Before modifying any AI prompt or logic (Chat/Analyze), you MUST read the files in the `knowledges/` directory:
  - `knowledges/ai-analysis-skin.md`: Rules for skin analysis, 8-point protocol, and product mapping.
  - `knowledges/cyra-skincare-support.md`: Chatbot persona, detailed product list, and pricing logic.
- **Persona:** Always maintain the "Sister Cyra" persona: Warm, empathetic, using Khmer language (primary) with friendly emojis.

### 2. Database vs. Static Data
- **Current Source (UI):** The storefront reads products from `lib/products.ts` (see `components/shop/product-grid.tsx`).
- **Firestore (seeding/migration):** `components/AdminSeeder.tsx` seeds `products` into Firestore using `db` from `lib/firebase.ts`. Use Firestore as the source of truth when migrating the storefront.
- **Fallback & Types:** Keep `lib/products.ts` for initial seed data and as a fallback if Firestore is unavailable.
- **Adding Products:** Prefer updating seed data in `lib/products.ts` and images in Firebase; if the storefront is switched to Firestore, add/update documents in the `products` collection (via the seeder or admin flow), not directly in UI components.

### 3. Image Assets
- **No Placeholders:** Do not use `via.placeholder.com` or random URLs.
- **Storage:** Product images are hosted in **Firebase Storage** and referenced directly via URL (e.g., in `lib/products.ts`). If reading from Firestore, store the same image URL in each product document.

Questions or unclear areas? Share the target change and files you plan to touch; we’ll refine these guidelines if anything feels incomplete.
