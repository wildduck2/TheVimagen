import { ComponentProps } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { Badge, ListItemWrapper } from '@/components/ui'
import { cn } from '@/utils'

import { EmailListItemType } from './EmailListItem.types'

export const EmailListItem = ({ item, items }: EmailListItemType) => {
  return (
    <>
      <ListItemWrapper
        items={items}
        children={
          <>
            <div className="email__list__wrapper__item__card__top">
              <div className="email__list__wrapper__item__card__top__header">
                <div>
                  <div>{item.from.email.split('<')[0].replace(/"/gi, ' ')}</div>
                  {item.isUnread && <span />}
                </div>
                <div className={cn('active')}>
                  {formatDistanceToNow(new Date(+item.internalDate), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="email__list__wrapper__item__card__top__subject">{item.subject}</div>
            </div>
            <div className="email__list__wrapper__item__card__bottom">{item.snippet}</div>
            {item.labelIds.length && (
              <div className="email__list__wrapper__item__card__labels">
                {item.labelIds
                  .filter(
                    (label) =>
                      !(
                        label === 'INBOX' ||
                        label === 'UNREAD' ||
                        label === 'CATEGORY_UPDATES' ||
                        label === 'STARRED' ||
                        label === 'CATEGORY_PERSONAL' ||
                        label === 'CATEGORY_PROMOTIONS' ||
                        label === 'CATEGORY_SOCIAL'
                      ) && label,
                  )
                  .map((label: string) => (
                    <Badge
                      key={label}
                      variant={getBadgeVariantFromLabel(label)}
                    >
                      {label.replace(/_/gi, ' ').toLowerCase()}
                    </Badge>
                  ))}
              </div>
            )}
          </>
        }
      ></ListItemWrapper>
    </>
  )
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>['variant'] {
  if (['IMPORTANT'].includes(label)) {
    return 'destructive'
  }

  if (['CATEGORY_UPDATES'].includes(label)) {
    return 'outline'
  }

  return 'secondary'
}
