import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '..'
import { ToggleToolTipWrapperProps } from './ToggleToolTipWrapper.types'

const ToggleToolTipWrapper: React.FC<ToggleToolTipWrapperProps> = ({ children, onClick, tip }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span onClick={onClick}>{children}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { ToggleToolTipWrapper }
