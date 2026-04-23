# React Interview Prep Based On This Codebase

## Section 1: Codebase Summary

### 1.1 Project Purpose

This project is a React + TypeScript single-page application with two main product flows:

1. A `Todo List` page that fetches todos and users from `JSONPlaceholder`, supports filtering, searching, and pagination, and stores filter preferences in `localStorage`.
2. A `Dynamic Form Builder` page that lets a user define a form schema, persist it locally, and preview/submit the generated form.

This is a strong interview project because it demonstrates:

- page routing
- async data fetching
- custom hooks
- reusable UI components
- local persistence
- controlled form logic
- validation
- component composition

### 1.2 Architecture Overview

The app uses a clean, mostly feature-oriented structure:

- `src/main.tsx`
  Boots the React app.
- `src/App.tsx`
  Wires global providers: `QueryClientProvider`, `BrowserRouter`, and `Toaster`.
- `src/routes/AppRoutes.tsx`
  Central route definition and page composition.
- `src/pages/*`
  Container-level components responsible for orchestration.
- `src/components/features/*`
  Feature-specific UI pieces for `todos` and `form-builder`.
- `src/components/shared/*`
  Shared shell/layout pieces.
- `src/components/ui/CustomSelect.tsx`
  Reusable custom select implementation with keyboard and placement behavior.
- `src/hooks/*`
  Custom hooks for data and business logic.
- `src/services/api.ts`
  Centralized API layer.
- `src/lib/utils.ts`
  Utility functions, validation helpers, and local storage helpers.
- `src/types/*`
  Shared TypeScript contracts.
- `src/styles/*.module.css`
  CSS Modules for scoped styling.

### 1.3 Key Architectural Decisions

#### Container + presentational split

The project intentionally keeps page-level orchestration in `src/pages` and UI rendering inside feature components such as:

- `src/components/features/todos/TodoFilters.tsx`
- `src/components/features/todos/TodoTable.tsx`
- `src/components/features/form-builder/FieldEditor.tsx`
- `src/components/features/form-builder/FormFieldRenderer.tsx`

This is good interview material because it shows separation of concerns:

- pages coordinate data, state, and navigation
- child components remain prop-driven and reusable

#### Custom hooks for business logic

Important hooks:

- `src/hooks/useTodos.ts`
  Encapsulates TanStack Query usage and exposes normalized todo/user state.
- `src/hooks/useTodoFilters.ts`
  Manages persistent todo filters with `localStorage`.
- `src/hooks/useFormBuilder.ts`
  Owns form schema creation, mutation, and save behavior.
- `src/hooks/usePageMetadata.ts`
  Updates page title and description.

This is a good answer to "How do you keep components clean?"

#### State is split by responsibility

This project uses the right state tool for each problem:

- server state: TanStack Query
- persistent UI state: `localStorage`
- page/component state: `useState`, `useEffect`, `useMemo`, `useCallback`

A strong interview answer is: "I did not introduce Redux or Context because the app does not yet have cross-feature shared state complex enough to justify that overhead."

### 1.4 Main User Flows

#### Todo flow

Route: `/todos`

- load todos and users via API layer
- apply filters by user, status, and search
- paginate results
- keep filter values between refreshes using `localStorage`
- show skeleton while loading
- show fetch-state UI during refetch

Main files:

- `src/pages/TodoList.tsx`
- `src/hooks/useTodos.ts`
- `src/hooks/useTodoFilters.ts`
- `src/services/api.ts`
- `src/components/features/todos/*`

#### Form builder flow

Route: `/form-builder`

- add/remove fields
- choose field type
- configure labels, placeholders, required state
- configure select/radio options
- configure range and file-specific settings
- save schema to `localStorage`
- navigate to preview

Main files:

- `src/pages/FormBuilder.tsx`
- `src/hooks/useFormBuilder.ts`
- `src/components/features/form-builder/FieldEditor.tsx`
- `src/types/form-builder.ts`

#### Form preview flow

Route: `/form-preview`

- load stored schema
- build initial field values
- render inputs dynamically by field type
- validate required/email/phone fields
- submit and display payload

Main files:

