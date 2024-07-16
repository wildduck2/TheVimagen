import { useRef, useState } from 'react'
import {
  Badge,
  Button,
  EmailinputSelectProps,
  EmailProfile,
  Input,
  NotionMinimalTextEditorToolbarPick,
  ToggleToolTipButtonWrapper,
} from '@/components/ui'
import { Icon } from '@/assets'
import { handleAddEmailSubmit, handleRemoveEmail } from '@/utils'

export const EmailInputSelect = ({ email }: EmailinputSelectProps) => {
  const [emails, setEmails] = useState([email])

  const emailRef = useRef<HTMLInputElement>(null)

  return (
    <div className="email__input__container">
      <div className="email__input__container__badges">
        {emails.map((email, idx) => (
          <EmailProfile
            key={idx}
            profileImg="https://d2fltix0v2e0sb.cloudfront.net/dev-black.png"
            replyTo={email}
            trigger={
              <Badge
                key={idx}
                className="email__input__container__badges__badge"
              >
                <span>{email}</span>
                <Icon.X onClick={() => handleRemoveEmail({ emails, idx, setEmails })} />
              </Badge>
            }
          />
        ))}
      </div>
      <NotionMinimalTextEditorToolbarPick
        trigger={
          <ToggleToolTipButtonWrapper
            tip={'Add Email'}
            children={<Icon.plusCircle />}
          />
        }
        content={
          <div className="email__input__container__add__email__content">
            <div className="email__input__container__add__email__content__header">
              <h4>Add Email to reply to</h4>
              <p>Set the dimensions for the layer.</p>
            </div>
            <div className="email__input__container__add__email__content__footer">
              <form
                onSubmit={(e) => handleAddEmailSubmit({ e, email: emailRef.current.value.trim(), emails, setEmails })}
              >
                <Input ref={emailRef} />
                <Button
                  variant="outline"
                  type="submit"
                  children={'Apply'}
                />
              </form>
            </div>
          </div>
        }
      />
    </div>
  )
}
