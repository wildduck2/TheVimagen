import { EmailList } from '../EmailList'
import { Input, ResizablePanel, Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'

//FIX: should fetch data instead of this dumby data
import { mails } from '@/constants/Email/MailData'
import { EmailSideListType } from './EmailSideList.types'
import { Icon } from '@/assets'

export const EmailSideList = ({ threads, defaultLayout = 37 }: EmailSideListType) => {
  return (
    <>
      <ResizablePanel order={1} defaultSize={defaultLayout} minSize={30}>
        <Tabs defaultValue="all" className="email__side__list">
          <div className="email__side__list__warpper">
            <div className="email__side__list__wrapper__top">
              <h1>Inbox</h1>
              <TabsList className="tab__list">
                <TabsTrigger value="all" className="tab__list__trigger">
                  All mail
                </TabsTrigger>
                <TabsTrigger value="unread" className="tab__list__trigger">
                  Unread
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
          <TabsContent value="all" className="email__side__list__content">
            <EmailList items={threads} />
          </TabsContent>
          <TabsContent value="unread" className="email__side__list__content"></TabsContent>
        </Tabs>
      </ResizablePanel>
    </>
  )
}
// <EmailList items={mails.filter((item) => !item.read)} />