- `src/pages/FormPreview.tsx`
- `src/components/features/form-builder/FormFieldRenderer.tsx`
- `src/components/features/form-builder/FormSubmitResult.tsx`
- `src/lib/utils.ts`

### 1.5 Important Interview Talking Points

- The app uses `React Router` for layout-based navigation.
- The app uses `TanStack Query` for server state, not for local UI state.
- `localStorage` is used for persistence where a backend does not exist.
- `CustomSelect` was built to control styling and interaction beyond native `<select>`.
- The form system is schema-driven at render time.
- The app is modular enough for a frontend machine coding round, but still small enough to explain clearly.

### 1.6 How To Explain This Project In An Interview

Use this structure:

**Problem**
I wanted to build a frontend app that shows both data-heavy UI patterns and form-heavy UI patterns in the same codebase.

**Solution**
I built a React + TypeScript SPA with two modules: a Todo dashboard using paginated server data, and a dynamic form builder that saves schema locally and renders a live preview.

**Challenges**
- deciding where each kind of state should live
- keeping components reusable
- handling dynamic field rendering cleanly
- making async UI feel responsive during loading/refetch

**Impact**
The project demonstrates practical frontend architecture, custom hooks, async data management, reusable UI primitives, validation logic, and feature-based organization.

Short version you can say verbally:

> This project is a small but production-style React app with two feature areas: a todo management screen backed by remote API data and a dynamic form builder backed by local persistence. I used TanStack Query for server state, custom hooks for business logic, React Router for navigation, and reusable feature components to keep the code maintainable and interview-friendly.

## Section 2: Interview Questions + Answers

### Beginner Level

#### 1. Why did you create a separate `App.tsx` instead of putting everything in `main.tsx`?

**Answer:**  
`main.tsx` should stay minimal and focus on bootstrapping the app into the DOM. `App.tsx` is a better place for provider composition such as routing, query client setup, and toast configuration. That keeps the entry file simple and makes the app root easier to test or refactor later.

#### 2. Why did you use `BrowserRouter` here?

**Answer:**  
This is a client-side SPA, so `BrowserRouter` gives clean URL-based navigation without page reloads. It works well with Vite and the Vercel rewrite rule, which ensures deep links still resolve to the app shell.

#### 3. Why is routing centralized in `src/routes/AppRoutes.tsx`?

**Answer:**  
Centralized routes improve readability and make the navigation structure easy to reason about. It also helps when adding route guards, lazy loading, analytics hooks, or nested layouts later.

#### 4. Why is there an `AppLayout` component with `Outlet`?

**Answer:**  
`AppLayout` provides shared UI like navigation and footer while `Outlet` renders the active page inside that shell. This avoids repeating layout markup across multiple routes.

#### 5. Why are there separate `types` files?

**Answer:**  
Shared types prevent duplication and keep contracts consistent across API, hooks, and components. For example, `Todo`, `User`, and `FormField` become reusable interfaces instead of ad hoc inline types.

#### 6. Why use CSS Modules instead of global CSS for everything?

**Answer:**  
CSS Modules scope styles locally, which reduces selector collisions and makes styles safer to maintain as the project grows. It is a good middle ground between raw CSS and a full CSS-in-JS solution.

#### 7. What is the role of `usePageMetadata`?

**Answer:**  
It updates `document.title` and the page description meta tag per route. That improves user context and is a simple way to manage page metadata in a client-rendered app.

#### 8. Why are the feature components grouped under `components/features`?

**Answer:**  
That grouping keeps domain-specific UI close together. It makes scaling easier because todo-related and form-builder-related code evolve independently instead of being mixed inside a generic components folder.

### Intermediate Level

#### 9. Why did you use TanStack Query for todos and users?

**Answer:**  
Todos and users are server state, so TanStack Query is a better fit than plain `useEffect` plus `useState`. It handles caching, loading states, background refetching, and request lifecycle concerns in a more structured way.

#### 10. Why not use TanStack Query for the form builder state too?

**Answer:**  
The form builder schema is local UI state, not remote server state. Keeping it in React state with local persistence is simpler and avoids misusing a server-state library for something that does not need caching or network lifecycle management.

#### 11. Why did you create `useTodos` instead of calling `useQuery` directly inside `TodoList`?

