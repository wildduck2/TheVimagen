import { MutableRefObject } from 'react'

export type UseWindowScrollType = {
  scrollRef: MutableRefObject<HTMLDivElement | null>
  cb: (...args: unknown[]) => void
}
