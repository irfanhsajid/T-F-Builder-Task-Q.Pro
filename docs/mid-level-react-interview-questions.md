# Mid-Level React Interview Questions and Answers

## 1. How does React’s rendering process work?

React builds a virtual representation of the UI called the Virtual DOM. When state or props change, React creates a new virtual tree, compares it with the previous one, and updates only the necessary parts of the real DOM. In modern React, rendering is split into a render phase and a commit phase, which helps optimize UI updates.

## 2. What causes unnecessary re-renders and how do you prevent them?

Unnecessary re-renders often happen when parent components re-render and pass new object, array, or function references to children. They can also come from overly broad state updates. I prevent them with component splitting, `React.memo`, `useMemo`, `useCallback`, and by keeping state as local and minimal as possible.

## 3. What’s the difference between state and props?

Props are inputs passed from a parent component and are read-only inside the child. State is managed inside a component and can change over time. Props help with data flow, while state controls dynamic behavior.

## 4. When should you lift state up?

You should lift state up when multiple sibling or child components need access to the same data. Moving the state to the nearest common parent keeps the data consistent and avoids duplication.

## 5. How do you manage complex state in an application?

For complex local state, I use `useReducer` because it centralizes update logic and makes state transitions predictable. For shared or global state, I use Context for simpler cases and a dedicated state library like Redux Toolkit or Zustand when the application grows.

## 6. When would you use `useState` vs `useReducer`?

I use `useState` for simple values like toggles, form fields, or counters. I use `useReducer` when state has multiple related values, complex transitions, or actions that benefit from a predictable reducer pattern.

## 7. What are hooks, and why were they introduced?

Hooks are functions like `useState` and `useEffect` that let function components use state, lifecycle-like behavior, and shared logic. They were introduced to reduce class component complexity and make logic reuse easier without render props or higher-order components.

## 8. How do `useEffect` dependencies work?

The dependency array tells React when to re-run the effect. If a dependency changes between renders, the effect runs again. If the array is empty, it runs once after mount. If omitted, it runs after every render. The rule is to include every value used inside the effect that comes from the component scope.

## 9. Have you ever faced an infinite render issue? How did you fix it?

Yes. A common case is updating state inside an effect that depends on that same state, which creates a loop. I fixed it by correcting the dependency array, moving derived values outside the effect, or guarding the state update so it only runs when needed.

## 10. What is memoization in React?

Memoization is a way to cache values or component output so React can skip unnecessary recalculations or re-renders. It helps when computations are expensive or when child components depend on stable references.

## 11. When would you use `React.memo`, `useMemo`, and `useCallback`?

`React.memo` memoizes component rendering. `useMemo` memoizes computed values. `useCallback` memoizes function references. I use them when re-renders are causing measurable performance issues, not by default everywhere.

## 12. How do you handle API calls in React?

I usually fetch data inside a custom hook or `useEffect`, depending on the use case. I separate loading, success, and error states clearly. In larger apps, I prefer tools like React Query or RTK Query because they handle caching, retries, background refetching, and stale data management well.

## 13. How do you manage loading, error, and success states?

I model each request explicitly with states like `loading`, `error`, and `data`. The UI should show a spinner or skeleton when loading, an error message when the request fails, and the final content on success. I also try to handle empty states separately.

## 14. How do you structure a scalable React application?

I usually organize by feature instead of by file type. Each feature has its own components, hooks, services, types, and tests. Shared UI goes into reusable component folders, and business logic is separated from presentational code to keep the app maintainable.

## 15. How do you manage shared state across components?

If a few related components need the same state, I lift it to their common parent. For state shared across a wider area, I use Context for lightweight cases and a global store when the state becomes large, frequently updated, or needs better tooling.

## 16. Context API vs Redux, when would you use each?

I use Context when the shared state is relatively simple, like theme, auth user, or language settings. I use Redux Toolkit when state is complex, app-wide, frequently updated, or when I need middleware, time-travel debugging, predictable reducers, and better structure for async workflows.

## 17. How do you optimize performance in React apps?

I start by measuring first. Then I reduce unnecessary renders, split large components, lazy load routes or heavy components, virtualize long lists, memoize expensive work, and avoid putting too much state high in the tree. I also optimize API usage and bundle size.

## 18. What tools do you use to debug performance issues?

I use React DevTools Profiler to identify slow renders and wasted renders. I also use browser DevTools for performance traces, network monitoring, and memory inspection. For bundle size, I use tools like bundle analyzers.

## 19. What are controlled vs uncontrolled components?

Controlled components keep form values in React state and update via `onChange`. Uncontrolled components let the DOM manage the value, usually accessed with refs. Controlled components are better for validation and dynamic UI; uncontrolled components can be simpler for basic forms or file inputs.

## 20. When would you use refs?

I use refs to access DOM elements directly, manage focus, measure layout, control scroll, integrate third-party libraries, or store mutable values that should not trigger a re-render.

## 21. How do you handle forms and validations?

For simple forms, controlled inputs with local state are enough. For larger forms, I use libraries like React Hook Form because they reduce boilerplate and improve performance. I validate required fields, formats, and edge cases, and I show clear inline error messages near the relevant field.

## 22. How do you secure a React application?

I never trust the client alone for security. Sensitive checks must happen on the backend. On the frontend, I prevent XSS by avoiding unsafe HTML injection, store tokens carefully, protect routes only as a UX layer, validate input, use HTTPS, and keep dependencies updated.

## 23. How do you test React components?

I test behavior, not implementation details. I usually use React Testing Library with Vitest or Jest to verify rendering, user interactions, and async flows. I keep unit tests focused and add integration tests for important user journeys.

## 24. Tell me about a complex UI you built

A strong answer should describe a real feature, the technical challenges, and the outcome. For example: “I built a dynamic dashboard with filters, charts, pagination, and role-based actions. The main challenge was keeping data flow predictable while avoiding unnecessary re-renders. I solved it by splitting state by feature, memoizing expensive parts, and extracting reusable hooks.”

## 25. How did you improve performance in a React app?

A good example is: “I profiled a page and found a large table re-rendering on every filter change. I split the table into smaller memoized components, stabilized callback props with `useCallback`, and virtualized long rows. That reduced render time significantly and made scrolling smoother.”

## 26. What was the hardest bug you fixed in React?

A good answer should show debugging method, not just the bug. For example: “I had an issue where a component kept fetching repeatedly because an effect depended on a newly created object each render. I identified it with logs and React DevTools, then fixed it by memoizing the dependency and restructuring the effect.”

## Quick Interview Tips

- Start with the concept in simple language.
- Give one practical example from real work.
- Mention trade-offs instead of saying one tool is always better.
- For performance questions, say how you measured before optimizing.
- For bug/debugging questions, explain your process step by step.
