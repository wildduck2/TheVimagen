/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditorContent, useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import ListKeymap from '@tiptap/extension-list-keymap'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'

// import Ai from '@tiptap-pro/extension-ai'

import { cn } from '@/utils'
import { ScrollArea } from '@/components/ui'
import { NotionMinimalTextEditorProps } from './NotionMinimalTextEditor.types'
import { NotionMinimalTextEditorToolbar } from './NotionMinimalTextEditorToolbar'
import StarterKit from '@tiptap/starter-kit'
import { useDebounceCallback } from '@/hooks'
import { useEffect } from 'react'

export const NotionMinimalTextEditor = ({
  valid,
  name,
  className,
  content,
  type,
  editorContentRef,
  setEditorContent,
  onChange,
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
        Image,
      ],
      editorProps: {
        attributes: {
          autocomplete: 'on',
          autocorrect: 'on',
          autocapitalize: 'on',
          class: cn(!valid && 'opacity-50 pointer-events-none', className),
        },
      },
      content,
      autofocus: true,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        editorContentRef && (editorContentRef.current = html)
      },
    },
    [valid, name],
  )
  const updateEditorContent = useDebounceCallback((html: string) => {
    const content = { reply: type === 'reply' && html, editSubject: type !== 'reply' && html }
    return setEditorContent && setEditorContent(content)
  }, 300)

  useEffect(() => {
    if (editor) {
      updateEditorContent(content)
    }
  }, [])

  useEffect(() => {
    if (editor) {
      editor.on('update', ({ editor }) => {
        const html = editor.getHTML()
        updateEditorContent(html)
      })
    }
  }, [editor, type, updateEditorContent])

  if (!editor) {
    return null
  }

  return (
    <ScrollArea className={cn('notion__minimal__text__editor', valid && 'disabled')}>
      <NotionMinimalTextEditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </ScrollArea>
  )
}
