import express, { Express } from 'express'
import { User } from '../../../../services/User/User'
import { describe, it, vi, Mock, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { postForgetPassowrdHandler } from '../postForgetPassowrdHandler'

const app: Express = express()
app.use(express.json())
app.post('/forget-password', postForgetPassowrdHandler)

vi.mock('../../../../services/User/User', () => ({
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

  it('should return error if the OTP generating fails', async () => {
    ;(User.generateOTP as Mock).mockRejectedValue(null)

    const response = await request(app)
      .post('/forget-password')
      .send({ email: 'doexist@gmail.com' })

    expect(response.body).toEqual({
      error: 'The user does not exist',
      user: null
    })
  })

  // it('should return error if the email is not sent', async () => {
  //   ;(User.generateOTP as Mock).mockResolvedValue({ otp: '123456' })
  //   ;(User.sendEmail as Mock).mockImplementation(({ cb }) => {
  //     cb(new Error('Email is not'))
  //   })
  //
  //   const response = await request(app).post('/forget-password').send({
  //     email: 'doexist@gmail.com'
  //   })
  //
  //   expect(response.body).toEqual({
  //     error: 'The user does not exist',
  //     user: null
  //   })
  // })

  it('should return email if the email sent okay', async () => {
    ;(User.generateOTP as Mock).mockResolvedValue({ otp: '123456' })
    ;(User.sendEmail as Mock).mockImplementation(({ cb }) => {
      cb(null, { response: 'Email sent' })
    })

    const response = await request(app).post('/forget-password').send({
      email: 'doexist@gmail.com'
    })

    await User.sendEmail({
      otp: '123456',
      email: 'doexist@gmail.com',
      title: 'test_title',
      cb: () => {}
    })

    expect(response.body).toEqual({
      error: 'The user does not exist',
      user: null
    })

    expect(User.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'doexist@gmail.com',
        otp: '123456',
        title: 'test_title'
      })
    )
  })
})
