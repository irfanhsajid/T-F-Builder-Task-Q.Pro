# Mock Interviews

## How To Use This

Use these questions as live interview practice:

1. Answer verbally in 1 to 3 minutes.
2. Keep your answer structured: problem, approach, tradeoff, improvement.
3. After each answer, ask yourself:
   - Did I explain the why?
   - Did I mention tradeoffs?
   - Did I connect my answer to this codebase?

## Round 1: Project Explanation

1. Explain this project in under two minutes like you are introducing it to a senior React interviewer.  
Answer: This project is a React + TypeScript SPA with two main modules: a dynamic form builder and a multi-user daily todo viewer. I built it to demonstrate both schema-driven UI and server-driven UI in one codebase. Architecturally, I used a container and presentational pattern, custom hooks for business logic, a centralized API layer, and shared types and styles. It shows that I think beyond feature delivery and focus on maintainability, separation of concerns, and clean frontend architecture.

2. What problem were you trying to solve with this project?  
Answer: I wanted to solve two common frontend problems in one project: managing remote data efficiently and rendering dynamic forms from configuration. That gave me a chance to demonstrate routing, async state handling, persistence, validation, and reusable component design.

3. Why did you choose to combine a dynamic form builder with a daily todos module in one app?  
Answer: I combined them intentionally because they represent two different frontend skill sets. The todo module focuses on fetching, filtering, and pagination, while the form builder focuses on dynamic rendering, schema management, and validation.

4. What does this project demonstrate about you as a frontend engineer?  
Answer: It demonstrates that I think in terms of architecture, not just UI. I separate data concerns from rendering, use the right state tool for the right problem, and try to keep the code extensible for future features.

5. If I open this repository for the first time, how would you walk me through the architecture?  
Answer: I would start at `App.tsx` and `AppRoutes.tsx` to explain the app shell and routing, then move into `src/pages` for page-level orchestration, `src/components/features` for reusable feature UI, `src/hooks` for business logic, and `src/services/api.ts` for data access. That gives a clear top-down view.

6. What were your main design goals before writing code?  
Answer: My main goals were clear separation of concerns, reusable components, lightweight but effective state management, and an architecture that would still make sense if the app grew. I also wanted the project to be easy to explain in an interview.

## Round 2: Architecture

1. Why did you choose the container and presentational component pattern in this project?  
Answer: I chose the container and presentational pattern because it keeps orchestration logic separate from rendering. That makes components easier to reason about, easier to reuse, and easier to test later.

2. How are data logic and UI logic separated here?  
Answer: Data logic lives in hooks and page-level containers, while UI logic lives in feature components. For example, fetching and filter state are handled outside `TodoTable`, so the table stays focused on rendering.

3. Why are page-level containers placed under `src/pages`?  
Answer: `src/pages` is a natural place for route-level containers because those components coordinate data, navigation, metadata, and composition. They are the entry point for each user flow.

4. Why are reusable feature components separated into `src/components/features`?  
Answer: `src/components/features` keeps domain-specific UI grouped by feature. That makes the codebase more scalable than a flat shared components folder.

5. What benefits does this structure give if the project grows?  
Answer: This structure improves discoverability, reduces coupling, and makes feature growth easier. New developers can usually tell where code belongs without much ambiguity.

6. Which parts of the current architecture are strongest?  
Answer: The strongest parts are the clear page-to-hook-to-component flow, the API layer separation, and the feature-based component grouping. Those are solid architecture choices for a project of this size.

7. Which parts of the architecture would you revisit if the app became much larger?  
Answer: If the app became much larger, I would probably make route modules more modular, add lazy loading, and revisit how feature folders expose public APIs. I might also move more configuration into dedicated domain modules.

8. Why did you keep a centralized `api.ts` layer?  
Answer: A centralized `api.ts` layer avoids scattering `fetch` calls throughout the app. It also creates one place to add future concerns like authentication, request normalization, or error transformation.

9. Why did you create dedicated `types` files instead of defining types inline?  
Answer: Dedicated `types` files improve consistency and reduce duplication. They make contracts reusable across API functions, hooks, and UI components.

10. If another developer joined the project, how would this structure help them onboard faster?  
Answer: This structure helps onboarding because responsibilities are easy to trace. A developer can start at a page, follow the hook, then inspect the UI components without dealing with mixed concerns in a single large file.

## Round 3: State Management

1. How did you decide where each type of state should live?  
Answer: I categorized state by responsibility. Remote data became server state, user preferences became persistent UI state, and view-specific interactions stayed as local React state.

2. Why are todos handled with TanStack Query while form-builder state uses local React state?  
Answer: Todos and users come from an external API, so TanStack Query is a better fit for caching and request lifecycle. The form builder schema is local interactive state, so plain React state is simpler and more appropriate.

3. Why are filters persisted in `localStorage`?  
Answer: Filters are persisted in `localStorage` to improve UX across refreshes. It is a lightweight solution because there is no backend preference store in this project.

4. Why did you avoid Redux or Context here?  
Answer: I avoided Redux and Context because the app does not have enough complex shared state to justify them. Using them here would add more abstraction than value.

5. What is server state in this app, and what is local UI state?  
Answer: Server state in this app is the todo and user data fetched from the API. Local UI state includes filters, form schema, form values, error messages, and component interaction state.

6. If filters needed to be shareable by URL, what would you change?  
Answer: I would move the filter state into search params and sync it with the UI. That would make filters shareable, bookmarkable, and easier to debug.

7. What are the risks of storing UI state in `localStorage`?  
Answer: The risks are storage failures, stale cross-tab state, lack of shareability, and potential mismatch between saved state and new UI behavior. It is convenient, but not always ideal for collaborative or multi-device workflows.

8. How would you handle synchronization if the app is opened in multiple tabs?  
Answer: I would listen to the `storage` event and reconcile state when the underlying key changes. For more complex cases, I would use a backend or a shared sync layer instead of relying only on local storage.

## Round 4: Data Fetching And API Design

1. Walk me through the todo flow from changing a filter to rendering updated rows.  
Answer: When a filter changes, the page updates filter state, which changes the `queryKey` used by `useTodos`. TanStack Query then triggers a new request through `api.fetchTodosPage`, returns loading or previous data during the fetch, and the table re-renders with the updated result.

