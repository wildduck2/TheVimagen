import { useRef } from 'react'
import {
  Badge,
  Button,
  EmailinputSelectProps,
  EmailProfile,
  Input,
  NotionMinimalTextEditorToolbarPick,
  ScrollArea,
  ScrollBar,
  ToggleToolTipSpanWrapper,
} from '@/components/ui'
import { Icon } from '@/assets'
import { handleAddEmailSubmit, handleRemoveEmail } from '@/utils'
import { useSelector } from 'react-redux'
import { RootState } from '@/context'

export const EmailInputSelect = ({ emails, setEmails, side }: EmailinputSelectProps) => {
  const replyStatus = useSelector((state: RootState) => state.email.replyStatus)
  const emailRef = useRef<HTMLInputElement>(null)
  const emailFiltered = emails.filter((email, idx) => {
    if (!replyStatus.forward === false) {
      if (idx !== 0) {
        return email
      }
    } else {
      return email
    }
  })

  return (
    <div className="email__input__container">
      <div className="email__input__container__badges">
        <ScrollArea>
          <div className="wrapper">
            {emailFiltered.map((email, idx) => (
              <EmailProfile
                side={side || 'bottom'}
                key={idx}
                profileImg={`https://media.licdn.com/dms/image/D4D35AQFbs9IQpr4dXA/profile-framedphoto-shrink_200_200/0/1721143221804?e=1722495600&v=beta&t=ApbPFkhj132Fcx9F735oP2WxbaGuLQrCIBSGVVyRtJY`}
                replyTo={email}
                trigger={
                  <Badge
                    key={idx}
                    className="email__input__container__badges__badge"
                  >
                    <span>{email}</span>
                    {idx ? (
                      <span onClick={() => handleRemoveEmail({ emails: emailFiltered, idx, setEmails })}>
                        <Icon.X />
                      </span>
                    ) : null}
                  </Badge>
                }
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <NotionMinimalTextEditorToolbarPick
          trigger={
            <ToggleToolTipSpanWrapper
              tip={'Add Email'}
              children={<Icon.plus />}
            />
          }
          content={
            <div className="email__input__container__add__email__content">
              <div className="email__input__container__add__email__content__header">
                <h4>Add Email to reply to</h4>
                <p>Set the dimensions for the layer.</p>
              </div>
              <div className="email__input__container__add__email__content__footer">
                <div>
                  <Input
                    ref={emailRef}
                    placeholder="Enter valid email..."
                  />
                  <Button
                    onClick={() => handleAddEmailSubmit({ emailRef, emails: emailFiltered, setEmails })}
                    variant="default"
                    type="submit"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}
