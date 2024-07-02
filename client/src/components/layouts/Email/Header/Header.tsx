import { AccountSwitcher, ResizableHandle, ResizablePanel, Separator, TooltipButton } from '@/components/ui'
import { Nav } from '../../Header'
import { EmailHeaderNavLinks, logoutHeaderLinkData } from '@/constants'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { EmailHeaderType } from './Header.types'
import { Icon } from '@/assets'

export const EmailHeader = ({ defaultCollapsed, defaultLayout }: EmailHeaderType) => {
  const route = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed)

  return (
    <>
      <ResizablePanel
        data-collapsed={isCollapsed}
        className={`header email__header ${isCollapsed && 'collapsed items-stretch'}`}
        order={0}
        minSize={5}
        maxSize={17}
        defaultSize={defaultLayout}
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
          accounts={[
            {
              email: 'wezonaser50@gmail.com',
              icon: <Icon.gmail className="size-[20px]" />,
              label: 'wezonaser50@gmail.com',
            },
          ]}
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
