import { StateType, ThreadsReplyContentRef } from '@/components/layouts'
import { createDraftThread } from '@/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { UserReplyMultiProps } from './useReplyMulti.types'
import { useSelector } from 'react-redux'
import { RootState } from '@/context'

export const useReplyMulti = ({ threads }: UserReplyMultiProps) => {
  const multiReply = useSelector((state: RootState) => state.email.multiReply)
  const [state, setState] = useState<StateType>(multiReply)
  const threadsReplyContentRef = useRef<ThreadsReplyContentRef[]>([])

  useEffect(() => {
    setState(multiReply)
  }, [multiReply])

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
      const hasContentInThreads = threadsReplyContentRef.current.some((threadContent) => {
        const content = threadContent.content
        return typeof content === 'string' && content.trim() !== ''
      })

      const threadsLength = threads.length > 0
      const showAlert = !drawerState && hasContentInThreads && threadsLength

      setState(() => ({
        alert: showAlert,
        drawer: threadsLength ? drawerState : false, // Close the drawer if there are no threads
      }))
    },
    [threads.length],
  )

  return {
    state,
    setState,
    handleDrawerOpenChange,
    handleAlertContinue,
    handleAlertCancel,
    threadsReplyContentRef,
  }
}
