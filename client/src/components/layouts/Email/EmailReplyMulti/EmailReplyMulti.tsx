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
import { Base64, EmailBuilder, ValueType } from '@ahmedayob/email-toolkit'
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

import { parseMail } from '@protontech/jsmimeparser'
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

  const emailParts = [
    `To: wezonaser50@gmail.com`,
    `From: wezonaser50@gmail.com`,
    `Subject: Hello mr duck`,
    'Content-Type: multipart/mixed; boundary="' + 'boundary' + '"',
    '',
    '--' + 'boundary',
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    '',
    'Hello mr duck what do you want to eat',
    '',
    '--' + 'boundary',
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: 7biy',
    'Content-Disposition: attachment; filename="message.html"',
    '',
    thread.attachments[0].attachmentId,
    '--' + 'boundary' + '--',
  ]

  // ANGjdJ - yxjHrBZlwtisRviWDcU_ - K1F1Xs90L38 - SgTPMVT9Y3UujFyzt8ud6JnLBWsjnNXrWmHJmKBi1zatJ6JkK8rePOxd - RtKe0Xv3lDOTVCCc1eNqHVcumeZ7YLrqV0rtd4snKAPyXSPh2UpXtY64o7BIRxePxo - 7VgyKnG5xTC9MJ98 - d5uyAXmZXx1TXDmw81TZZF17Gfqpq4tPgEFbVgE3pqHS7r7Q0pz72iuR5971IEqcYvLZ - U5O4YIHaX5PLgvfzI_uH4enVTfR7UuSZYxhi4kW3U1_CyFBV1lLVEpYuBNITthAniZPWGs1jX61QD2dyIQpcP1beajSjRDA5v5zUWUsrApTCJh62IuqSwCC - ORJ8q - HY5zj5M
  // ANGjdJ - yxjHrBZlwtisRviWDcU_ - K1F1Xs90L38 - SgTPMVT9Y3UujFyzt8ud6JnLBWsjnNXrWmHJmKBi1zatJ6JkK8rePOxd - RtKe0Xv3lDOTVCCc1eNqHVcumeZ7YLrqV0rtd4snKAPyXSPh2UpXtY64o7BIRxePxo - 7VgyKnG5xTC9MJ98 - d5uyAXmZXx1TXDmw81TZZF17Gfqpq4tPgEFbVgE3pqHS7r7Q0pz72iuR5971IEqcYvLZ - U5O4YIHaX5PLgvfzI_uH4enVTfR7UuSZYxhi4kW3U1_CyFBV1lLVEpYuBNITthAniZPWGs1jX61QD2dyIQpcP1beajSjRDA5v5zUWUsrApTCJh62IuqSwCC - ORJ8q - HY5zj5M

  const hi = parseMail(emailParts.join('\n'))
  const test = new TextEncoder().encode(thread.attachments[0].attachmentId)
  const his = Base64.encodeToBase64(thread.attachments[0].attachmentId)
  const hiest = Base64.decodeToBuffer(his)
  const textData = new TextDecoder('utf-8').decode(hiest)

  console.log(hi)

  // Ensure you have valid Base64 data for HTML
  const base64Data = thread.attachments[0].content

  const decodeBase64 = (base64: string): Uint8Array => {
    try {
      // Clean up the Base64 string if needed
      const cleanBase64 = base64.replace(/[^A-Za-z0-9+/=]/g, '')
      const binaryString = atob(cleanBase64)
      const bytes = new Uint8Array(binaryString.length)

      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      return bytes
    } catch (error) {
      console.error('Failed to decode Base64:', error)
      return new Uint8Array() // Return an empty array or handle the error appropriately
    }
  }

  // Decode Base64 content and create a Blob
  const bytes = decodeBase64(base64Data)
  const blob = new Blob([bytes], { type: 'text/html' })
  const url = URL.createObjectURL(blob)

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

  return <div>{url}</div>
}
EmailReplyMultiChildrenStates.displayName = 'EmailReplyMultiChildrenStates'
//     <div className="email__reply__multi__content__item">
//         <button onClick={() => closeThreadHandler()}>
//             <Icon.X />
//             </button>
//
//             <div className="email__reply__multi__content__item__header">
//                 <h3>{thread.subject}</h3>
//                     <EmailReplyActionPick
// replyToEmails={replyToEmails}
// onClick={(data) => setCurrentState(data)}
// thread={thread}
// currentState={currentState}
//     />
//         </div>
//     <Separator />
//         <form
// className="email__reply__multi__content__item__form"
// onSubmit={replyFormSubmitHandler}
// >
//     <div>
//         <div className="editor">
//             {currentState.label === 'Reply' ? (
//                 <NotionMinimalTextEditor
//                     name={thread.from.email.split(' ')[0].replace(/"/g, '')}
//                     content={replyToContent}
//                     setEditorContent={setEditorContent}
//                     valid={true}
//                     type="reply"
//                 />
//             ) : (
//                     currentState.label === 'Forward To' && (
//                         <iframe
//                             ref={iframeRef}
//                             srcDoc={`<style type="text/css">* {  scrollbar-width: thin; html{ height: fit-content;}}</style>${rawMessage}`}
//                         />
//                     )
//                 )}
//             {currentState.label === 'Edit Subject' && (
//                 <NotionMinimalTextEditor
//                     content={rawMessage}
//                     name={thread.from.email.split(' ')[0].replace(/"/g, '')}
//                     setEditorContent={setEditorContent}
//                     className="adjust"
//                     valid={true}
//                     type="editSubject"
//                 />
//             )}
//         </div>
//
//             <EmailReplyBottom
//             files={files}
//             valid={false}
//             replyToEmails={replyToEmails}
//             selectedThread={thread}
//             showReplyIcon={false}
//         />
//         </div>
//     </form>
//       </div>
//                         {threadsLength > 1 && idx < threadsLength - 1 && <Separator orientation="vertical" />}
