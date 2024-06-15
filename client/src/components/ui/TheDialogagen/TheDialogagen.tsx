import { useEffect, useState } from 'react'
import { MdKeyboardCommandKey } from 'react-icons/md'
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
import { Calculator, Calendar, CreditCard, Search, Settings, Smile, User } from 'lucide-react'
import { TheDialogagenPops } from './TheDialogagen.types'
import React from 'react'

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
        <Search className=" text-sm mr-2 h-4 w-4 shrink-0 opacity-50 pointer-events-none" />
        <input type="text" disabled placeholder="Search..." className="max-w-[150px] pointer-events-none" />
        <div className="text-lg pointer-events-none flex items-center">
          <MdKeyboardCommandKey size={13} />
          <span className="-mt-[.2rem] ml-[.1rem] font-normal">{keyValue}</span>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
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
