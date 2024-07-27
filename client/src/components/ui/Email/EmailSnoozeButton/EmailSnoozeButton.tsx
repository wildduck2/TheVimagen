import { Icon } from '@/assets'
import {
  Button,
  Calendar,
  NotionMinimalTextEditorToolbarPick,
  PaginatedMessages,
  ToggleToolTipSpanWrapper,
} from '@/components/ui'
import { addDays, addHours, addMonths, format, nextSaturday } from 'date-fns'
import { useState } from 'react'
import { EmailSnoozeButtonType } from './EmailSnoozeButton.types'
import { getCookie, snoozeEmail } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryClient } from '@/main'
import { getSelectedEmailDispatch } from '@/context'
import { useDispatch } from 'react-redux'

export const EmailSnoozeButton = ({ selectedThread }: EmailSnoozeButtonType) => {
  const currentQueryKey = JSON.parse(getCookie('query:key')) || ['primary', { q: 'label:inbox category:primary' }]
  const threadIds = selectedThread.map((item) => item.threadId)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const dispatch = useDispatch()

  const today = new Date()
  const laterThisDay = addHours(today, 4)
  const tomorrow = addDays(today, 1)
  const thisWeekend = nextSaturday(today)
  const nextWeek = addDays(today, 7)
  const nextMonth = addMonths(today, 1)

  const mutation = useMutation({
    mutationKey: ['snoozeEmail'],
    mutationFn: () => snoozeEmail({ date, threads: selectedThread }),
    onSuccess: () => {
      queryClient.setQueryData<PaginatedMessages>(currentQueryKey, (oldData) => {
        if (!oldData) return { pages: [], pageParams: [] }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            messages: page.messages.filter((message) => !threadIds.includes(message.threadId)),
          })),
        }
      })

      toast.success('Thread is snoozed successfully')
      dispatch(getSelectedEmailDispatch([]))
    },
    onError: () => {
      toast.error('Thread is not snoozed')
    },
  })

  const actions = [
    {
      label: 'Later today',
      action: laterThisDay,
    },
    {
      label: 'Tomorrow',
      action: tomorrow,
    },
    {
      label: 'This weekend',
      action: thisWeekend,
    },
    {
      label: 'Next week',
      action: nextWeek,
    },
    {
      label: 'Next month',
      action: nextMonth,
    },
  ]

  return (
    <>
      <NotionMinimalTextEditorToolbarPick
        trigger={
          <ToggleToolTipSpanWrapper
            disabled={!selectedThread.length}
            tip="Snooze"
            children={
              <>
                <Icon.clock />
              </>
            }
          />
        }
        content={
          <div className="email__snooze__content">
            <div className="email__snooze__content__left">
              <h4>Snooze until</h4>
              <div className="grid min-w-[250px] gap-1">
                {actions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    onClick={() => setDate(action.action)}
                  >
                    {action.label}
                    <span>{format(action.action, 'E, h:m b')}</span>
                  </Button>
                ))}
                <Button onClick={() => mutation.mutate()}> Snooze</Button>
              </div>
            </div>
            <div className="email__snooze__content__right">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(e) => {
                  const date = new Date(e)
                  if (date.getTime() >= new Date().getTime()) {
                    setDate(date)
                  }
                }}
                fromDate={new Date()}
                className="email__snooze__content__right__calendar"
              />
            </div>
          </div>
        }
      />
    </>
  )
}
