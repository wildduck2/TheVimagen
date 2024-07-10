import { cn } from '@/utils'
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../..'
import { ToggleToolTipWrapperButtonProps } from './ToggleToolTipButtonWrapper.types'

const ToggleToolTipButtonWrapper: React.FC<ToggleToolTipWrapperButtonProps> = ({
  variant,
  children,
  onClick,
  tip,
  value,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          asChild
          onClick={onClick}
        >
          <Button
            variant={variant || 'ghost'}
            className={cn(value && 'active')}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { ToggleToolTipButtonWrapper }
