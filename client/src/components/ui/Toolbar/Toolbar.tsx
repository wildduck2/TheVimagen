import React, { ButtonHTMLAttributes, HTMLProps, forwardRef, memo } from 'react'

import { cn } from '@/utils'
import { Button, ButtonProps, buttonVariants, Tooltip, TooltipContent, TooltipTrigger } from '..'
import { Surface } from '../Surface/Surface'
import { Icon } from '@/assets'

export type ToolbarWrapperProps = {
    shouldShowContent?: boolean
    isVertical?: boolean
} & HTMLProps<HTMLDivElement>

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
    ({ shouldShowContent = true, children, isVertical = false, className, ...rest }, ref) => {
        const toolbarClassName = cn(
            'text-black inline-flex h-full leading-none gap-0.5',
            isVertical ? 'flex-col p-2' : 'flex-row p-1 items-center',
            className,
        )

        return (
            shouldShowContent && (
                <Surface
                    className={toolbarClassName}
                    {...rest}
                    ref={ref}
                >
                    {children}
                </Surface>
            )
        )
    },
)

ToolbarWrapper.displayName = 'Toolbar'

export type ToolbarDividerProps = {
    horizontal?: boolean
} & HTMLProps<HTMLDivElement>

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(({ horizontal, className, ...rest }, ref) => {
    const dividerClassName = cn(
        'bg-neutral-200 dark:bg-neutral-800',
        horizontal
            ? 'w-full min-w-[1.5rem] h-[1px] my-1 first:mt-0 last:mt-0'
            : 'h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0',
        className,
    )

    return (
        <div
            className={dividerClassName}
            ref={ref}
            {...rest}
        />
    )
})

ToolbarDivider.displayName = 'Toolbar.Divider'

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean
    activeClassname?: string
    tooltip?: string
    tooltipShortcut?: string[]
    buttonSize?: ButtonProps['size']
    variant?: ButtonProps['variant']
}

export const ToolbarButton = memo(() => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    onClick={() => { }}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
                >
                    <Icon.bold />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
                <div className=" capitalize">Bold</div>
            </TooltipContent>
        </Tooltip>
    )
})
ToolbarButton.displayName = 'ToolbarButton'

export const Toolbar = {
    Wrapper: ToolbarWrapper,
    Divider: ToolbarDivider,
    Button: ToolbarButton,
}
