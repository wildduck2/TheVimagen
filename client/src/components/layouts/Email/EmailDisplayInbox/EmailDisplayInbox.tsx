import { format } from 'date-fns'

import { Avatar, AvatarFallback, AvatarImage, Button, Label, ScrollArea, Separator, Switch } from '@/components/ui'

import { EmailDisplayInboxItem } from '../EmailDisplayInboxItem'
import { NotionMinimalTextEditor } from '../../Notion'
import { memo, useRef, useState } from 'react'
import { EmailDisplayInboxProps } from './EmailDisplayInbox.types'
import { useEmailReplyThread } from '@/hooks'
import { EmailreplyContent } from '../EmailReplyMulti'

const EmailDisplayInboxItemMemo = memo(EmailDisplayInboxItem)

export const EmailDisplayInbox = ({ selectedThread }: EmailDisplayInboxProps) => {
    const editorContentRef = useRef('')
    const [editorContent, setEditorContent] = useState<EmailreplyContent>({ reply: '', editSubject: '' })
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
                    selectedThread.map((item) => (
                        <EmailDisplayInboxItemMemo
                            inbox={item}
                            key={item.id}
                            single={selectedThread.length === 1 ? true : false}
                        />
                    ))
                ) : (
                    <div className="email__display__inbox__not__found">No message selected</div>
                )}
            </ScrollArea>
            <Separator className="mt-auto" />
            <div className="email__display__inbox__bottom">
                <form onSubmit={(e) => invokeReply(e, editorContentRef.current, selectedThread)}>
                    <div>
                        <NotionMinimalTextEditor
                            name={valid ? selectedThread[0].from.name : 'Someone'}
                            editorContentRef={editorContentRef}
                            // setEditorContent={setEditorContent}
                            onChange={() => { }}
                            valid={valid ? false : true}
                            type="reply"
                            content=""
                        />
                        <div>
                            <Label htmlFor="mute">
                                <Switch
                                    id="mute"
                                    aria-label="Mute thread"
                                    disabled={valid ? false : true}
                                />
                                Mute this thread
                            </Label>
                            <Button
                                size="sm"
                                disabled={valid ? false : true}
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
