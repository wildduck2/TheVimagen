import { useState } from 'react'
import { Checkbox, ToggleToolTipWrapper, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '..'
import { CheckboxWrapperType } from './CheckboxWrapper.types'

export const CheckboxWrapper = ({ className, onClick, checked, tip }: CheckboxWrapperType) => {
  const [check, setCheck] = useState<boolean>(checked)
  return (
    <>
      <ToggleToolTipWrapper
        tip={tip}
        children={
          <Checkbox
            id="terms"
            checked={check}
            className={className}
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
