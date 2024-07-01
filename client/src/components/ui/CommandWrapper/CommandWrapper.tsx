import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../Command'
import { Button } from '../Button'
import { cn } from '@/utils'
import { CommandWrapperType } from './CommandWrapper.types'
import { Label } from '../Label'
import { Icon } from '@/assets'

export const CommandWrapper: React.FC<CommandWrapperType> = ({
  data,
  className,
  title,
  value,
  setValue,
  disabled,
  error,
}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div className={className}>
        <Label htmlFor={title}>{title}</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              role="combobox"
              aria-expanded={open}
              className={`${error ? 'bg-red-700/5 border-red-700/35' : ''} "w-[200px] justify-between capitalize`}
            >
              {value ? value : 'Select data...'}
              <Icon.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 h-[345px]" id={title}>
            <Command>
              <CommandInput placeholder="Search one..." required />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup className="overflow-y-scroll">
                  {data.map((el) => (
                    <CommandItem
                      key={el}
                      value={el}
                      onSelect={() => {
                        setValue(el)
                        setOpen(false)
                      }}
                    >
                      <Icon.check className={cn('mr-2 h-4 w-4', value === el ? 'opacity-100' : 'opacity-0')} />
                      {el}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
