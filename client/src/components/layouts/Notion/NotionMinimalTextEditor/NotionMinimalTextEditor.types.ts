import { MutableRefObject } from 'react'

export type NotionMinimalTextEditorProps = {
  valid: boolean
  editoRef: MutableRefObject<string | null>
  name: string
  className?: string
  onChange: (html: string) => void
}
