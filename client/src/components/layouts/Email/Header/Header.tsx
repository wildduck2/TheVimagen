import { AccountSwitcher, ResizableHandle, ResizablePanel, Separator, TooltipButton } from '@/components/ui'
import { Nav } from '../../Header'
import { EmailHeaderNavLinks, logoutHeaderLinkData, toggleheaderLinkData } from '@/constants'
import { useState } from 'react'
import { BiLogoGmail } from 'react-icons/bi'
import { useNavigate } from '@tanstack/react-router'
import { EmailHeaderType } from './Header.types'
import { useQuery } from '@tanstack/react-query'
import { get_threads } from '@/utils'

export const EmailHeader = ({ defaultCollapsed, defaultLayout }: EmailHeaderType) => {
  const route = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <>
      <ResizablePanel
        data-collapsed={isCollapsed}
        className={`header email__header ${isCollapsed && 'collapsed items-stretch'}`}
        order={0}
        minSize={5}
        maxSize={17}
        defaultSize={25}
        collapsible={true}
        collapsedSize={2.5}
        onCollapse={() => {
          setIsCollapsed(true)
        }}
        onExpand={() => {
          setIsCollapsed(false)
        }}
      >
        <AccountSwitcher
          accounts={[{ email: 'wezonaser50@gmail.com', icon: <BiLogoGmail />, label: 'wezonaser50@gmail.com' }]}
          isCollapsed={isCollapsed}
        />
        <Separator />
        <Nav isCollapsed={isCollapsed} links={EmailHeaderNavLinks.first} />
        <Separator />
        <Nav isCollapsed={isCollapsed} links={EmailHeaderNavLinks.second} />
        <div className="header__toggle">
          <TooltipButton
            button={logoutHeaderLinkData}
            isCollapsed={isCollapsed}
            onClick={() => route({ to: '/dashboard/Home' })}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
    </>
  )
}