**Answer:**  
`useTodos` hides the API parameter mapping, query key design, and returned state normalization. That makes the page easier to read and prevents query logic from leaking into the UI layer.

#### 12. Explain the `queryKey` design in `useTodos`.

**Answer:**  
The key includes pagination mode, page, page size, user, status, and trimmed search text. That ensures each distinct filter combination gets its own cache entry and avoids stale data being reused for the wrong filter set.

#### 13. Why is `keepPreviousData` useful in this project?

**Answer:**  
It avoids a jarring flash when moving between todo pages or changing filters. Instead of blanking the table immediately, the UI keeps the previous data while the next request is in flight, which feels smoother to the user.

#### 14. Why is `staleTime: Infinity` both useful and risky?

**Answer:**  
It is useful because demo data like JSONPlaceholder does not change often, so unnecessary refetches are avoided. It is risky because in a real app users may see outdated data for too long unless we explicitly invalidate or refetch.

#### 15. Why is filter state stored in `localStorage`?

**Answer:**  
It improves user experience by preserving the last-used filters across refreshes. Since there is no backend preference storage, local persistence is a practical lightweight choice.

#### 16. Why does `useTodoFilters` use lazy initialization in `useState(loadFilters)`?

**Answer:**  
Lazy initialization ensures `loadFilters()` runs only once during the initial render instead of on every re-render. That is the correct pattern when the initial state comes from a side source like `localStorage`.

#### 17. Why are `useCallback` hooks used in `useTodoFilters` and `useFormBuilder`?

**Answer:**  
They stabilize handler references and make prop-passing cleaner, especially for child components that receive callbacks. In this app it is more about predictable composition than about major performance gains.

#### 18. Why is `totalPages` wrapped in `useMemo` inside `TodoList`?

**Answer:**  
It derives a stable computed value from `totalCount` and `pageSize`. The calculation is cheap, so `useMemo` is not strictly necessary here, but it makes derived-state intent explicit.

#### 19. Why does `TodoList` correct the page number in a `useEffect`?

**Answer:**  
If filters change and total pages shrink, the currently selected page may become invalid. The effect clamps the page back into a valid range so the UI never points to a page that no longer exists.

#### 20. Why was the API logic centralized in `src/services/api.ts`?

**Answer:**  
Centralization improves maintainability, keeps components free from raw `fetch` calls, and creates a single place to add future concerns like auth headers, request cancellation, or error normalization.

#### 21. Why is `FormFieldRenderer` implemented as a switch on `field.type`?

**Answer:**  
The UI is schema-driven, so a switch is a straightforward way to map field configuration to the correct renderer. It keeps render behavior explicit and easy to extend when new field types are added.

#### 22. Why does the builder keep field config in an array rather than an object map?

**Answer:**  
An array preserves display order naturally, which matters for form rendering. A map would make random access easier but would complicate ordering and iteration unless extra metadata were added.

#### 23. Why use `crypto.randomUUID()` for form field ids?

**Answer:**  
The builder needs stable unique identifiers for React keys and field-state mapping. `crypto.randomUUID()` is a simple browser-native way to generate ids without bringing in an extra library.

#### 24. Why did you build a custom `CustomSelect` component instead of using native `<select>`?

**Answer:**  
The custom component gives more control over styling, keyboard behavior, grouped options, placement, and the overall design system. The tradeoff is that accessibility and interaction logic become the team’s responsibility.

### Advanced Level

#### 25. Why is this project a good example of separating server state from client state?

**Answer:**  
Todos and users come from a remote API and are cached with TanStack Query, while filters and form schema live locally in React state and `localStorage`. This avoids overengineering and shows that different state categories should use different tools.

#### 26. If the todo list grew to thousands of items, what would you improve?

**Answer:**  
I would validate the API supports true server-side filtering and pagination, then consider virtualization for large tables, debounced search, better cache policy, and possibly URL-synced filters for shareable state. I would also benchmark render cost before adding memoization everywhere.

#### 27. If this form builder became a real product feature, what would you redesign first?

**Answer:**  
I would move from ad hoc validation to a schema-driven validation layer, likely with a formal schema format plus runtime validation. I would also separate field metadata from submission payload design, add draft/version support, and consider backend persistence instead of local-only storage.

