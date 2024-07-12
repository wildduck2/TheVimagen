import { AccountSwitcher, ResizableHandle, ResizablePanel, Separator, TooltipButton } from '@/components/ui'
import { Nav } from '../../Header'
import { EmailHeaderNavLinks, logoutHeaderLinkData } from '@/constants'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { EmailHeaderType } from './EmailHeader.types'
import { Icon } from '@/assets'
import { useQuery } from '@tanstack/react-query'
import { getTimeEstimated, QueryKeyType } from '@/utils'

export const EmailHeader = ({ defaultCollapsed, defaultLayout }: EmailHeaderType) => {
  const route = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed)

  const qk: QueryKeyType = [
    'header_inbox',
    {
      q: 'is:unread label:inbox category:primary',
      fields: 'resultSizeEstimate',
    },
  ]
  const { data } = useQuery({
    queryKey: qk,
    queryFn: getTimeEstimated,
    refetchOnWindowFocus: false,
  })

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
        <Nav
          isCollapsed={isCollapsed}
          links={[...EmailHeaderNavLinks.first]}
          labels={[data]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={EmailHeaderNavLinks.second}
          labels={[]}
        />
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
