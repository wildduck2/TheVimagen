import { formatDistanceToNow } from 'date-fns'
import { ComponentProps } from 'react'
import { Badge, ListItemWrapper, ToggleMutationButton } from '@/components/ui'
import { cn } from '@/utils'

import { EmailListItemType } from './EmailListItem.types'
import { Icon } from '@/assets'

export const EmailListItem = ({ item, items }: EmailListItemType) => {
  //INFO: filtering ids
  const WANTED_HEADERS = item.payload.headers.filter(
    (head) => head.name === 'Subject' || head.name === 'From' || head.name === 'To',
  )
  const ids = items.map((id) => id.id)

  console.log(item.labelIds)

  return (
    <>
      <ListItemWrapper
        item={item}
        ids={ids}
        icon={<ToggleMutationButton labelIds={item.labelIds} threadId={item.threadId} icon={Icon.fiStar} tip="Star" />}
        children={
          <>
            <div className="email__list__wrapper__item__card__top">
              <div className="email__list__wrapper__item__card__top__header">
                <div>
                  <div>
                    {WANTED_HEADERS.find((obj) => obj.name === 'From')!
                      .value.split('<')[0]
                      .replace(/"/gi, ' ')}
                  </div>
                  {item.labelIds.includes('UNREAD') && <span />}
                </div>
                <div className={cn('active')}>
                  {formatDistanceToNow(new Date(+item.internalDate), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="email__list__wrapper__item__card__top__subject">
                {WANTED_HEADERS.find((obj) => obj.name === 'Subject')!.value}
              </div>
            </div>
            <div className="email__list__wrapper__item__card__bottom">{item.snippet}</div>
            {item.labelIds.length && (
              <div className="email__list__wrapper__item__card__labels">
                {item.labelIds
                  .filter(
                    (label) =>
                      !(
                        label === 'INBOiX' ||
                        label === 'UNREAD' ||
                        label === 'CATEGORY_UPDAES' ||
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
