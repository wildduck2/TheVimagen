import {
    Button,
    NotionEditorButtonPickerWrapper,
    NotionMinimalTextEditorToolbarPick,
    Separator,
    ToggleToolTipButtonWrapper,
} from '@/components/ui'
import { NotionEditorColorPickerProps } from './NotionEditorColorPicker.types'
import { colorwheel, Icon } from '@/assets'
import { highlightButtons } from '@/constants'
import { cn } from '@/utils'

export const NotionEditorColorPicker = ({ currentColor, activeItem, commands, tip }: NotionEditorColorPickerProps) => {
    return (
        <>
            <NotionMinimalTextEditorToolbarPick
                trigger={
                    <ToggleToolTipButtonWrapper
                        tip={tip}
                        value={currentColor}
                        children={<Icon.pencil />}
                    />
                }
                content={
                    <div className="notion__minimal__text__editor__toolbar__pick__content__highlight">
                        <NotionEditorButtonPickerWrapper
                            description="Color"
                            title="Color"
                            onClick={commands.onChangeColor}
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
                                    item.label === activeItem && 'active',
                                )}
                                onClick={() => commands.onChangeColor(item.color)}
                            >
                                <span className={cn('border border-solid', item.style)} />
                            </Button>
                        ))}
                        <Separator
                            orientation="vertical"
                            className="h-[26px]"
                        />
                        <Button
                            variant="ghost"
                            className={cn('notion__minimal__text__editor__toolbar__pick__content__button')}
                            onClick={() => commands.onClearColor()}
                        >
                            <Icon.circleOff className="opacity-60" />
                        </Button>
                    </div>
                }
            />
        </>
    )
}
