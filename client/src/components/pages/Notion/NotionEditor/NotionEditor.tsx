import { BubbleMenu, Editor, EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextStyle from '@tiptap/extension-text-style'

import { NotionEditorProps } from './NotionEditor.types'

import {
  Button,
  Popover,
  PopoverTrigger,
  ScrollArea,
  Separator,
  ToggleToolTipWrapper,
  ToolBarToggleButtons,
} from '@/components/ui'
import { cn } from '@/utils'
import { memo, useCallback, useEffect, useState } from 'react'
import { header1, Icon, turnIntoImg } from '@/assets'
import { PopoverAnchor, PopoverArrow, PopoverContent } from '@radix-ui/react-popover'
import DraggableItem from './DraggableItem'

export const NotionEditor = ({ description, onChange, className }: NotionEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      DraggableItem,
      Underline,
      // Code,
      // CodeBlock,
      // Document,
      // Text,
      // Paragraph,
      // Highlight,
      // Link,
      // TextStyle,
      // Superscript,
      // Subscript,
    ],
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
      <p>This is a boring paragraph.</p>
      <div data-type="draggable-item">
        <p>Followed by a fancy draggable item.</p>
      </div>
      <div data-type="draggable-item">
        <p>And another draggable item.</p>
        <div data-type="draggable-item">
          <p>And a nested one.</p>
          <div data-type="draggable-item">
            <p>But can we go deeper?</p>
          </div>
        </div>
      </div>
      <p>Let’s finish with a boring paragraph.</p>
    `,
  })

  if (!editor) {
    return null
  }

  return (
    <ScrollArea className={(cn('bg-green-500 grid h-[400px] mx-auto w-full'), className)}>
      <ToolbarTextMenu editor={editor} />
      <EditorContent editor={editor} />
    </ScrollArea>
  )
}

type ToolBarTextMenuProps = {
  editor: Editor
}
export const ToolbarTextMenu = ({ editor }: ToolBarTextMenuProps) => {
  // const commands = useTextmenuCommands(editor)
  // const states = useTextmenuStates(editor)
  // const blockOptions = useTextmenuContentTypes(editor)

  return (
    <BubbleMenu
      editor={editor}
      // tippyOptions={{ duration: 100 }}
      className="bubble__menu"
    >
      <div className="bubble__menu__wrapper">
        <div className="bubble__menu__wrapper__picker">
          <SelectPicker
            value={'Text'}
            onChange={() => {}}
          />
        </div>
        <Separator
          orientation="vertical"
          className="h-[26px]"
        />
        <ToolBarToggleButtons editor={editor} />
      </div>
    </BubbleMenu>
  )
}

export type SelectPickerProps = {
  onChange: (value: string) => void
  value: string
}

export const SelectPicker = ({ onChange, value }: SelectPickerProps) => {
  const currentValue = turnIntoComponent.find((size) => size.label === value)

  const selectSize = useCallback((size: string) => () => onChange(size), [onChange])

  const [valu, setValue] = useState('')

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="bubble__menu__wrapper__picker__trigger"
        value={value}
      >
        <Button
          variant="outline"
          className="flex justify-between"
        >
          {currentValue?.label} <Icon.chovrenDown className="size-[16px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bubble__menu__wrapper__picker__content"
        defaultValue={'Medium'}
      >
        <span>Turn into </span>
        <Separator className="mb-1" />
        {turnIntoComponent.map((item, idx) => (
          <Button
            key={idx}
            variant="ghost"
            className="bubble__menu__wrapper__picker__content__button"
            onClick={selectSize(item.label)}
          >
            <img
              src={item.img}
              className="w-[22px]"
            />
            <span>{item.label}</span>

            <div className="bubble__menu__wrapper__picker__content__button__hover__menu">
              <img
                src={item.discriptionImg}
                className="w-[22px]"
              />
              <span>{item.discription}</span>
            </div>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}

const turnIntoComponent = [
  {
    img: turnIntoImg.text,
    label: 'Text',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.textDesc,
  },
  {
    img: turnIntoImg.header1,
    label: 'Heading 1',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.header1Desc,
  },
  {
    img: turnIntoImg.header2,
    label: 'Heading 2',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.header2Desc,
  },
  {
    img: turnIntoImg.header3,
    label: 'Heading 2',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.header3Desc,
  },
  {
    img: turnIntoImg.page,
    label: 'Page',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.pageDesc,
  },
  {
    img: turnIntoImg.todoList,
    label: 'To-do list',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.todoDesc,
  },
  {
    img: turnIntoImg.bullitLIst,
    label: 'bulleted list',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.bulletedDesc,
  },
  {
    img: turnIntoImg.numbered,
    label: 'Numbered list',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.numberedDesc,
  },
  {
    img: turnIntoImg.toggle,
    label: 'Toggle list',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.toggleDesc,
  },
  {
    img: turnIntoImg.code,
    label: 'Code',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.codeDesc,
  },
  {
    img: turnIntoImg.quote,
    label: 'Quote',
    discription: 'Capture a code snippet',
    discriptionImg: turnIntoImg.quoteDesc,
  },
  {
    img: turnIntoImg.callout,
    label: 'Callout',
    discription: 'Make writing stand out',
    discriptionImg: turnIntoImg.callOutDesc,
  },
  {
    img: turnIntoImg.blockEquation,
    label: 'Block equation',
    discription: 'Display a standalone math equation',
    discriptionImg: turnIntoImg.mathDesc,
  },
  {
    img: turnIntoImg.headdding1Toggle,
    label: 'Toggle heading 1',
    discription: 'Hide content inside a large heading',
    discriptionImg: turnIntoImg.toggleHeadingDesc1,
  },
  {
    img: turnIntoImg.headdding2Toggle,
    label: 'Toggle heading 2',
    discription: 'Hide content inside a meduim heading',
    discriptionImg: turnIntoImg.toggleHeadingDesc2,
  },
  {
    img: turnIntoImg.headdding3Toggle,
    label: 'Toggle heading 3',
    discription: 'Hide content inside a small heading',
    discriptionImg: turnIntoImg.toggleHeadingDesc3,
  },
  {
    img: turnIntoImg.columnList,
    label: '2 columns',
    discription: 'Create 2 columns of blocks',
    discriptionImg: turnIntoImg.column2,
  },
  {
    img: turnIntoImg.columnList,
    label: '3 columns',
    discription: 'Create 3 columns of blocks',
    discriptionImg: turnIntoImg.column2,
  },
  {
    img: turnIntoImg.columnList,
    label: '4 columns',
    discription: 'Create 4 columns of blocks',
    discriptionImg: turnIntoImg.column2,
  },
  {
    img: turnIntoImg.columnList,
    label: '5 columns',
    discription: 'Create 5 columns of blocks',
    discriptionImg: turnIntoImg.column2,
  },
]

export const BubbleMenuIconsData = [
  {
    label: 'bold',
    icon: Icon.bold,
  },
  {
    label: 'italic',
    icon: Icon.italic,
  },
  {
    label: 'strike through',
    icon: Icon.strikethrough,
  },
  {
    label: 'code',
    icon: Icon.code,
  },
  {
    label: 'code block',
    icon: Icon.codeBlock,
  },
]
