import { EmailData } from '@/constants/Email/MailData'

export interface EmailDisplayProps {
  mail: EmailData | null
  defaultLayout: number
}
