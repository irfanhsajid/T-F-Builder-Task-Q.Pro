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

> This project is a React + TypeScript application with two core modules: a dynamic form builder and a daily todo management module for multiple users. The goal was to demonstrate both data-driven UI and schema-driven UI in the same codebase. <br> <br>From an architecture perspective, I used a container and presentational component pattern so that data logic, state handling, and side effects stay separate from rendering concerns. Page-level containers handle orchestration, while reusable UI components focus on display and interaction. I also extracted business logic into custom hooks, kept API calls centralized in a service layer, and used shared TypeScript types to keep contracts consistent. <br> <br> For state management, I intentionally used different tools for different problems: TanStack Query for server state like todos and users, local React state for component-level behavior, and localStorage for persistence of filters and form configuration. That decision kept the app simple without introducing unnecessary global state management. <br> <br> What this project demonstrates about me is that I do not just focus on making features work, I also think about code organization, separation of concerns, scalability, and maintainability. I tried to keep the code clean, modular, and easy for another developer to understand and extend.
