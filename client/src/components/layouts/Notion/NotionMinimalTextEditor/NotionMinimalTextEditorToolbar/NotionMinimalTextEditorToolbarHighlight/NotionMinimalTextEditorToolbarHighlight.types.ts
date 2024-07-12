import { useTextmenuCommands } from "@/hooks"

export type NotionMinimalTextEditorToolbarHighlightType = {
    activeItem: string
    currentHighlight: boolean 
    tip:string
  commands: ReturnType<typeof useTextmenuCommands>
}
