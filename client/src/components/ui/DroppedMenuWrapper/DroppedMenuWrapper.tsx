import React from 'react'

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '..'

import {
  ActionType,
  DroppedMenuWrapperProps,
  ShowMoreBadgesProps,
  ShowMoreOptionsProps,
} from './DroppedMenuWrapper.types'
import { Icon } from '@/assets'

const DroppedMenuWrapper: React.FC<DroppedMenuWrapperProps> = ({ trigger, content, title }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          {trigger}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ShowMoreOptions: React.FC<ShowMoreOptionsProps> = ({ name, title, actions }) => {
  const trigger = (
    <>
      <span className="sr-only">{name}</span>
      <Icon.moreHorizontal className="h-4 w-4" />
    </>
  )

  const content = () => (
    <>
      {actions.map((action: ActionType) => (
        <DropdownMenuItem key={action.id} onClick={() => action.action!()}>
          {action.label}
        </DropdownMenuItem>
      ))}
    </>
  )
  return <DroppedMenuWrapper trigger={trigger} content={content()} title={title} />
}

const ShowMoreBadges: React.FC<ShowMoreBadgesProps> = ({ name, title, actions }) => {
  const trigger = (
    <>
      <span className="sr-only">{name}</span>
      <Icon.moveHorizontal className="h-4 w-4" />
    </>
  )

  const content = () => {
    /* if you want to make a sperator you can use// <DropdownMenuSeparator /> */
    return (
      <>
        {actions.map((action: string, index) => {
          return (
            index > 1 && (
              <DropdownMenuItem className="thevimagne" key={index}>
                <Badge>{action}</Badge>
              </DropdownMenuItem>
            )
          )
        })}
      </>
    )
  }
  return <DroppedMenuWrapper trigger={trigger} content={content()} title={title} />
}

export { DroppedMenuWrapper, ShowMoreOptions, ShowMoreBadges }
