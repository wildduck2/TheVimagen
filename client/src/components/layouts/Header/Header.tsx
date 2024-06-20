import React from 'react'
import { headerLinks } from '../../../constants'
import { DropDownMenuWrapper, Separator, TooltipButton } from '../../ui'
import { Nav } from './Nav'
import Logo from './Logo'
import { User, ChevronRight } from 'lucide-react'
import { link } from './Header.types'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../context/redux/store'

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

const Header = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  const logged = useSelector((state: RootState) => state.data.logged)

  const toggleHeaderHandler = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {!logged && (
        <header data-collapsed={isCollapsed} className={`header ${isCollapsed && 'collapsed'}`}>
          <Logo isCollapsed={isCollapsed} />
          <Separator />
          <Nav isCollapsed={isCollapsed} links={headerLinks.first} />
          <Separator />
          <Nav isCollapsed={isCollapsed} links={headerLinks.second} />

          <div className="header__toggle">
            <DropDownMenuWrapper data={profileLinkData} isCollapsed={isCollapsed} />
            <TooltipButton
              key={1}
              button={toggleheaderLinkData}
              isCollapsed={isCollapsed}
              onClick={toggleHeaderHandler}
            />
          </div>
        </header>
      )}
      <Outlet />
    </>
  )
}

export default Header

// <div className={cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')}>
//   <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
// </div>
