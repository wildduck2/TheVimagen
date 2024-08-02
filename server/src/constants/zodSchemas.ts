import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodIssue, ZodSchema, z } from 'zod'

//NOTE: ZOD SCHEMAS
export const emailShcema = z.object({
  email: z.string().email()
})
export const emailPasswordSchema = emailShcema.extend({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(32, { message: 'Password cannot be longer than 32 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter'
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter'
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number'
    })
    .regex(/[\W_]/, {
      message: 'Password must contain at least one special character'
    })
})

export const userNameShcema = z.object({
  user_name: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(32, { message: 'Password cannot be longer than 32 characters' })
})

export const emailPasswordUserNameSchema =
  emailPasswordSchema.merge(userNameShcema)

export const optUserIdSchema = z.object({
  otp: z.string(),
  user_id: z.string()
})

export const userData = z.object({
  bio: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  user_id: z.string(),
  profession: z.string(),
  pronounce: z.string(),
  age: z
    .number()
    .min(18, { message: 'Password must be at least 18 characters long' }),
  years_of_experience: z
    .number()
    .min(0, { message: 'Password must be at least 0 characters long' })
})

export type zodObject =
  | z.infer<typeof emailShcema>
  | z.infer<typeof userNameShcema>
  | z.infer<typeof emailPasswordSchema>
  | z.infer<typeof emailPasswordUserNameSchema>
  | z.infer<typeof userData>
  | z.infer<typeof optUserIdSchema>

// Extending ZodIssue to make some fields optional
type ExtendedZodIssue = Omit<ZodIssue, 'path' | 'expected' | 'received'> & {
  path?: unknown[]
  expected?: unknown
  received?: unknown
}

export const validate = (schema: ZodSchema<zodObject>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(
          (e: ExtendedZodIssue) =>
            `Error: ${e.code}! expected:(${e.expected}) and received:(${e.received}) at ${e.path![0]}`
        )
        return res.status(400).json({ errors })
      }
      next(error)
    }
  }
}