2. Why did you use `useTodos` and `useUsers` custom hooks?  
Answer: I used custom hooks to hide query setup, data normalization, and repeated request concerns. That keeps the page components cleaner and makes the data layer easier to reuse.

3. Explain your `queryKey` strategy.  
Answer: My `queryKey` includes pagination mode, page, page size, user, status, and search text. That ensures each unique filter combination gets the correct cache entry.

4. Why did you use `keepPreviousData`?  
Answer: `keepPreviousData` improves UX during page changes and filter updates because the table does not flash empty while the next result is loading. It makes the interaction feel more stable.

5. Defend `staleTime: Infinity`. When is it acceptable, and when is it risky?  
Answer: `staleTime: Infinity` is acceptable when the data is effectively static during a session, like demo or low-volatility data. It is risky in real-time or frequently updated systems because users may keep seeing stale data.

6. Why is centralized error handling important in an API layer?  
Answer: Centralized error handling matters because it keeps request failures consistent and prevents every component from inventing its own network behavior. It also makes future logging and error mapping easier.

7. How would you improve the current API layer for a real production app?  
Answer: For production, I would add environment-based base URLs, auth support, typed response validation, request cancellation, and more explicit error structures. I would also consider a shared fetch wrapper.

8. What happens if the API contract changes?  
Answer: If the API contract changes, the centralized service layer reduces the blast radius. I would update the service functions and types, then verify hooks and UI flows against the new contract.

9. How would you add authentication to this API architecture?  
Answer: I would likely introduce an authenticated request wrapper that injects tokens or session headers, then keep the rest of the app consuming the same service functions. Route protection would sit above that in routing.

10. If search becomes unreliable because of backend limitations, what would you do?  
Answer: I would first verify whether the backend actually supports the current query shape. If not, I would either adapt to the supported contract or implement a controlled client-side fallback with clear tradeoff awareness.

## Round 5: React Hooks

1. Which React hooks are most important in this project and why?  
Answer: The most important hooks are `useState`, `useEffect`, `useMemo`, `useCallback`, and the custom hooks built on top of them. They drive local state, side effects, derived state, stable handlers, and business logic extraction.

2. Why did you use `useEffect` in `TodoList`?  
Answer: I used `useEffect` in `TodoList` to correct the current page when filters reduce the total page count. That is primarily a correctness concern, not just an optimization.

3. Why did you use lazy initialization in `useTodoFilters`?  
Answer: Lazy initialization avoids reading from `localStorage` on every render. It ensures the filter state is loaded once during initial mount.

4. Why are some handlers wrapped in `useCallback`?  
Answer: Some handlers are wrapped in `useCallback` to keep callback references stable when passed to children. That helps keep component composition predictable and can reduce unnecessary re-renders in some cases.

5. Why is `useMemo` used for `totalPages`?  
Answer: `useMemo` is used for `totalPages` to make derived-state intent explicit. The computation is small, so the bigger value there is code clarity rather than major performance gain.

6. Which hooks here are being used for correctness versus optimization?  
Answer: `useEffect` for page correction and lazy initialization are more about correctness. `useMemo` and `useCallback` are more about optimization and stable composition.

7. Where could hook usage be improved further?  
Answer: Hook usage could be improved by memoizing some derived values like `userMap` and by auditing whether every callback really needs stabilization. I would optimize based on measurement, not just preference.

8. If an interviewer says "you are overusing hooks," how would you respond?  
Answer: I would say I am using hooks intentionally to separate responsibilities, not to add abstraction for its own sake. The custom hooks here remove complexity from pages and make the code more readable.

## Round 6: Dynamic Form Builder

1. How does the dynamic form builder work end to end?  
Answer: The builder lets the user create and configure field definitions, saves that schema locally, then the preview page reads the saved schema and renders a real form dynamically. On submit, it validates required and type-aware rules before showing the result.

2. Why is the form schema modeled as an array of fields?  
Answer: An array is the right shape because form field order matters in the UI. It also makes rendering and reordering conceptually simpler than a plain object map.

3. Why does `FormFieldRenderer` use a switch by field type?  
Answer: `FormFieldRenderer` uses a switch because the UI is schema-driven and each field type has different rendering rules. That keeps the behavior explicit and easy to extend.

4. How are type-specific field settings handled?  
Answer: Type-specific settings are handled by field metadata such as `options`, `min`, `max`, `step`, `accept`, and `placeholder`. The builder updates those properties, and the preview renderer consumes them.

5. How is validation handled in the preview page?  
Answer: Validation is handled in the preview page with required checks and type-aware checks for email and phone. Errors are stored in local state and shown near the fields.

6. What are the limits of the current validation approach?  
Answer: The current approach is manual and limited. It does not scale as well for complex validation rules, nested forms, cross-field rules, or schema evolution.

7. Why is this approach okay for the current scope?  
Answer: It is okay for the current scope because the form system is still small and the logic is easy to explain. For an interview project, simplicity and clarity can be better than overengineering.

8. If this builder had to support nested sections and conditional fields, how would you redesign it?  
Answer: I would redesign the schema to support nested groups, conditional visibility rules, and probably a formal validation schema. I would also separate rendering metadata from submission metadata more clearly.

9. How would you persist form schemas in a real backend-driven system?  
Answer: In a real system, I would persist schemas to a backend with versioning, ownership, and validation at the API boundary. That would also allow drafts, sharing, and audit history.

10. What is the biggest weakness in the current form submission model?  
Answer: The biggest weakness is that submitted data uses editable labels as keys instead of stable ids. That creates collision risk and weakens the contract of the payload.

## Round 7: Component Design And Reusability

1. Which components in this codebase are the most reusable?  
Answer: The most reusable components are `CustomSelect`, `TodoPagination`, and some of the form rendering pieces. They accept props cleanly and are not deeply tied to one page container.

2. What makes `CustomSelect` reusable?  
Answer: `CustomSelect` is reusable because it supports labels, placeholders, error states, grouped options, placement modes, controlled usage, and custom styling. It is designed as a generic UI primitive.

3. What tradeoffs come with building a custom select instead of using a native select?  
Answer: The main tradeoff is control versus complexity. A custom select gives better styling and interaction flexibility, but accessibility and keyboard behavior become the team’s responsibility.

