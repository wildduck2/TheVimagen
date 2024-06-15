import React from 'react'
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  LucideIcon,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react'

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
import { cn } from '../../../utils'

export type DropDownMenuWrapper = {
  data: {
    title: string
    label?: string | undefined
    icon: LucideIcon
  }
  isCollapsed: boolean
}

const menuData = {
  first: [
    {
      id: '1',
      title: 'Profile',
      icon: User,
      command: '⇧⌘P',
    },
    {
      id: '2',
      title: 'Billing',
      icon: CreditCard,
      command: '⌘B',
    },
    {
      id: '3',
      title: 'Settings',
      icon: Settings,
      command: '⌘S',
    },
    {
      id: '4',
      title: 'Keyboard shortcuts',
      icon: Keyboard,
      command: '⌘K',
    },
  ],
  second: [
    {
      id: '5',
      title: 'Team',
      icon: Users,
      command: '',
    },
    {
      id: '6',
      title: 'Invite Users',
      icon: UserPlus,
      command: '',
    },
    {
      id: '7',
      title: 'New Team',
      icon: PlusCircle,
      command: '⌘T',
    },
  ],
  third: [
    {
      id: '8',
      title: 'Github',
      icon: Github,
      command: '',
    },
    {
      id: '9',
      title: 'Support',
      icon: Cloud,
      command: '',
    },
    {
      id: '10',
      title: 'Discord',
      icon: LifeBuoy,
      command: '',
    },
  ],
  fourth: [
    {
      id: '11',
      title: 'Log out',
      icon: LogOut,
      command: '⇧⌘Q',
    },
  ],
}

export type DropdownMenuGroupProps = {
  id: string
  title: string
  icon: LucideIcon
  command: string
}

const DropdownMenuGroupWrappere = (group: DropdownMenuGroupProps[]) => {
  console.log(Object.values(group))
  return Object.values(group).map((item) => {
    return (
      <>
        <DropdownMenuItem key={item.id} className="dark:text-white header__nav__dropdown__item">
          <item.icon className="icon" />
          {item.title}
          <DropdownMenuShortcut>{item.command}</DropdownMenuShortcut>
        </DropdownMenuItem>
      </>
    )
  })
}

const DropDownMenuWrapper: React.FC<DropDownMenuWrapper> = ({ data, isCollapsed }) => {
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
