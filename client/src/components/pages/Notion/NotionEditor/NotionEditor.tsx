import { BubbleMenu, Editor, EditorContent, useEditor } from '@tiptap/react'

import { NotionEditorProps } from './NotionEditor.types'
import StarterKit from '@tiptap/starter-kit'
import {
  Button,
  Popover,
  PopoverTrigger,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  ToggleToolTipWrapper,
} from '@/components/ui'
import { cn } from '@/utils'
import { memo, useCallback, useEffect, useState } from 'react'
import { header1, Icon, turnIntoImg } from '@/assets'
import { PopoverAnchor, PopoverArrow, PopoverContent } from '@radix-ui/react-popover'

export const NotionEditor = ({ description, onChange, className }: NotionEditorProps) => {
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

  // const [isEditable, setIsEditable] = useState(true)
  //
  // useEffect(() => {
  //     if (editor) {
  //         editor.setEditable(isEditable)
  //     }
  // }, [isEditable, editor])

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
        <div className="bubble__menu__wrapper__icons">
          <ToggleToolTipWrapper
            tip="Bold"
            children={<Icon.bold />}
          />
          <ToggleToolTipWrapper
            tip="Italic"
            children={<Icon.italic />}
          />
          <ToggleToolTipWrapper
            tip="Underline"
            children={<Icon.underLine />}
          />
          <ToggleToolTipWrapper
            tip="Strikethrough"
            children={<Icon.strikethrough />}
          />
          <ToggleToolTipWrapper
            tip="Code"
            children={<Icon.code />}
          />
          <ToggleToolTipWrapper
            tip="Block Code"
            children={<Icon.codeBlock />}
          />
        </div>
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
        {turnIntoComponent.map((item) => (
          <Button
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
                src={item.img}
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
  },
  {
    img: turnIntoImg.header1,
    label: 'Heading 1',
    discription: 'Just start writing with plain text',
  },
  {
    img: turnIntoImg.header2,
    label: 'Heading 2',
    discription: 'Just start writing with plain text',
  },
  {
    img: turnIntoImg.header3,
    label: 'Heading 2',
    discription: 'Just start writing with plain text',
  },
  {
    img: turnIntoImg.page,
    label: 'Page',
    discription: 'Just start writing with plain text',
  },
  {
    img: turnIntoImg.todoList,
    label: 'To-do list',
    discription: 'Just start writing with plain text',
  },
  {
    img: turnIntoImg.bullitLIst,
    label: 'bulleted list',
    discription: 'Just start writing with plain text',
  },
  {
    img: turnIntoImg.numbered,
    label: 'Numbered list',
    discription: 'Just start writing with plain text',
  },
  {
    img: turnIntoImg.toggle,
    label: 'Toggle list',
    discription: 'Just start writing with plain text',
  },
  {
    img: turnIntoImg.code,
    label: 'Code',
    discription: 'Just start writing with plain text',
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
