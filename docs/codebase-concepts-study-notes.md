# Codebase Concepts Study Notes

This document summarizes the main topics discussed in this chat and explains them in a way that is useful for revision and interview preparation.

## 1. Why Use `index.ts` Re-Exports?

Files like `src/components/features/todos/index.ts` and `src/components/features/form-builder/index.ts` act as feature entry points.

Example:

```ts
export { default as TodoListPageContainer } from "../../../pages/TodoList";
export type { Todo, User, TodoFilters, TodoPageSize } from "@/types/todos";
```

This pattern is often called a barrel file.

### Benefits

- Gives the feature a single public API.
- Hides internal folder structure from the rest of the app.
- Makes refactoring easier because consumers import from one place.
- Improves discoverability by showing what a feature exposes.
- Reduces long relative imports.

### Interview answer

You can say: an `index.ts` barrel file creates a clean import surface for a feature, reduces coupling to internal file paths, and makes refactoring easier because other files do not need to know the exact component or type location.

## 2. Pagination Flow In `TodoList.tsx`

The pagination logic is state-driven.

### Main idea

The app stores pagination state in `filters`, sends those values to the API, receives both current page data and the total number of rows, then derives `totalPages` from that.

### Flow

1. `useTodoFilters()` stores `page` and `pageSize`.
2. `useTodos(filters)` uses those values to fetch the correct page.
3. The API returns:
   - `todos`: only the current page rows
   - `totalCount`: total matching rows
4. `TodoList.tsx` calculates:

```ts
totalPages = Math.ceil(totalCount / pageSize)
```

5. `TodoPagination` renders buttons using `page`, `pageSize`, and `totalPages`.
6. Clicking pagination controls updates `filters`.
7. Changing `filters` triggers a refetch and rerender.

### Important details

- If `pageSize === "all"`, the app fetches all matching rows and treats it as one page.
- If filters shrink the result set and the current page becomes invalid, the page is corrected back into range.
- Changing page size resets the page to `1` so the UI stays consistent.

### Interview answer

You can say: pagination is server-side and state-driven. The current page and page size live in filter state, those values drive the API request, the API returns the current slice plus total row count, and the page derives `totalPages` from that result.

## 3. How `buildPaginationItems()` Works

The function in `src/components/features/todos/TodoPagination.tsx` decides which page buttons to show.

It returns items like:

```ts
[1, 2, 3, 4, "ellipsis", 20]
```

or:

```ts
[1, "ellipsis", 9, 10, 11, "ellipsis", 20]
```

### Rules

#### Case 1: no valid pages

If `totalPages < 1`, return an empty array.

#### Case 2: small page count

If `totalPages <= 12`, show all page numbers.

Example:

```ts
currentPage = 3
totalPages = 7
// result
[1, 2, 3, 4, 5, 6, 7]
```

#### Case 3: user is near the beginning

If `currentPage <= FIRST_LAST_WINDOW` and `FIRST_LAST_WINDOW = 4`, show:

- first 4 pages
- ellipsis
- last page

Example:

```ts
currentPage = 2
totalPages = 20
// result
[1, 2, 3, 4, "ellipsis", 20]
```

#### Case 4: user is near the end

Show:

- first page
- ellipsis
- last 4 pages

Example:

```ts
currentPage = 18
totalPages = 20
// result
[1, "ellipsis", 17, 18, 19, 20]
```

#### Case 5: user is in the middle

Show:

- first page
- ellipsis
- previous page
- current page
- next page
- ellipsis
- last page

Example:

```ts
currentPage = 10
totalPages = 20
// result
[1, "ellipsis", 9, 10, 11, "ellipsis", 20]
```

### Interview answer

You can say: the pagination UI compresses large page ranges with ellipses. It shows all pages for small datasets, the first few pages near the start, the last few pages near the end, and a focused window around the current page when the user is in the middle.

## 4. How `useTodoFilters()` Works

This hook manages filter state for the todo page and persists it in `localStorage`.

### What it stores

- `userId`
- `status`
- `search`
- `page`
- `pageSize`

### Main responsibilities

#### `defaultFilters`

Defines the initial values used when there is nothing saved.

#### `normalizePageSize()`

Makes sure only valid page sizes are allowed:

- `10`
- `20`
- `50`
- `"all"`

If the saved value is invalid, it falls back to `10`.

#### `loadFilters()`

- Reads saved filters from `localStorage`
- Parses them
- Merges them with defaults
- Normalizes `pageSize`
- Falls back to defaults if parsing fails

#### `setFilters(update: Partial<TodoFilters>)`

Accepts only the fields that changed, merges them into existing state, and saves the result back to `localStorage`.

Example:

```ts
setFilters({ page: 2 })
setFilters({ search: "react", page: 1 })
```

#### `resetFilters()`

Restores the default values and also updates `localStorage`.

### Why use `Partial<TodoFilters>`?

Because updates are patch-based. Most of the time, the UI only changes one or two values, not the entire filter object.

