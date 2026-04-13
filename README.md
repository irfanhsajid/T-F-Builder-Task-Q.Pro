# Todo List & Dynamic Form Builder

A production-style React + TypeScript application focused on clean architecture, reusable UI patterns, and maintainable frontend engineering practices.

## Live URLs

- Live Demo: [https://qpro-task.vercel.app/](https://qpro-task.vercel.app/)
- Local Development: [http://localhost:8080](http://localhost:8080)

## Quick Start

```bash
npm install
npm run dev
```

Vite is configured to run on port `8080`.

## Project Structure

This project follows a feature-first approach inside `components`, with clear separation between shared and feature-specific UI.

```text
src/
├── components/
│   ├── features/
│   │   ├── todos/
│   │   │   ├── TodoFilters.tsx
│   │   │   ├── TodoPagination.tsx
│   │   │   ├── TodoTable.tsx
│   │   │   ├── TodoTableSkeleton.tsx
│   │   │   └── index.ts
│   │   └── form-builder/
│   │       ├── FieldEditor.tsx
│   │       ├── FormFieldRenderer.tsx
│   │       ├── FormSubmitResult.tsx
│   │       └── index.ts
│   ├── shared/                 # App shell, layout, nav
│   └── ui/                     # Reusable primitives (e.g. CustomSelect)
├── hooks/                      # Reusable business/state hooks
├── pages/                      # Page-level container components
├── services/                   # API layer
├── routes/                     # Centralized route config
├── styles/                     # CSS Modules (scoped styling)
└── types/                      # Shared TypeScript contracts
```

## Best Practices Applied Across the Codebase

- **Container + Presentational Pattern**: Page/container components (`src/pages`) orchestrate data and state, while feature components in `src/components/features` focus on rendering and UI interaction.
- **Feature Separation**: Todos and Form Builder are organized into two dedicated feature folders for scalability and easier maintenance.
- **Custom Hooks for Business Logic**: Data fetching and local persistence logic are extracted into hooks like `useTodos`, `useUsers`, `useTodoFilters`, and `useFormBuilder`.
- **Centralized API Service**: External requests are isolated in `src/services/api.ts`; components never call `fetch` directly.
- **Page-level Dynamic Metadata**: Each page sets its own `title` and meta `description` through `usePageMetadata`, improving SEO and UX clarity.
- **Custom Select Component**: `CustomSelect` replaces native `<select>` to overcome styling and interaction limitations, while supporting accessibility, keyboard navigation, grouping, and custom placement.
- **Scoped Styling with CSS Modules**: Styling is modular and component-oriented (`Todo.module.css`, `FormBuilder.module.css`, `CustomSelect.module.css`), minimizing style leakage.
- **Type Safety**: Shared type definitions in `src/types` are used across features to enforce predictable contracts.
- **Barrel Exports**: Feature entry points (`index.ts`) provide clean import surfaces.
- **File Size Discipline**: Components are kept intentionally manageable (generally around 200-300 lines max where practical) to preserve readability and reduce complexity.

## How the Application Works

### 1) Todo List (`/todos`)

- Fetches todos and users from JSONPlaceholder using TanStack Query.
- Uses server-side filtering and pagination parameters (`_page`, `_limit`, `userId`, `completed`, `q`) through the API layer.
- Supports status/user/search filters and preserves filter state in `localStorage`.
- Implements server-side pagination with row-size control (`10`, `20`, `50`, `all`).
- Pagination control dynamically determines how many rows are shown per page.
- Includes skeleton loading, background fetching UX, and resilient error states.

### 2) Form Builder (`/form-builder`)

- Lets users build a form schema dynamically (add/remove fields, update type, set required).
- Supports multiple field types including text, number, email, tel, textarea, select, radio, checkbox, date, and range.
- Field type logic is modular, including option-based inputs where needed.
- Saves schema to `localStorage` so it can be reused by preview.

### 3) Form Preview (`/form-preview`)

- Loads saved form schema and renders inputs dynamically.
- Applies required validation and type-aware checks (e.g., email and phone validation).
- Shows clear validation errors and structured submit output.
- Preserves a simple user flow back to builder for iteration.

## State Management Strategy

| State Concern | Approach | Location |
|---|---|---|
| Server state | TanStack Query | `useTodos`, `useUsers` |
| Persistent UI state | `localStorage` | `useTodoFilters`, form config utilities |
| Local UI state | React state/hooks | Page and feature components |

This keeps each type of state in the right layer without introducing unnecessary global state libraries.

## Tech Stack

- React + TypeScript
- Vite
- TanStack Query
- React Router
- Lucide Icons
- CSS Modules
