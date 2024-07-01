import React from 'react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  buttonVariants,
} from '..'
import { cn, signoutAsync } from '../../../utils'
import { DropdownMenuGroupProps, DropDownMenuWrapperType } from './DropDownMenuWrapper.types'
import { Icon } from '@/assets'

const menuData = {
  first: [
    {
      id: '1',
      title: 'Profile',
      icon: <Icon.user/>,
      command: '⇧⌘P',
    },
    {
      id: '2',
      title: 'Billing',
      icon: <Icon.creditCard/>,
      command: '⌘B',
    },
    {
      id: '3',
      title: 'Settings',
      icon: <Icon.settings/>,
      command: '⌘S',
    },
    {
      id: '4',
      title: 'Keyboard shortcuts',
      icon: <Icon.keyboard/>,
      command: '⌘K',
    },
  ],
  second: [
    {
      id: '5',
      title: 'Team',
      icon: <Icon.users/>,
      command: '',
    },
    {
      id: '6',
      title: 'Invite Users',
      icon: <Icon.userPlus/>,
      command: '',
    },
    {
      id: '7',
      title: 'New Team',
      icon: <Icon.plusCircle/>,
      command: '⌘T',
    },
  ],
  third: [
    {
      id: '8',
      title: 'Github',
      icon: <Icon.github/>,
      command: '',
    },
    {
      id: '9',
      title: 'Support',
      icon: <Icon.cloud/>,
      command: '',
    },
    {
      id: '10',
      title: 'Discord',
      icon: <Icon.discord/>,
      command: '',
    },
  ],
  fourth: [
    {
      id: '11',
      title: 'Log out',
      icon: <Icon.logOut/>,
      command: '⇧⌘Q',
      cb: signoutAsync,
    },
  ],
}

const DropdownMenuGroupWrappere = (group: DropdownMenuGroupProps[]) => {
  return Object.values(group).map((item) => {
    return (
      <div key={item.id}>
        <DropdownMenuItem className="dark:text-white header__nav__dropdown__item" onClick={item.cb}>
          <item.icon className="icon" />
          {item.title}
          <DropdownMenuShortcut>{item.command}</DropdownMenuShortcut>
        </DropdownMenuItem>
      </div>
    )
  })
}

const DropDownMenuWrapper: React.FC<DropDownMenuWrapperType> = ({ data, isCollapsed }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isCollapsed ? (
          <Button
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'header__nav__link collabsed ghost-button',
            )}
          >
            <data.icon className="icon" />
            <span className="sr-only">{data.title}</span>
          </Button>
        ) : (
          <Button
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'header__nav__link menu-button ghost-button',
              'justify-start',
            )}
          >
            <data.icon className="icon icon-notcollabsed" />
            {data.title}
            {data.label && <span className={cn('ml-auto')}>{data.label}</span>}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="header__nav__dropdown">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuGroupWrappere {...menuData.first} />
          <DropdownMenuSeparator />
          <DropdownMenuGroupWrappere {...menuData.second} />
          <DropdownMenuSeparator />
          <DropdownMenuGroupWrappere {...menuData.third} />
          <DropdownMenuSeparator />
          <DropdownMenuGroupWrappere {...menuData.fourth} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DropDownMenuWrapper }
