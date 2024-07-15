import { EditorContent, useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import ListKeymap from '@tiptap/extension-list-keymap'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'

// import Ai from '@tiptap-pro/extension-ai'

import { cn } from '@/utils'
import { ScrollArea } from '@/components/ui'
import { NotionMinimalTextEditorProps } from './NotionMinimalTextEditor.types'
import { NotionMinimalTextEditorToolbar } from './NotionMinimalTextEditorToolbar'
import StarterKit from '@tiptap/starter-kit'

export const NotionMinimalTextEditor = ({
  valid,
  name,
  editoRef,
  onChange,
  className,
}: NotionMinimalTextEditorProps) => {
  const editor = useEditor(
    {
      extensions: [
        TextStyle,
        Color.configure({
          types: ['textStyle'],
        }),
        Highlight.configure({ multicolor: true }),
        StarterKit.configure({}),
        Link.configure({
          openOnClick: true,
          autolink: true,
        }),
        Underline,
        FontFamily,
        ListKeymap,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Placeholder.configure({
          placeholder: `Reply to ${name}....`,
        }),
      ],
      editorProps: {
        attributes: {
          autocomplete: 'on',
          autocorrect: 'on',
          autocapitalize: 'on',
          class: cn(!valid && 'opacity-50 pointer-events-none', className),
        },
      },
      autofocus: true,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        editoRef.current = html
      },
    },
    [valid, name],
  )

  if (!editor) {
    return null
  }
  editoRef.current = editor.getHTML()
  // console.log(valid)

  // return <Textarea placeholder="sdfsdf" />
  return (
    <ScrollArea className={cn('notion__minimal__text__editor', valid && 'disabled')}>
      <NotionMinimalTextEditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </ScrollArea>
  )
}
