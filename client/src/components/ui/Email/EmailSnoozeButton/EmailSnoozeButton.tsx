import { Icon } from '@/assets'
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui'
import { addDays, addHours, format, nextSaturday } from 'date-fns'
import { useState } from 'react'
import { EmailSnoozeButtonType } from './EmailSnoozeButton.types'

export const EmailSnoozeButton = ({ emailSelectedId }: EmailSnoozeButtonType) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const today = new Date()
  const laterThisDay = addHours(today, 4)
  const tomorrow = addDays(today, 1)
  const thisWeekend = nextSaturday(today)
  const nextWeek = addDays(today, 7)

  return (
    <>
      <Tooltip>
        <Popover>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                className="email__snooze__button"
                variant="ghost"
                size="icon"
                disabled={!emailSelectedId.length}
              >
                <Icon.clock />
                <span>Snooze</span>
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <PopoverContent className="email__snooze__content">
            <div className="email__snooze__content__left">
              <h4>Snooze until</h4>
              <div className="grid min-w-[250px] gap-1">
                <Button
                  variant="ghost"
                  onClick={() => setDate(laterThisDay)}
                >
                  Later today
                  <span>{format(laterThisDay, 'E, h:m b')}</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setDate(tomorrow)}
                >
                  Tomorrow
                  <span>{format(tomorrow, 'E, h:m b')}</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setDate(thisWeekend)}
                >
                  This weekend
                  <span>{format(thisWeekend, 'E, h:m b')}</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setDate(nextWeek)}
                >
                  Next week
                  <span>{format(nextWeek, 'E, h:m b')}</span>
                </Button>
              </div>
            </div>
            <div className="email__snooze__content__right">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="email__snooze__content__right__calendar"
              />
            </div>
          </PopoverContent>
        </Popover>
        <TooltipContent>Snooze</TooltipContent>
      </Tooltip>
    </>
  )
}
