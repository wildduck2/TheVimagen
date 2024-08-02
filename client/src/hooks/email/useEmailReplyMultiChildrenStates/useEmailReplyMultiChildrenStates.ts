import { Icon } from '@/assets'
import { EmailreplyContent, SetState, ThreadsReplyContentRef } from '@/components/layouts'
import { currentStateType } from '@/components/ui'
import { removeSelectedThreadsDispatch } from '@/context'
import { useEmailReplyThread } from '@/hooks'
import { sanitizeEmailContent } from '@/utils'
import { format } from 'date-fns'
import { IEmail } from 'gmail-api-parse-message-ts'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

export const useEmailReplyMultiChildrenStates = ({
  idx,
  thread,
  threadsLength,
  threadsReplyContentRef,
  setState,
}: {
  idx: number
  thread: IEmail
  threadsLength: number
  threadsReplyContentRef: MutableRefObject<ThreadsReplyContentRef[]>
  setState: SetState
}) => {
  const getJsonFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key)
    if (item) {
      try {
        return JSON.parse(item)
      } catch (error) {
        return ''
      }
    }
    return ''
  }

  const replyToContent = getJsonFromLocalStorage(`replyContent-${idx}`) || ''
  const dispatch = useDispatch()
  const [currentState, setCurrentState] = useState<currentStateType>({
    label: 'Reply',
    icon: Icon.reply,
  })
  const [editorContent, setEditorContent] = useState<EmailreplyContent>({
    replyContent: replyToContent,
    aditSubject: '',
  })
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const replyToEmails = useRef<string[]>([])

  const sanitizedContent = sanitizeEmailContent(thread.textHtml.replace(/<a /g, '<a target="_blank" '))

  const rawMessage = [
    `<div contenteditable="true" style="outline: none;">`,
    `<div style="margin: 1rem">`,
    `---------------------------------`,
    `<p>From: ${thread.from.email}</p>`,
    `<p>Date: ${format(new Date(thread.sentDate), 'PPpp')}</p>`,
    `<p>Subject: ${thread.subject}</p>`,
    `<p>To: ${thread.to[0].email}</p>`,
    `---------------------------------`,
    `</div>`,
    sanitizedContent,
  ].join('')

  useEffect(() => {
    const currentContent =
      currentState.label === 'Forward To'
        ? iframeRef.current?.srcdoc
        : currentState.label === 'Reply'
          ? editorContent.replyContent
          : editorContent.aditSubject
    const replyContent = {
      thread: thread,
      emails: replyToEmails.current,
      content: currentContent,
    }

    const index = threadsReplyContentRef.current.findIndex((item) => item.thread.threadId === thread.threadId)

    if (index !== -1) {
      threadsReplyContentRef.current[index] = replyContent
    } else {
      threadsReplyContentRef.current.push(replyContent)
    }

    if (currentState.label === 'Forward To') {
      localStorage.setItem(`forwardContent-${idx}`, JSON.stringify(iframeRef.current?.srcdoc))
    } else if (currentState.label === 'Reply') {
      localStorage.setItem(`replyContent-${idx}`, JSON.stringify(editorContent.replyContent))
    }
  }, [currentState.label, editorContent])

  const invokeReply = useEmailReplyThread()

  const closeThreadHandler = () => {
    localStorage.setItem(`replyContent-${idx}`, '')
    localStorage.setItem(`forwardContent-${idx}`, '')

    dispatch(removeSelectedThreadsDispatch([thread]))
    threadsLength === 1 && setState((prevState) => ({ ...prevState, drawer: false }))
  }

  return {
    currentState,
    setCurrentState,
    editorContent,
    setEditorContent,
    invokeReply,
    closeThreadHandler,
    rawMessage,
    replyToContent,
    iframeRef,
    replyToEmails,
  } as const
}
