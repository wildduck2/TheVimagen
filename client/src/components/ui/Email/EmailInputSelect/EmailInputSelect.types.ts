export type EmailinputSelectProps = {
  emails: string[]
  setEmails: React.Dispatch<React.SetStateAction<string[]>>
  side?: 'top' | 'right' | 'bottom' | 'left'
}
