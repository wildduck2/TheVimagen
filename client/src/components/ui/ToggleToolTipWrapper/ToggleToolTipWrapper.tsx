import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '..'
import { ToggleToolTipWrapperProps } from './ToggleToolTipWrapper.types'

const ToggleToolTipWrapper: React.FC<ToggleToolTipWrapperProps> = ({ children, onClick, tip, variant = 'ghost' }) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger
                    asChild
                    onClick={onClick}
                >
                    <Button variant={variant}>{children}</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export { ToggleToolTipWrapper }
