import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'

import { NotionEditorProps } from './NotionEditor.types'
import StarterKit from '@tiptap/starter-kit'
import { ScrollArea } from '@/components/ui'
import { cn } from '@/utils'
import { useEffect, useState } from 'react'

export const NotionEditor = ({ description, onChange, className }: NotionEditorProps) => {
  // const commands = useTextmenuCommands(editor)
  // const blockOptions = useTextmenuContentTypes(editor)

  const editor = useEditor({
    extensions: [StarterKit],
    // content: description,
    editorProps: {
      attributes: {
        class: cn(className, 'h-[500px] border borer-solid border-border notion'),
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    },
    content: `
      <p>
        Hey, try to select some text here. There will popup a menu for selecting some inline styles. Remember: you have full control about content and styling of this menu.
      </p>
    `,
  })

  const [isEditable, setIsEditable] = useState(true)

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])

  return (
    <ScrollArea className={(cn('bg-green-500 grid h-[400px] mx-auto w-full'), className)}>
      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
          />
          Editable
        </label>
      </div>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bubble__menu"
        >
          <div className="bubble__menu__wrapper">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              Strike
            </button>
          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </ScrollArea>
  )
}
