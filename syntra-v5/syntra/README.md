# Syntra — One workspace. Total clarity.

Front-end-only portfolio project: a premium modern SaaS workspace (React + Vite + Tailwind CSS v4).
Mock/local data only. No backend, no AI features.

## Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview the build

## Structure
`src/components/{ui,layout,charts,forms,tables,common}`, `src/pages`, `src/data`, `src/hooks`, `src/context`, `src/utils`, `src/routes`, `src/styles`.
Alias: `@` → `src`.

## Design tokens
Defined in `src/styles/index.css` (derived from `DESIGN.md`). Use semantic utilities
(`bg-canvas`, `bg-surface`, `text-fg-muted`, `shadow-ring`, `rounded-md`, `.eyebrow`…).

## Status
Compact full build: shell, dashboard, projects, kanban, calendar, analytics, documents, team, goals, notifications, activity, settings, command palette (⌘K).
