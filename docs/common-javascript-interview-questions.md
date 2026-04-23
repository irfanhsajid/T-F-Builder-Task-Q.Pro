# Common JavaScript Interview Questions and Answers

## How To Use This

1. Read the question and try answering it in simple words first.
2. Use the answer below to check whether your explanation is correct and clear.
3. Add one real example from your own project when practicing verbally.

## 1. What is JavaScript?

JavaScript is a high-level, interpreted programming language used to add logic and interactivity to web applications. It runs in browsers and also on servers through environments like Node.js.

## 2. What is the difference between `var`, `let`, and `const`?

`var` is function-scoped and can be re-declared, which often leads to bugs. `let` is block-scoped and can be reassigned. `const` is also block-scoped but cannot be reassigned after initialization. In modern JavaScript, `let` and `const` are preferred.

## 3. What is hoisting?

Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation. Function declarations are fully hoisted, while variables declared with `var` are hoisted with `undefined`. `let` and `const` are hoisted too, but they stay in the temporal dead zone until initialized.

## 4. What is the temporal dead zone?

The temporal dead zone is the time between entering a scope and initializing a `let` or `const` variable. Accessing the variable during that period throws an error.

## 5. What is a closure?

A closure happens when a function remembers variables from its outer lexical scope even after the outer function has finished running. Closures are useful for private state, callbacks, factory functions, and currying.

## 6. Can you give a real example of closure usage?

A common example is a function that returns another function and keeps an internal counter. Each time the returned function runs, it still has access to the original counter variable.

## 7. What is a callback function?

A callback is a function passed into another function to be executed later. It is commonly used in event handlers, array methods, timers, and asynchronous operations.

## 8. What is callback hell?

Callback hell happens when many nested callbacks make code hard to read, maintain, and debug. Promises and `async/await` were introduced to handle asynchronous flows more cleanly.

## 9. What is the difference between synchronous and asynchronous code?

Synchronous code runs line by line and blocks the next step until the current step finishes. Asynchronous code allows some work, like API calls or timers, to happen without blocking the main thread.

## 10. What is the event loop?

The event loop is the mechanism that allows JavaScript to handle asynchronous tasks even though JavaScript itself runs on a single main thread. It checks the call stack and task queues, then pushes queued callbacks onto the stack when the stack is empty.

## 11. What is the call stack?

The call stack is the structure JavaScript uses to track currently executing functions. When a function is called, it is pushed onto the stack, and when it finishes, it is popped off.

## 12. What are microtasks and macrotasks?

Microtasks usually include promise callbacks and mutation observer work. Macrotasks include `setTimeout`, `setInterval`, and some browser events. After the current synchronous code finishes, JavaScript clears microtasks before moving to the next macrotask.

## 13. Why do promise callbacks run before `setTimeout` callbacks?

Because promise handlers go into the microtask queue, and microtasks are processed before macrotasks like `setTimeout`.

## 14. What is a Promise?

A Promise is an object that represents the eventual result of an asynchronous operation. It can be in one of three states: pending, fulfilled, or rejected.

## 15. What is the difference between `.then()` and `async/await`?

Both are used to work with promises. `.then()` uses chained callbacks, while `async/await` lets asynchronous code look more like synchronous code, which is often easier to read.

## 16. What happens if you do not handle a rejected promise?

The error may become an unhandled promise rejection, which can cause warnings, broken flows, or application issues depending on the environment.

## 17. What is the difference between `==` and `===`?

`==` checks loose equality and performs type coercion before comparing. `===` checks strict equality and compares both value and type. In most cases, `===` is safer and preferred.

## 18. What are truthy and falsy values?

Truthy values behave like `true` in conditions, while falsy values behave like `false`. Common falsy values are `false`, `0`, `""`, `null`, `undefined`, `NaN`, and `0n`.

## 19. What is type coercion?

Type coercion is JavaScript automatically converting one type into another during operations or comparisons. It can be helpful in some cases, but it is also a common source of bugs.

## 20. What is the difference between `null` and `undefined`?

`undefined` usually means a value has not been assigned yet. `null` is an intentional absence of value set by the developer.

## 21. What is the difference between primitive and reference types?

Primitive types like string, number, boolean, `null`, `undefined`, bigint, and symbol are stored by value. Objects, arrays, and functions are reference types, so variables store references to them.

## 22. Why does copying an object with `=` cause shared changes?

Because `=` copies the reference, not the actual object contents. Both variables then point to the same object in memory.

## 23. What is the spread operator used for?