#### 28. Why is the current payload design in `FormPreview` potentially problematic?

**Answer:**  
The submit payload uses `field.label` as the object key. Labels are editable and not guaranteed unique, so duplicate labels can overwrite values. A production-safe design would submit stable field ids and keep labels for display only.

#### 29. How would you scale route loading in this project?

**Answer:**  
I would likely introduce route-level lazy loading with `React.lazy` and suspense boundaries for page bundles. That keeps the initial bundle smaller as the number of feature areas grows.

#### 30. What is missing from the current error-handling strategy?

**Answer:**  
The app shows basic query error UI, but it lacks a global error boundary, retry flows, and normalized user-friendly errors. In a production app I would add recoverable retry actions, error logging, and failure state design per feature.

#### 31. How would you improve the `QueryClient` setup?

**Answer:**  
I would define `defaultOptions` based on product requirements, including retry behavior, stale times, garbage collection, and refetch policy. Right now it uses defaults, which is okay for a small project but too implicit for larger teams.

#### 32. What are the maintainability strengths of this codebase?

**Answer:**  
It has good folder boundaries, a dedicated API layer, reusable feature components, shared types, and custom hooks for logic extraction. Those decisions reduce coupling and make the code easier to explain and extend.

#### 33. What are the maintainability risks?

**Answer:**  
The project has no automated tests, TypeScript strict mode is off, and some behavior depends on local storage and manual validation logic. Those are manageable now but become risky as features and contributors increase.

### WHY Questions

#### 34. Why did you not use Redux or Context for global state?

**Answer:**  
There is not enough cross-cutting state to justify a heavier global state solution. The current approach keeps complexity low and assigns each state concern to the smallest effective tool.

#### 35. Why is the `api.ts` layer better than fetching inside components?

**Answer:**  
It improves reuse, testability, and consistency. If authentication, headers, tracing, or error transformation are needed later, they can be added in one place.

#### 36. Why is it beneficial that `FieldEditor` and `FormFieldRenderer` are separate components?

**Answer:**  
They serve different responsibilities. `FieldEditor` edits schema configuration, while `FormFieldRenderer` renders runtime form inputs. Separating those concerns prevents a single large component from mixing builder logic with preview logic.

#### 37. Why is storing filters in URL params potentially better than `localStorage`?

**Answer:**  
URL params make state shareable, bookmarkable, and easier to debug. `localStorage` is simpler for persistence, but it hides state from the URL and makes collaboration less convenient.

### WHAT IF Scenarios

#### 38. What if the API starts failing intermittently?

**Answer:**  
I would add explicit retry policy, a retry button in the UI, and better error messaging. I would also consider request timeouts, cancellation, and observability around failures.

#### 39. What if the user opens the app in multiple tabs and edits the form builder in both?

**Answer:**  
The current implementation can become stale because the preview reads from storage during initialization only. To support multi-tab consistency, I would listen for the `storage` event and reconcile state when the stored config changes.

#### 40. What if two fields have the same label?

**Answer:**  
The current submit output can overwrite earlier values because labels are used as keys. I would either enforce unique labels or, better, submit stable field ids and map labels separately for presentation.

#### 41. What if the search API does not support the `q` parameter reliably?

**Answer:**  
Then the search feature may look implemented while actually returning unfiltered data. I would verify the API contract, then either switch to supported server filters or perform client-side filtering with clear tradeoff awareness.

#### 42. What if the app needs authentication later?

**Answer:**  
The current structure is ready for that evolution because routing and API concerns are already separated. I would add auth-aware route guards, token-aware request wrappers, and likely a small auth state layer near the app root.

#### 43. What if the number of routes doubles?

**Answer:**  
I would split route modules, lazy-load pages, and possibly move route metadata into route configuration objects. The current centralized route file is good now, but it should evolve when the app gets much larger.

### Debugging Questions

#### 44. A user says "my filters reset unexpectedly." How would you debug it?

**Answer:**  
I would inspect `useTodoFilters`, verify what is written into `localStorage`, and check whether any handler is calling `resetFilters` or overwriting page/filter state during a page-size or page correction flow. I would also reproduce refresh and cross-tab scenarios.

#### 45. A user says "search is not working." What would you check first?

