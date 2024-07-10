import { useState } from 'react'
import { Checkbox, ToggleToolTipSpanWrapper } from '../..'
import { CheckboxWrapperType } from './CheckboxWrapper.types'
import { cn } from '@/utils'

export const CheckboxWrapper = ({ className, onClick, checked, tip }: CheckboxWrapperType) => {
  const [check, setCheck] = useState<boolean>(checked)
  return (
    <>
      <ToggleToolTipSpanWrapper
        tip={tip}
        children={
          <Checkbox
            id="terms"
            checked={check}
            className={cn(className, 'checkbox')}
            onClick={(e) => {
              // onClick(e)
              setCheck(!check)
            }}
          />
        }
      />
    </>
  )
}
