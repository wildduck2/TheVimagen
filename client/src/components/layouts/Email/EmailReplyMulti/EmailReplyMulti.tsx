import React from 'react'
import { useCallback, useRef, useState, memo } from 'react'
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

const EmailReplyMultiChildren = memo(({ threads, trigger }: EmailReplyMultiChildrenProps) => {
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
                thread={thread}
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

const EmailReplyMultiChildrenStates = ({ thread, threadsLength, idx }: EmailReplyMultiChildrenStatesProps) => {
  const [currentState, setCurrentState] = useState<{ label: string; icon: ({ className }: IconType) => JSX.Element }>({
    label: 'Reply',
    icon: Icon.reply,
  })
  const editorContentRef = useRef<string | null>(null)
  const sanitizedContent = sanitizeEmailContent(thread.textHtml.replace(/<a /g, '<a target="_blank" '))

  const rawMessage = [
    `<div contenteditable="true" style="outline: none">`,
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
  ].join('')
  const tiptapContent = convertHTMLToTiptapContent(thread.textHtml)
  console.log(JSON.stringify(tiptapContent, null, 2))

  return (
    <React.Fragment>
      <div className="email__reply__multi__content__item">
        <Icon.X />
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
              {
                <iframe
                  srcDoc={`<style>* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${rawMessage}`}
                />
                // <NotionMinimalTextEditor
                //   content={`
                //     <iframe
                //       srcDoc={<style>* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${rawMessage}}/>`}
                //   name={thread.from.email.split(' ')[0].replace(/"/g, '')}
                //   editoRef={editorContentRef}
                //   onChange={() => {}}
                //   valid={true}
                // />
              }
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

import { Node, mergeAttributes } from '@tiptap/core'

export const StyleNode = Node.create({
  name: 'style',

  group: 'block',

  content: 'text*',

  parseHTML() {
    return [
      {
        tag: 'style',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['style', mergeAttributes(HTMLAttributes), 0]
  },

  addAttributes() {
    return {
      style: {
        default: '',
        parseHTML: (element) => element.getAttribute('style'),
        renderHTML: (attributes) => {
          return { style: attributes.style }
        },
      },
    }
  },
})

import { parse } from 'parse5'

import { Parser } from 'htmlparser2'
import { format } from 'date-fns'

interface TiptapNode {
  type: string
  attrs?: Record<string, any>
  content?: TiptapNode[]
  text?: string
}

const convertHTMLToTiptapContent = (html: string): TiptapNode[] => {
  const root: TiptapNode = { type: 'doc', content: [] }
  let current: TiptapNode = root
  const stack: TiptapNode[] = []
  let styles: Record<string, string> = {}

  const parser = new Parser(
    {
      onopentag(name, attrs) {
        if (name === 'style') {
          current = { type: 'style', content: [] }
          stack.push(root)
          root.content!.push(current)
        } else {
          const node: TiptapNode = { type: name, attrs, content: [] }
          if (current.content) {
            current.content.push(node)
          }
          stack.push(current)
          current = node
        }
      },
      ontext(text) {
        if (current.type === 'style') {
          styles = parseCSS(text)
        } else {
          if (current.content) {
            current.content.push({ type: 'text', text })
          }
        }
      },
      onclosetag(name) {
        if (name === 'style') {
          current = stack.pop()!
        } else {
          current = stack.pop()!
        }
      },
      onerror(error) {
        console.error('Parser error:', error)
      },
    },
    { decodeEntities: true },
  )

  try {
    parser.write(html)
    parser.end()
  } catch (error) {
    console.error('Parsing error:', error)
  }

  applyStyles(root, styles)

  return root.content || []
}

const parseCSS = (cssText: string): Record<string, string> => {
  const styleObject: Record<string, string> = {}
  const rules = cssText.split('}')
  rules.forEach((rule) => {
    const [selector, style] = rule.split('{')
    if (selector && style) {
      styleObject[selector.trim()] = style.trim()
    }
  })
  return styleObject
}

const applyStyles = (node: TiptapNode, styles: Record<string, string>) => {
  if (node.attrs && node.attrs.style) {
    const style = styles[node.attrs.style] || ''
    node.attrs.style = style
  }
  if (node.content) {
    node.content.forEach((child) => applyStyles(child, styles))
  }
}

export default convertHTMLToTiptapContent
