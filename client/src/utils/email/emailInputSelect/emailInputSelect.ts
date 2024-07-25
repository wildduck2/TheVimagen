import { emailSchema } from '@/constants'
import { toast } from 'sonner'
import { HandleAddEmailSubmitProps, HandleRemoveEmailProps } from './emailInputSelect.types'

export const handleAddEmailSubmit = ({ emailRef, setEmails, emails }: HandleAddEmailSubmitProps) => {
  const email = emailRef?.current.value.trim()
  if (email.length <= 0) return
  const parsedEmail = validateEmail(email)

  if (parsedEmail.success) {
    setEmails([...emails, email])
    toast.success('Event has been created', {
      duration: 1000,
    })
    emailRef.current.value = ''
  } else {
    toast.error('Please provide valid email!!', {
      duration: 1000,
    })
  }
}

export const handleRemoveEmail = ({ emails, idx, setEmails }: HandleRemoveEmailProps) => {
  console.log('hi')

  setEmails(emails.filter((_, i) => i !== idx))
}

export const validateEmail = (email: string) => {
  return emailSchema.safeParse(email)
}
