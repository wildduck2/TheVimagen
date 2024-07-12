import { useTextmenuCommands } from '@/hooks'

export type NotionEditorHeadingPickerWrapperProps = {
  commands: ReturnType<typeof useTextmenuCommands>
  activeItem: string
}
