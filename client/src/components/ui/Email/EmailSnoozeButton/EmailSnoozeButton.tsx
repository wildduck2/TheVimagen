import { Icon } from '@/assets'
import { Button, Calendar, NotionMinimalTextEditorToolbarPick, ToggleToolTipSpanWrapper } from '@/components/ui'
import { addDays, addHours, addMonths, format, nextSaturday } from 'date-fns'
import { useState } from 'react'
import { EmailSnoozeButtonType } from './EmailSnoozeButton.types'
import { snoozeEmail } from '@/utils'

export const EmailSnoozeButton = ({ selectedThread }: EmailSnoozeButtonType) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const today = new Date()
  const laterThisDay = addHours(today, 4)
  const tomorrow = addDays(today, 1)
  const thisWeekend = nextSaturday(today)
  const nextWeek = addDays(today, 7)
  const nextMonth = addMonths(today, 1)

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
                <Button onClick={() => snoozeEmail({ date, threads: selectedThread })}> Snooze</Button>
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
