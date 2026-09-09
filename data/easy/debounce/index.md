---
id: debounce
title: debounce
level: easy
tags:
  - javascript
  - typescript
  - functions
  - async
---

# debounce TL;DR

`debounce` sirve para ejecutar una funcion solo cuando deja de llamarse repetidamente durante un tiempo. Cada nueva llamada reinicia el temporizador, y al final solo se ejecuta la ultima.

## Problem

Implement a `debounce` function that delays invoking a function until after a specified wait time has elapsed since the last time it was invoked.

## Use Cases

- Search input: Wait until user stops typing before sending API request
- Window resize: Don't fire handler on every pixel change
- Button clicks: Prevent accidental double-clicks

## Signature

```ts
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void;
```

## Example

```ts
const log = debounce((msg: string) => console.log(msg), 1000);

log("a"); // Timer starts
log("b"); // Timer resets
log("c"); // Timer resets
// ... after 1000ms of no calls: logs "c"
```

## Hints

1. Use `setTimeout` to delay execution
2. Clear previous timeout on each call with `clearTimeout`
3. Preserve `this` context with `.apply()`

## Prerrequisite

To test solutions with the Bun runtime environment, install Bun first:

- Installation guide: https://bun.sh/docs/installation
- Verify installation:

```bash
bun --version
```

- Run the example file:

```bash
bun debounce.vanila.ts
```

## Base file

[debounce.vanila.ts](./debounce.vanila.ts)

```ts
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay: number,
): (...args: Parameters<F>) => void {
  throw new Error("Not implemented");
}

// --- Examples ---
// Uncomment to test your implementation:

// const log = debounce((msg: string) => console.log(msg), 300)
// log("a") // cancelled by next call
// log("b") // cancelled by next call
// log("c") // only this one fires after 300ms -> "c"
```

## My Solution

```ts
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay: number,
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: Parameters<F>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}

// --- Examples ---
// Uncomment to test your implementation:

const log = debounce((msg: string) => console.log(msg), 300);
log("a"); // cancelled by next call
log("b"); // cancelled by next call
log("c"); // only this one fires after 300ms -> "c"
```