4. How do you decide whether a component should be feature-specific or shared?  
Answer: I decide based on whether the component solves a domain-specific workflow or a cross-feature UI problem. If it can be reused outside one feature without leaking domain assumptions, it should probably be shared.

5. Which components are too tightly coupled to current behavior?  
Answer: `FieldEditor` is somewhat coupled to the current builder workflow because it knows about specific field metadata and builder actions. That is acceptable now, but it is not as reusable as a generic form control.

6. How would you refactor if `FieldEditor` grows more complex?  
Answer: If `FieldEditor` grows further, I would split it by responsibility, such as basic field properties, option management, and type-specific settings. That would keep the component manageable.

7. What patterns did you use to keep components readable?  
Answer: I used small components, custom hooks, shared types, and a clear folder structure to keep the code readable. I also tried to avoid mixing API logic and rendering logic in the same place.

## Round 8: Performance

1. Where could performance become a problem in this app?  
Answer: Performance could become a problem if the todo dataset becomes very large, if the form contains many fields, or if custom controls like `CustomSelect` are heavily nested or over-rendered.

2. Why is `keepPreviousData` a UX/performance improvement?  
Answer: `keepPreviousData` improves perceived performance because the user sees stable content while new data is loading. That reduces layout shifts and flicker.

3. Would you add `React.memo` anywhere right now? Why or why not?  
Answer: I would not add `React.memo` aggressively right now because the app is still small. I would first profile where re-renders are actually expensive.

4. Why is memoization not always the first answer?  
Answer: Memoization adds cognitive overhead and can be misused. It should follow evidence, not be added everywhere by default.

5. How would you optimize the todo table if the dataset became very large?  
Answer: For a very large todo table, I would rely on true server pagination first, then consider virtualization and debounced filtering. I would also review query strategy and rendering cost.

6. How would you optimize form rendering if the form had 100 plus fields?  
Answer: For large forms, I would consider splitting sections, reducing re-renders, memoizing field rendering where justified, and possibly using a more specialized form architecture.

7. What would you measure before making performance changes?  
Answer: Before optimizing, I would measure render frequency, commit times, network latency, and the cost of expensive subtrees. React DevTools Profiler would be part of that.

8. Which current optimizations are useful, and which are mostly minor?  
Answer: The most useful current optimization is the query behavior around pagination and previous data. The `useMemo` for total pages is comparatively minor.

## Round 9: Error Handling And Edge Cases

1. What happens if `localStorage` is unavailable or throws?  
Answer: Some reads are guarded, but not every write is fully protected, so a storage failure could still break a flow. In production I would wrap all storage access in safe helpers.

2. What happens if the API fails on initial load?  
Answer: If the API fails on initial load, the todo page currently shows a simple failure state. It works, but it could be improved with retry actions and better recovery UX.

3. What happens if the user navigates to preview with no saved form config?  
Answer: If preview is opened with no saved form config, the app shows an empty-state message and a way back to the builder. That is a good guard for the current scope.

4. What happens if two form fields have the same label?  
Answer: If two fields share the same label, one value can overwrite another in the submitted payload. That is why stable ids would be a better payload key.

5. What happens if the user changes filters while already on a later page?  
Answer: If filters change while the user is on a later page, the code resets or clamps the page so the UI stays within valid page bounds. That prevents impossible pagination states.

6. What happens if the API returns malformed data?  
Answer: If the API returns malformed data, the current app assumes the shape is correct and could break at runtime. A stronger production approach would validate responses more defensively.

7. What happens if a runtime error occurs in a child component?  
Answer: Without an error boundary, a runtime error in a child can crash the visible app tree. That is a current production-readiness gap.

8. What production issues are not fully handled yet?  
Answer: Missing areas include robust retries, global error boundaries, response validation, stronger storage protection, and observability. Those are the main gaps I would address next.

## Round 10: Accessibility

1. What accessibility work did you consider in this codebase?  
Answer: I considered `aria-busy`, `role="alert"` for validation messages, and keyboard interaction in the custom select. So there is some accessibility awareness built in.

2. What accessibility risks exist in `CustomSelect`?  
Answer: The main risks in `CustomSelect` are around complete ARIA correctness, focus management, and ensuring the control is properly named in every usage. Custom inputs are easy to get partially right but still miss edge cases.

3. Why are custom form controls harder to make accessible than native controls?  
Answer: Native controls come with accessibility behavior for free, while custom controls require us to recreate semantics, focus behavior, and keyboard interaction manually. That is why the bar is higher for custom controls.

4. What improvements would you make to the todo search input?  
Answer: I would add an explicit accessible label or `aria-label` to the todo search input instead of relying only on placeholder text. That would make the control more screen-reader friendly.

5. How would you test accessibility in this project?  
Answer: I would test accessibility with keyboard-only interaction, browser accessibility trees, and automated tools like axe. I would also manually review focus states and screen-reader behavior for custom controls.

6. What table accessibility improvements would you add?  
Answer: I would add a table caption and stronger header semantics like `scope` on headers. That would improve context for assistive technologies.

## Round 11: Testing

1. What tests are missing from this project?  
Answer: The project is missing unit tests, component tests, and integration tests for its most important flows. That is one of the main weaknesses right now.

2. If you could add only five tests, which ones would you prioritize?  
Answer: My first five tests would cover `useTodoFilters`, the todo query parameter mapping, form preview required validation, email and phone validation behavior, and dynamic rendering for different form field types.

3. Why are tests especially important for a dynamic form builder?  
Answer: Dynamic form builders are especially test-sensitive because their behavior changes based on schema. Small regressions can break many runtime combinations.

4. How would you test `useTodoFilters`?  
Answer: I would test `useTodoFilters` by mocking storage, asserting default state, update persistence, and reset behavior. I would also test malformed stored JSON.

5. How would you test `FormPreview` validation?  
Answer: I would render the preview with a controlled schema, simulate submit, and assert that required and type-specific errors appear correctly. Then I would test a valid submission path.

6. Would you focus more on unit tests, integration tests, or end-to-end tests here?  
Answer: I would focus most on integration and component tests because they give strong confidence for UI-heavy flows with dynamic rendering. A few unit tests would still help for utilities and hooks.

