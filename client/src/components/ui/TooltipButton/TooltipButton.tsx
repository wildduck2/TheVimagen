import { Button, Tooltip, TooltipContent, TooltipTrigger, buttonVariants } from '..'
import { cn } from '../../../utils'
import { TooltipButtonProps } from './TooltipButton.types'

const TooltipButton = ({ button, id = 0, isCollapsed, onClick }: TooltipButtonProps) => {
    return isCollapsed ? (
        <Tooltip
            key={id}
            delayDuration={0}
        >
            <TooltipTrigger asChild>
                <Button
                    onClick={onClick}
                    className={cn(buttonVariants({ variant: 'secondary', size: 'icon' }), 'header__nav__link collabsed')}
                >
                    {<button.icon className="icon" />}
                    <span className="sr-only">{button.title}</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent
                side="right"
                className="header__nav__tooltip z-50"
            >
                {button.title}
                {button.label && <span className="header__nav__tooltip__label">{button.label}</span>}
            </TooltipContent>
        </Tooltip>
    ) : (
        <Button
            onClick={onClick}
            key={id}
            className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'header__nav__link menu-button',
                'justify-start',
            )}
        >
            <button.icon className="icon icon-notcollabsed" />
            {button.title}
            {button.label && <span className={cn('ml-auto')}>{button.label}</span>}
        </Button>
    )
}
export { TooltipButton }
