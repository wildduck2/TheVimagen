import { EditorContent, useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import ListKeymap from '@tiptap/extension-list-keymap'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'

// import Ai from '@tiptap-pro/extension-ai'

import { cn } from '@/utils'
import { ScrollArea, Textarea } from '@/components/ui'
import { NotionMinimalTextEditorProps } from './NotionMinimalTextEditor.types'
import { NotionMinimalTextEditorToolbar } from './NotionMinimalTextEditorToolbar'
import StarterKit from '@tiptap/starter-kit'

export const NotionMinimalTextEditor = ({ valid, name, editoRef, onChange }: NotionMinimalTextEditorProps) => {
    const editor = useEditor(
        {
            extensions: [
                Highlight.configure({ multicolor: true }),
                StarterKit.configure({}),
                Link,
                Underline,
                FontFamily,
                ListKeymap,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                Placeholder.configure({
                    placeholder: `Reply to ${name && name}....`,
                }),
            ],
            editorProps: {
                attributes: {
                    autocomplete: 'on',
                    autocorrect: 'on',
                    autocapitalize: 'on',
                    // class: cn(valid && 'opacity-50 pointer-events-none'),
                },
            },
            autofocus: true,
            onUpdate: ({ editor }) => {
                const html = editor.getHTML()
                onChange?.(html)
            },
            content: 'hi mr wild_duck',
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