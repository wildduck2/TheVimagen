import { useEffect } from 'react'
import { useRef, useState, memo } from 'react'
import { format } from 'date-fns'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    Button,
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
    currentStateType,
    DialogDescription,
    DialogTitle,
    Drawer,
    DrawerContent,
    DrawerTrigger,
    EmailReplyActionPick,
    Label,
    Separator,
    Switch,
} from '@/components/ui'
import {
    EmailreplyContent,
    EmailReplyMultiChildrenProps,
    EmailReplyMultiChildrenStatesProps,
    EmailReplyMultiProps,
} from './EmailReplyMulti.types'
import { Icon } from '@/assets'
import { NotionMinimalTextEditor } from '../../Notion'
import { useDispatch } from 'react-redux'
import { removeSelectedThreadsDispatch } from '@/context'
import { useEmailReplyThread, useReplyMulti } from '@/hooks'
import { sanitizeEmailContent } from '@/utils'

export const EmailReplyMulti = ({ trigger, threads }: EmailReplyMultiProps) => {
    const { handleAlertCancel, handleAlertContinue, handleDrawerOpenChange, setState, state, threadsReplyContentRef } =
        useReplyMulti({ threads })

    return (
        <>
            <AlertDialog open={state.alert}>
                <Drawer
                    open={state.drawer}
                    onOpenChange={handleDrawerOpenChange}
                >
                    <EmailReplyMultiChildren
                        threads={threads}
                        trigger={trigger}
                        setState={setState}
                        threadsReplyContentRef={threadsReplyContentRef}
                    />
                </Drawer>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will consider these replies as Drafts, you can delete, adjust and send from Drafts section on
                            the side header.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleAlertCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAlertContinue}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
EmailReplyMulti.displayName = 'EmailReplyMulti'

const EmailReplyMultiChildren = memo(
    ({ threads, trigger, setState, threadsReplyContentRef }: EmailReplyMultiChildrenProps) => {
        return (
            <>
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
                <DrawerContent>
                    <Carousel
                        opts={{ align: 'end' }}
                        className="w-full email__reply__multi"
                    >
                        <CarouselContent className="email__reply__multi__content m-0">
                            <DialogTitle />
                            <DialogDescription />
                            {threads.map((thread, idx) => {
                                return (
                                    <EmailReplyMultiChildrenStates
                                        key={idx}
                                        idx={idx}
                                        thread={thread}
                                        setState={setState}
                                        threadsLength={threads.length}
                                        threadsReplyContentRef={threadsReplyContentRef}
                                    />
                                )
                            })}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </DrawerContent>
            </>
        )
    },
)
EmailReplyMultiChildren.displayName = 'EmailReplyMultiChildren'

const EmailReplyMultiChildrenStates = ({
    idx,
    thread,
    threadsLength,
    setState,
    threadsReplyContentRef,
}: EmailReplyMultiChildrenStatesProps) => {
    const dispatch = useDispatch()
    const [currentState, setCurrentState] = useState<currentStateType>({
        label: 'Reply',
        icon: Icon.reply,
    })
    const [editorContent, setEditorContent] = useState<EmailreplyContent>({ reply: '', editSubject: '' })
    const iframeRef = useRef<HTMLIFrameElement | null>(null)
    const replyToEmails = useRef<string[]>()

    const sanitizedContent = sanitizeEmailContent(thread.textHtml.replace(/<a /g, '<a target="_blank" '))

    const rawMessage = [
        `<div contenteditable="true" style="outline: none;">`,
        `<div style="margin: 1rem">`,
        `---------------------------------`,
        `<p>From: ${thread.from.email}</p>`,
        `<p>Date: ${format(new Date(thread.sentDate), 'PPpp')}</p>`,
        `<p>Subject: ${thread.subject}</p>`,
        `<p>To: ${thread.to[0].email}</p>`,
        `---------------------------------`,
        `</div>`,
        sanitizedContent,
    ].join('')

    useEffect(() => {
        const currentContent =
            currentState.label === 'Forward To'
                ? iframeRef.current?.srcdoc
                : currentState.label === 'Reply'
                    ? editorContent.reply
                    : editorContent.editSubject

        const replyContent = {
            thread: thread,
            emails: replyToEmails.current,
            content: currentContent,
        }

        const index = threadsReplyContentRef.current.findIndex((item) => item.thread.threadId === thread.threadId)

        if (index !== -1) {
            threadsReplyContentRef.current[index] = replyContent
        } else {
            threadsReplyContentRef.current.push(replyContent)
        }
    }, [currentState.label, editorContent])

    const invokeReply = useEmailReplyThread()

    return (
        <div>
            <div className="email__reply__multi__content__item">
                <button
                    onClick={() => {
                        dispatch(removeSelectedThreadsDispatch([thread]))
                        threadsLength === 1 && setState((prevState) => ({ ...prevState, drawer: false }))
                    }}
                >
                    <Icon.X />
                </button>

                <div className="email__reply__multi__content__item__header">
                    <h3>{thread.subject}</h3>
                    <EmailReplyActionPick
                        replyToEmails={replyToEmails}
                        onClick={(data) => setCurrentState(data)}
                        thread={thread}
                        currentState={currentState}
                    />
                </div>
                <Separator />
                <form className="email__reply__multi__content__item__form">
                    <div>
                        <div className="editor">
                            {currentState.label === 'Reply' ? (
                                <NotionMinimalTextEditor
                                    name={thread.from.email.split(' ')[0].replace(/"/g, '')}
                                    setEditorContent={setEditorContent}
                                    valid={true}
                                    type="reply"
                                />
                            ) : (
                                currentState.label === 'Forward To' && (
                                    <iframe
                                        ref={iframeRef}
                                        srcDoc={`<style type="text/css">* {  scrollbar-width: thin; html{ height: fit-content;}}</style>${rawMessage}`}
                                    />
                                )
                            )}
                            {currentState.label === 'Edit Subject' && (
                                <NotionMinimalTextEditor
                                    content={rawMessage}
                                    name={thread.from.email.split(' ')[0].replace(/"/g, '')}
                                    setEditorContent={setEditorContent}
                                    className="adjust"
                                    valid={true}
                                    type="editSubject"
                                />
                            )}
                        </div>
                        <div>
                            <Label htmlFor="mute">
                                <Switch
                                    id="mute"
                                    aria-label="Mute thread"
                                    disabled={false}
                                />
                                Mute this thread
                            </Label>
                            <Button
                                size="sm"
                                disabled={false}
                                onClick={(e) =>
                                    invokeReply(
                                        e,
                                        currentState.label === 'reply' ? editorContent.reply : editorContent.editSubject,
                                        replyToEmails.current,
                                        [thread],
                                    )
                                }
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            {threadsLength > 1 && idx < threadsLength - 1 && <Separator orientation="vertical" />}
        </div>
    )
}
EmailReplyMultiChildrenStates.displayName = 'EmailReplyMultiChildrenStates'
