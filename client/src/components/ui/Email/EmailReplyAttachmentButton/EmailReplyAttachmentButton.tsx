import { useEffect, useState } from 'react'
import { AttachmentFileWrapper } from '../AttachmentFileWrapper'
import { EmailReplyAttachmentButtonProps } from './EmailReplyAttachmentButton.types'
import { NotionMinimalTextEditorToolbarPick, ToggleToolTipButtonWrapper } from '../../Notion'
import { Icon } from '@/assets'
import { Card, CardDescription, CardHeader, CardTitle, ScrollArea } from '../../ShadCnUi'

export const EmailReplyAttachmentButton = ({ thread, files }: EmailReplyAttachmentButtonProps) => {
  // const [emails, setEmails] = useState([thread?.from.email])
  //
  // useEffect(() => {
  //   // replyToEmails.current = emails
  // }, [emails])

  console.log('files', files)

  return (
    <div className="email__reply__attachment__button">
      <NotionMinimalTextEditorToolbarPick
        trigger={
          <ToggleToolTipButtonWrapper
            disabled={!thread?.threadId && true}
            className="right-3 bottom-[4rem] z-10"
            variant="default"
            tip="Reply info"
            children={<Icon.file />}
          />
        }
        content={
          <ScrollArea className="scroll__area">
            <div className="email__reply__attachment__button__content">
              {files.map((file, idx) => (
                <Card
                  className="email__reply__attachment__button__content__card"
                  key={idx}
                >
                  <Icon.file />
                  <CardHeader>
                    <CardTitle>{'threadMessage.eml'}</CardTitle>
                    <CardDescription>{file.size}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        }
      />
    </div>
  )
}
