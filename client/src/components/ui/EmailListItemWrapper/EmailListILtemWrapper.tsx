import { useDispatch, useSelector } from 'react-redux'

import { getSelectedEmailIdDispatch, RootState } from '@/context'
import { cn } from '@/utils'
import { EmailListITemWrapperType } from './EmailListILtemWrapper.types'

export const EmailListITemWrapper = ({ children, ids, item }: EmailListITemWrapperType) => {
  const emailSelectedId = useSelector((state: RootState) => state.email.selectedEmailId)
  const dispatch = useDispatch()

  return (
    <div
      key={item.id}
      className={cn('email__list__wrapper__item', emailSelectedId[0] === ids[0] && 'bg-muted')}
      onClick={() => {
        emailSelectedId[0] !== ids[0] && dispatch(getSelectedEmailIdDispatch(ids))
      }}
    >
      {children}
    </div>
  )
}
