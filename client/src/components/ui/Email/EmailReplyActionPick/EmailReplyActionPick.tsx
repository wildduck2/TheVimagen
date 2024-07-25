import { Icon } from '@/assets'
import {
    Button,
    EmailInputSelect,
    NotionMinimalTextEditorToolbarPick,
    ToggleToolTipButtonWrapper,
} from '@/components/ui'
import { emailReplyButtonOptions } from '@/constants/Email/MailData'
import { cn } from '@/utils'
import { EmailReplyActionPickProps } from './EmailReplyActionPick.types'
import { useEffect, useState } from 'react'

export const EmailReplyActionPick = ({ thread, currentState, replyToEmails, onClick }: EmailReplyActionPickProps) => {
    const [emails, setEmails] = useState([thread?.from.email])

    useEffect(() => {
        replyToEmails.current = emails
    }, [emails])

    return (
        <>
            <div>
                <NotionMinimalTextEditorToolbarPick
                    trigger={
                        <ToggleToolTipButtonWrapper
                            variant="outline"
                            tip={currentState.label}
                            children={
                                <>
                                    <currentState.icon />
                                    <Icon.chovrenDown />
                                </>
                            }
                        />
                    }
                    content={
                        <>
                            {emailReplyButtonOptions.map((item, idx) => (
                                <Button
                                    key={idx}
                                    variant="ghost"
                                    className={cn(
                                        'notion__minimal__text__editor__toolbar__pick__content__button',
                                        item.label === currentState.label && 'active',
                                    )}
                                    onClick={() => onClick({ label: item.label, icon: item.icon })}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                </Button>
                            ))}
                        </>
                    }
                />
                <EmailInputSelect
                    emails={emails}
                    setEmails={setEmails}
                />
            </div>
        </>
    )
}
