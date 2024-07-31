import { Checkbox, ToggleToolTipSpanWrapper } from '../..'
import { cn } from '@/utils'
import { MultiCheckboxWrapperType } from './MultiCheckboxWrapper.types'

export const MultiCheckboxWrapper = ({ disabled, className, action, data, dataCompare }: MultiCheckboxWrapperType) => {
  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={disabled}
        tip={'Select'}
        children={
          <Checkbox
            id="terms"
            checked={
              data.length === dataCompare.length &&
              data.length === dataCompare.length &&
              dataCompare.length > 0 &&
              data.length > 0
                ? true
                : data.length > 0 && data.length < dataCompare.length
                  ? 'indeterminate'
                  : false
            }
            className={cn(className, 'checkbox')}
            onClick={() => {
              action()
            }}
          />
        }
      />
    </>
  )
}
