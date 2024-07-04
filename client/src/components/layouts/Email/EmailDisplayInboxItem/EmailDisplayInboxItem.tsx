import { format } from 'date-fns'
import { EmailDisplayInboxItemType } from './EmailDisplayInboxItem.types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerWithoutChovernDown,
  Separator,
} from '@/components/ui'

export const EmailDisplayInboxItem = ({ inbox, single }: EmailDisplayInboxItemType) => {
  const emailText = inbox && inbox.textHtml

  return !single ? (
    <Accordion type="single" collapsible className="email__display__inbox__item">
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

          <iframe srcDoc={`<style>* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${emailText}`} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    <iframe srcDoc={`<style>* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${emailText}`} />
  )
}

// <div dangerouslySetInnerHTML={{ __html: emailText! }} />
//NOTE: DO NOTE REMOVE THIS <iframe srcDoc={`<style>* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${emailText}`} />
// <iframe srcDoc={`<style>* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${emailText}`} />
// <div dangerouslySetInnerHTML={{ __html: emailText! }} />
