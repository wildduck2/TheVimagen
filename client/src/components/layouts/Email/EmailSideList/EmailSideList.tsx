import { Search } from 'lucide-react'
import { EmailList } from '../EmailList'
import { Input, ResizablePanel, Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'

//FIX: should fetch data instead of this dumby data
import { mails } from '@/constants/Email/MailData'
import { EmailSideListType } from './EmailSideList.types'

export const EmailSideList = ({ defaultLayout = 37 }: EmailSideListType) => {
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
                  <Search />
                  <Input placeholder="Search" />
                </div>
              </form>
            </div>
          </div>
          <TabsContent value="all" className="email__side__list__content">
            <EmailList items={mails} />
          </TabsContent>
          <TabsContent value="unread" className="email__side__list__content">
            <EmailList items={mails.filter((item) => !item.read)} />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
    </>
  )
}
