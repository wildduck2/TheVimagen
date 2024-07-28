import { UseMutationResult } from '@tanstack/react-query'
import { IEmail } from 'gmail-api-parse-message-ts'

export type EmailSnoozeButtonType = {
  selectedThread: IEmail[]
}
export type EmailSnoozeDropdownType = {
  date: Date
  startMutation: UseMutationResult<
    [
      {
        id: string
        threadId: string
        labelIds: string[]
      },
    ],
    Error,
    void,
    unknown
  >
  setDate: React.Dispatch<React.SetStateAction<Date>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type UseSnoozeMutateType = {
  selectedThreads: IEmail[]
}
