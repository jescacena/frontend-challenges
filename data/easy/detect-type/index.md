---
id: detect-type
title: detectType
level: easy
tags:
  - javascript
  - typescript
  - type-detection
  - fundamentals
---

# detectType TL;DR

Para obtener una string que represente el tipo de cualquier valor en JavaScript, `typeof` no es la mejor solucion porque no distingue entre todos los tipos de objetos que tiene JS. Es mejor acceder al prototipo y al constructor, y sacar el `name`.

## Problem

Implement a `detectType` function that returns the type of any JavaScript value as a lowercase string.

## Requirements

- Return `"null"` for `null`
- Return `"undefined"` for `undefined`
- Return the constructor name (lowercase) for all other values
- Handle objects with null prototype gracefully

## Signature

```ts
type TType =
  | "null"
  | "undefined"
  | "string"
  | "number"
  | "boolean"
  | "symbol"
  | "bigint"
  | "object"
  | "array"
  | "function"
  | "date"
  | "regexp"
  | "map"
  | "set"
  | "weakmap"
  | "weakset"
  | "error"
  | "promise"
  | "arraybuffer"
  | string;

function detectType(value: any): TType;
```

## Examples

```ts
// Null and undefined
detectType(null); // "null"
detectType(undefined); // "undefined"

// Primitives
detectType(42); // "number"
detectType("hello"); // "string"
detectType(true); // "boolean"
detectType(Symbol()); // "symbol"
detectType(123n); // "bigint"

// Objects
detectType({}); // "object"
detectType([]); // "array"
detectType(() => {}); // "function"

// Built-in objects
detectType(new Date()); // "date"
detectType(/regex/); // "regexp"
detectType(new Map()); // "map"
detectType(new Set()); // "set"
detectType(new Error()); // "error"
detectType(Promise.resolve()); // "promise"
```

## Why Not `typeof`?

The built-in `typeof` operator has limitations:

- `typeof null` returns `"object"` (historical bug)
- `typeof []` returns `"object"`
- It cannot distinguish between different object types

## Hints

1. Check for `null`/`undefined` first using `value == null`
2. Use `Object.getPrototypeOf(value)` to get the prototype
3. Access `.constructor.name` and lowercase it
4. Use nullish coalescing (`??`) to handle objects with null prototype

## Prerrequisite

To test solutions with the Bun runtime environment, install Bun first:

- Installation guide: https://bun.sh/docs/installation
- Verify installation:

```bash
bun --version
```

- Run the example file:

```bash
bun detect-type.vanila.ts
```

## Base file

[detect-type.vanila.ts](./detect-type.vanila.ts)

```ts
// bun detect-type.vanila.ts

export type TType =
  | "null"
  | "undefined"
  | "string"
  | "number"
  | "boolean"
  | "symbol"
  | "bigint"
  | "object"
  | "array"
  | "function"
  | "date"
  | "regexp"
  | "map"
  | "set"
  | "weakmap"
  | "weakset"
  | "error"
  | "promise"
  | "arraybuffer"
  | string;

export const detectType = (value: any): TType => {
  throw new Error("Not implemented");
};

// --- Examples ---
// Uncomment to test your implementation:

// console.log(detectType(null))        // Expected: "null"
// console.log(detectType(undefined))   // Expected: "undefined"
// console.log(detectType(42))          // Expected: "number"
// console.log(detectType('hello'))     // Expected: "string"
// console.log(detectType(true))        // Expected: "boolean"
// console.log(detectType([]))          // Expected: "array"
// console.log(detectType({}))          // Expected: "object"
// console.log(detectType(new Date()))  // Expected: "date"
// console.log(detectType(new Map()))   // Expected: "map"
// console.log(detectType(new Set()))   // Expected: "set"
// console.log(detectType(/regex/))     // Expected: "regexp"
```

## My Solution

```ts
// bun detect-type.vanila.ts

export type TType =
  | "null"
  | "undefined"
  | "string"
  | "number"
  | "boolean"
  | "symbol"
  | "bigint"
  | "object"
  | "array"
  | "function"
  | "date"
  | "regexp"
  | "map"
  | "set"
  | "weakmap"
  | "weakset"
  | "error"
  | "promise"
  | "arraybuffer"
  | string;

export const detectType = (value: any): TType => {
  if (value === null || value === undefined) {
    return `${value}`;
  }

  return (
    Object.getPrototypeOf(value)?.constructor?.name ?? "object"
  ).toLowerCase();
};

// --- Examples ---
// Uncomment to test your implementation:

console.log(detectType(null)); // Expected: "null"
console.log(detectType(undefined)); // Expected: "undefined"
console.log(detectType(42)); // Expected: "number"
console.log(detectType("hello")); // Expected: "string"
console.log(detectType(true)); // Expected: "boolean"
console.log(detectType([])); // Expected: "array"
console.log(detectType({})); // Expected: "object"
console.log(detectType(new Date())); // Expected: "date"
console.log(detectType(new Map())); // Expected: "map"
console.log(detectType(new Set())); // Expected: "set"
console.log(detectType(/regex/)); // Expected: "regexp"
```
