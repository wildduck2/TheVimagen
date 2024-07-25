import { Icon } from '@/assets'
import { NotionMinimalTextEditorToolbarPick, ToggleToolTipButtonWrapper } from '../../Notion'
import { EmailInputSelect } from '../EmailInputSelect'
import { ReplyToWrapperProps } from './ReplyToWrapper.types'
import { useEffect, useState } from 'react'

export const ReplyToWrapper = ({ thread, replyToEmails }: ReplyToWrapperProps) => {
    const [emails, setEmails] = useState([thread?.from.email])

    useEffect(() => {
        replyToEmails.current = emails
    }, [emails])

    return (
        <NotionMinimalTextEditorToolbarPick
            trigger={
                <ToggleToolTipButtonWrapper
                    disabled={!thread?.threadId && true}
                    className="right-3 bottom-[4rem] z-10"
                    variant="default"
                    tip="Reply info"
                    children={<Icon.infoBadge />}
                />
            }
            content={
                <div className="flex items-center w-fit gap-2 bg-background border border-solid border-border p-2 rounded-lg">
                    <EmailInputSelect
                        emails={emails}
                        setEmails={setEmails}
                        side="top"
                    />
                </div>
            }
        />
    )
}
