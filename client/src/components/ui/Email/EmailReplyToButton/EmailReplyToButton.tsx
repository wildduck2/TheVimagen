import { Icon } from '@/assets'
import { NotionMinimalTextEditorToolbarPick, ToggleToolTipButtonWrapper } from '../../Notion'
import { EmailInputSelect } from '../EmailInputSelect'
import { EmailReplyToButtonProps } from './EmailReplyToButton.types'
import { useEffect, useState } from 'react'

export const EmailReplyToButton = ({ thread, replyToEmails }: EmailReplyToButtonProps) => {
  const [emails, setEmails] = useState([thread?.from.email])

  useEffect(() => {
    replyToEmails.current = emails
  }, [emails])

  return (
    <div className="email__reply__to__button">
      <NotionMinimalTextEditorToolbarPick
        trigger={
          <ToggleToolTipButtonWrapper
            disabled={!thread?.threadId && true}
            variant="default"
            tip="Reply info"
            children={<Icon.infoBadge />}
          />
        }
        content={
          <div>
            <EmailInputSelect
              emails={emails}
              setEmails={setEmails}
              side="top"
            />
          </div>
        }
      />
    </div>
  )
}
