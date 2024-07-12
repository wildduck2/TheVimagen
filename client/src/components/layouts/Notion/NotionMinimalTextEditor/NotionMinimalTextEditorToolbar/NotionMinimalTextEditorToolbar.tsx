import { memo, useMemo } from 'react'
import { BubbleMenu } from '@tiptap/react'

import { Separator, ToolBarToggleButtons } from '@/components/ui'
import { useTextmenuCommands, useTextmenuContentTypes, useTextmenuStates } from '@/hooks'
import { NotionMinimalTextEditorToolbarProps } from './NotionMinimalTextEditorToolbar.types'
import { NotionMinimalTextEditorToolbarHighlight } from './NotionMinimalTextEditorToolbarHighlight'
import { NotionEditorHeadingPickerWrapper } from './NotionEditorHeadingPicker'
import { NotionEditorColorPicker } from './NotionEditorColorPicker/NotionEditorColorPicker'
import { NotionEditorLinkManager } from './NotionEditorLinkManager'

//NOTE: We memorize the button so each button is not rerendered
// on every editor state change
const ToolBarToggleButtonsMemo = memo(ToolBarToggleButtons)
const NotionEditorHeadingPickerMemo = memo(NotionEditorHeadingPickerWrapper)
const NotionMinimalTextEditorToolbarHighlightMemo = memo(NotionMinimalTextEditorToolbarHighlight)
const NotionEditorColorPickerMemo = memo(NotionEditorColorPicker)
const NotionEditorLinkManagerMemo = memo(NotionEditorLinkManager)

export const NotionMinimalTextEditorToolbar = ({ editor }: NotionMinimalTextEditorToolbarProps) => {
    const commands = useTextmenuCommands(editor)
    const states = useTextmenuStates(editor)
    const blockOptions = useTextmenuContentTypes(editor)

    const activeItem = useMemo(
        () => blockOptions.find((option) => option.type === 'option' && option.isActive()),
        [blockOptions],
    )

    //
    return (
        <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="bubble__menu"
        >
            {
                // <MemoContentTypePicker options={blockOptions} />
                // <MemoFontFamilyPicker
                //   onChange={commands.onSetFont}
                //   value={states.currentFont || ''}
                // />
                // <MemoFontSizePicker
                //   onChange={commands.onSetFontSize}
                //   value={states.currentSize || ''}
                // />
            }
            <div className="bubble__menu__wrapper">
                <NotionEditorHeadingPickerMemo
                    activeItem={activeItem.label || ''}
                    commands={commands}
                />
                <Separator
                    orientation="vertical"
                    className="h-[26px]"
                />
                <ToolBarToggleButtonsMemo
                    commands={commands}
                    states={states}
                />
                <Separator
                    orientation="vertical"
                    className="h-[26px]"
                />
                <NotionEditorLinkManagerMemo
                    editor={editor}
                    commands={commands}
                    states={states}
                />

                <NotionMinimalTextEditorToolbarHighlightMemo
                    tip="Highlight"
                    currentHighlight={states.currentHighlight}
                    commands={commands}
                    activeItem={activeItem.label}
                />
                <NotionEditorColorPickerMemo
                    tip="Color"
                    currentColor={states.currentColor}
                    commands={commands}
                    activeItem={activeItem.label}
                />
            </div>
        </BubbleMenu>
    )
}
