import { memo } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  DialogDescription,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  EmailReplyActionPick,
  EmailReplyBottom,
  Separator,
} from '@/components/ui'
import {
  EmailReplyMultiChildrenProps,
  EmailReplyMultiChildrenStatesProps,
  EmailReplyMultiProps,
} from './EmailReplyMulti.types'
import { Icon } from '@/assets'
import { NotionMinimalTextEditor } from '../../Notion'
import { useEmailReplyMultiChildrenStates, useReplyMulti } from '@/hooks'
import { EmailBuilder, ValueType } from '@ahmedayob/email-toolkit'
import { RootState } from '@/context'
import { useSelector } from 'react-redux'

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
  const {
    rawMessage,
    currentState,
    replyToEmails,
    replyToContent,
    iframeRef,
    closeThreadHandler,
    invokeReply,
    setCurrentState,
    setEditorContent,
  } = useEmailReplyMultiChildrenStates({ idx, thread, threadsLength, setState, threadsReplyContentRef })
  const { to, from, id, subject, cc } = thread

  const msg = new EmailBuilder()

  const replyStatus = useSelector((state: RootState) => state.email.replyStatus)

  msg.addMessage({
    headers: {
      From: `${from?.name} <${from?.email as ValueType}>`,
      To: `${to[0]?.name} <${to[0]?.email as ValueType}>`,
      Subject: `${replyStatus?.forward ? 'FWD' : 'RE'}: ${subject}`,
      Cc: `${cc[0]?.name} <${cc[0]?.email as ValueType}>`,
      'In-Reply-To': id,
      'Content-Transfer-Encoding': 'base64',
      'Content-Type': 'text/html',
    },
    charset: 'utf-8',
    contentType: 'text/html',
    data: 'asdfasdfasdlkasjdfklasdjf;asldkfj;',
  })

  const files = [msg.createFileWithMessage()]

  const replyFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    closeThreadHandler()

    invokeReply({
      e,
      body: threadsReplyContentRef.current[idx].content as string,
      emails: replyToEmails.current,
      selectedThread: [thread],
    })
  }

  return (
    <div>
      <div className="email__reply__multi__content__item">
        <button onClick={() => closeThreadHandler()}>
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
        <form
          className="email__reply__multi__content__item__form"
          onSubmit={replyFormSubmitHandler}
        >
          <div>
            <div className="editor">
              {currentState.label === 'Reply' ? (
                <NotionMinimalTextEditor
                  name={thread.from.email.split(' ')[0].replace(/"/g, '')}
                  content={replyToContent}
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

            <EmailReplyBottom
              files={files}
              valid={false}
              replyToEmails={replyToEmails}
              selectedThread={thread}
              showReplyIcon={false}
            />
          </div>
        </form>
      </div>
      {threadsLength > 1 && idx < threadsLength - 1 && <Separator orientation="vertical" />}
    </div>
  )
}
EmailReplyMultiChildrenStates.displayName = 'EmailReplyMultiChildrenStates'
