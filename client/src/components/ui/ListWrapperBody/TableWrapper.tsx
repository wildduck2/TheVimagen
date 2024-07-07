import { cn, MessageType, slectUserHandler, toggleSelectAllUsersHandler } from '@/utils'
import { CheckboxWrapper, users, Users } from '../'
import { HtmlHTMLAttributes, useState } from 'react'
import { EmailListItem } from '@/components/layouts'

export interface TableWrapperType extends HtmlHTMLAttributes<HTMLDivElement> {
  items: MessageType[][]
}
export const TableWrapper = ({ items, className }: TableWrapperType) => {
  return (
    <>
      <div className={cn(className)}>
        <div className={cn(`${className}__body`)}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className={cn(`${className}__body__row`)}
              // data-slected={users[idx].selected ? 'selected' : ''}
            >
              <EmailListItem item={item[0]} items={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