7. What bugs are currently more likely because there are no tests?  
Answer: Bugs around persistence, dynamic field rendering, payload shape, and validation are more likely because those areas have branching behavior and no automated safety net.

## Round 12: Scalability And Production Readiness

1. If this app had 10 times more features, how would the architecture evolve?  
Answer: If the app had many more features, I would probably increase feature modularity, add route-level lazy loading, harden public module boundaries, and revisit state-sharing strategy where needed.

2. What would you change first to make this production-ready?  
Answer: The first production-ready changes I would make are tests, stricter TypeScript, stronger error handling, and improved payload design for the form system. Those would raise confidence quickly.

3. How would you improve observability and logging?  
Answer: I would add structured logging, error reporting, and better request tracing around the API layer. I would also avoid logging sensitive form data directly in production.

4. How would you support environment-specific API configuration?  
Answer: I would move the base URL and environment-dependent values into environment variables and config helpers. That is more flexible than hardcoding service endpoints.

5. How would you prepare this codebase for multiple frontend contributors?  
Answer: To support multiple contributors, I would tighten linting and TypeScript rules, add tests, document architecture conventions, and define clearer file/module boundaries.

6. What coding standards would you enforce next?  
Answer: I would enforce stricter TypeScript, no dead code, stronger accessibility checks, and more consistent error-handling patterns. Those standards help teams scale safely.

7. How would you reduce the risk of regressions?  
Answer: The best way to reduce regressions is adding focused automated tests and improving type safety. After that, consistent review standards and CI checks become very valuable.

## Round 13: Strict Interviewer Pushback

1. Why is TypeScript strict mode disabled in your project?  
Answer: Strict mode is currently off, which I see as a weakness rather than a best practice. If I continued this project, I would enable it incrementally because stronger compile-time safety is important as complexity grows.

2. Why are there no automated tests?  
Answer: There are no tests yet because I prioritized architecture and core flows first, but I agree that this is the biggest production-readiness gap. The next step would be focused test coverage around hooks and dynamic form behavior.

3. Why should I trust a custom select over a native element?  
Answer: You should not trust a custom select just because it exists. You should trust it only if it is properly tested for keyboard behavior, focus management, and accessibility, which is exactly why custom controls require more scrutiny than native ones.

4. Why are you using editable labels as submit payload keys?  
Answer: Using labels as payload keys is a weak design choice for production because labels are editable and not guaranteed unique. A better design would use stable field ids and treat labels as presentation only.

5. Why is your error handling still basic?  
Answer: Error handling is basic because the project scope focused on architecture and interaction patterns first. If this were moving toward production, I would add stronger retry, logging, and boundary patterns next.

6. Why is your app not using URL-based filters?  
Answer: I used local storage instead of URL-based filters because it was the lightest persistence solution for this scope. If shareability and deep-linking became requirements, I would move filter state into the URL.

7. Why should I consider this production-style if some production concerns are still missing?  
Answer: I would call it production-style rather than production-complete. The architecture reflects good engineering direction, even though some production-hardening work like tests and stronger resilience is still pending.

## Round 14: Debugging Scenarios

1. A user says the todo search is not working. How do you debug it?  
Answer: I would first inspect the network request and confirm the search term is being sent correctly from the filter UI through `useTodos` into the API layer. Then I would verify whether the backend actually honors that parameter.

2. A user says form preview is showing stale data. How do you debug it?  
Answer: I would check how the preview initializes state from `localStorage` and whether the page remounts after builder updates. I would also test multi-tab behavior because stale storage state is a likely cause.

3. A user says selected form values disappear after a field type change. How do you investigate?  
Answer: I would inspect how field type changes mutate schema metadata and whether value-reset behavior is intentional or accidental. Then I would reproduce the issue across different field types to find the exact transition causing data loss.

4. A user reports keyboard navigation feels broken in the custom select. What do you inspect first?  
Answer: I would inspect `handleKeyDown`, focus behavior, `activeIndex`, and ARIA wiring inside `CustomSelect`. Custom keyboard interaction issues usually come from those areas first.

5. A user reports the app works locally but not on direct route refresh in production. What do you check?  
Answer: I would check the hosting rewrite configuration because SPA route refresh failures are often deployment-config issues rather than React Router issues. In this project, that means verifying the Vercel rewrite setup.

6. A reviewer says the architecture is clean but not scalable enough. How do you defend it?  
Answer: I would defend it by saying the current architecture is appropriate for the current project size and already follows good boundaries. Then I would explain how I would evolve it further with lazy loading, stricter module boundaries, tests, and stronger production concerns as the app grows.

## Fast Practice Set

1. Explain the architecture in 60 seconds.  
Answer: The app uses a container and presentational structure where page components orchestrate state, routing, and side effects, while feature components focus on UI rendering. Data fetching is centralized through hooks and an API layer, and shared types keep contracts consistent.

2. Why TanStack Query here?  
Answer: Because todos and users are server state, and TanStack Query gives caching, loading, and request lifecycle management more cleanly than hand-written `useEffect` plus `useState`.

3. Why no Redux?  
Answer: The app does not yet have enough complex shared state to justify Redux. Using local state, custom hooks, and TanStack Query keeps the solution simpler and more focused.

4. Why `localStorage`?  
Answer: I used `localStorage` for lightweight persistence of filters and form configuration because there is no backend persistence layer in this project.

5. Why container and presentational pattern?  
Answer: It keeps orchestration separate from rendering, which improves readability, reuse, and maintainability.

6. Biggest weakness in your form builder?  
Answer: The biggest weakness is that the submit payload uses editable labels as keys instead of stable ids.

7. Biggest performance risk?  
Answer: The biggest performance risk is scaling the todo table or the dynamic form without revisiting rendering cost and interaction patterns.

8. Biggest accessibility risk?  
Answer: The biggest accessibility risk is the custom select, because custom controls are harder to make fully accessible than native ones.

9. Biggest production gap?  
Answer: The biggest production gap is missing automated tests, followed closely by loose TypeScript settings and limited resilience patterns.

10. First thing you would improve next?  
Answer: I would add focused tests around hooks, persistence, and dynamic form validation because that would improve confidence immediately.

## Strong Answer Template

For most answers, use this structure:

