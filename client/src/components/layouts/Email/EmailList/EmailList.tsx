import { ComponentProps } from 'react'

import { Badge, ScrollArea } from '@/components/ui'
import { cn, HeaderType } from '@/utils'
import { EmailListProps } from './EmailList.types'
import { Icon } from '@iconify-icon/react'

//FIX: should fetch data instead of this dumby data
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export function EmailList({ items }: EmailListProps) {
  const WANTED_HEADERS = items?.map((item) =>
    item.payload.headers.filter((head) => head.name === 'Subject' || head.name === 'From' || head.name === 'To'),
  ) as HeaderType[][]

  console.log(WANTED_HEADERS, 'sdf')

  return (
    <ScrollArea className="email__list">
      <div className="email__list__wrapper">
        {items &&
          items.map((item, idx) => (
            <div key={item.id} className={cn('email__list__wrapper__item', 'g-muted')}>
              <div className="email__list__wrapper__item__top">
                <div className="email__list__wrapper__item__top__header">
                  <div>
                    <div>
                      {WANTED_HEADERS[idx]
                        .find((obj) => obj.name === 'From')!
                        .value.split(' ')[0]
                        .replace(/"/gi, ' ')}
                    </div>
                    <button>
                      <Icon icon="mdi:home" className={'inline-block w-4 h-4'}></Icon>
                    </button>
                    {item.labelIds.includes('UNREAD') && <span />}
                  </div>
                  <div className={cn('active')}>
                    {formatDistanceToNow(new Date(+item.internalDate), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="email__list__wrapper__item__top__subject">
                  {WANTED_HEADERS[idx].find((obj) => obj.name === 'Subject')!.value}
                </div>
              </div>
              <div className="email__list__wrapper__item__bottom">{item.snippet.substring(0, 300)}</div>
              {item.labelIds.length ? (
                <div className="email__list__wrapper__item__labels">
                  {item.labelIds
                    .filter(
                      (label) => !(label === 'INBOX' || label === 'UNREAD' || label === 'CATEGORY_UPDATES') && label,
                    )
                    .map((label: string) => (
                      <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                        {label}
                      </Badge>
                    ))}
                </div>
              ) : null}
            </div>
          ))}
      </div>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>['variant'] {
  if (['unread'].includes(label.toLowerCase())) {
    return 'default'
  }

  if (['UNREAD'].includes(label.toLowerCase())) {
    return 'outline'
  }

  return 'secondary'
}
