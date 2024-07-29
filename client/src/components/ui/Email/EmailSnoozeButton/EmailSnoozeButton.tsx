import { Icon } from '@/assets'
import {
  Button,
  Calendar,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleToolTipSpanWrapper,
} from '@/components/ui'
import { format, parse } from 'date-fns'
import {
  EmailSnoozeButtonType,
  EmailSnoozeDropdownType,
  SnoozeButtonCustomTimeType,
  UseSnoozeMutateType,
} from './EmailSnoozeButton.types'
import { useDebounceCallback, useSnoozeMutate } from '@/hooks'
import { snoozeActions } from '@/constants/Email/MailData'
import { useCallback, useState } from 'react'
import { getSnoozeButtonStatus, RootState } from '@/context'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { cn } from '@/utils'
import { dateSchema } from '@/constants'

export const EmailSnoozeButton = ({ selectedThread }: EmailSnoozeButtonType) => {
  const [open, setOpen] = useState<boolean>(false)

  const { startMutation, date, setDate } = useSnoozeMutate({ selectedThreads: selectedThread })

  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
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
          <div>
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
            <SnoozeButtonCustomTime
              date={date}
              setDate={setDate}
            />
            <Button
              size="sm"
              onClick={() => {
                setOpen(false)
                startMutation.mutate()
              }}
            >
              <Icon.alarm /> <span> Snooze</span>
            </Button>
          </div>
        </div>
        <div className="email__snooze__content__right">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(e) => {
              const date = new Date(e)
              if (!(date.getTime() >= new Date().getTime())) return toast.error('Date is in the past, please try again')
              setDate(date)
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
  const { startMutation, setDate, dispatch, date } = useSnoozeMutate({ selectedThreads: selectedThreads })
  const { snoozeButtonStatus: snoozeButtonStatus, onTheFlyAction: onTheFlySnooze } = useSelector(
    (state: RootState) => state.email.snoozeButtonStatus,
  )

  return (
    <Popover
      open={snoozeButtonStatus}
      onOpenChange={(state) => dispatch(getSnoozeButtonStatus({ snoozeButtonStatus: onTheFlySnooze ? !state : state }))}
    >
      <PopoverTrigger
        onClick={() => dispatch(getSnoozeButtonStatus({ snoozeButtonStatus: true, onTheFlyAction: false }))}
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
        date={date}
        setDate={setDate}
        setOpen={() => dispatch(getSnoozeButtonStatus({ snoozeButtonStatus: false, onTheFlyAction: false }))}
      />
    </Popover>
  )
}

export const SnoozeButtonCustomTime = ({ date, setDate }: SnoozeButtonCustomTimeType) => {
  const [customDate, setCustomDate] = useState<Date>(new Date())
  const [error, setError] = useState<boolean>(false)

  const debouncedSetCustomDate = useDebounceCallback((value: string) => {
    setCustomDate(parse(value, 'PPpp', new Date()))
  }, 500)

  const onChangeDate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetCustomDate(e.target.value)
    },
    [debouncedSetCustomDate],
  )

  const applyDate = () => {
    const date = dateSchema.safeParse(customDate)
    if (!date.success) return toast.error('Invalid date, please try again')

    const now = new Date()
    if (!(date.data.getDate() >= now.getDate())) {
      setError(true)
      return toast.error('Date is in the past, please try again')
    }

    if (error) setError(false)
    toast.success('Date set successfully')
    setDate(date.data)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="custom__time__trigger"
        >
          <Icon.calenderEdit /> Custom Time
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="custom__time__content"
      >
        <div>
          <div>
            <h4>Custom Time</h4>
            <p>Select a date and time</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              defaultValue={format(new Date(date), 'PPpp')}
              onChange={onChangeDate}
              className={cn(error ? 'error' : '')}
            />
            <Button
              size="sm"
              onClick={() => applyDate()}
            >
              Apply
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
