// bun test src/problems/05-throttle/test/throttle.test.ts

export function throttle<F extends (...args: any[]) => void>(
  func: F,
  delay: number,
) {
  let lastCall = 0; // Ponemos esta variables en el closure para que se mantenga entre llamadas a la función throttle

  return function (this: unknown, ...args: Parameters<F>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}
// --- Examples ---
// Uncomment to test your implementation:

const log = throttle((msg: string) => console.log(msg), 300);
log("a"); // fires immediately → "a"
log("b"); // ignored (within 300ms)
log("c"); // ignored (within 300ms)
setTimeout(() => log("d"), 400); // fires → "d" (300ms passed)
