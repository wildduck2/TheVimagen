import { memo, useMemo } from 'react'
import { BubbleMenu } from '@tiptap/react'

import {
    Button,
    MouseEvent,
    NotionEditorHighlightColorPicker,
    NotionMinimalTextEditorToolbarPick,
    Separator,
    ToggleToolTipButtonWrapper,
    ToolBarToggleButtons,
} from '@/components/ui'
import { useTextmenuCommands, useTextmenuContentTypes, useTextmenuStates } from '@/hooks'
import { NotionMinimalTextEditorToolbarProps } from './NotionMinimalTextEditorToolbar.types'
import { emailToolbarEditor, highlightButtons } from '@/constants'
import { cn } from '@/utils'
import { colorwheel, Icon } from '@/assets'

//NOTE: We memorize the button so each button is not rerendered
// on every editor state change
const ToolBarToggleButtonsMemo = memo(ToolBarToggleButtons)
const NotionMinimalTextEditorToolbarPickMemo = memo(NotionMinimalTextEditorToolbarPick)

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
                <div className="notion__minimal__text__editor__toolbar__pick">
                    <NotionMinimalTextEditorToolbarPickMemo
                        trigger={
                            <Button
                                variant="outline"
                                className="flex justify-between"
                            >
                                <Icon.hIcon /> <span>heading</span> <Icon.chovrenDown className="size-[16px]" />
                            </Button>
                        }
                        content={
                            <>
                                <span>Turn into</span>
                                <Separator className="mb-1" />
                                {emailToolbarEditor.map((item, idx) => (
                                    <Button
                                        key={idx}
                                        variant="ghost"
                                        className={cn(
                                            'notion__minimal__text__editor__toolbar__pick__content__button',
                                            item.label === activeItem.label && 'active',
                                        )}
                                        onClick={commands[item.action] as MouseEvent}
                                    >
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </Button>
                                ))}
                            </>
                        }
                    />
                </div>
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
                <NotionMinimalTextEditorToolbarPickMemo
                    trigger={
                        <ToggleToolTipButtonWrapper
                            tip={'Highlight'}
                            value={!states.currentHighlight}
                            children={<Icon.highlight />}
                        />
                    }
                    content={
                        <div className="notion__minimal__text__editor__toolbar__pick__content__highlight">
                            <NotionEditorHighlightColorPicker
                                onClick={commands.onChangeHighlight}
                                trigger={
                                    <img
                                        src={colorwheel}
                                        className="opacity-60"
                                    />
                                }
                            />

                            {highlightButtons.map((item, idx) => (
                                <Button
                                    key={idx}
                                    variant="ghost"
                                    className={cn(
                                        'notion__minimal__text__editor__toolbar__pick__content__button',
                                        item.label === activeItem.label && 'active',
                                    )}
                                    onClick={() => commands.onChangeHighlight(item.color)}
                                >
                                    <span className={cn('border border-solid', item.style)} />
                                </Button>
                            ))}
                            <Button
                                variant="ghost"
                                className={cn('notion__minimal__text__editor__toolbar__pick__content__button')}
                                onClick={() => commands.onClearHighlight()}
                            >
                                <Icon.circleOff className="opacity-60" />
                            </Button>
                        </div>
                    }
                />
            </div>
        </BubbleMenu>
    )
}
