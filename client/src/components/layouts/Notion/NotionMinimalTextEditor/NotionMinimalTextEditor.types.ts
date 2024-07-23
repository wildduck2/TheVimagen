import { EmailreplyContent } from '../../Email'

export type NotionMinimalTextEditorProps = {
  valid: boolean
  editoRef: React.MutableRefObject<EmailreplyContent>
  name: string
  className?: string
  onChange?: (html: string) => void
  content?: string
  type?: string
}
