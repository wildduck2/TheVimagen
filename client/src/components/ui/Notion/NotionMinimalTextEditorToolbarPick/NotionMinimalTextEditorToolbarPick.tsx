import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
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
