import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from '@/components/ui'
import { Icon } from '@/assets'

import { NotionMinimalTextEditorToolbarPickProps } from './NotionMinimalTextEditorToolbarPick.types'

export const NotionMinimalTextEditorToolbarPick = ({ trigger, content }: NotionMinimalTextEditorToolbarPickProps) => {
    return (
        <Popover>
            <PopoverTrigger
                asChild
                className="notion__minimal__text__editor__toolbar__pick__trigger"
            >
                {trigger}
            </PopoverTrigger>
            <PopoverContent
                className="notion__minimal__text__editor__toolbar__pick__content"
                defaultValue={'Medium'}
            >
                {content}
            </PopoverContent>
        </Popover>
    )
}
