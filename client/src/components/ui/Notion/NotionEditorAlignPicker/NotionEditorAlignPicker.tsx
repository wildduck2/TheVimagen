import { Icon } from '@/assets'
import { cn } from '@/utils'
import { emailToolbarEditorAlign } from '@/constants'
import { Button } from '../..'
import { MouseEvent, ToggleToolTipButtonWrapper } from '../ToggleToolTipButtonWrapper'
import { NotionMinimalTextEditorToolbarPick } from '../NotionMinimalTextEditorToolbarPick'
import { NotionEditorAlignPickerProps } from './NotionEditorAlignPicker.types'

export const NotionEditoerAlignPicker = ({ commands, states, tip }: NotionEditorAlignPickerProps) => {
    return (
        <>
            <NotionMinimalTextEditorToolbarPick
                trigger={
                    <ToggleToolTipButtonWrapper
                        tip={tip}
                        children={<Icon.alignCenter />}
                    />
                }
                content={
                    <div className="notion__minimal__text__editor__toolbar__pick__content__highlight align">
                        {emailToolbarEditorAlign.map((item, idx) => (
                            <Button
                                key={idx}
                                variant="ghost"
                                className={cn(
                                    'notion__minimal__text__editor__toolbar__pick__content__button',
                                    states[item.value] && 'active',
                                )}
                                onClick={commands[item.action] as MouseEvent}
                            >
                                <item.icon />
                            </Button>
                        ))}
                    </div>
                }
            />
        </>
    )
}
