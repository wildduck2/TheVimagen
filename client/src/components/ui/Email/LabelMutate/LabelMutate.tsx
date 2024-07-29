import { Icon } from '@/assets'
import { IEmail } from 'gmail-api-parse-message-ts'
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  LabelMutateContentProps,
  LabelMutateWirelessProps,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  ToggleToolTipSpanWrapper,
} from '../..'
import { UseLabelMutate, useLabelQuery } from '@/hooks'
import { useEffect, useState } from 'react'

import { Check } from 'lucide-react'
import { cn } from '@/utils'
import { getLabelButtonStatus, getLabelModificationSelected, RootState } from '@/context'
import { useDispatch, useSelector } from 'react-redux'

export type ModifyLabelProps = {
  threads: IEmail[]
}

export const LabelMutate = ({ threads }: ModifyLabelProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <ToggleToolTipSpanWrapper
            disabled={!threads.length}
            tip={'Label as'}
            className={'active'}
            children={
              <>
                <Icon.tags />
              </>
            }
          />
        </PopoverTrigger>
        <LabelMutateContent
          move={false}
          threads={threads}
          setOpen={() => setOpen(false)}
        />
      </Popover>
    </>
  )
}

export const LabelMutateContent = ({ threads, setOpen, move }: LabelMutateContentProps) => {
  const { startMutation } = UseLabelMutate({ threads })
  const { labelQueryReq: labelQuery } = useLabelQuery()
  const { label } = useSelector((state: RootState) => state.email.labelModificationSelected)
  const dispatch = useDispatch()

  const excludedLabels = [
    'CHAT',
    'SENT',
    'INBOX',
    'IMPORTANT',
    'DRAFT',
    'SPAM',
    'TRASH',
    'STARRED',
    'UNREAD',
    'CATEGORY_PERSONAL',
  ]
  const labels = labelQuery.data?.filter((label) => !excludedLabels.includes(label.name))
  const labelsMove = labelQuery.data?.filter(
    (label) => !excludedLabels.includes(label.name) || label.name === 'SPAM' || label.name === 'TRASH',
  )

  const onselectHandler = (currentValue: string) => {
    dispatch(
      getLabelModificationSelected({
        label: labels?.find((label) => label.name === currentValue),
        type: threads.some((thread) => thread.labelIds?.includes(currentValue)) ? 'remove' : 'add',
      }),
    )
    setOpen()
  }

  useEffect(() => {
    label && startMutation.mutate()
  }, [label])

  return (
    <PopoverContent className="label__content">
      <div className="label__content__wrapper">
        <div>
          <h4>{move ? 'Move to' : 'Assign Label'}</h4>
          <p>{move ? 'Select label to move to' : 'Select label to assign'}</p>
        </div>
        <div>
          <Command className="w-full">
            <CommandInput placeholder="Type a label or search..." />
            <CommandList>
              <CommandEmpty>No labels found.</CommandEmpty>
              <CommandGroup heading="Labels">
                <ScrollArea className="label__content__wrapper__scroll">
                  {move
                    ? labelsMove?.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={onselectHandler}
                          data-disabled={false}
                          aria-selected={label?.name === item.name}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              threads.some((thread) => thread.labelIds?.includes(item.name))
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {item.name.slice(item.name.indexOf('_') + 1).toLowerCase()}
                        </CommandItem>
                      ))
                    : labels?.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={onselectHandler}
                          data-disabled={false}
                          aria-selected={label?.name === item.name}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              threads.some((thread) => thread.labelIds?.includes(item.name))
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {item.name.slice(item.name.indexOf('_') + 1).toLowerCase()}
                        </CommandItem>
                      ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
          >
            <Icon.plus className="size-4" />
            <span>create label</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
          >
            <Icon.settings className="size-4" />
            <span>Maneage label</span>
          </Button>
        </div>
      </div>
    </PopoverContent>
  )
}

export const LabelMutateWireless = ({ threads }: LabelMutateWirelessProps) => {
  const {
    labelButtonStatus: labelButtonStatuasa,
    onTheFlyAction: onTheFlySnooze,
    move,
  } = useSelector((state: RootState) => state.email.labelButtonStatus)
  const dispatch = useDispatch()

  return (
    <Popover
      open={labelButtonStatuasa}
      onOpenChange={(state) =>
        dispatch(
          getLabelButtonStatus({
            labelButtonStatus: onTheFlySnooze ? !state : state,
            move: onTheFlySnooze && move ? true : false,
          }),
        )
      }
    >
      <PopoverTrigger asChild>
        <ToggleToolTipSpanWrapper
          disabled={!threads.length}
          tip="Snooze"
          value={labelButtonStatuasa ? true : false}
          children={
            <>
              <Icon.tags />
            </>
          }
        />
      </PopoverTrigger>
      <LabelMutateContent
        threads={threads}
        setOpen={() => dispatch(getLabelButtonStatus({ labelButtonStatus: false, onTheFlyAction: false, move: false }))}
        move={move}
      />
    </Popover>
  )
}
