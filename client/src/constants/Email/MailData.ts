import { Icon, IconType } from '@/assets'
import { addDays, addHours, nextSaturday } from 'date-fns'

export type EmailReplyButtonOptions = {
  label: string
  icon: ({ className }: IconType) => JSX.Element
}

export const emailReplyButtonOptions: EmailReplyButtonOptions[] = [
  {
    label: 'Reply',
    icon: Icon.reply,
  },
  {
    label: 'Forward To',
    icon: Icon.forward,
  },
  {
    label: 'Edit Subject',
    icon: Icon.pencil,
  },
]

const today = new Date()

export const snoozeActions = [
  {
    label: 'Later today',
    action: addHours(today, 4),
  },
  {
    label: 'Tomorrow',
    action: addDays(today, 1),
  },
  {
    label: 'This weekend',
    action: nextSaturday(today),
  },
  {
    label: 'Next week',
    action: addDays(today, 7),
  },
]
