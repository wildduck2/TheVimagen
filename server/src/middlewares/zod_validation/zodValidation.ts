import type { zodObject } from '../../constants'
import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'

export const validate = (schema: ZodSchema<zodObject>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((e) => e.message)
        return res.status(400).json({ errors })
      }
      next(error)
    }
  }
}
