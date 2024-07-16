import { Icon, IconType } from '@/assets'

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
