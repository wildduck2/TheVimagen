import { useRef } from 'react'

export const useDebounce = <T extends (...args: unknown[]) => void>(cb: T, delay = 500) => {
  const timeoutRef = useRef<NodeJS.Timeout>()

  ;(function () {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      cb()
    }, delay)
  })()
}

/* export function useDebounce<T, P extends (...args: T[]) => void>(func: P, timeout: number = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: T, ...args: Parameters<P>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
} */