The spread operator `...` is used to expand arrays or objects. It is commonly used for shallow copying, merging objects, and passing function arguments.

## 24. What is destructuring?

Destructuring is a syntax that lets you extract values from arrays or objects into separate variables in a concise way.

## 25. What is the difference between `map`, `filter`, and `reduce`?

`map` transforms each item and returns a new array. `filter` keeps only matching items. `reduce` accumulates values into one final result, such as a sum, object, or grouped structure.

## 26. What is the difference between `forEach` and `map`?

`forEach` is mainly for side effects and does not return a transformed array. `map` returns a new array and is used when you want to transform data.

## 27. What is immutability in JavaScript?

Immutability means not changing existing data directly. Instead, you create a new value or object with the required updates. This is important in predictable state management, especially in React.

## 28. What is `this` in JavaScript?

`this` refers to the object associated with the current execution context. Its value depends on how a function is called, not where it is written.

## 29. How does `this` behave in arrow functions?

Arrow functions do not have their own `this`. They inherit `this` from the surrounding lexical scope, which makes them useful when you want to preserve outer context.

## 30. What are `call`, `apply`, and `bind`?

They are methods used to control the value of `this` in a function. `call` invokes the function immediately with arguments passed one by one, `apply` invokes it with arguments as an array, and `bind` returns a new function with `this` fixed.

## 31. What is the difference between function declaration and function expression?

A function declaration is hoisted fully and can be called before it appears in the code. A function expression is assigned to a variable and follows that variable's initialization rules.

## 32. What are higher-order functions?

Higher-order functions are functions that take other functions as arguments, return functions, or both. Examples include `map`, `filter`, and custom utility wrappers.

## 33. What is debouncing?

Debouncing ensures a function runs only after a pause in repeated events. It is commonly used in search inputs, resize handlers, and autocomplete behavior.

## 34. What is throttling?

Throttling ensures a function runs at most once in a given time interval. It is useful for scroll events, mouse movement, and performance-sensitive repeated actions.

## 35. What is lexical scope?

Lexical scope means a function can access variables based on where it is defined in the source code, not where it is called from.

## 36. What is the difference between shallow copy and deep copy?

A shallow copy copies only the top-level properties, so nested objects are still shared by reference. A deep copy recursively copies nested data as well.

## 37. What is optional chaining?

Optional chaining uses `?.` to safely access nested properties or methods without throwing an error if an intermediate value is `null` or `undefined`.

## 38. What is nullish coalescing?

Nullish coalescing uses `??` to provide a fallback only when the left side is `null` or `undefined`. Unlike `||`, it does not treat `0`, `false`, or an empty string as missing values.

## 39. What is localStorage?

`localStorage` is a browser API for storing string data that persists even after the page is refreshed or the browser is reopened. It is useful for lightweight client-side persistence.

## 40. What is sessionStorage?

`sessionStorage` is similar to `localStorage`, but its data lasts only for the current browser tab session.

## 41. What is JSON and why is it used?

JSON stands for JavaScript Object Notation. It is a lightweight data format commonly used to exchange data between frontend and backend systems.

## 42. What does `JSON.stringify()` do?

It converts a JavaScript value, usually an object or array, into a JSON string.

## 43. What does `JSON.parse()` do?

It converts a valid JSON string into a JavaScript value or object.

## 44. What is error handling in JavaScript?

Error handling means anticipating failures and managing them in a controlled way. Common tools are `try/catch`, promise `.catch()`, and defensive validation.

## 45. What is the purpose of `try/catch`?

`try/catch` lets you run code that may throw an error and then handle that error gracefully instead of crashing the program flow.

## 46. What is a pure function?

A pure function always gives the same output for the same input and does not cause side effects like changing external state or making network calls.

## 47. Why are pure functions useful?

They are easier to test, predict, and reuse. They also make debugging simpler because their behavior is more deterministic.

## 48. What are side effects?

Side effects are operations that affect something outside the function's local scope, such as modifying external variables, updating the DOM, making API calls, or writing to storage.

## 49. What is currying?

Currying is a technique where a function takes one argument at a time and returns another function until all arguments have been received.

## 50. What are common JavaScript topics interviewers ask repeatedly?

Closures, callbacks, promises, `async/await`, the event loop, hoisting, `this`, equality, array methods, scope, prototype basics, immutability, and error handling are among the most common.

## Quick Interview Tips

1. Explain concepts in simple language before using formal terms.
2. Use small examples when discussing closures, promises, or the event loop.
3. Mention practical use cases, not just textbook definitions.
4. If asked about async behavior, explain call stack, queue, and execution order clearly.
