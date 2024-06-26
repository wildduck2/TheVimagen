import React from 'react'

import { headerLinks, profileLinkData, toggleheaderLinkData } from '@/constants'
import { DropDownMenuWrapper, Separator, TooltipButton } from '@/components/ui'
import { Nav, Logo } from '..'

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
