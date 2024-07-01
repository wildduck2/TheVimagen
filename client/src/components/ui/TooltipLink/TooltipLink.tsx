import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger, buttonVariants } from '..'
import { Link } from '@tanstack/react-router'
import { cn } from '../../../utils'
import { TooltipLinkProps } from './TooltipLink.types'

const activeHeader =
  'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90'

const unCollapsedActiveHeaderLink =
  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90'

const TooltipLink = ({ link, id = 0, isCollapsed }: TooltipLinkProps) => {
  return isCollapsed ? (
    <Tooltip key={id} delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={`/${link.link}`}
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'header__nav__link collabsed')}
          activeProps={{
            className: activeHeader,
          }}
        >
          {link.icon}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="header__nav__tooltip">
        <div className=" capitalize">{link.title}</div>
        <span className="header__nav__tooltip__label capitalize">{link.label}</span>
      </TooltipContent>
    </Tooltip>
  ) : (
    <Link
      key={id}
      to={`/${link.link}`}
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        'header__nav__link px-[.55rem] capitalize icon icon-notcollabsed',
      )}
      activeProps={{
        className: unCollapsedActiveHeaderLink,
      }}
    >
      {link.icon}
      {link.title}
      {<span className={cn('ml-auto')}>{link.label}</span>}
    </Link>
  )
}

// className="icon icon-notcollabsed"
export { TooltipLink }
