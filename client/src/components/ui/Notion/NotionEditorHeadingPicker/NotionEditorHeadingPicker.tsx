import { Icon } from '@/assets'
import { Button, MouseEvent, NotionMinimalTextEditorToolbarPick, Popover, Separator } from '@/components/ui'
import { emailToolbarEditor } from '@/constants'
import { cn } from '@/utils'
import { NotionEditorHeadingPickerWrapperProps } from './NotionEditorHeadingPicker.types'

export const NotionEditorHeadingPickerWrapper = ({
  commands,
  activeItem,
  trigger,
}: NotionEditorHeadingPickerWrapperProps) => {
  return (
    <>
      <div className="notion__minimal__text__editor__toolbar__pick">
        <NotionMinimalTextEditorToolbarPick
          trigger={
            <Button
              variant="ghost"
              className="flex justify-between"
            >
              {trigger}
            </Button>
          }
          content={
            <div className="notion__minimal__text__editor__toolbar__pick__content__wrapper">
              <span>Turn into</span>
              <Separator className="mb-1" />
              {emailToolbarEditor.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className={cn(
                    'notion__minimal__text__editor__toolbar__pick__content__button',
                    item.label === activeItem && 'active',
                  )}
                  onClick={commands[item.action] as MouseEvent}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          }
        />
      </div>
    </>
  )
}