1. State the goal.
2. Explain the current implementation.
3. Justify the tradeoff.
4. Mention what you would improve next.

Example:

> I separated server and local state intentionally. Todos and users are remote data, so TanStack Query handles caching and async lifecycle well. Filters and form-builder configuration are UI-specific and lightweight, so React state plus local persistence was the simpler choice. If this product grew, I would likely move some filter state into the URL and harden persistence and validation further.
# Mock Interviews

## How To Use This

Use these questions as live interview practice:

1. Answer verbally in 1 to 3 minutes.
2. Keep your answer structured: problem, approach, tradeoff, improvement.
3. After each answer, ask yourself:
   - Did I explain the why?
   - Did I mention tradeoffs?
   - Did I connect my answer to this codebase?


> This project is a React + TypeScript application with two core modules: a dynamic form builder and a daily todo management module for multiple users. The goal was to demonstrate both data-driven UI and schema-driven UI in the same codebase. <br> <br>From an architecture perspective, I used a container and presentational component pattern so that data logic, state handling, and side effects stay separate from rendering concerns. Page-level containers handle orchestration, while reusable UI components focus on display and interaction. I also extracted business logic into custom hooks, kept API calls centralized in a service layer, and used shared TypeScript types to keep contracts consistent. <br> <br> For state management, I intentionally used different tools for different problems: TanStack Query for server state like todos and users, local React state for component-level behavior, and localStorage for persistence of filters and form configuration. That decision kept the app simple without introducing unnecessary global state management. <br> <br> What this project demonstrates about me is that I do not just focus on making features work, I also think about code organization, separation of concerns, scalability, and maintainability. I tried to keep the code clean, modular, and easy for another developer to understand and extend.


write questions and answers from here 
## Round 1: Project Explanation

1. Explain this project in under two minutes like you are introducing it to a senior React interviewer.
2. What problem were you trying to solve with this project?
3. Why did you choose to combine a dynamic form builder with a daily todos module in one app?
4. What does this project demonstrate about you as a frontend engineer?
5. If I open this repository for the first time, how would you walk me through the architecture?
6. What were your main design goals before writing code?

## Round 2: Architecture

1. Why did you choose the container and presentational component pattern in this project?
2. How are data logic and UI logic separated here?
3. Why are page-level containers placed under `src/pages`?
4. Why are reusable feature components separated into `src/components/features`?
5. What benefits does this structure give if the project grows?
6. Which parts of the current architecture are strongest?
7. Which parts of the architecture would you revisit if the app became much larger?
8. Why did you keep a centralized `api.ts` layer?
9. Why did you create dedicated `types` files instead of defining types inline?
10. If another developer joined the project, how would this structure help them onboard faster?

## Round 3: State Management

1. How did you decide where each type of state should live?
2. Why are todos handled with TanStack Query while form-builder state uses local React state?
3. Why are filters persisted in `localStorage`?
4. Why did you avoid Redux or Context here?
5. What is server state in this app, and what is local UI state?
6. If filters needed to be shareable by URL, what would you change?
7. What are the risks of storing UI state in `localStorage`?
8. How would you handle synchronization if the app is opened in multiple tabs?

## Round 4: Data Fetching And API Design

1. Walk me through the todo flow from changing a filter to rendering updated rows.
2. Why did you use `useTodos` and `useUsers` custom hooks?
3. Explain your `queryKey` strategy.
4. Why did you use `keepPreviousData`?
5. Defend `staleTime: Infinity`. When is it acceptable, and when is it risky?
6. Why is centralized error handling important in an API layer?
7. How would you improve the current API layer for a real production app?
8. What happens if the API contract changes?
9. How would you add authentication to this API architecture?
10. If search becomes unreliable because of backend limitations, what would you do?

## Round 5: React Hooks

1. Which React hooks are most important in this project and why?
2. Why did you use `useEffect` in `TodoList`?
3. Why did you use lazy initialization in `useTodoFilters`?
4. Why are some handlers wrapped in `useCallback`?
5. Why is `useMemo` used for `totalPages`?
6. Which hooks here are being used for correctness versus optimization?
7. Where could hook usage be improved further?
8. If an interviewer says "you are overusing hooks," how would you respond?

## Round 6: Dynamic Form Builder

1. How does the dynamic form builder work end to end?
2. Why is the form schema modeled as an array of fields?
3. Why does `FormFieldRenderer` use a switch by field type?
4. How are type-specific field settings handled?
5. How is validation handled in the preview page?
6. What are the limits of the current validation approach?
7. Why is this approach okay for the current scope?
8. If this builder had to support nested sections and conditional fields, how would you redesign it?
9. How would you persist form schemas in a real backend-driven system?
10. What is the biggest weakness in the current form submission model?

## Round 7: Component Design And Reusability

1. Which components in this codebase are the most reusable?
2. What makes `CustomSelect` reusable?
3. What tradeoffs come with building a custom select instead of using a native select?
4. How do you decide whether a component should be feature-specific or shared?
5. Which components are too tightly coupled to current behavior?
6. How would you refactor if `FieldEditor` grows more complex?
7. What patterns did you use to keep components readable?

## Round 8: Performance

1. Where could performance become a problem in this app?
2. Why is `keepPreviousData` a UX/performance improvement?
3. Would you add `React.memo` anywhere right now? Why or why not?
4. Why is memoization not always the first answer?
5. How would you optimize the todo table if the dataset became very large?
6. How would you optimize form rendering if the form had 100 plus fields?
7. What would you measure before making performance changes?
8. Which current optimizations are useful, and which are mostly minor?

## Round 9: Error Handling And Edge Cases

1. What happens if `localStorage` is unavailable or throws?
2. What happens if the API fails on initial load?
3. What happens if the user navigates to preview with no saved form config?
4. What happens if two form fields have the same label?
5. What happens if the user changes filters while already on a later page?
6. What happens if the API returns malformed data?
7. What happens if a runtime error occurs in a child component?
8. What production issues are not fully handled yet?

## Round 10: Accessibility

1. What accessibility work did you consider in this codebase?
2. What accessibility risks exist in `CustomSelect`?
3. Why are custom form controls harder to make accessible than native controls?
4. What improvements would you make to the todo search input?
5. How would you test accessibility in this project?
6. What table accessibility improvements would you add?

