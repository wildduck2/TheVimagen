import request from 'supertest'
import express, { Express } from 'express'
import { postForgetPassowrdHandler } from '../postForgetPassowrdHandler'
import { User } from 'modles/User/User'

const app: Express = express()
app.use(express.json())
app.post('/forget-password', postForgetPassowrdHandler)

jest.mock('../../../User') // Use absolute import

describe('postForgetPassowrdHandler', () => {
  it('should return error if user does not exist', async () => {
    ;(User.checkUserExistInDb as jest.Mock).mockResolvedValue(null)

    const response = await request(app)
      .post('/forget-password')
      .send({ email: 'nonexistent@example.com' })

    expect(response.body).toEqual({
      error: 'The user does not exist',
      user: null
    })
  })

  it('should return error if generating OTP fails', async () => {
    ;(User.checkUserExistInDb as jest.Mock).mockResolvedValue({ id: '123' })
    ;(User.generateOTP as jest.Mock).mockRejectedValue(
      new Error('Failed to generate OTP')
    )

    const response = await request(app)
      .post('/forget-password')
      .send({ email: 'test@example.com' })

    expect(response.body).toEqual({
      error: 'The user does not exist',
      email: 'test@example.com'
    })
  })

  it('should send email and return user if all goes well', async () => {
    ;(User.checkUserExistInDb as jest.Mock).mockResolvedValue({
      id: '123',
      email: 'test@example.com'
    })
    ;(User.generateOTP as jest.Mock).mockResolvedValue({ otp: '123456' })
    ;(User.sendEmail as jest.Mock).mockImplementation(({ cb }) =>
      cb(null, { response: 'Email sent' })
    )

    const response = await request(app)
      .post('/forget-password')
      .send({ email: 'test@example.com' })

    expect(response.body).toEqual({
      error: null,
      user: { id: '123', email: 'test@example.com' }
    })
    expect(User.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        otp: '123456',
        title: 'Reset your account password at TheVimagen',
        email: 'test@example.com'
      })
    )
  })

  it('should handle email sending errors gracefully', async () => {
    ;(User.checkUserExistInDb as jest.Mock).mockResolvedValue({
      id: '123',
      email: 'test@example.com'
    })
    ;(User.generateOTP as jest.Mock).mockResolvedValue({ otp: '123456' })
    ;(User.sendEmail as jest.Mock).mockImplementation(({ cb }) =>
      cb(new Error('SMTP error'), null)
    )

    const response = await request(app)
      .post('/forget-password')
      .send({ email: 'test@example.com' })

    expect(response.status).toBe(500)
    expect(response.text).toBe('SMTP error')
  })
})
