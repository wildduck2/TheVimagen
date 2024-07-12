import { EmailList } from '..'
import { EmailListSearch, ResizablePanel, Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { EmailSideListType } from './EmailSideList.types'
import { getCookie } from '@/utils'

export const EmailSideList = ({ defaultLayout = 37 }: EmailSideListType) => {
  const defaultActive = getCookie('tabs:active') || 'primary'
  const setActiveTabCookie = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    (document.cookie = `tabs:active=${(e.currentTarget as HTMLButtonElement).innerText}`)

  return (
    <>
      <ResizablePanel
        order={1}
        defaultSize={defaultLayout}
        minSize={40}
      >
        <Tabs
          defaultValue={defaultActive.toLowerCase()}
          className="email__side__list"
        >
          <div className="email__side__list__warpper">
            <div className="email__side__list__wrapper__top">
              <h1>Inbox</h1>
              <TabsList className="tab__list">
                <TabsTrigger
                  value="primary"
                  className="tab__list__trigger"
                  onClick={setActiveTabCookie}
                >
                  Primary
                </TabsTrigger>
                <TabsTrigger
                  value="promotions"
                  className="tab__list__trigger"
                  onClick={setActiveTabCookie}
                >
                  Promotions
                </TabsTrigger>
                <TabsTrigger
                  value="social"
                  className="tab__list__trigger"
                  onClick={setActiveTabCookie}
                >
                  social
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="email__side__list__wrapper__bottom">
              <EmailListSearch />
            </div>
          </div>
          <TabsContent
            value="primary"
            className="email__side__list__content"
          >
            <EmailList
              queryKey="primary"
              q="label:inbox category:primary"
            />
          </TabsContent>
          <TabsContent
            value="promotions"
            className="email__side__list__content"
          >
            <EmailList
              queryKey="promotions"
              q="category:promotions"
            />
          </TabsContent>
          <TabsContent
            value="social"
            className="email__side__list__content"
          >
            <EmailList
              queryKey="social"
              q="category:social"
            />
          </TabsContent>
        </Tabs>
      </ResizablePanel>
    </>
  )
}
