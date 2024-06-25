import { z } from 'zod'

export const emailSchema = z.string().email()
export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(32, { message: 'Password cannot be longer than 32 characters' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[\W_]/, { message: 'Password must contain at least one special character' })

export const zodCreditValidation = (email: string, password: string) => {
  const validEmail = emailSchema.parse(email)
  const validPassword = passwordSchema.parse(password)

  return { validEmail, validPassword } as const
}
