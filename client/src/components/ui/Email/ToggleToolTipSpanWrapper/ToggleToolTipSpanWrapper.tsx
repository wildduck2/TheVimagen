import { cn } from '@/utils'
import { ToggleToolTipWrapperSpanProps } from './ToggleToolTipSpanWrapper.types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../..'

const ToggleToolTipSpanWrapper: React.FC<ToggleToolTipWrapperSpanProps> = ({
  children,
  onClick,
  tip,
  value,
  side,
  disabled,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          asChild
          onClick={onClick}
        >
          <span className={cn(value && 'active', disabled && 'disabled')}>{children}</span>
        </TooltipTrigger>
        <TooltipContent side={side || 'top'}>
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { ToggleToolTipSpanWrapper }
