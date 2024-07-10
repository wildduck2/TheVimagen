import { cn } from '@/utils'
import { ToggleToolTipWrapperSpanProps } from './ToggleToolTipSpanWrapper.types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../..'

const ToggleToolTipSpanWrapper: React.FC<ToggleToolTipWrapperSpanProps> = ({ children, onClick, tip, value }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          asChild
          onClick={onClick}
        >
          <span className={cn(value && 'active')}>{children}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { ToggleToolTipSpanWrapper }
