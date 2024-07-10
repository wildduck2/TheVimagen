import { Icon, IconType, turnIntoImg } from '@/assets'
import { useTextmenuCommands, useTextmenuStates } from '@/hooks'

export type TurnIntoComponentDataType = {
  action: keyof ReturnType<typeof useTextmenuCommands>
  value: keyof ReturnType<typeof useTextmenuStates>
  img: string
  label: string
  discription: string
  discriptionImg: string
}
export const turnIntoComponent: TurnIntoComponentDataType[] = [
  {
    value: 'isText',
    action: 'onText',
    img: turnIntoImg.text,
    label: 'Text',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.textDesc,
  },
  {
    value: 'isHeading1',
    action: 'onHeading1',
    img: turnIntoImg.header1,
    label: 'Heading 1',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.header1Desc,
  },
  {
    value: 'isHeading2',
    action: 'onHeading2',
    img: turnIntoImg.header2,
    label: 'Heading 2',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.header2Desc,
  },
  {
    value: 'isHeading3',
    action: 'onHeading3',
    img: turnIntoImg.header3,
    label: 'Heading 3',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.header3Desc,
  },
  // {
  //   value: 'isBold',
  //   action: 'onBold',
  //   img: turnIntoImg.page,
  //   label: 'Page',
  //   discription: 'Just start writing with plain text',
  //   discriptionImg: turnIntoImg.pageDesc,
  // },
  {
    value: 'isTaskList',
    action: 'onTaskList',
    img: turnIntoImg.todoList,
    label: 'To-do list',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.todoDesc,
  },
  {
    value: 'isBulletList',
    action: 'onBulletList',
    img: turnIntoImg.bullitLIst,
    label: 'bulleted list',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.bulletedDesc,
  },
  {
    value: 'isNumberedList',
    action: 'onNumberList',
    img: turnIntoImg.numbered,
    label: 'Numbered list',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.numberedDesc,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.toggle,
    label: 'Toggle list',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.toggleDesc,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.code,
    label: 'Code',
    discription: 'Just start writing with plain text',
    discriptionImg: turnIntoImg.codeDesc,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.quote,
    label: 'Quote',
    discription: 'Capture a code snippet',
    discriptionImg: turnIntoImg.quoteDesc,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.callout,
    label: 'Callout',
    discription: 'Make writing stand out',
    discriptionImg: turnIntoImg.callOutDesc,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.blockEquation,
    label: 'Block equation',
    discription: 'Display a standalone math equation',
    discriptionImg: turnIntoImg.mathDesc,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.headdding1Toggle,
    label: 'Toggle heading 1',
    discription: 'Hide content inside a large heading',
    discriptionImg: turnIntoImg.toggleHeadingDesc1,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.headdding2Toggle,
    label: 'Toggle heading 2',
    discription: 'Hide content inside a meduim heading',
    discriptionImg: turnIntoImg.toggleHeadingDesc2,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.headdding3Toggle,
    label: 'Toggle heading 3',
    discription: 'Hide content inside a small heading',
    discriptionImg: turnIntoImg.toggleHeadingDesc3,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.columnList,
    label: '2 columns',
    discription: 'Create 2 columns of blocks',
    discriptionImg: turnIntoImg.column2,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.columnList,
    label: '3 columns',
    discription: 'Create 3 columns of blocks',
    discriptionImg: turnIntoImg.column2,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.columnList,
    label: '4 columns',
    discription: 'Create 4 columns of blocks',
    discriptionImg: turnIntoImg.column2,
  },
  {
    value: 'isBold',
    action: 'onBold',
    img: turnIntoImg.columnList,
    label: '5 columns',
    discription: 'Create 5 columns of blocks',
    discriptionImg: turnIntoImg.column2,
  },
]

export type BubbleMenuIconsDataType = {
  label: string
  action: keyof ReturnType<typeof useTextmenuCommands>
  value: keyof ReturnType<typeof useTextmenuStates>
  icon: ({ className }: IconType) => JSX.Element
}
export const bubbleMenuIconsData: BubbleMenuIconsDataType[] = [
  {
    value: 'isBold',
    action: 'onBold',
    label: 'Bold',
    icon: Icon.bold,
  },
  {
    value: 'isItalic',
    action: 'onItalic',
    label: 'Italic',
    icon: Icon.italic,
  },
  {
    value: 'isStrike',
    action: 'onStrike',
    label: 'Strike through',
    icon: Icon.strikethrough,
  },
  {
    value: 'isCode',
    action: 'onCode',
    label: 'Code',
    icon: Icon.code,
  },
  {
    value: 'isCodeBlock',
    action: 'onCodeBlock',
    label: 'Code Block',
    icon: Icon.codeBlock,
  },
]
