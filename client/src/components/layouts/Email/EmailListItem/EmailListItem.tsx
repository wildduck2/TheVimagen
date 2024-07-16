import { ComponentProps } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { Badge, ListItemWrapper } from '@/components/ui'
import { cn } from '@/utils'

import { EmailListItemType } from './EmailListItem.types'

export const EmailListItem = ({ items }: EmailListItemType) => {
  return (
    <>
      <ListItemWrapper
        items={items}
        children={
          <>
            <div className="email__list__wrapper__item__card__top">
              <div className="email__list__wrapper__item__card__top__header">
                <div>
                  <div>{items[0].from.email.split('<')[0].replace(/"/gi, ' ')}</div>
                  {items[0].labelIds.includes('UNREAD') && <span />}
                </div>
                <div className={cn('active')}>
                  {formatDistanceToNow(new Date(+items[0].internalDate), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="email__list__wrapper__item__card__top__subject">{items[0].subject}</div>
            </div>
            <div className="email__list__wrapper__item__card__bottom">{items[0].snippet}</div>
            {items[0].labelIds.length && (
              <div className="email__list__wrapper__item__card__labels">
                {items[0].labelIds
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
