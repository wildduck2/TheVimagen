import express, { type Express } from 'express'
import session from 'express-session'
import { describe, it, vi, Mock, expect } from 'vitest'
import request from 'supertest'
import { postSignupAuthStep2Handler } from '../postSignupAuthStep2Handler'
import { User } from '../../../../modles'

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
app.post('/auth/signup-email-step2', postSignupAuthStep2Handler)

vi.mock('../../../../modles')

describe('postSignupAuthStep2Handler', () => {
  // FIX: make sure to add the middleware to the test

  it('should return error if hte otp is not correct', async () => {
    ;(User.verifyOTP as Mock).mockResolvedValue(null)

    const response = await request(app)
      .post('/auth/signup-email-step2')
      .send({ otp: '123454', userId: '123' })

    expect(response.body).toEqual({
      error: 'Wrong OTP code try again',
      otp: null
    })
  })

  it('should return verified if the otp is correct', async () => {
    ;(User.verifyOTP as Mock).mockResolvedValue({ otp: '123', id: '123' })

    const response = await request(app)
      .post('/auth/signup-email-step2')
      .send({ otp: '123454', userId: '123' })

    expect(response.body).toEqual({
      verified: true
    })
  })
})
