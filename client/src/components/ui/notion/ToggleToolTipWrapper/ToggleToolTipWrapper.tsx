import { cn } from '@/utils'
import { ToggleToolTipWrapperProps } from './ToggleToolTipWrapper.types'
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../..'

const ToggleToolTipWrapper: React.FC<ToggleToolTipWrapperProps> = ({
    children,
    onClick,
    tip,
    variant = 'ghost',
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
                        variant={variant}
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

export { ToggleToolTipWrapper }
