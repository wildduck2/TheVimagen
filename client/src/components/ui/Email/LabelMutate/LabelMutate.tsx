import { Icon } from '@/assets'
import { IEmail } from 'gmail-api-parse-message-ts'
import {
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleToolTipSpanWrapper,
} from '../..'
import { UseLabelMutate, useLabelQuery } from '@/hooks'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Check } from 'lucide-react'
import { cn } from '@/utils'
import { useState } from 'react'

export type ModifyLabelProps = {
  threads: IEmail[]
}

export const LabelMutate = ({ threads }: ModifyLabelProps) => {
  const { startMutation, threadsIds } = UseLabelMutate({ threads })

  return (
    <>
      <Popover
      // open={open}
      // onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <ToggleToolTipSpanWrapper
            // disabled={!threads.length}
            tip={'Label as'}
            children={
              <>
                <Icon.tags />
              </>
            }
          />
        </PopoverTrigger>
        <LabelMutateContent />
      </Popover>
    </>
  )
}

export const LabelMutateContent = () => {
  const { labelQueryReq: labelQuery } = useLabelQuery()
  const excludedLabels = ['CHAT', 'SENT', 'INBOX', 'IMPORTANT', 'DRAFT', 'SPAM', 'STARRED', 'UNREAD', 'TRASH']

  const labels = labelQuery.data?.filter((label) => !excludedLabels.includes(label.name))
  console.log(labels)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  return (
    <PopoverContent className="label__content">
      <div className="label__content__wrapper">
        <div>
          <h4>Assign Label</h4>
          <p>Select label to assign to emails</p>
        </div>
        <div>
          <div>
            <Input placeholder="Serach for label" />
          </div>
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <ScrollArea className="label__content__wrapper__scroll">
              <CommandGroup>
                {labels &&
                  labels?.map((label, idx) => {
                    return (
                      <CommandItem
                        key={idx}
                        // value={(label.name as string).slice(label.name.indexOf('_') + 1, -1)}
                        // onSelect={(currentValue) => {
                        //   setValue(currentValue === value ? '' : currentValue)
                        //   // setOpen(false)
                        // }}
                      >
                        ///
                        {
                          //<Check className={cn('mr-2 h-4 w-4', value === label.name ? 'opacity-100' : 'opacity-0')} />
                          //(label.name as string).slice(label.name.indexOf('_') + 1, -1)
                        }
                      </CommandItem>
                    )
                  })}
              </CommandGroup>
            </ScrollArea>
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

export type LabelMutateWirelessProps = {
  threads: IEmail[]
}

export const LabelMutateWireless = ({ threads }: LabelMutateWirelessProps) => {
  return (
    <Popover
    // open={open}
    // onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <ToggleToolTipSpanWrapper
          disabled={!threads.length}
          tip="Snooze"
          children={
            <>
              <Icon.clock />
            </>
          }
        />
      </PopoverTrigger>
    </Popover>
  )
}
