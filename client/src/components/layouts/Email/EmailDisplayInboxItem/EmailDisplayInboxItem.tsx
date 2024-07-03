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
  //NOTE: removing the sepcial cahrs
  // const emailText = inbox && inbox.textHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1]

  const emailText = inbox && inbox.textHtml.replace(`<[^>]+?>([^<]*)</[^>]+?>|([^<]*)/g`, '$1 $2'.replace(/\s+/g, ' '))

  //NOTE: DO NOTE REMOVE THIS <iframe srcDoc={`<style>* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${emailText}`} />
  return (
    <Accordion type="single" collapsible className="email__display__inbox__item">
      <AccordionItem value="open">
        {!single ? (
          <>
            <AccordionTriggerWithoutChovernDown className="email__display__inbox__item__trigger">
              <div>
                <div>{inbox.from.name}</div>
                <div>{inbox.subject}</div>
              </div>
              <div>{format(new Date(inbox.sentDate), 'PPpp')}</div>
            </AccordionTriggerWithoutChovernDown>
            <AccordionContent data-state={open}>
              <Separator className="sperator" />

              <div dangerouslySetInnerHTML={{ __html: emailText! }} />
            </AccordionContent>
          </>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: emailText! }} />
        )}
      </AccordionItem>
    </Accordion>
  )
}

// <iframe srcDoc={`<style>* {  scrollbar-width: thin; html{ height: fit-content; }}</style>${emailText}`} />
// <div dangerouslySetInnerHTML={{ __html: emailText! }} />
//
