import { ModifyThreadType } from '@/utils'
import { UseMutationResult } from '@tanstack/react-query'
import { IEmail } from 'gmail-api-parse-message-ts'

export type EmailSnoozeButtonType = {
  selectedThread: IEmail[]
}
export type EmailSnoozeDropdownType = {
  date: Date
  startMutation: UseMutationResult<ModifyThreadType[], Error, void, unknown>
  setDate: React.Dispatch<React.SetStateAction<Date>>
  setOpen: () => void
}

export type UseSnoozeMutateType = {
  selectedThreads: IEmail[]
}

export type SnoozeButtonCustomTimeType = {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}
