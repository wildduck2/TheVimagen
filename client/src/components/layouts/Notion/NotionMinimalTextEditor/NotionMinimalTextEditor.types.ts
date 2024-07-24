import { EmailreplyContent } from '../../Email'

export type NotionMinimalTextEditorProps = {
    valid: boolean
    name: string
    className?: string
    content?: string
    type?: string
    setEditorContent?: React.Dispatch<React.SetStateAction<EmailreplyContent>>
    editorContentRef?: React.MutableRefObject<string>
    onChange?: (html: string) => void
}
