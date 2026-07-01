# EMP Reskin — Iteration 4

NWN-branded Enterprise Management Portal (EMP) admin dashboard prototype. A React/Vite front end with a Material Design 3–style navigation rail, an Aiva AI assistant side panel, and pages for Home, Knowledge Base, Service Catalog, My Cases, and Reports.

## Tech stack

- [Vite](https://vitejs.dev/) + React (TypeScript)
- [MUI](https://mui.com/) and [Radix UI](https://www.radix-ui.com/) primitives
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Recharts](https://recharts.org/) for charts

## Getting started

```bash
npm i
npm run dev
```

Build for production:

```bash
npm run build
```

## Project structure

```
src/
  app/
    components/   # Sidebar, Header, AivaPanel, drawers, dashboard widgets, ui/ primitives
    context/       # ThemeContext
    pages/         # HomePage and other route-level pages
  imports/         # Figma-exported assets/components
  styles/          # Global styles
```

## Key features

- Added a banner with New Case, Email, and Phone actions available upfront
- Cards highlight on hover for better visual feedback
- Updated My Case card
- Added "View All" option to all cards
- Updated primary color for Aiva and the left navigation
- New Case now opens in a right drawer instead of a dedicated page