## Round 11: Testing

1. What tests are missing from this project?
2. If you could add only five tests, which ones would you prioritize?
3. Why are tests especially important for a dynamic form builder?
4. How would you test `useTodoFilters`?
5. How would you test `FormPreview` validation?
6. Would you focus more on unit tests, integration tests, or end-to-end tests here?
7. What bugs are currently more likely because there are no tests?

## Round 12: Scalability And Production Readiness

1. If this app had 10 times more features, how would the architecture evolve?
2. What would you change first to make this production-ready?
3. How would you improve observability and logging?
4. How would you support environment-specific API configuration?
5. How would you prepare this codebase for multiple frontend contributors?
6. What coding standards would you enforce next?
7. How would you reduce the risk of regressions?

## Round 13: Strict Interviewer Pushback

1. Why is TypeScript strict mode disabled in your project?
2. Why are there no automated tests?
3. Why should I trust a custom select over a native element?
4. Why are you using editable labels as submit payload keys?
5. Why is your error handling still basic?
6. Why is your app not using URL-based filters?
7. Why should I consider this production-style if some production concerns are still missing?

## Round 14: Debugging Scenarios

1. A user says the todo search is not working. How do you debug it?
2. A user says form preview is showing stale data. How do you debug it?
3. A user says selected form values disappear after a field type change. How do you investigate?
4. A user reports keyboard navigation feels broken in the custom select. What do you inspect first?
5. A user reports the app works locally but not on direct route refresh in production. What do you check?
6. A reviewer says the architecture is clean but not scalable enough. How do you defend it?

## Fast Practice Set

Use these if you want a short rapid-fire round:

1. Explain the architecture in 60 seconds.
2. Why TanStack Query here?
3. Why no Redux?
4. Why `localStorage`?
5. Why container and presentational pattern?
6. Biggest weakness in your form builder?
7. Biggest performance risk?
8. Biggest accessibility risk?
9. Biggest production gap?
10. First thing you would improve next?

## Strong Answer Template

For most answers, use this structure:

1. State the goal.
2. Explain the current implementation.
3. Justify the tradeoff.
4. Mention what you would improve next.

Example:


## Model Answers

### Round 1: Project Explanation Answers

1. This project is a React + TypeScript SPA with two main modules: a dynamic form builder and a multi-user daily todo viewer. I built it to demonstrate both schema-driven UI and server-driven UI in one codebase. Architecturally, I used a container and presentational pattern, custom hooks for business logic, a centralized API layer, and scoped types and styles. It shows that I think beyond feature delivery and focus on maintainability, separation of concerns, and clean frontend architecture.
2. I wanted to solve two common frontend problems in one project: managing remote data efficiently and rendering dynamic forms from configuration. That gave me a chance to demonstrate routing, async state handling, persistence, validation, and reusable component design.
3. I combined them intentionally because they represent two different frontend skill sets. The todo module focuses on fetching, filtering, and pagination, while the form builder focuses on dynamic rendering, schema management, and validation.
4. It demonstrates that I think in terms of architecture, not just UI. I separate data concerns from rendering, use the right state tool for the right problem, and try to keep the code extensible for future features.
5. I would start at `App.tsx` and `AppRoutes.tsx` to explain the app shell and routing, then move into `src/pages` for page-level orchestration, `src/components/features` for reusable feature UI, `src/hooks` for business logic, and `src/services/api.ts` for data access. That gives a clear top-down view.
6. My main goals were clear separation of concerns, reusable components, lightweight but effective state management, and an architecture that would still make sense if the app grew. I also wanted the project to be easy to explain in an interview.

### Round 2: Architecture Answers

1. I chose the container and presentational pattern because it keeps orchestration logic separate from rendering. That makes components easier to reason about, easier to reuse, and easier to test later.
2. Data logic lives in hooks and page-level containers, while UI logic lives in feature components. For example, fetching and filter state are handled outside `TodoTable`, so the table stays focused on rendering.
3. `src/pages` is a natural place for route-level containers because those components coordinate data, navigation, metadata, and composition. They are the entry point for each user flow.
4. `src/components/features` keeps domain-specific UI grouped by feature. That makes the codebase more scalable than a flat shared components folder.
5. This structure improves discoverability, reduces coupling, and makes feature growth easier. New developers can usually tell where code belongs without much ambiguity.
6. The strongest parts are the clear page-to-hook-to-component flow, the API layer separation, and the feature-based component grouping. Those are solid architecture choices for a project of this size.
7. If the app became much larger, I would probably make route modules more modular, add lazy loading, and revisit how feature folders expose public APIs. I might also move more configuration into dedicated domain modules.
8. A centralized `api.ts` layer avoids scattering `fetch` calls throughout the app. It also creates one place to add future concerns like authentication, request normalization, or error transformation.
9. Dedicated `types` files improve consistency and reduce duplication. They make contracts reusable across API functions, hooks, and UI components.
10. This structure helps onboarding because responsibilities are easy to trace. A developer can start at a page, follow the hook, then inspect the UI components without dealing with mixed concerns in a single large file.

### Round 3: State Management Answers

1. I categorized state by responsibility. Remote data became server state, user preferences became persistent UI state, and view-specific interactions stayed as local React state.
2. Todos and users come from an external API, so TanStack Query is a better fit for caching and request lifecycle. The form builder schema is local interactive state, so plain React state is simpler and more appropriate.
3. Filters are persisted in `localStorage` to improve UX across refreshes. It is a lightweight solution because there is no backend preference store in this project.
4. I avoided Redux and Context because the app does not have enough complex shared state to justify them. Using them here would add more abstraction than value.
5. Server state in this app is the todo and user data fetched from the API. Local UI state includes filters, form schema, form values, error messages, and component interaction state.
6. I would move the filter state into search params and sync it with the UI. That would make filters shareable, bookmarkable, and easier to debug.
7. The risks are storage failures, stale cross-tab state, lack of shareability, and potential mismatch between saved state and new UI behavior. It is convenient, but not always ideal for collaborative or multi-device workflows.
8. I would listen to the `storage` event and reconcile state when the underlying key changes. For more complex cases, I would use a backend or a shared sync layer instead of relying only on local storage.

### Round 4: Data Fetching And API Design Answers

