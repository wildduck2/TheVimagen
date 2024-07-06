import { useEffect, useRef } from 'react'
import { Listener, UseEventType } from './useEvent.types'

function useEvent<T extends HTMLElement>({ target, listener, cleanup, type }: UseEventType<T>): void {
  const storedListener = useRef<Listener>(listener)
  const storedCleanup = useRef<(() => void) | undefined>(cleanup)

  useEffect(() => {
    storedListener.current = listener
    storedCleanup.current = cleanup
  })

  useEffect(() => {
    const targetEl = target && 'current' in target ? target.current : target
    if (!targetEl || !(targetEl instanceof HTMLElement)) return

    let didUnsubscribe = false
    function eventListener(event: Event) {
      if (didUnsubscribe) return
      storedListener.current(event)
    }

    targetEl.addEventListener(type, eventListener)

    return () => {
      didUnsubscribe = true
      targetEl.removeEventListener(type, eventListener)
      storedCleanup.current && storedCleanup.current()
    }
  }, [target, type])
}

export default useEvent
