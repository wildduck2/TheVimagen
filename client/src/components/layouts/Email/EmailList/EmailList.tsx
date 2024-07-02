import { ScrollArea } from '@/components/ui'
import { groupMessagesBySender } from '@/utils'

import { EmailListItem } from '../EmailListItem'
import { EmailListProps } from './EmailList.types'

export function EmailList({ items }: EmailListProps) {
  const groupedItems = groupMessagesBySender(items || [])
  const arrayItems = Object.values(groupedItems)

  return (
    <ScrollArea className="email__list">
      <div className="email__list__wrapper">
        {arrayItems.length > 0 && arrayItems.map((item) => <EmailListItem key={item[0].id} items={item} />)}
      </div>
    </ScrollArea>
  )
}
