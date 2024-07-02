import { EmailList } from '..'
import { Input, ResizablePanel, Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { EmailSideListType } from './EmailSideList.types'
import { Icon } from '@/assets'
import { getCookie, groupMessagesBySender } from '@/utils'

export const EmailSideList = ({ inbox, promotion, social, defaultLayout = 37 }: EmailSideListType) => {
  const defaultActive = getCookie('tabs:active') || 'primary'
  const setActiveTabCookie = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    (document.cookie = `tabs:active=${(e.currentTarget as HTMLButtonElement).innerText}`)

  return (
    <>
      <ResizablePanel order={1} defaultSize={defaultLayout} minSize={30}>
        <Tabs defaultValue={defaultActive.toLowerCase()} className="email__side__list">
          <div className="email__side__list__warpper">
            <div className="email__side__list__wrapper__top">
              <h1>Inbox</h1>
              <TabsList className="tab__list">
                <TabsTrigger value="primary" className="tab__list__trigger" onClick={setActiveTabCookie}>
                  Primary
                </TabsTrigger>
                <TabsTrigger value="promotion" className="tab__list__trigger" onClick={setActiveTabCookie}>
                  Promotion
                </TabsTrigger>
                <TabsTrigger value="social" className="tab__list__trigger" onClick={setActiveTabCookie}>
                  social
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="email__side__list__wrapper__bottom">
              <form>
                <div>
                  <Icon.search />
                  <Input placeholder="Search" />
                </div>
              </form>
            </div>
          </div>
          <TabsContent value="primary" className="email__side__list__content">
            <EmailList items={groupMessagesBySender(inbox || [])} />
          </TabsContent>
          <TabsContent value="promotion" className="email__side__list__content">
            <EmailList items={promotion!} />
          </TabsContent>
          <TabsContent value="social" className="email__side__list__content">
            <EmailList items={social!} />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
    </>
  )
}
