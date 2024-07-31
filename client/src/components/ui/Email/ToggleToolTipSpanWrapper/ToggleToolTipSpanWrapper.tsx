import { cn } from '@/utils'
import { ToggleToolTipWrapperSpanProps } from './ToggleToolTipSpanWrapper.types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../..'
import React from 'react'

export const ToggleToolTipSpanWrapper = React.forwardRef<HTMLButtonElement, ToggleToolTipWrapperSpanProps>(
  ({ children, onClick, className, tip, value, side, disabled }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger
            asChild
            onClick={onClick}
          >
            <span
              ref={ref}
              className={cn(value && 'active', disabled && 'disabled', 'toggle__tooltip__span__wrapper')}
            >
              {children}
            </span>
          </TooltipTrigger>
          <TooltipContent side={side || 'top'}>
            <p>{tip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)