**Answer:**  
I would inspect the network request from `api.fetchTodosPage`, confirm the query string includes `q`, and verify whether the API actually honors that parameter. Then I would compare server response with the expected filtered dataset.

#### 46. A user says "form preview showed old fields after I changed the builder." What is the likely cause?

**Answer:**  
The preview reads form config into state during initialization. If storage changed without a fresh remount or from another tab, the preview state can go stale because it is not subscribed to future storage updates.

#### 47. A user says "some submitted values are missing." What bug would you suspect?

**Answer:**  
I would suspect duplicate or empty labels in `FormPreview`, because the payload uses labels as object keys. If two labels match, the later field can overwrite the earlier one.

#### 48. The custom select works with a mouse but feels inconsistent on keyboard. Where would you inspect?

**Answer:**  
I would inspect `CustomSelect.tsx`, especially the `handleKeyDown`, `activeIndex`, `aria-*` wiring, and focus/close logic. Custom combobox behavior is easy to get partially correct and still miss edge cases.

### Real Interview Pushback Questions

#### 49. What would a senior reviewer challenge you on in this project?

**Answer:**  
They would likely ask about missing tests, disabled TypeScript strict mode, accessibility details in the custom select and search input, the reliability of the API search contract, and the use of labels instead of ids in the form submit payload.

#### 50. If you had one day to make this more production-ready, what would you do?

**Answer:**  
I would add focused tests for the core hooks and dynamic form behavior, enable stricter TypeScript settings incrementally, harden local storage failure handling, improve error and retry UI, and fix the payload design to use stable field ids.

### Behavioral + Project Explanation Questions

#### 51. How would you explain this project in under two minutes?

**Answer:**  
This is a React + TypeScript SPA with two modules that demonstrate different frontend challenges. The first is a todo dashboard using TanStack Query for server data with filtering, pagination, and persistent UI state. The second is a dynamic form builder where users define a schema locally, preview it, validate it, and inspect the submitted payload. I structured the app with page containers, feature components, reusable hooks, a centralized API layer, and shared types to keep responsibilities clear.

#### 52. What was the hardest technical part of the project?

**Answer:**  
The hardest part was balancing simplicity with clean architecture. For example, I wanted the form builder to stay lightweight while still being dynamic, reusable, and easy to explain. That meant carefully separating schema editing, preview rendering, and validation logic.

#### 53. What tradeoffs did you consciously make?

**Answer:**  
I kept the app intentionally simple by using local storage instead of a backend for form persistence and by using manual validation instead of introducing a heavier form library. That made the architecture easier to reason about, but it also means some production concerns remain open.

#### 54. What would you improve next and why?

**Answer:**  
I would improve test coverage, tighten TypeScript settings, and harden accessibility and error handling. Those changes would raise confidence significantly without changing the core architecture.

## Section 3: Weaknesses & Improvements

This is the section you should study most carefully, because these are the points an interviewer is likely to challenge.

### 3.1 High-Priority Weak Points

#### No tests

There are no unit, component, or integration tests in the project.

**Why interviewers care:**  
It raises questions about regression safety and engineering maturity.

**Better approach:**  
Add focused tests around:

- `useTodoFilters`
- `useTodos` query parameter behavior
- `FormPreview` validation
- dynamic rendering in `FormFieldRenderer`

#### TypeScript strict mode is off

`tsconfig.json` has loose settings such as:

- `strict: false`
- `noImplicitAny: false`
- `noUnusedLocals: false`

**Why interviewers care:**  
It reduces compile-time protection and makes code quality less enforceable at scale.

**Better approach:**  
Turn on strictness incrementally and fix surfaced issues over time.

#### Form submission payload uses labels as keys

In `FormPreview`, the payload is built using `field.label`.

**Why this is weak:**  
Labels are user-editable and can collide.

**Better approach:**  
Use stable ids in the payload:

```ts
{
  fieldId: value
}
```

Then map ids to labels only for display.

#### Inconsistent `localStorage` protection

Some storage reads are wrapped in `try/catch`, but not all writes are.

**Why this matters:**  
Storage APIs can fail in quota-limited or privacy-restricted environments.

**Better approach:**  
Wrap all storage interactions in safe helper functions and surface fallback behavior gracefully.

