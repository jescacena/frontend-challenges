---
id: throttle
title: throttle
level: easy
tags:
  - javascript
  - typescript
  - functions
  - performance
---

# throttle TL;DR

`throttle` limita la frecuencia de ejecucion de una funcion: se ejecuta una vez y luego ignora llamadas hasta que pase un intervalo definido.

## Problem

Implement a `throttle` function that limits the rate at which a function can fire. The function will execute at most once per specified time period.

## Use Cases

- Scroll handler: Fire at most once per 100ms
- API rate limiting: Limit requests per second
- Gaming: Cap button press frequency

## Signature

```typescript
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void;
```

## Example

```typescript
const log = throttle((msg: string) => console.log(msg), 1000);

log("a"); // Logs "a" immediately
log("b"); // Ignored (within 1000ms)
log("c"); // Ignored (within 1000ms)
// ... after 1000ms
log("d"); // Logs "d"
```

## Hints

1. Track the timestamp of the last execution
2. Use `Date.now()` to check elapsed time
3. Only execute if enough time has passed

## Base File

[throttle.vanila.ts](./throttle.vanila.ts)

```ts
export function throttle<F extends (...args: any[]) => void>(
  func: F,
  delay: number,
): (...args: Parameters<F>) => void {
  throw new Error("Not implemented");
}

// --- Examples ---
// Uncomment to test your implementation:

// const log = throttle((msg: string) => console.log(msg), 1000)
// log("a") // logs immediately
// log("b") // ignored
// log("c") // ignored
```

## My Solution

```ts
export function throttle<F extends (...args: any[]) => void>(
  func: F,
  delay: number,
): (...args: Parameters<F>) => void {
  let lastCall = 0;

  return function (this: unknown, ...args: Parameters<F>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

const log = throttle((msg: string) => console.log(msg), 1000);
log("a");
log("b");
log("c");
```
