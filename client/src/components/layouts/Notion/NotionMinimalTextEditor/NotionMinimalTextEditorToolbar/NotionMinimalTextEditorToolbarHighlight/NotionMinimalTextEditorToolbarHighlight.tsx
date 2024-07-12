import { colorwheel, Icon } from '@/assets'
import {
  Button,
  NotionEditorButtonPickerWrapper,
  NotionMinimalTextEditorToolbarPick,
  Separator,
  ToggleToolTipButtonWrapper,
} from '@/components/ui'
import { highlightButtons } from '@/constants'
import { cn } from '@/utils'
import { NotionMinimalTextEditorToolbarHighlightType } from './NotionMinimalTextEditorToolbarHighlight.types'

export const NotionMinimalTextEditorToolbarHighlight = ({
  currentHighlight,
  activeItem,
    tip,
    commands
}: NotionMinimalTextEditorToolbarHighlightType) => {
  return (
    <>
      <NotionMinimalTextEditorToolbarPick
        trigger={
          <ToggleToolTipButtonWrapper
            tip={tip}
            value={currentHighlight}
            children={<Icon.highlight />}
          />
        }
        content={
          <div className="notion__minimal__text__editor__toolbar__pick__content__highlight">
            <NotionEditorButtonPickerWrapper
              description='Highlight'
              title='Highlight'
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
                  item.label === activeItem && 'active',
                )}
                onClick={() => commands.onChangeHighlight(item.color)}
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
              onClick={() => commands.onClearHighlight()}
            >
              <Icon.circleOff className="opacity-60" />
            </Button>
          </div>
        }
      />
    </>
  )
}
