import { useEffect, useState } from 'react'
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Button,
  CommandDialog,
} from '../../ui'
import { TheDialogagenPops } from './TheDialogagen.types'
import React from 'react'
import { Icon } from '@/assets'

const TheDialogagen: React.FC<TheDialogagenPops> = ({ keyValue }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === keyValue && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Button
        className="text-[.8rem] px-3 text-muted-foreground bg-zinc-900 h-7 hover:bg-zinc-800"
        onClick={() => setOpen(true)}
      >
        {/* <input type="text" disabled/> */}
        <Icon.search className=" text-sm mr-2 h-4 w-4 shrink-0 opacity-50 pointer-events-none" />
        <input type="text" disabled placeholder="Search..." className="max-w-[150px] pointer-events-none" />
        <div className="text-lg pointer-events-none flex items-center">
          <Icon.commandKey className="size-[18px]" />
          <span className="-mt-[.2rem] ml-[.1rem] font-normal">{keyValue}</span>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Icon.calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Icon.smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Icon.calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Icon.user className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon.creditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icon.settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export { TheDialogagen }
