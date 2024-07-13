import { useState } from 'react'
import { Checkbox, ToggleToolTipSpanWrapper } from '../..'
import { CheckboxWrapperType } from './CheckboxWrapper.types'
import { cn } from '@/utils'

export const CheckboxWrapper = ({ disabled, className, action, checked, tip, perSelected }: CheckboxWrapperType) => {
  const [check, setCheck] = useState<boolean>(checked)
  return (
    <>
      <ToggleToolTipSpanWrapper
        disabled={disabled}
        tip={tip}
        children={
          <Checkbox
            id="terms"
            checked={perSelected || check}
            className={cn(className, 'checkbox', perSelected && 'perSelected')}
            onClick={() => {
              action(check)
              setCheck(!check)
            }}
          />
        }
      />
    </>
  )
}
