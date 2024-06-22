import express, { type Express } from 'express'
import request from 'supertest'
import bcrypt from 'bcrypt'
import { prisma } from '../../../../utils'
import { User } from '../../../../modles'
import { vi, it, Mock, beforeEach, describe, expect } from 'vitest'
import { postSigninAuthHandler } from '../postSigninAuthHandler'

const app: Express = express()
app.use(express.json())
app.post('/auth/signin-email', postSigninAuthHandler)

vi.mock('bcrypt')
vi.mock('../../../../modles')
vi.mock('../../../../utils', () => ({
  prisma: {
    user: { findUnique: vi.fn() }
  }
}))

describe('postSigninAuthHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return error if the user does not exist', async () => {
    ;(prisma.user.findUnique as Mock).mockResolvedValue(null)

    const response = await request(app)
      .post('/auth/signin-email')
      .send({ email: 'doexist@gmail.com', password: '12345Aas*sdf' })

    expect(response.body).toEqual({
      user: null,
      error: 'User does not exist'
    })
  })

  it('should return error if the password encryption fails', async () => {
    ;(prisma.user.findUnique as Mock).mockResolvedValue({
      id: '123',
      email: 'doexist@gmail.com'
    })
    ;(bcrypt.compare as Mock).mockResolvedValue(false)

    const response = await request(app)
      .post('/auth/signin-email')
      .send({ email: 'doexist@gmail.com', password: '12345Aas*sdf' })

    expect(response.status).toEqual(401)
    expect(response.body).toEqual({
      error: 'Unvalid Credintial password!',
      user: null
    })
  })

  it('should return error if the session has not created', async () => {
    const res = {
      session: {
        error: {},
        user: null
      }
    }
    ;(prisma.user.findUnique as Mock).mockResolvedValue({
      id: '123',
      email: 'doexist@gmail.com'
    })
    ;(bcrypt.compare as Mock).mockResolvedValue(true)
    ;(User.findSesssionIfNotCreateOne as Mock).mockRejectedValue(null)

    const response = await request(app).post('/auth/signin-email').send({
      email: 'doexist@gmail.com',
      password: '123423Ansdfl'
    })

    expect(response.body).toEqual(res.session)
    // expect(User.findSesssionIfNotCreateOne).toHaveBeenCalledWith({
    //   userId: '123',
    //   session: expect.any(Object),
    //   expiresAt: expect.any(Date),
    //   sessionId: expect.any(String)
    // })
  })

  it('should return user if signin has worked well', async () => {
    ;(prisma.user.findUnique as Mock).mockResolvedValue({
      id: '123',
      email: 'doexist@gmail.com'
    })
    ;(bcrypt.compare as Mock).mockResolvedValue(true)
    ;(User.findSesssionIfNotCreateOne as Mock).mockResolvedValue({ error: {} })

    const response = await request(app)
      .post('/auth/signin-email')
      .send({ email: 'doexist@gmail.com', password: '123455Aa*&&' })

    expect(response.body).toEqual({
      error: {},
      user: null
    })
  })
})
