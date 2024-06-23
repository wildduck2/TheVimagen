import express, { Express } from 'express'
import session from 'express-session'
import request from 'supertest'
import { postSignupAuthStep1Handler } from '../postSignupAuthStep1Handler'
import { describe, vi, Mock, it, expect, beforeAll } from 'vitest'
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

app.post('/auth/signup-email-step1', postSignupAuthStep1Handler)

vi.mock('z')
vi.mock('bcrypt')
vi.mock('../../../../constants')
vi.mock('../../../../modles')

describe('postSignupAuthStep1Handler', () => {
  beforeAll(() => {
    vi.clearAllMocks()
  })

  const user = {
    email: 'doexist@gmail.com',
    password: '123456Aa*',
    userName: 'ahmedayob'
  }

  // FIX: you should make middleware test right here and refactor the other tests
  // it('should return validation errors if request body is incorrect', async () => {
  //   const response = await request(app).post('/auth/signup-email-step1').send({
  //     email: 'invalidemail',
  //     userName: 'testuser',
  //     password: 'short'
  //   })
  //   // .expect(400)
  //   // console.log(response.body)
  //   // expect(response.body.errors).toBeDefined()
  //   // expect(response.body.errors).toHaveLength(2)
  //   //
  //   // expect(response.body.errors).toContainEqual(
  //   //   expect.stringContaining('Error: invalid_email_format!')
  //   // )
  //   // expect(response.body.errors).toContainEqual(
  //   //   expect.stringContaining('Error: min_length_error!')
  //   // )
  // })

  it('should return error if the user exist', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue({ id: '123', ...user })

    const response = await request(app)
      .post('/auth/signup-email-step1')
      .send(user)

    expect(response.body).toEqual({
      error: 'User creation failed with error!! try again!',
      user: { id: '123', ...user }
    })
    expect(User.checkUserExistInDb).toHaveBeenCalledWith({
      email: user.email,
      userName: user.userName
    })
  })

  it('should return error if the user has not created', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue(null)
    ;(User.createNewUser as Mock).mockResolvedValue(null)

    const response = await request(app).post('/auth/signup-email-step1').send({
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password123'
    })
    expect(User.createNewUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password123',
      sessionId: expect.any(String),
      expiresAt: expect.any(Date),
      session: expect.any(Object)
    })
    expect(response.body).toEqual({
      error: "user hasn't created",
      user: null
    })
  })

  it('should return error if the otp has not created!', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue(null)
    ;(User.createNewUser as Mock).mockResolvedValue({ id: '123', ...user })
    ;(User.generateOTP as Mock).mockResolvedValue({ otp: null })

    const response = await request(app).post('/auth/signup-email-step1').send({
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password123'
    })
    expect(User.checkUserExistInDb).toHaveBeenCalledWith({
      email: 'test@example.com',
      userName: 'testuser'
    })
    expect(User.createNewUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password123',
      sessionId: expect.any(String),
      expiresAt: expect.any(Date),
      session: expect.any(Object)
    })
    expect(User.generateOTP).toHaveBeenCalledWith({ userId: '123' })
    expect(response.body).toEqual({
      error: 'otp has not created',
      user: null
    })
  })

  it('return error if the email has not sent with otp', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue(null)
    ;(User.createNewUser as Mock).mockResolvedValue({ id: '123', ...user })
    ;(User.generateOTP as Mock).mockResolvedValue({ otp: '123456' })
    ;(User.sendEmail as Mock).mockImplementation(({ cb }) =>
      cb(new Error('Email sending failed'), null)
    )

    const response = await request(app).post('/auth/signup-email-step1').send({
      email: 'test@example.com',
      userName: 'testuser',
      passowrd: 'passowrd123'
    })

    expect(User.checkUserExistInDb).toHaveBeenCalledWith({
      email: 'test@example.com',
      userName: 'testuser'
    })

    expect(User.createNewUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password123',
      sessionId: expect.any(String),
      expiresAt: expect.any(Date),
      session: expect.any(Object)
    })

    expect(User.generateOTP).toHaveBeenCalledWith({ userId: '123' })

    expect(User.sendEmail).toHaveBeenCalledWith({
      email: 'test@example.com',
      otp: '123456',
      title: 'Verify your account at TheVimeagen',
      cb: expect.any(Function)
    })

    expect(response.status).toBe(500)
    expect(response.body).toEqual({
      user: { id: '123', ...user },
      error: 'Email sending failed'
    })
  })

  it('should return user if all the steps have worked', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue(null)
    ;(User.createNewUser as Mock).mockResolvedValue({ id: '123', ...user })
    ;(User.generateOTP as Mock).mockResolvedValue({ otp: '123456' })
    ;(User.sendEmail as Mock).mockImplementation(({ cb }) => {
      cb(null, { response: 'email sent okay' })
    })

    const response = await request(app).post('/auth/signup-email-step1').send({
      email: 'test@example.com',
      userName: 'testuser',
      password: 'testpassword12*A'
    })

    expect(User.checkUserExistInDb).toHaveBeenCalledWith({
      email: 'test@example.com',
      userName: 'testuser'
    })

    expect(User.createNewUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password123',
      sessionId: expect.any(String),
      expiresAt: expect.any(Date),
      session: expect.any(Object)
    })

    expect(User.generateOTP).toHaveBeenCalledWith({ userId: '123' })

    expect(User.sendEmail).toHaveBeenCalledWith({
      email: 'test@example.com',
      otp: '123456',
      title: 'Verify your account at TheVimeagen',
      cb: expect.any(Function)
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      user: { id: '123', ...user },
      error: null,
      email: 'email sent okay'
    })
  })
})
