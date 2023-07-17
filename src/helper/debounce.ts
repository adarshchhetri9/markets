export default function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  immediate: boolean
): (...args: Parameters<T>) => void {
  let timeout: number | undefined;

  return function (this: any, ...args: Parameters<T>): void {
    const context = this;

    const later = function (): void {
      timeout = undefined; // Initialize with undefined, not null
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
