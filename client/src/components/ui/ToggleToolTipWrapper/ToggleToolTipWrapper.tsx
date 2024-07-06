import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '..'
import { ToggleToolTipWrapperProps } from './ToggleToolTipWrapper.types'

const ToggleToolTipWrapper: React.FC<ToggleToolTipWrapperProps> = ({ children, onClick, tip, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild onClick={onClick}>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { ToggleToolTipWrapper }
