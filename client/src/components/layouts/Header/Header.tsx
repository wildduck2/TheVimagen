import React from 'react'

import { headerLinks } from '@/constants'
import { DropDownMenuWrapper, Separator, TooltipButton } from '@/components/ui'
import { link, Nav, Logo } from '..'

import { User, ChevronRight } from 'lucide-react'

const toggleheaderLinkData: link = {
  title: 'Menu',
  label: '',
  icon: ChevronRight,
}

const profileLinkData: link = {
  title: 'Profile',
  label: '',
  icon: User,
}

export const Header = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  const toggleHeaderHandler = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <header data-collapsed={isCollapsed} className={`header ${isCollapsed && 'collapsed'}`}>
      <Logo isCollapsed={isCollapsed} />
      <Separator />
      <Nav isCollapsed={isCollapsed} links={headerLinks.first} />
      <Separator />
      <Nav isCollapsed={isCollapsed} links={headerLinks.second} />

      <div className="header__toggle">
        <DropDownMenuWrapper data={profileLinkData} isCollapsed={isCollapsed} />
        <TooltipButton key={1} button={toggleheaderLinkData} isCollapsed={isCollapsed} onClick={toggleHeaderHandler} />
      </div>
    </header>
  )
}

// <div className={cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')}>
//   <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
// </div>
