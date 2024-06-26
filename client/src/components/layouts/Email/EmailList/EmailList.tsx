import { ComponentProps } from 'react'

import { Badge, ScrollArea } from '@/components/ui'
import { cn } from '@/utils'
import { EmailListProps } from './EmailList.types'

//FIX: should fetch data instead of this dumby data
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useMail } from '@/components/pages/Email/useEmail'

export function EmailList({ items }: EmailListProps) {
  const [mail, setMail] = useMail()

  return (
    <ScrollArea className="email__list">
      <div className="email__list__wrapper">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn('email__list__wrapper__item', mail.selected === item.id && 'bg-muted')}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            <div className="email__list__wrapper__item__top">
              <div className="email__list__wrapper__item__top__header">
                <div>
                  <div>{item.name}</div>
                  {!item.read && <span />}
                </div>
                <div className={cn(mail.selected === item.id && 'active')}>
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="email__list__wrapper__item__top__subject">{item.subject}</div>
            </div>
            <div className="email__list__wrapper__item__bottom">{item.text.substring(0, 300)}</div>
            {item.labels.length ? (
              <div>
                {item.labels.map((label: string) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(label.toLowerCase())) {
    return 'default'
  }

  if (['personal'].includes(label.toLowerCase())) {
    return 'outline'
  }

  return 'secondary'
}
