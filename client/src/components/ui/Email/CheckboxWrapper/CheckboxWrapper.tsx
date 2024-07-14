import { useState } from 'react'
import { Checkbox, ToggleToolTipSpanWrapper } from '../..'
import { CheckboxWrapperType } from './CheckboxWrapper.types'
import { cn } from '@/utils'

export const CheckboxWrapper = ({ disabled, className, action, checked, tip }: CheckboxWrapperType) => {
  const [check, setCheck] = useState<boolean>(checked)
  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={disabled}
        tip={tip}
        children={
          <Checkbox
            id="terms"
            checked={checked}
            className={cn(className, 'checkbox')}
            onClick={() => {
              action({ checked })
              setCheck(!check)
            }}
          />
        }
      />
    </>
  )
}
