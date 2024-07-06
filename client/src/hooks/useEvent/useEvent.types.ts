export type Listener = (event: Event) => void

export type UseEventType<T> = {
  target: T | null | undefined
  type: string
  listener: Listener
  cleanup?: () => void
}
