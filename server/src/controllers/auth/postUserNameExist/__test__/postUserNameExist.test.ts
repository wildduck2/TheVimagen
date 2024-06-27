import express, { type Express } from 'express'
import session from 'express-session'
import { describe, it, vi, Mock, expect } from 'vitest'
import request from 'supertest'
import { prisma } from '../../../../utils'
import { postUserNameExist } from '../postUserNameExist'
import { Prisma } from '@prisma/client'

const app: Express = express()
app.use(express.json())
app.use(
  session({
    secret: 'testsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 70 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: false
    }
  })
)
app.post('/auth/userNameExist', postUserNameExist)

vi.mock('../../../../utils', () => ({
  prisma: {
    user: {
      findUnique: vi.fn()
    }
  }
}))

describe('userNameExist', () => {
  it('should return error if the user name does not exist', async () => {
    ;(prisma.user.findUnique as Mock).mockResolvedValue(null)

    const response = await request(app)
      .post('/auth/userNameExist')
      .send({ userName: 'nonexistentuser' })

    expect(response.body).toEqual({
      user: null,
      error: 'User does not exist',
      valid: true
    })
    expect(response.status).toBe(200)
  })

  it('should return user if the user exists', async () => {
    const mockUser = { id: '123', userName: 'existentuser' }
    ;(prisma.user.findUnique as Mock).mockResolvedValue(mockUser)

    const response = await request(app)
      .post('/auth/userNameExist')
      .send({ userName: 'existentuser' })

    expect(response.body).toEqual({
      user: mockUser,
      error: null,
      valid: false
    })
    expect(response.status).toBe(200)
  })

  it('should handle other errors', async () => {
    ;(prisma.user.findUnique as Mock).mockRejectedValue(new Error('Some error'))

    const response = await request(app)
      .post('/auth/userNameExist')
      .send({ userName: 'anyuser' })

    expect(response.body).toEqual({
      user: null,
      error: 'Internal Server Error',
      valid: false
    })
    expect(response.status).toBe(500)
  })
})
