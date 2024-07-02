import { Icon } from '@/assets'
import { Badge } from '@/components/ui'
import { getSelectedEmailIdDispatch, RootState } from '@/context'
import { cn, getThread, MessageType } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ComponentProps } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export type EmailListItemType = {
  item: MessageType
}

export const EmailListItem = ({ item }: EmailListItemType) => {
  const emailSelectedId = useSelector((state: RootState) => state.email.selectedEmailId)
  const dispatch = useDispatch()

  const WANTED_HEADERS = item.payload.headers.filter(
    (head) => head.name === 'Subject' || head.name === 'From' || head.name === 'To',
  )

  return (
    //TODO: you have to make the select item
    <>
      <div
        key={item.id}
        className={cn('email__list__wrapper__item', emailSelectedId === item.id && 'bg-muted')}
        onClick={() => {
          dispatch(getSelectedEmailIdDispatch(item.id))
          // refetch()
        }}
      >
        <div className="email__list__wrapper__item__top">
          <div className="email__list__wrapper__item__top__header">
            <div>
              <div>
                {WANTED_HEADERS.find((obj) => obj.name === 'From')!
                  .value.split(' ')[0]
                  .replace(/"/gi, ' ')}
              </div>
              <button>
                {item.labelIds.includes('STARRED') ? (
                  <Icon.filledStar className="size-[1rem]" />
                ) : (
                  <Icon.fiStar className="size-[1rem]" />
                )}
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
            {WANTED_HEADERS.find((obj) => obj.name === 'Subject')!.value}
          </div>
        </div>
        <div className="email__list__wrapper__item__bottom">{item.snippet.substring(0, 300)}</div>
        {item.labelIds.length ? (
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
        ) : null}
      </div>
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
