import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { IEmail } from 'gmail-api-parse-message-ts'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Label,
  ScrollArea,
  Separator,
  Skeleton,
  Switch,
} from '@/components/ui'
import { getThread } from '@/utils'
import { RootState } from '@/context'

import { EmailDisplayInboxItem } from '../EmailDisplayInboxItem'
import { queryClient } from '@/main'
import { NotionMinimalTextEditor } from '../../Notion'
import { FormEventHandler, memo, useRef } from 'react'
import { replyThread } from '@/utils/email/replyThread'
import { FormSubmitHandler } from 'react-hook-form'

const EmailDisplayInboxItemMemo = memo(EmailDisplayInboxItem)

export const EmailDisplayInbox = () => {
  const { inReplyTo, ids } = useSelector((state: RootState) => state.email.SelectedEmailData)

  const { data, status, fetchStatus, isError } = useQuery<IEmail[]>({
    queryKey: ['emailSelectedIdMessage', ids[0]],
    queryFn: () => getThread({ threads_id: ids }),
    enabled: !!ids[0],
    refetchOnWindowFocus: false,
    // Use initialData or placeholderData to provide initial state if available
    initialData: () => {
      const existingData = queryClient.getQueryData<IEmail[]>(['emailSelectedIdMessage', ids[0]])
      return existingData ? existingData : undefined
    },
    // Optionally use select to avoid refetching if the result hasn't changed
    select: (data) => {
      const existingData = queryClient.getQueryData<IEmail[]>(['emailSelectedIdMessage', ids[0]])
      return existingData && JSON.stringify(existingData) === JSON.stringify(data) ? existingData : data
    },
  })

  const idx = data && 0
  const valid = !isError && data && idx >= 0

  const editorContentRef = useRef<string | null>(null)

  const SendMessagerHandler = (e: React.FormEvent<HTMLFormElement>, body: string) => {
    e.preventDefault()
    const { from, threadId, to, subject } = data[idx]
    console.log(to[0].email)

    replyThread({
      from: from.email,
      to: to[0].email,
      inReplyTo,
      threadId: threadId,
      htmlContent: body,
      subject: 'RE:' + subject,
    })
  }

  return (
    <div className="email__display__inbox">
      {data && status === 'success' ? (
        <>
          <div className="email__display__inbox__wrapper">
            <div className="email__display__inbox__wrapper__top">
              <Avatar className="email__display__inbox__wrapper__top__avtar">
                <AvatarImage
                  alt={valid && data[idx].from.name}
                  src="https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/produc_imgs/Oval_3.png?t=2024-07-02T13%3A34%3A16.347Z"
                />
                <AvatarFallback>
                  {valid &&
                    data[idx].from.name
                      .split(' ')
                      .map((chunk) => chunk[0])
                      .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="email__display__inbox__wrapper__top__data">
                <div>{valid && data[idx].from.name}</div>
                <div>{valid && data[idx].subject}</div>
                <div>
                  <span className="font-medium">Reply-To:</span>
                  {valid && data[idx].from.email}
                </div>
              </div>
              {valid && data[data.length - 1].sentDate && (
                <div className="email__display__inbox__wrapper__top__date">
                  {format(new Date(valid && data[idx].sentDate), 'PPpp')}
                </div>
              )}
            </div>
          </div>
          <Separator />
        </>
      ) : status === 'error' ? null : (
        ids.length > 0 && <Skeleton className="skeleton__top"></Skeleton>
      )}

      <ScrollArea className="email__display__inbox__content">
        {data ? (
          status === 'success' ? (
            data.map((item) => (
              <EmailDisplayInboxItemMemo
                inbox={item}
                key={item.id}
                single={data.length === 1 ? true : false}
              />
            ))
          ) : (
            status === 'error' && <div className="email__display__inbox__not__found">Failed to get the msg</div>
          )
        ) : fetchStatus === 'fetching' ? (
          <Skeleton className="skeleton__content"></Skeleton>
        ) : (
          <div className="email__display__inbox__not__found">No message selected</div>
        )}
      </ScrollArea>
      <Separator className="mt-auto" />

      <div className="email__display__inbox__bottom">
        <form onSubmit={(e) => SendMessagerHandler(e, editorContentRef.current)}>
          <div>
            <NotionMinimalTextEditor
              name={valid && data[idx].from.name}
              editoRef={editorContentRef}
              onChange={() => {}}
              valid={valid}
            />
            <div>
              <Label htmlFor="mute">
                <Switch
                  id="mute"
                  aria-label="Mute thread"
                  disabled={!valid}
                />
                Mute this thread
              </Label>
              <Button
                size="sm"
                disabled={!valid}
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
