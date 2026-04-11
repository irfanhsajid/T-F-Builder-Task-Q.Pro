# React Assessment — Todo List & Dynamic Form Builder

A clean, modular React application demonstrating best practices in architecture, state management, and component design.

## 🚀 Setup

```bash
npm install
npm run dev
```

## 🏗 Architecture

Feature-based folder structure following separation of concerns:

```
src/
├── features/
│   ├── todos/                  # Todo List feature
│   │   ├── components/         # Presentational components (TodoTable, TodoFilters, TodoPagination)
│   │   ├── hooks/              # Custom hooks (useTodos, useUsers, useTodoFilters, useFilteredTodos)
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── TodoListContainer.tsx   # Container component
│   │   └── index.ts            # Public API
│   └── form-builder/           # Form Builder feature
│       ├── components/         # Presentational (FieldEditor, FormFieldRenderer)
│       ├── hooks/              # Custom hooks (useFormBuilder)
│       ├── utils/              # Storage helpers
│       ├── types.ts            # TypeScript interfaces
│       ├── FormBuilderContainer.tsx
│       ├── FormPreviewContainer.tsx
│       └── index.ts
├── services/                   # API service layer (centralized fetch calls)
├── routes/                     # Centralized routing configuration
├── components/                 # Shared layout & UI components (shadcn/ui)
└── pages/                      # Standalone pages (NotFound)
```

### Key Patterns

- **Container / Presentational**: Containers manage data and state; presentational components are pure UI.
- **Custom Hooks**: All business logic extracted into reusable hooks (`useTodos`, `useFormBuilder`, `useTodoFilters`).
- **API Service Layer**: No direct `fetch` calls in components — all API logic lives in `src/services/api.ts`.
- **Barrel Exports**: Each feature exposes a clean public API via `index.ts`.

## 🔄 State Management

| State Type | Solution | Example |
|---|---|---|
| Server state | TanStack Query (`useQuery`) | Todos, Users |
| Persistent UI state | `localStorage` | Todo filters, Form config |
| Ephemeral UI state | `useState` | Form field values |

No global state library needed — each concern is handled by the appropriate tool.

## 💾 Persistence

- **Todo Filters**: Saved to `localStorage` on every change. Restored when navigating back to `/todos`.
- **Form Builder Config**: Saved as structured JSON in `localStorage`. Loaded by both the builder and preview pages.

## ✨ Features

### Todo List (`/todos`)
- Fetches todos and users from JSONPlaceholder API via TanStack Query
- Filters by user, status (completed/pending), and text search
- Client-side pagination (10 per page)
- Maps `userId` to user names
- Loading spinner, error state, and empty state

### Form Builder (`/form-builder`)
- Dynamically add/remove fields with label, type, required flag
- Supports: text, number, email, textarea, select, radio, checkbox, date
- Options editor for select/radio fields
- Saves configuration to localStorage

### Form Preview (`/form-preview`)
- Dynamically renders form from saved config
- Validates required fields
- Submit button disabled until form is valid
- Logs collected data to console on submit

## 🛠 Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS v3 + shadcn/ui
- TanStack Query v5
- React Router v6
