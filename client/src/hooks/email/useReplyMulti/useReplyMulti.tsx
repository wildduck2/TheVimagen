import { StateType, ThreadsReplyContentRef } from '@/components/layouts'
import { createDraftThread } from '@/utils'
import { useCallback, useRef, useState } from 'react'
import { UserReplyMultiProps } from './useReplyMulti.types'

export const useReplyMulti = ({ threads }: UserReplyMultiProps) => {
  const [state, setState] = useState<StateType>({ alert: false, drawer: false })
  const threadsReplyContentRef = useRef<ThreadsReplyContentRef[]>([])
  const handleAlertCancel = useCallback(() => {
    setState((prevState) => ({ ...prevState, alert: false, drawer: true }))
  }, [])

  const handleAlertContinue = useCallback(() => {
    const hasContentInThreads = threadsReplyContentRef.current.some((threadContent) => {
      const content = threadContent.content
      return typeof content === 'string' && content.trim() !== ''
    })

    setState((prevState) => ({ ...prevState, alert: false, drawer: false }))
    if (hasContentInThreads) createDraftThread({ threadsReplyContent: threadsReplyContentRef.current })

    threadsReplyContentRef.current = []
  }, [])

  const handleDrawerOpenChange = useCallback(
    (drawerState: boolean) => {
      setState(() => ({
        alert: drawerState && threads.length > 0 ? false : true,
        drawer: drawerState,
      }))
    },
    [threads.length],
  )

  return { state, setState, handleDrawerOpenChange, handleAlertContinue, handleAlertCancel, threadsReplyContentRef }
}
