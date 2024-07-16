import React from 'react'
import { useCallback, useRef, useState, memo } from 'react'
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
  EmailReplyMultiChildrenProps,
  EmailReplyMultiChildrenStatesProps,
  EmailReplyMultiProps,
} from './EmailReplyMulti.types'
import { Icon, IconType } from '@/assets'
import { NotionMinimalTextEditor } from '../../Notion'
import { sanitizeEmailContent } from '@/utils'
import { useDispatch } from 'react-redux'
import { removeSelectedThreadsDispatch } from '@/context'

export const EmailReplyMulti = ({ trigger, threads }: EmailReplyMultiProps) => {
  const [state, setState] = useState<{ drawer: boolean; alert: boolean }>({ alert: false, drawer: false })

  const handleAlertCancel = useCallback(() => {
    setState((prevState) => ({ ...prevState, alert: false, drawer: true }))
  }, [])

  const handleAlertContinue = useCallback(() => {
    setState((prevState) => ({ ...prevState, alert: false, drawer: false }))
    //NOTE: will do the draft actions
    //NOTE: show the popup on the side to notify that there's some messages are drafted if you
    //wanna back to them and continue
  }, [])

  const handleDrawerOpenChange = useCallback(
    (drawerState: boolean) => {
      setState((prevState) => ({
        alert: threads.length > 0 && !drawerState ? true : prevState.alert,
        drawer: drawerState,
      }))
    },
    [threads.length],
  )

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
          />
        </Drawer>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
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

const EmailReplyMultiChildren = memo(({ threads, trigger, setState }: EmailReplyMultiChildrenProps) => {
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
            {threads.map((thread, idx) => (
              <EmailReplyMultiChildrenStates
                key={idx}
                thread={thread}
                setState={setState}
                threadsLength={threads.length}
                idx={idx}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DrawerContent>
    </>
  )
})
EmailReplyMultiChildren.displayName = 'EmailReplyMultiChildren'

const EmailReplyMultiChildrenStates = ({
  thread,
  threadsLength,
  setState,
  idx,
}: EmailReplyMultiChildrenStatesProps) => {
  const dispatch = useDispatch()
  const [currentState, setCurrentState] = useState<{ label: string; icon: ({ className }: IconType) => JSX.Element }>({
    label: 'Reply',
    icon: Icon.reply,
  })
  const editorContentRef = useRef<string | null>(null)
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
    `</div>`,
    `<div style="margin: 1rem">`,
    `---------------------------------`,
    `<p>This email was sent from ${thread.from.name} by <a style="color: blue" href="https://the-vimagen.com" target="_blank">TheVimagen</a> app</p>`,
    `---------------------------------`,
    `</div>`,
  ].join('')

  return (
    <React.Fragment>
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
                  editoRef={editorContentRef}
                  valid={true}
                />
              ) : (
                currentState.label === 'Forward To' && (
                  <iframe
                    srcDoc={`<style>* {  scrollbar-width: thin; html{ height: fit-content;}}</style>${rawMessage}`}
                  />
                )
              )}
              {currentState.label === 'Edit Subject' && (
                <NotionMinimalTextEditor
                  content={rawMessage}
                  name={thread.from.email.split(' ')[0].replace(/"/g, '')}
                  editoRef={editorContentRef}
                  className="adjust"
                  valid={true}
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
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
      {threadsLength > 1 && idx < threadsLength - 1 && <Separator orientation="vertical" />}
    </React.Fragment>
  )
}
EmailReplyMultiChildrenStates.displayName = 'EmailReplyMultiChildrenStates'
