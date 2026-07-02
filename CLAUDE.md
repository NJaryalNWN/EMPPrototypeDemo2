# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

NWN-branded Enterprise Management Portal (EMP) admin dashboard prototype — a Figma Make export. React + Vite SPA with a Material Design 3–style navigation rail, an Aiva AI assistant side panel, and pages for Home, Knowledge Base, Service Catalog, My Cases, and Reports.

## Commands

```bash
npm i           # install deps (pnpm-lock.yaml also present; either works)
npm run dev     # start Vite dev server
npm run build   # production build (vite build)
```

There is no lint, test, or typecheck script configured in `package.json` — don't assume `npm run lint`/`npm test` exist.

## Architecture

### Routing is fake — one big switch, not a router

`App.tsx` holds `activePage` in React state and renders `PageContent`, a `switch` over page-name strings ("Home", "Knowledge Base", "Service Catalog", "My Cases", "Reports"). Navigating calls `navigate(page)`, which sets state and does a **cosmetic** `window.history.pushState` to a slug (`pageToSlug`) — there is no server-side route handling, so deep-linking to a slug directly does nothing (the app always boots into "Home" and reads `popstate` only for in-app back/forward). Any page name not in the switch falls through to a generic "This section is coming soon" placeholder — this is intentional and used for most sidebar destinations that don't have a real page yet.

### `HomePage.tsx` is not just the home page

`src/app/pages/HomePage.tsx` is a single ~2300-line file that exports **five** page components used by `App.tsx`: `HomePage`, `KnowledgeBasePage`, `ServiceCatalogPage`, `MyTicketsPage`, `ReportsPage`. It also defines most of the shared card/row/chip/breadcrumb primitives used only by those pages (e.g. `PortalCard`, `CardHeader`, `CardFooter`, `RowItem`, `HeaderStatPill`, `Breadcrumb`, `StatusChip`). When asked to change "the Home page" or a specific card, search within this file rather than expecting a dedicated file per page/component.

### Sidebar nav data mirrors a real backend shape

`src/app/components/Sidebar.tsx`'s `navConfig` array is hand-maintained to mirror the real `getEmpMenu` GraphQL/API response shape (rail item → `sections` grouped by `heading` ("CONTROL"/"MONITOR"/"REPORT") → leaf `SubItem`s). Leaf items are either internal (`navTarget` is a page-name string consumed by `onNav`) or external (`isExternal: true`, `navTarget` is a real URL opened via `window.open`). Icons are intentionally *not* driven by this data — they're assigned per rail item in the same file and were explicitly asked to stay untouched when the nav data was last synced to the API shape.

Multiple rail sections share the same placeholder `navTarget`/URL across sibling sub-items (there's no real page per tool yet). `getRailOwner()` and the flyout's active-item logic both account for this: only the *first* item matching the current `activePage` is treated as active, specifically to avoid every sibling lighting up at once — don't "simplify" this by reverting to a plain equality check.

### Theming: 3 exposed themes, 4 defined

`ThemeContext` (`src/app/context/ThemeContext.tsx`) persists `Theme = "light" | "dark" | "warm"` to `localStorage` and sets `data-theme` + a `.dark` class on `<html>`. `src/styles/theme.css` also defines a 4th `[data-theme="ocean"]` block that is **not** wired into the theme picker (`Header.tsx`'s `themes` array only lists light/dark/warm) — it's effectively dead but present for future use; CSS custom properties for it inherit from the light block for anything it doesn't override.

All colors/typography are CSS custom properties in `theme.css`, bridged to Tailwind v4 via an `@theme inline` block (e.g. `--color-primary: var(--primary)`), so both `className="bg-primary"` and inline `style={{ color: "var(--primary)" }}` are valid and equivalent throughout the codebase — components mix both styles freely, there's no single convention to enforce.

**Current brand tokens** (light theme, the default): Primary = Brand Navy `#001355`, Secondary/accent = Coral `#FF5C39` (used for all CTAs, "View All" links, active states — reserved for emphasis, not the default button color everywhere). Fonts: Sofia Sans (`--font-heading`/`--font-body`) and IBM Plex Mono (`--font-mono`, for ticket/request IDs and other data-like strings), loaded via Google Fonts `@import` in `src/styles/fonts.css`.

### CSS import order matters

`src/styles/index.css` (imported once from `main.tsx`) chains `fonts.css` → `tailwind.css` → `theme.css`. `src/styles/globals.css` exists but is empty/unused — don't add to it expecting it to take effect anywhere.

### Sidebar hover/active pattern (MD3)

The nav rail follows Material Design 3's navigation-rail state model: default icon color = `--sidebar-icon` (onSurfaceVariant), hover = `--sidebar-hover-fg` (a darker neutral, onSurface — *not* a brand color) plus a same-hue background state layer (`--sidebar-hover`), and only the truly active/selected item gets the brand accent (`--sidebar-active-fg`/`--sidebar-active-container`). When adjusting sidebar/nav hover states, keep hover neutral and reserve color for the active state — this was previously a bug (stale pre-rebrand color leaking into hover) and was deliberately fixed.

### Dead/unwired code

`src/app/components/Dashboard.tsx`, `AddDrawer.tsx`, and `ResourcePreviewPanel.tsx` form a self-contained resource-management drawer with charts (Recharts) but are **not imported by `App.tsx`** or reachable from any current route — treat as orphaned/legacy unless a task explicitly asks to wire them in.

### Other structural notes

- `vite.config.ts` defines a custom `figmaAssetResolver` plugin that resolves `figma:asset/<name>` imports to `src/assets/<name>` — a leftover from the Figma Make export pipeline; don't remove the React/Tailwind plugins even if they look unused, per the inline comment.
- `base: '/EMPPrototypeReskin/'` in `vite.config.ts` controls the dev server's URL path prefix.
- `@` is aliased to `src/` in Vite resolve config.
- `src/app/components/ui/` is a shadcn/Radix primitives directory (standard generated components) — prefer composing these over hand-rolling new primitives when one already exists there.
- `src/imports/` holds raw Figma-exported assets/components — treat as generated, not hand-maintained.
