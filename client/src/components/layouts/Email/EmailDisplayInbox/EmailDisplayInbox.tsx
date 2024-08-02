import { format } from 'date-fns'

import { Avatar, AvatarFallback, AvatarImage, EmailReplyBottom, ScrollArea, Separator } from '@/components/ui'

import { EmailDisplayInboxItem } from '../EmailDisplayInboxItem'
import { NotionMinimalTextEditor } from '../../Notion'
import { memo, useRef } from 'react'
import { EmailDisplayInboxProps } from './EmailDisplayInbox.types'
import { useEmailReplyThread } from '@/hooks'

const EmailDisplayInboxItemMemo = memo(EmailDisplayInboxItem)

export const EmailDisplayInbox = ({ selectedThread }: EmailDisplayInboxProps) => {
  const editorContentRef = useRef('')
  const replyToEmails = useRef<string[]>()
  const invokeReply = useEmailReplyThread()

  const valid = selectedThread.length

  return (
    <div className="email__display__inbox">
      {valid ? (
        <>
          <div className="email__display__inbox__wrapper">
            <div className="email__display__inbox__wrapper__top">
              <Avatar className="email__display__inbox__wrapper__top__avtar">
                <AvatarImage
                  alt={selectedThread[0].from.name}
                  src="https://zpgqhogoevbgpxustvmo.supabase.co/storage/v1/object/public/produc_imgs/Oval_3.png?t=2024-07-02T13%3A34%3A16.347Z"
                />
                <AvatarFallback>
                  {selectedThread[0].from.name
                    .split(' ')
                    .map((chunk) => chunk[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="email__display__inbox__wrapper__top__data">
                <div>{selectedThread[0].from.name}</div>
                <div>{selectedThread[0].subject}</div>
                <div>
                  <span className="font-medium">Reply-To: </span>
                  {selectedThread[0].from.email}
                </div>
              </div>
              {selectedThread[selectedThread.length - 1].sentDate && (
                <div className="email__display__inbox__wrapper__top__date">
                  {format(new Date(selectedThread[0].sentDate), 'PPpp')}
                </div>
              )}
            </div>
          </div>
          <Separator />
        </>
      ) : null}
      <ScrollArea className="email__display__inbox__content">
        {valid ? (
          selectedThread.map((thread) => (
            <EmailDisplayInboxItemMemo
              inbox={thread}
              key={thread.id}
              single={selectedThread.length === 1 ? true : false}
            />
          ))
        ) : (
          <div className="email__display__inbox__not__found">No message selected</div>
        )}
      </ScrollArea>
      <Separator className="mt-auto" />
      <div className="email__display__inbox__bottom">
        <form
          onSubmit={(e) =>
            invokeReply({ e, body: editorContentRef.current, emails: replyToEmails.current, selectedThread })
          }
        >
          <div>
            <NotionMinimalTextEditor
              name={valid ? selectedThread[0].from.name : 'Someone'}
              editorContentRef={editorContentRef}
              onChange={() => {}}
              valid={!valid ? false : true}
              content=""
            />
            <EmailReplyBottom
              valid={!valid ? false : true}
              replyToEmails={replyToEmails}
              selectedThread={selectedThread[0]}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
