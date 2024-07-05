import { useRef } from 'react'

export const useThrottle = <T extends (...args: unknown[]) => void>(cb: T, delay = 300) => {
  const isThrottled = useRef(false)

  return (...args: Parameters<T>) => {
    if (!isThrottled.current) {
      cb(...args)
      isThrottled.current = true
      setTimeout(() => {
        isThrottled.current = false
      }, delay)
    }
  }
}
