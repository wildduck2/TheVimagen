import { useEffect } from 'react'
import { UseWindowScrollType } from './useScroll.types'
import { useThrottle } from '../useThrottle'
import { useDebounce } from '../useDebounce'

export const useWindowScroll = ({ scrollRef, cb }: UseWindowScrollType): void => {
  const handleScroll = useThrottle(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      const scrollPosition = (scrollTop + clientHeight) / scrollHeight

      if (scrollPosition >= 0.9) {
        cb()
      }
    }
  }, 300)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])
}