1. When a filter changes, the page updates filter state, which changes the `queryKey` used by `useTodos`. TanStack Query then triggers a new request through `api.fetchTodosPage`, returns loading or previous data during the fetch, and the table re-renders with the updated result.
2. I used custom hooks to hide query setup, data normalization, and repeated request concerns. That keeps the page components cleaner and makes the data layer easier to reuse.
3. My `queryKey` includes pagination mode, page, page size, user, status, and search text. That ensures each unique filter combination gets the correct cache entry.
4. `keepPreviousData` improves UX during page changes and filter updates because the table does not flash empty while the next result is loading. It makes the interaction feel more stable.
5. `staleTime: Infinity` is acceptable when the data is effectively static during a session, like demo or low-volatility data. It is risky in real-time or frequently updated systems because users may keep seeing stale data.
6. Centralized error handling matters because it keeps request failures consistent and prevents every component from inventing its own network behavior. It also makes future logging and error mapping easier.
7. For production, I would add environment-based base URLs, auth support, typed response validation, request cancellation, and more explicit error structures. I would also consider a shared fetch wrapper.
8. If the API contract changes, the centralized service layer reduces the blast radius. I would update the service functions and types, then verify hooks and UI flows against the new contract.
9. I would likely introduce an authenticated request wrapper that injects tokens or session headers, then keep the rest of the app consuming the same service functions. Route protection would sit above that in routing.
10. I would first verify whether the backend actually supports the current query shape. If not, I would either adapt to the supported contract or implement a controlled client-side fallback with clear tradeoff awareness.

### Round 5: React Hooks Answers

1. The most important hooks are `useState`, `useEffect`, `useMemo`, `useCallback`, and the custom hooks built on top of them. They drive local state, side effects, derived state, stable handlers, and business logic extraction.
2. I used `useEffect` in `TodoList` to correct the current page when filters reduce the total page count. That is primarily a correctness concern, not just an optimization.
3. Lazy initialization avoids reading from `localStorage` on every render. It ensures the filter state is loaded once during initial mount.
4. Some handlers are wrapped in `useCallback` to keep callback references stable when passed to children. That helps keep component composition predictable and can reduce unnecessary re-renders in some cases.
5. `useMemo` is used for `totalPages` to make derived-state intent explicit. The computation is small, so the bigger value there is code clarity rather than major performance gain.
6. `useEffect` for page correction and lazy initialization are more about correctness. `useMemo` and `useCallback` are more about optimization and stable composition.
7. Hook usage could be improved by memoizing some derived values like `userMap` and by auditing whether every callback really needs stabilization. I would optimize based on measurement, not just preference.
8. I would say I am using hooks intentionally to separate responsibilities, not to add abstraction for its own sake. The custom hooks here remove complexity from pages and make the code more readable.

### Round 6: Dynamic Form Builder Answers

1. The builder lets the user create and configure field definitions, saves that schema locally, then the preview page reads the saved schema and renders a real form dynamically. On submit, it validates required and type-aware rules before showing the result.
2. An array is the right shape because form field order matters in the UI. It also makes rendering and reordering conceptually simpler than a plain object map.
3. `FormFieldRenderer` uses a switch because the UI is schema-driven and each field type has different rendering rules. That keeps the behavior explicit and easy to extend.
4. Type-specific settings are handled by field metadata such as `options`, `min`, `max`, `step`, `accept`, and `placeholder`. The builder updates those properties, and the preview renderer consumes them.
5. Validation is handled in the preview page with required checks and type-aware checks for email and phone. Errors are stored in local state and shown near the fields.
6. The current approach is manual and limited. It does not scale as well for complex validation rules, nested forms, cross-field rules, or schema evolution.
7. It is okay for the current scope because the form system is still small and the logic is easy to explain. For an interview project, simplicity and clarity can be better than overengineering.
8. I would redesign the schema to support nested groups, conditional visibility rules, and probably a formal validation schema. I would also separate rendering metadata from submission metadata more clearly.
9. In a real system, I would persist schemas to a backend with versioning, ownership, and validation at the API boundary. That would also allow drafts, sharing, and audit history.
10. The biggest weakness is that submitted data uses editable labels as keys instead of stable ids. That creates collision risk and weakens the contract of the payload.

### Round 7: Component Design And Reusability Answers

1. The most reusable components are `CustomSelect`, `TodoPagination`, and some of the form rendering pieces. They accept props cleanly and are not deeply tied to one page container.
2. `CustomSelect` is reusable because it supports labels, placeholders, error states, grouped options, placement modes, controlled usage, and custom styling. It is designed as a generic UI primitive.
3. The main tradeoff is control versus complexity. A custom select gives better styling and interaction flexibility, but accessibility and keyboard behavior become the team’s responsibility.
4. I decide based on whether the component solves a domain-specific workflow or a cross-feature UI problem. If it can be reused outside one feature without leaking domain assumptions, it should probably be shared.
5. `FieldEditor` is somewhat coupled to the current builder workflow because it knows about specific field metadata and builder actions. That is acceptable now, but it is not as reusable as a generic form control.
6. If `FieldEditor` grows further, I would split it by responsibility, such as basic field properties, option management, and type-specific settings. That would keep the component manageable.
7. I used small components, custom hooks, shared types, and a clear folder structure to keep the code readable. I also tried to avoid mixing API logic and rendering logic in the same place.

### Round 8: Performance Answers

1. Performance could become a problem if the todo dataset becomes very large, if the form contains many fields, or if custom controls like `CustomSelect` are heavily nested or over-rendered.
2. `keepPreviousData` improves perceived performance because the user sees stable content while new data is loading. That reduces layout shifts and flicker.
3. I would not add `React.memo` aggressively right now because the app is still small. I would first profile where re-renders are actually expensive.
4. Memoization adds cognitive overhead and can be misused. It should follow evidence, not be added everywhere by default.
5. For a very large todo table, I would rely on true server pagination first, then consider virtualization and debounced filtering. I would also review query strategy and rendering cost.
6. For large forms, I would consider splitting sections, reducing re-renders, memoizing field rendering where justified, and possibly using a more specialized form architecture.
7. Before optimizing, I would measure render frequency, commit times, network latency, and the cost of expensive subtrees. React DevTools Profiler would be part of that.
8. The most useful current optimization is the query behavior around pagination and previous data. The `useMemo` for total pages is comparatively minor.