### 3.2 Medium-Priority Weak Points

#### Missing global error boundary

The app has basic error rendering for query failures, but no global React error boundary.

**Why interviewers care:**  
One unexpected runtime error can break the full screen.

#### Search behavior depends on API contract

The todo search uses `q` in the query string.

**Why this is a challenge point:**  
If the target API does not reliably support that parameter, the feature becomes misleading.

**Better approach:**  
Verify the API contract, document it clearly, or implement a controlled fallback strategy.

#### Accessibility gaps

Examples:

- search input relies on placeholder instead of a proper label
- table semantics could be stronger
- custom select accessibility needs careful review because custom inputs are harder to get right than native inputs

**Better approach:**  
Add explicit labels, validate the combobox pattern against WAI-ARIA guidance, and test with keyboard and screen readers.

#### `NotFound` uses a raw anchor tag

Using `<a href="/">` causes a full reload instead of SPA navigation.

**Better approach:**  
Use `Link` from React Router.

#### New `Map` creation in `useUsers`

`userMap` is rebuilt on every render.

**Why it is not ideal:**  
The cost is small here, but it is unnecessary work and shows missed memoization opportunity.

**Better approach:**  
Use `useMemo` for derived maps.

### 3.3 Lower-Priority But Good To Mention

#### `CustomSelect` includes `"use client"`

That directive is meaningful in Next.js but not in Vite.

**What to say in an interview:**  
It is harmless here, but I would remove it to keep conventions consistent with the chosen stack.

#### `FormFieldRenderer` fails silently for unknown field types

The default switch branch returns `null`.

**Better approach:**  
Fail loudly in development or render a fallback warning for unsupported types.

#### Query client uses default behavior only

The project does not define `defaultOptions` for retries or staleness at the app level.

**Better approach:**  
Set those defaults deliberately once product requirements are known.

### 3.4 How To Defend These Weaknesses In An Interview

Say this:

> I optimized this project for clarity of architecture and core functionality first, then identified production-readiness gaps intentionally. The top improvements I would make next are test coverage, stricter TypeScript, stronger accessibility review, better error boundaries, and a safer payload design for the dynamic form system.

That answer shows self-awareness instead of defensiveness.

## Section 4: Mock Interview Mode

### 4.1 How We Should Run It

I will behave like a strict frontend interviewer:

1. I ask one question at a time.
2. You answer like you are in a real interview.
3. I evaluate your answer.
4. If your answer is weak, I push deeper.
5. Then I move to the next question.

### 4.2 Question Order I Recommend

Start in this order:

1. project explanation
2. architecture decisions
3. state management choices
4. TanStack Query decisions
5. hooks and side effects
6. form builder design
7. debugging and edge cases
8. performance and scale
9. accessibility and production readiness

### 4.3 First 10 Mock Interview Questions

Use these as the live progression:

1. Explain this project in under two minutes like you are talking to a senior frontend interviewer.
2. Why did you split state across TanStack Query, local storage, and local component state?
3. Walk me through the todo flow from UI interaction to network request to rendered table.
4. Why did you create `useTodos` and `useTodoFilters` instead of keeping that logic in the page?
5. Defend the choice of `keepPreviousData` and `staleTime: Infinity`.
6. How does the form builder schema flow into the preview page?
7. What are the biggest weaknesses in your current form submission design?
8. What accessibility risks exist in your custom select?
9. If this app needed to scale for production, what would you improve first?
10. What tests are missing and why do they matter?

### 4.4 Strong Answer Framework

For most technical questions, answer in this structure:

1. state the goal
2. explain the current implementation
3. justify the tradeoff
4. mention what you would improve next

Example:

> I chose TanStack Query because todos and users are server state, and I wanted caching plus clean loading/error handling without hand-writing request lifecycle code. I kept local filters in React state plus local storage because that state is UI-specific and persistence-oriented, not shared remote data. If the app grew, I would consider URL-based filters for shareability and stricter cache invalidation rules.

### 4.5 Live Start

Your first live interview question is:

**Explain this project in under two minutes as if I am a senior React interviewer. Focus on the problem, architecture, tradeoffs, and what this project demonstrates about you as an engineer.**
