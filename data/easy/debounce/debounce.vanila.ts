// bun test src/problems/02-debounce/test/debounce.test.ts

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
log("c"); // only this one fires after 300ms → "c"
