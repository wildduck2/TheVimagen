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

export const EmailInputSelect = ({ emails, setEmails, side }: EmailinputSelectProps) => {
  const emailRef = useRef<HTMLInputElement>(null)

  return (
    <div className="email__input__container">
      <div className="email__input__container__badges">
        <ScrollArea>
          <div className="wrapper">
            {emails.map((email, idx) => (
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
                      <span onClick={() => handleRemoveEmail({ emails, idx, setEmails })}>
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
                    onClick={() => handleAddEmailSubmit({ emailRef, emails, setEmails })}
                    variant="default"
                    type="submit"
                    children={'Apply'}
                  />
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}
