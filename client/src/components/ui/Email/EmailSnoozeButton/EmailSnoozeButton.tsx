import { Icon } from '@/assets'
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger, ToggleToolTipSpanWrapper } from '@/components/ui'
import { format } from 'date-fns'
import { EmailSnoozeButtonType, EmailSnoozeDropdownType, UseSnoozeMutateType } from './EmailSnoozeButton.types'
import { useSnoozeMutate } from '@/hooks'
import { snoozeActions } from '@/constants/Email/MailData'
import { useState } from 'react'
import { getSnoozeButtonStatus, RootState } from '@/context'
import { useSelector } from 'react-redux'

export const EmailSnoozeButton = ({ selectedThread }: EmailSnoozeButtonType) => {
  const { startMutation, date, setDate } = useSnoozeMutate({ selectedThreads: selectedThread })
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger
          asChild
          className="notion__minimal__text__editor__toolbar__pick__trigger"
        >
          <ToggleToolTipSpanWrapper
            disabled={!selectedThread.length}
            tip="Snooze"
            children={
              <>
                <Icon.clock />
              </>
            }
          />
        </PopoverTrigger>
        <EmailSnoozeDropdown
          setOpen={setOpen}
          startMutation={startMutation}
          date={date}
          setDate={setDate}
        />
      </Popover>
    </>
  )
}

export const EmailSnoozeDropdown = ({ startMutation, date, setDate, setOpen }: EmailSnoozeDropdownType) => {
  return (
    <PopoverContent className="notion__minimal__text__editor__toolbar__pick__content">
      <div className="email__snooze__content">
        <div className="email__snooze__content__left">
          <h4>Snooze until</h4>
          <div className="grid min-w-[250px] gap-1">
            {snoozeActions.map((action, idx) => (
              <Button
                key={idx}
                variant="ghost"
                onClick={() => setDate(action.action)}
              >
                {action.label}
                <span>{format(action.action, 'E, h:m b')}</span>
              </Button>
            ))}
            <Button
              onClick={() => {
                setOpen(false)
                startMutation.mutate()
              }}
            >
              Snooze
            </Button>
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
    </PopoverContent>
  )
}

export const SnoozeButtonMutateWireless = ({ selectedThreads }: UseSnoozeMutateType) => {
  const { startMutation, setDate, dispatch } = useSnoozeMutate({ selectedThreads: selectedThreads })
  const snoozeButtonStatus = useSelector((state: RootState) => state.email.snoozeButtonStatus)

  return (
    <Popover
      open={snoozeButtonStatus}
      onOpenChange={(state) => dispatch(getSnoozeButtonStatus(state))}
    >
      <PopoverTrigger
        onClick={() => dispatch(getSnoozeButtonStatus(true))}
        asChild
        className="notion__minimal__text__editor__toolbar__pick__trigger"
      >
        <ToggleToolTipSpanWrapper
          disabled={!selectedThreads.length}
          tip="Snooze"
          children={
            <>
              <Icon.clock />
            </>
          }
        />
      </PopoverTrigger>
      <EmailSnoozeDropdown
        startMutation={startMutation}
        date={new Date()}
        setDate={setDate}
        setOpen={() => dispatch(getSnoozeButtonStatus(false))}
      />
    </Popover>
  )
}
