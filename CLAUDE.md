# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Tasker is a project/team management web app (PT-BR product, alternative to Jira/ClickUp/Asana aimed at small teams). This repo is the **frontend only**: Vite + React 19 + TypeScript, consuming a separate NestJS/PostgreSQL/Prisma backend. The full product spec — business model, roles, modules, functional requirements — lives in `context/application_context.md`; read it before making product-level decisions.

## Commands

```bash
npm run dev       # start Vite dev server (https://localhost:5173)
npm run build     # tsc -b type-check + production build — run before considering a change done
npm run lint      # ESLint over the whole repo
npm run preview   # preview the production build
```

There is no test runner configured. Validate changes with `npm run lint` and `npm run build`.

## Architecture

### Path alias
`@/*` resolves to `src/*` (configured in both `tsconfig.app.json` and `vite.config.ts` via `vite-tsconfig-paths`). Prefer `@/...` imports in new code.

### Services layer — real vs. mock, always behind one interface
Data access goes through a strict service-per-resource pattern:

- `src/service/modules/<resource>/<resource>.service.ts` — real implementation, calls `ApiClient` (`src/service/api/index.ts`, an Axios wrapper with `load/register/change/update/remove/download` methods, auth-token/org-key header injection, and centralized error toasting).
- `src/service/mock/<resource>/<resource>.mock.ts` — in-memory mock implementing the *same interface*, backed by shared state in `src/service/mock/data.ts` and auth/org context from `src/service/mock/request-context.ts`.
- `src/providers/ServicesProvider` wires up both sets and picks one based on `dotenv.USE_MOCKS` (`VITE_USE_MOCKS` env var).
- Components/screens/hooks never import a service directly — they call `useServices()` (`src/hooks/useServices.ts`) and are agnostic to real vs. mock.

When adding a resource: define/extend the service interface first, then implement both the real and mock versions, register the mock in `ServicesProvider`, and update `mockData`/cross-references in `src/service/mock/data.ts` (e.g. deleting a project must cascade to its tasks, comments, events, members, and derived stats in the mock store).

Full rules: `.agents/skills/mock-service-bridge/SKILL.md`.

### Data fetching contract
- One service per resource, one single-responsibility method per fetch, named `loadX` (`loadTasks`, `loadProjects`, `loadEvents`, …).
- Don't create aggregator methods that fetch multiple resources at once; prefer separate calls over `Promise.all` unless concurrency is truly required.
- One `useEffect` per component (more only in real edge cases); `load*` functions are defined outside the effect, the effect's only job is to invoke them.
- Error handling is `try/catch`, never `.then().catch()`.

Full rules: `.agents/skills/resource-fetch-contract/SKILL.md`.

### Presentational components
Components are a display layer: they show data and call functions, they don't own business logic. Data prep/transformation/filtering/sorting belongs in component methods, not inline in JSX; if a rule grows non-trivial, move it out of the component entirely.

Full rules: `.agents/skills/presentational-component-contract/SKILL.md`.

### General code style
- Prefer small, single-responsibility methods and linear, explicit flow.
- Reach for React hooks before hand-rolled state logic.
- Use `strategy maps` (lookup objects) instead of `if/else` chains when dispatching on a value; keep `if/else` for validation/precondition/state checks.
- No classes/factories/generic abstractions until there's real repetition — see `.agents/skills/simple-direct-logic/SKILL.md`.
- **Typing**: avoid `Omit`, `Partial`, `Pick`, `Record`, and other derived/mapped types built off another type — prefer explicit `interface`/`type` contracts (see `AGENTS.md`).

### Auth, organization context, and access control
- `AuthProvider` / `useAuth` own authentication state and talk only to `AccountService`. `AuthContext` decides `authenticating`/`authenticated`.
- `OrganizationProvider` / `useOrganization` own the active organization (workspace) selection, persisted via `x-org-key`.
- Route guards compose in `src/routes/`: `PrivateRoute` (must be authenticated), `ProtectedRoute` (authenticated *and* verified as a member of the active org, via `AffiliationService.participates`), `PermissionRoute` (authenticated + specific `AccessPermission`, e.g. `viewProjectStats`, `editProject`).
- `useAccessControl` (`src/hooks/useAccessControl.ts`) is the single source of truth for role-based permission checks (`OWNER` / `MANAGER` / `MEMBER`, from `OrgRole`), exposing both a generic `can(permission, ownerAffiliationId?)` and named `canX()` helpers. Business rules for what each role can do belong here, not scattered across components. Note: business rules should ultimately stay centralized in the backend (see `context/application_context.md` §"Diretrizes para IA"); this hook mirrors backend authorization for UI gating only.

### API error handling
`ApiClient` normalizes all backend errors into a shared `ApiError` shape and pushes toast notifications automatically (via `useToast`'s `notifications`) — most call sites don't need to show their own generic error toast, just catch and react to `ApiError.errors` when they need per-field/level handling (e.g. `ProtectedRoute` re-toasts and redirects when a user no longer belongs to an org). 401s trigger `expireAuthSession()` unless the failing request is flagged `handlesUnauthorizedLocally` (see `requestIdentity()` in `src/service/api/index.ts`).

### Routing
`src/App.tsx` defines all routes with `react-router-dom`. Modals/overlays (e.g. task overview) use the "background location" pattern — rendered as a second `<Routes>` over the current page via `location.state.backgroundLocation` — so a route can open as a modal without losing the underlying screen.

### Styling
Component/screen-local styles live in a colocated `style.ts` using `styled-components` (not Tailwind, despite a stray comment in `tsconfig.app.json`). Follow the folder-per-feature convention: `ComponentName/index.tsx` + `ComponentName/style.ts`.

### Environment
Config is read through `src/config/dotenv.ts` (typed wrapper over `import.meta.env`, `VITE_*` vars only): `VITE_API_BASE_URL`, `VITE_APP_NAME`, `VITE_USE_MOCKS`, `VITE_API_TOKEN`, `VITE_REQUEST_TIMEOUT`. Never commit `.env`.

### `context/` — backend/domain reference docs
`context/` holds a detailed spec of the (separate) backend: HTTP/DTO conventions (`contexto_contratos_http_e_dtos.md`), permission model (`contexto_modulo_permissionamento.md`, `contexto-permissoes-por-papel.md`), schema/mocks (`contexto_schema_relacoes_e_mocks.md`), and one context file per module (auth, users, organizations, affiliations, projects, members, tasks, comments, events, stats, auditlog, deadlines, upload — see `context/README.md` for the index). Consult the relevant module doc before changing how a feature talks to the API or before extending mocks — it documents the real endpoint/DTO contract this frontend must match.

## Naming conventions
- `PascalCase` for components/screens (folder + `index.tsx`), `camelCase` for hooks/utilities/variables.
- Conventional commit prefixes (`feat:`, `fix:`, `refactor:`), short imperative subjects.
