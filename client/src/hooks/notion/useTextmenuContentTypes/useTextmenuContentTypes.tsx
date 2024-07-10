import { Editor } from '@tiptap/react'
import { useMemo } from 'react'

export const useTextmenuContentTypes = (editor: Editor) => {
  const chainOnFocus = () => editor.chain().focus()

  //FIX: <ContentPickerOptions>
  const options = useMemo(() => {
    return [
      {
        type: 'category',
        label: 'Hierarchy',
        id: 'hierarchy',
      },
      {
        icon: 'Pilcrow',
        onClick: () => chainOnFocus().lift('taskItem').liftListItem('listItem').setParagraph().run(),
        id: 'paragraph',
        disabled: () => !editor.can().setParagraph(),
        isActive: () =>
          editor.isActive('paragraph') &&
          !editor.isActive('orderedList') &&
          !editor.isActive('bulletList') &&
          !editor.isActive('taskList'),
        label: 'Paragraph',
        type: 'option',
      },
      {
        icon: 'Heading1',
        onClick: () => chainOnFocus().lift('taskItem').liftListItem('listItem').setHeading({ level: 1 }).run(),
        id: 'heading1',
        disabled: () => !editor.can().setHeading({ level: 1 }),
        isActive: () => editor.isActive('heading', { level: 1 }),
        label: 'Heading 1',
        type: 'option',
      },
      {
        icon: 'Heading2',
        onClick: () => chainOnFocus().lift('taskItem').liftListItem('listItem').setHeading({ level: 2 }).run(),
        id: 'heading2',
        disabled: () => !editor.can().setHeading({ level: 2 }),
        isActive: () => editor.isActive('heading', { level: 2 }),
        label: 'Heading 2',
        type: 'option',
      },
      {
        icon: 'Heading3',
        onClick: () => chainOnFocus().lift('taskItem').liftListItem('listItem').setHeading({ level: 3 }).run(),
        id: 'heading3',
        disabled: () => !editor.can().setHeading({ level: 3 }),
        isActive: () => editor.isActive('heading', { level: 3 }),
        label: 'Heading 3',
        type: 'option',
      },
      {
        type: 'category',
        label: 'Lists',
        id: 'lists',
      },
      {
        icon: 'List',
        onClick: () => chainOnFocus().toggleBulletList().run(),
        id: 'bulletList',
        disabled: () => !editor.can().toggleBulletList(),
        isActive: () => editor.isActive('bulletList'),
        label: 'Bullet list',
        type: 'option',
      },
      {
        icon: 'ListOrdered',
        onClick: () => chainOnFocus().toggleOrderedList().run(),
        id: 'orderedList',
        disabled: () => !editor.can().toggleOrderedList(),
        isActive: () => editor.isActive('orderedList'),
        label: 'Numbered list',
        type: 'option',
      },
      {
        icon: 'ListTodo',
        onClick: () => chainOnFocus().toggleTaskList().run(),
        id: 'todoList',
        disabled: () => !editor.can().toggleTaskList(),
        isActive: () => editor.isActive('taskList'),
        label: 'Todo list',
        type: 'option',
      },
    ]
  }, [editor, editor.state])

  return options
}
