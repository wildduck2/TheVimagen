import { ScrollArea } from '@/components/ui'
import { EmailListItem } from '../EmailListItem'
import { EmailListProps } from './EmailList.types'
import { MessageType } from '@/utils'

export function EmailList({ items }: EmailListProps) {
  return (
    <ScrollArea className="email__list">
      <div className="email__list__wrapper">
        {items &&
          items.map((item, idx) =>
            (items[0] as MessageType).id ? (
              <EmailListItem key={idx} item={item as MessageType} />
            ) : (
              <EmailListItem key={idx} item={(item as MessageType[])[0]} />
            ),
          )}
      </div>
    </ScrollArea>
  )
}
