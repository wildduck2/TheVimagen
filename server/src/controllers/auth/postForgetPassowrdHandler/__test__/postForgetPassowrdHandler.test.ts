import express, { Express } from 'express'
import { User } from '../../../../modles/User/User'
import { describe, it, vi, Mock, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { postForgetPassowrdHandler } from '../postForgetPassowrdHandler'

const app: Express = express()
app.use(express.json())
app.post('/forget-password', postForgetPassowrdHandler)

vi.mock('../../../../modles/User/User', () => ({
  User: {
    checkUserExistInDb: vi.fn(),
    generateOTP: vi.fn(),
    sendEmail: vi.fn()
  }
}))

describe('postForgetPassowrdHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return error if the email does not found', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue(null)

    const response = await request(app)
      .post('/forget-password')
      .send({ email: 'test@example.com' })

    expect(response.body).toEqual({
      error: 'The user does not exist',
      user: null
    })
  })

  it('should return error if the OTP generating fails', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue({
      id: '123',
      email: 'doexist@gmail.com'
    })
    ;(User.generateOTP as Mock).mockRejectedValue(null)

    const response = await request(app)
      .post('/forget-password')
      .send({ email: 'doexist@gmail.com' })

    expect(response.body).toEqual({
      error: 'The user does not exist',
      user: null
    })
  })

  it('should return error if the email is not sent', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue({
      id: '123',
      email: 'doexist@gmail.com'
    })
    ;(User.generateOTP as Mock).mockResolvedValue({ otp: '123456' })
    ;(User.sendEmail as Mock).mockImplementation(({ cb }) => {
      cb(new Error('Email is not'))
    })

    const response = await request(app).post('/forget-password').send({
      email: 'doexist@gmail.com'
    })

    expect(response.body).toEqual({
      error: null,
      user: { id: '123', email: 'doexist@gmail.com' }
    })
  })

  it('should return email if the email sent okay', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue({
      id: '123',
      email: 'doexist@gmail.com'
    })
    ;(User.generateOTP as Mock).mockResolvedValue({ otp: '123456' })
    ;(User.sendEmail as Mock).mockImplementation(({ cb }) => {
      cb(null, { response: 'Email sent' })
    })

    const response = await request(app).post('/forget-password').send({
      email: 'doexist@gmail.com'
    })

    expect(response.body).toEqual({
      error: null,
      user: { id: '123', email: 'doexist@gmail.com' }
    })

    expect(User.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'doexist@gmail.com',
        otp: '123456',
        title: 'Reset your account password at TheVimeagen'
      })
    )
  })
})
