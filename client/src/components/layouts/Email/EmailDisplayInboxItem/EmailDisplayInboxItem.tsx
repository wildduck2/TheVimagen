import { format } from 'date-fns'
import { EmailDisplayInboxItemType } from './EmailDisplayInboxItem.types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerWithoutChovernDown,
  Separator,
} from '@/components/ui'
import { sanitizeEmailContent } from '@/utils'

export const EmailDisplayInboxItem = ({ inbox, single }: EmailDisplayInboxItemType) => {
  const sanitizedContent = sanitizeEmailContent(inbox ? inbox.textHtml.replace(/<a /g, '<a target="_blank" ') : '')

  return !single ? (
    <Accordion
      type="single"
      collapsible
      className="email__display__inbox__item"
    >
      <AccordionItem value="open">
        <AccordionTriggerWithoutChovernDown className="email__display__inbox__item__trigger">
          <div>
            <div>{inbox.from.name}</div>
            <div>{inbox.subject}</div>
          </div>
          <div>{format(new Date(inbox.sentDate), 'PPpp')}</div>
        </AccordionTriggerWithoutChovernDown>
        <AccordionContent data-state={open}>
          <Separator className="sperator" />

          <iframe
            srcDoc={`<style type="text/css">* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${sanitizedContent}`}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <iframe
      srcDoc={`<style type="text/css">* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${sanitizedContent}`}
    />
  )
}

//NOTE: DO NOTE REMOVE THIS <iframe srcDoc={`<style>* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${emailText}`} />
// <div dangerouslySetInnerHTML={{ __html: sanitizedContent! }} />
// <iframe srcDoc={`<style>* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${emailText}`} />
// <div dangerouslySetInnerHTML={{ __html: emailText! }} />
