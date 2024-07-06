import { formatDistanceToNow } from 'date-fns'
import { ComponentProps } from 'react'
import { Badge, EmailListITemWrapper, ToggleMutationButton } from '@/components/ui'
import { cn } from '@/utils'

import { EmailListItemType } from './EmailListItem.types'

export const EmailListItem = ({ item, items }: EmailListItemType) => {
  //INFO: filtering ids
  const WANTED_HEADERS = item.payload.headers.filter(
    (head) => head.name === 'Subject' || head.name === 'From' || head.name === 'To',
  )
  const ids = items.map((id) => id.id)

  return (
    <>
      <EmailListITemWrapper
        item={item}
        ids={ids}
        children={
          <>
            <div className="email__list__wrapper__item__top">
              <div className="email__list__wrapper__item__top__header">
                <div>
                  <div>
                    {WANTED_HEADERS.find((obj) => obj.name === 'From')!
                      .value.split('<')[0]
                      .replace(/"/gi, ' ')}
                  </div>
                  <ToggleMutationButton labelIds={item.labelIds} threadId={item.threadId} />
                  {item.labelIds.includes('UNREAD') && <span />}
                </div>
                <div className={cn('active')}>
                  {formatDistanceToNow(new Date(+item.internalDate), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="email__list__wrapper__item__top__subject">
                {WANTED_HEADERS.find((obj) => obj.name === 'Subject')!.value}
              </div>
            </div>
            <div className="email__list__wrapper__item__bottom">{item.snippet.substring(0, 300)}</div>
            {item.labelIds.length && (
              <div className="email__list__wrapper__item__labels">
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
                    <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                      {label.replace(/_/gi, ' ').toLowerCase()}
                    </Badge>
                  ))}
              </div>
            )}
          </>
        }
      ></EmailListITemWrapper>
    </>
  )
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>['variant'] {
  if (['IMPORTANT'].includes(label)) {
    return 'destructive'
  }

  if (['CATEGORY_PERSONAL'].includes(label)) {
    return 'outline'
  }

  return 'secondary'
}
