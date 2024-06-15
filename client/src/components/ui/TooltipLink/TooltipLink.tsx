import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger, buttonVariants } from '..'
import { NavLink } from 'react-router-dom'
import { cn } from '../../../utils'
import { TooltipLinkProps } from './TooltipLink.types'

const activeHeader =
  'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90'

const unCollapsedActiveHeaderLink =
  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90'

const TooltipLink = ({ link, id = 0, isCollapsed }: TooltipLinkProps) => {
  return isCollapsed ? (
    <Tooltip key={id} delayDuration={0}>
      <TooltipTrigger>
        <NavLink
          to={link.title}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'header__nav__link collabsed',
              isActive ? activeHeader : '',
            )
          }
        >
          <link.icon className="icon" />
          <span className="sr-only">{link.title}</span>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="header__nav__tooltip">
        {link.title}
        {link.label && <span className="header__nav__tooltip__label">{link.label}</span>}
      </TooltipContent>
    </Tooltip>
  ) : (
    <NavLink
      key={id}
      to={link.title}
      className={({ isActive }) =>
        cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'header__nav__link a',
          isActive && unCollapsedActiveHeaderLink,
        )
      }
    >
      <link.icon className="icon icon-notcollabsed" />
      {link.title}
      {link.label && <span className={cn('ml-auto')}>{link.label}</span>}
    </NavLink>
  )
}

export { TooltipLink }
