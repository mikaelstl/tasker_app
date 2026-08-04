# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite + React + TypeScript frontend. Main source code lives in `src/`:
- `src/pages/`, `src/screens/`, `src/components/` for UI composition
- `src/context/`, `src/providers/`, `src/hooks/` for shared state and logic
- `src/service/` for API and mock data access
- `src/utils/`, `src/maps/`, `src/assets/` for helpers, mappings, and shared visuals

Static files belong in `public/`. Reference notes and module context live in `context/`. Keep feature code close to the area it belongs to instead of creating broad shared folders.

## Build, Test, and Development Commands
Use the npm scripts defined in `package.json`:
- `npm run dev` - starts the Vite dev server locally
- `npm run build` - type-checks with `tsc -b` and creates the production bundle
- `npm run lint` - runs ESLint across the repository
- `npm run preview` - previews the production build locally

The README mentions `npm start`, but this project currently defines `npm run dev` instead.

## Operational Context
Before running commands or changing a feature, consult the relevant content in `context/` to understand the current state of the affected area. When you finish a task, update the corresponding context and, if a prompt/task file is in use, mark the task as completed and add a short summary below it.

## Coding Style & Naming Conventions
Use TypeScript and modern React function components. Follow the existing ESLint setup in `eslint.config.js`; it targets `*.ts` and `*.tsx` files and enforces React Hooks rules.

Prefer:
- 2-space indentation
- `PascalCase` for components and screens, e.g. `LoginForm`
- `camelCase` for hooks, utilities, and variables, e.g. `useAccessControl`
- folder-per-feature patterns with `index.tsx` or `index.ts`

Keep styling colocated when a screen needs its own styles, usually in `style.ts`.

## Typing
Avoid `Omit`, `Partial`, `Record`, `Pick`, `RecordResult`, and other derived types that build a new object from another one. Always prefer explicit contracts with `interfaces` and `types`.

## Testing & Validation
There is no dedicated test runner configured yet. Before opening a change, run `npm run lint` and `npm run build` to catch type and integration issues. If you add tests, place them near the feature they cover and name them clearly, such as `ComponentName.test.tsx`.

## Commit & Pull Request Guidelines
Local history uses conventional prefixes such as `feat:`, `fix:`, and `refactor:`. Keep commit subjects short, imperative, and scoped to one change.

Pull requests should include:
- a short summary of the change
- screenshots or screen recordings for UI updates
- notes about API, environment, or `.env` changes
- links to related issues when applicable

## Configuration Notes
Do not commit secrets. Keep local values in `.env` and treat it as environment-specific configuration only.