Without `Partial`, every call would need the full filter object. With `Partial`, the caller can send only the changed values and the hook merges them into the previous state.

### Interview answer

You can say: `useTodoFilters` is a custom hook that centralizes todo filter state, initializes it from `localStorage`, persists every update, and exposes patch-style updates and a reset action for reuse across the page.

## 5. How `useFormBuilder()` Works

This hook manages the dynamic form builder state.

### Main responsibilities

- load saved form config
- keep an array of `FormField`
- add fields
- remove fields
- update individual fields
- change field type safely
- validate and save form config

### Key functions

#### `createField()`

Creates a new default field with:

- a unique `id`
- empty `label`
- default type `"text"`
- `required: false`
- empty `options`

#### `addField()`

Appends a new field to the array.

#### `removeField(id)`

Removes the field whose `id` matches.

#### `updateField(id, update: Partial<FormField>)`

Updates just the matching field by merging the partial update into the existing field.

Example:

```ts
updateField("field-1", { label: "Email", required: true })
```

#### `changeFieldType(id, type, currentOptions?)`

This is a smarter wrapper around `updateField`.

It also fixes related properties based on the selected type:

- for `select` and `radio`, it keeps or creates options
- for `range`, it sets `min`, `max`, and `step`
- for non-range fields, it clears range-only properties
- for non-file fields, it clears `accept`

#### `save()`

- validates that every field has a label
- shows an error toast if invalid
- saves config to `localStorage` if valid
- shows a success toast

### Why use `Partial<FormField>`?

Because updates are patch-based, not replacement-based.

Usually the UI changes only part of a field:

- just the `label`
- just the `type`
- just `required`
- or a small group like `min`, `max`, and `step`

`Partial<FormField>` makes every property optional, so the update function can accept only the changed fields and merge them with the old object.

### Interview answer

You can say: `useFormBuilder` is a custom hook that encapsulates the form builder's business logic. It manages a list of fields, provides reusable actions for modifying them, preserves type-specific field data correctly, and persists the final form config locally.

## 6. Why Use `CustomSelect` Instead Of Native `<select>`?

You can customize a native `<select>` a little, but not fully.

### Main issue with native `<select>`

The dropdown popup is heavily controlled by the browser and operating system, so it is hard to fully customize:

- dropdown panel styling
- hover and active option styling
- selected state visuals
- icons inside options
- opening direction
- grouped custom rendering
- consistent cross-browser appearance

### What `CustomSelect` gives this app

- fully custom trigger UI
- custom listbox popup
- placeholder support
- grouped options
- disabled options
- keyboard navigation
- active option tracking
- check icon for selected option
- error and hint support
- auto placement above or below

### Interview answer

You can say: a native `<select>` is fine for simple forms, but it offers limited control over dropdown appearance and behavior. A custom select is used when the app needs consistent design, richer UX, and custom behaviors like keyboard navigation, icons, grouped options, and adaptive positioning.

## 7. Why `useLayoutEffect` Is Used In `CustomSelect`

`useLayoutEffect` is used for layout measurement before the browser paints the screen.

### Why not `useEffect`?

If `useEffect` were used:

1. the dropdown might first render below
2. then the effect would measure space
3. then the dropdown would jump above

That can cause flicker.

With `useLayoutEffect`:

1. the DOM updates
2. React runs the layout effect before paint
3. the component measures the trigger position
4. it decides whether to place the list above or below
5. the browser paints the correct result

### How the placement logic works

The component measures:

- `rect.bottom`: where the trigger ends
- `rect.top`: where the trigger starts
- `window.innerHeight`: viewport height

Then it calculates:

```ts
spaceBelow = window.innerHeight - rect.bottom - 18
spaceAbove = rect.top - 18
```

It also estimates dropdown height:

```ts
estHeight = Math.min(260, allFlat.length * 36 + 16)
```

### Decision rule

- If there is enough room below, open below.
- If there is not enough room below, but below still has more space than above, still open below.
- Otherwise open above.

### Example

If:

- `estHeight = 200`
- `spaceBelow = 80`
- `spaceAbove = 500`

Then the dropdown opens above because the space below is too small and the space above is much larger.

### Interview answer

You can say: `useLayoutEffect` is used because the component must measure the trigger and available viewport space before paint to avoid visual flicker. It compares the available space above and below the trigger and chooses the better direction for the dropdown.

## 8. Quick Revision Summary

### Barrel files

- Used to create a clean public API for a feature.

### Todo pagination

- Driven by filter state and server-side data.

### Pagination UI

- Uses ellipses to keep large page lists readable.

### `useTodoFilters`

- Stores filters in state and syncs them to `localStorage`.

### `useFormBuilder`

- Manages form field state and persists form configuration.

### `Partial<T>`

- Used when updates only include a subset of properties.

### `CustomSelect`

- Used to achieve better styling and behavior than native `<select>`.

### `useLayoutEffect`

- Used for pre-paint layout measurement to avoid dropdown jump/flicker.
