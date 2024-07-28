import { Icon } from '@/assets'
import { IEmail } from 'gmail-api-parse-message-ts'
import { Input, Popover, PopoverContent, PopoverTrigger, ToggleToolTipSpanWrapper } from '../..'
import { UseLabelMutate } from '@/hooks'

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
  return (
    <PopoverContent className="w-80">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
        <div className="grid gap-2">
          <div>
            <Input placeholder="Serach for label" />
          </div>

          <div>
            <Input placeholder="Serach for label" />
          </div>
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
