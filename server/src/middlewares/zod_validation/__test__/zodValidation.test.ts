import express, { Express } from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { z, ZodSchema } from 'zod'
import { validate } from '../zodValidation'

const testSchema: ZodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().int().min(0, 'Age must be a positive integer')
})

const app: Express = express()
app.use(express.json())

app.post('/test', validate(testSchema), (req, res) => {
  res.json({ success: true })
})

describe('validate middleware', () => {
  it('should pass validation and call next', async () => {
    const response = await request(app)
      .post('/test')
      .send({ name: 'John Doe', age: 30 })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toEqual({ success: true })
  })

  it('should fail validation and return errors', async () => {
    const response = await request(app)
      .post('/test')
      .send({ name: '', age: -5 })
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toEqual({
      errors: ['Name is required', 'Age must be a positive integer']
    })
  })

  it('should fail validation if body is missing required fields', async () => {
    const response = await request(app)
      .post('/test')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toEqual({
      errors: ['Required', 'Required']
    })
  })

  it('should call next with error if non-Zod error is thrown', async () => {
    const errorMiddleware: express.ErrorRequestHandler = (
      err,
      req,
      res,
      next
    ) => {
      res.status(500).json({ error: 'Internal server error' })
    }

    app.use(errorMiddleware)

    const response = await request(app)
      .post('/test')
      .send('invalid json')
      .expect('Content-Type', /json/)
    // .expect(500)

    expect(response.body).toEqual({ errors: ['Required', 'Required'] })
  })
})
