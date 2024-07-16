import { emailSchema } from '@/constants'
import { toast } from 'sonner'
import { HandleAddEmailSubmitProps, HandleRemoveEmailProps } from './emailInputSelect.types'

export const handleAddEmailSubmit = ({ e, email, setEmails, emails }: HandleAddEmailSubmitProps) => {
  e.preventDefault()
  if (email.length <= 0) return
  const parsedEmail = validateEmail(email)

  if (parsedEmail.success) {
    setEmails([...emails, email])
    toast.success('Event has been created')
  } else {
    toast.error('Please provide valid email!!')
  }
}

export const handleRemoveEmail = ({ emails, idx, setEmails }: HandleRemoveEmailProps) => {
  setEmails(emails.filter((_, i) => i !== idx))
}

export const validateEmail = (email: string) => {
  return emailSchema.safeParse(email)
}
