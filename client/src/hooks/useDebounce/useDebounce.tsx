/* export function useDebounce<T, P extends (...args: T[]) => void>(func: P, timeout: number = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: T, ...args: Parameters<P>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
} */

import { useEffect, useState } from 'react'

export const useDebounce = <T,>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