### Round 9: Error Handling And Edge Cases Answers

1. Some reads are guarded, but not every write is fully protected, so a storage failure could still break a flow. In production I would wrap all storage access in safe helpers.
2. If the API fails on initial load, the todo page currently shows a simple failure state. It works, but it could be improved with retry actions and better recovery UX.
3. If preview is opened with no saved form config, the app shows an empty-state message and a way back to the builder. That is a good guard for the current scope.
4. If two fields share the same label, one value can overwrite another in the submitted payload. That is why stable ids would be a better payload key.
5. If filters change while the user is on a later page, the code resets or clamps the page so the UI stays within valid page bounds. That prevents impossible pagination states.
6. If the API returns malformed data, the current app assumes the shape is correct and could break at runtime. A stronger production approach would validate responses more defensively.
7. Without an error boundary, a runtime error in a child can crash the visible app tree. That is a current production-readiness gap.
8. Missing areas include robust retries, global error boundaries, response validation, stronger storage protection, and observability. Those are the main gaps I would address next.

### Round 10: Accessibility Answers

1. I considered `aria-busy`, `role="alert"` for validation messages, and keyboard interaction in the custom select. So there is some accessibility awareness built in.
2. The main risks in `CustomSelect` are around complete ARIA correctness, focus management, and ensuring the control is properly named in every usage. Custom inputs are easy to get partially right but still miss edge cases.
3. Native controls come with accessibility behavior for free, while custom controls require us to recreate semantics, focus behavior, and keyboard interaction manually. That is why the bar is higher for custom controls.
4. I would add an explicit accessible label or `aria-label` to the todo search input instead of relying only on placeholder text. That would make the control more screen-reader friendly.
5. I would test accessibility with keyboard-only interaction, browser accessibility trees, and automated tools like axe. I would also manually review focus states and screen-reader behavior for custom controls.
6. I would add a table caption and stronger header semantics like `scope` on headers. That would improve context for assistive technologies.

### Round 11: Testing Answers

1. The project is missing unit tests, component tests, and integration tests for its most important flows. That is one of the main weaknesses right now.
2. My first five tests would cover `useTodoFilters`, the todo query parameter mapping, form preview required validation, email and phone validation behavior, and dynamic rendering for different form field types.
3. Dynamic form builders are especially test-sensitive because their behavior changes based on schema. Small regressions can break many runtime combinations.
4. I would test `useTodoFilters` by mocking storage, asserting default state, update persistence, and reset behavior. I would also test malformed stored JSON.
5. I would render the preview with a controlled schema, simulate submit, and assert that required and type-specific errors appear correctly. Then I would test a valid submission path.
6. I would focus most on integration and component tests because they give strong confidence for UI-heavy flows with dynamic rendering. A few unit tests would still help for utilities and hooks.
7. Bugs around persistence, dynamic field rendering, payload shape, and validation are more likely because those areas have branching behavior and no automated safety net.

### Round 12: Scalability And Production Readiness Answers

1. If the app had many more features, I would probably increase feature modularity, add route-level lazy loading, harden public module boundaries, and revisit state-sharing strategy where needed.
2. The first production-ready changes I would make are tests, stricter TypeScript, stronger error handling, and improved payload design for the form system. Those would raise confidence quickly.
3. I would add structured logging, error reporting, and better request tracing around the API layer. I would also avoid logging sensitive form data directly in production.
4. I would move the base URL and environment-dependent values into environment variables and config helpers. That is more flexible than hardcoding service endpoints.
5. To support multiple contributors, I would tighten linting and TypeScript rules, add tests, document architecture conventions, and define clearer file/module boundaries.
6. I would enforce stricter TypeScript, no dead code, stronger accessibility checks, and more consistent error-handling patterns. Those standards help teams scale safely.
7. The best way to reduce regressions is adding focused automated tests and improving type safety. After that, consistent review standards and CI checks become very valuable.

### Round 13: Strict Interviewer Pushback Answers

1. Strict mode is currently off, which I see as a weakness rather than a best practice. If I continued this project, I would enable it incrementally because stronger compile-time safety is important as complexity grows.
2. There are no tests yet because I prioritized architecture and core flows first, but I agree that this is the biggest production-readiness gap. The next step would be focused test coverage around hooks and dynamic form behavior.
3. You should not trust a custom select just because it exists. You should trust it only if it is properly tested for keyboard behavior, focus management, and accessibility, which is exactly why custom controls require more scrutiny than native ones.
4. Using labels as payload keys is a weak design choice for production because labels are editable and not guaranteed unique. A better design would use stable field ids and treat labels as presentation only.
5. Error handling is basic because the project scope focused on architecture and interaction patterns first. If this were moving toward production, I would add stronger retry, logging, and boundary patterns next.
6. I used local storage instead of URL-based filters because it was the lightest persistence solution for this scope. If shareability and deep-linking became requirements, I would move filter state into the URL.
7. I would call it production-style rather than production-complete. The architecture reflects good engineering direction, even though some production-hardening work like tests and stronger resilience is still pending.

### Round 14: Debugging Scenario Answers

1. I would first inspect the network request and confirm the search term is being sent correctly from the filter UI through `useTodos` into the API layer. Then I would verify whether the backend actually honors that parameter.
2. I would check how the preview initializes state from `localStorage` and whether the page remounts after builder updates. I would also test multi-tab behavior because stale storage state is a likely cause.
3. I would inspect how field type changes mutate schema metadata and whether value-reset behavior is intentional or accidental. Then I would reproduce the issue across different field types to find the exact transition causing data loss.
4. I would inspect `handleKeyDown`, focus behavior, `activeIndex`, and ARIA wiring inside `CustomSelect`. Custom keyboard interaction issues usually come from those areas first.
5. I would check the hosting rewrite configuration because SPA route refresh failures are often deployment-config issues rather than React Router issues. In this project, that means verifying the Vercel rewrite setup.
6. I would defend it by saying the current architecture is appropriate for the current project size and already follows good boundaries. Then I would explain how I would evolve it further with lazy loading, stricter module boundaries, tests, and stronger production concerns as the app grows.
