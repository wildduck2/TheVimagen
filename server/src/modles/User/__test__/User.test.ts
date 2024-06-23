import { Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { User } from '../User'
import bcrypt from 'bcrypt'
import { mailOptions, prisma, renderEmail } from '../../../utils'
import session, { Session } from 'express-session'
import express, { Express } from 'express'
import otpGenerator from 'otp-generator'
import nodemailer from 'nodemailer'
import { SendEmailType } from '../User.types'

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

vi.mock('nodemailer')
vi.mock('../../veiws')
vi.mock('../../../utils', () => ({
  renderEmail: vi.fn(),
  mailOptions: vi.fn((to, subject, html) => ({
    from: 'wezonaser50@gmail.com',
    to,
    subject,
    html
  })),
  prisma: {
    user: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn()
    },
    otp: {
      create: vi.fn(),
      findFirst: vi.fn(),
      delete: vi.fn()
    },
    session: {
      findUnique: vi.fn(),
      create: vi.fn()
    }
  }
}))
vi.mock('otp-generator')
vi.mock('bcrypt')

describe('User model', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should check if user exists in DB by email and userName', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      userName: 'testuser'
    }
    ;(prisma.user.findFirst as Mock).mockResolvedValue(mockUser)

    const user = await User.checkUserExistInDb({
      email: 'test@example.com',
      userName: 'testuser'
    })

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: {
        AND: [{ email: 'test@example.com' }, { userName: 'testuser' }]
      }
    })
    expect(user).toEqual(mockUser)
  })

  it('should check if user exists in DB by email', async () => {
    const mockUser = { id: '1', email: 'test@example.com' }
    ;(prisma.user.findUnique as Mock).mockResolvedValue(mockUser)

    const user = await User.checkUserExistInDb({ email: 'test@example.com' })

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' }
    })
    expect(user).toEqual(mockUser)
  })

  it('should return null if no userName or email is provided', async () => {
    const user = await User.checkUserExistInDb({})

    expect(user).toBeUndefined()
  })

  it('should create a new user with hashed password and session', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      userName: 'testuser',
      password: 'hashedPassword',
      sessions: [{ sid: 'sessionId', expiresAt: new Date(), data: '{}' }]
    }

    const hashedPassword = 'hashedPassword'
    const sessionData = { data: 'sessionData' }
    const expiresAt = new Date()
    const sessionId = 'sessionId'

    ;(bcrypt.hash as Mock).mockResolvedValue(hashedPassword)
    ;(prisma.user.create as Mock).mockResolvedValue(mockUser)

    const user = await User.createNewUser({
      password: 'plainPassword',
      sessionId,
      session: sessionData as unknown as Session,
      expiresAt,
      userName: 'testuser',
      email: 'test@example.com'
    })

    expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 10)
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        userName: 'testuser',
        password: hashedPassword,
        email: 'test@example.com',
        sessions: {
          create: {
            sid: sessionId,
            expiresAt: expiresAt,
            data: JSON.stringify(sessionData)
          }
        }
      }
    })
    expect(user).toEqual(mockUser)
  })

  it('should return null if there is an error creating a new user', async () => {
    ;(bcrypt.hash as Mock).mockRejectedValue(new Error('hash error'))
    const user = await User.createNewUser({
      password: 'plainPassword',
      sessionId: 'sessionId',
      session: { data: 'sessionData' } as unknown as Session,
      expiresAt: new Date(),
      userName: 'testuser',
      email: 'test@example.com'
    })

    expect(user).toBeNull()
  })

  it('should generate an OTP and save it to the database', async () => {
    const mockOTP = '123456'
    const mockUserId = 'userId123'
    const mockExpiresAt = new Date(Date.now() + 60000 * 10)
    const mockOTPRecord = {
      id: 'otpId123',
      userId: mockUserId,
      otp: mockOTP,
      expiresAt: mockExpiresAt
    }

    ;(otpGenerator.generate as Mock).mockReturnValue(mockOTP)
    ;(prisma.otp.create as Mock).mockResolvedValue(mockOTPRecord)

    const result = await User.generateOTP({ userId: mockUserId })

    expect(otpGenerator.generate).toHaveBeenCalledWith(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false
    })
    expect(prisma.otp.create).toHaveBeenCalledWith({
      data: {
        userId: mockUserId,
        otp: mockOTP,
        expiresAt: mockExpiresAt
      }
    })
    expect(result).toEqual({ otp: mockOTP })
  })

  it('should return null if OTP creation fails', async () => {
    const mockUserId = 'userId123'

    ;(otpGenerator.generate as Mock).mockReturnValue('123456')
    ;(prisma.otp.create as Mock).mockRejectedValue(new Error('Database error'))

    const result = await User.generateOTP({ userId: mockUserId })

    expect(result).toEqual({ otp: null })
  })

  // it('should send an email with the correct parameters', async () => {
  //   const mockEmail = 'test@example.com'
  //   const mockOTP = '123456'
  //   const mockCb = vi.fn()
  //   const mockEmailHtml = '<html>email content</html>'
  //
  //   ;(renderEmail as Mock).mockReturnValue(mockEmailHtml)
  //   ;(mailOptions as Mock).mockReturnValue({
  //     from: 'wezonaser50@gmail.com',
  //     to: mockEmail,
  //     subject: 'Welcome to TheVimeagen',
  //     html: mockEmailHtml
  //   })
  //   const sendMailMock = nodemailer.createTransport()
  //     .sendMail as unknown as Mock
  //   sendMailMock.mockImplementation((options, callback) => {
  //     callback(null, { response: '250 Message accepted' })
  //   })
  //
  //   await User.sendEmail({
  //     email: mockEmail,
  //     otp: mockOTP,
  //     cb: mockCb
  //   } as unknown as SendEmailType)
  //
  //   expect(renderEmail).toHaveBeenCalledWith(expect.anything(), {
  //     code: mockOTP,
  //     type: 'comfirmEmail'
  //   })
  //   expect(mailOptions).toHaveBeenCalledWith(
  //     mockEmail,
  //     'Welcome to TheVimeagen',
  //     mockEmailHtml
  //   )
  //   expect(sendMailMock).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       from: 'wezonaser50@gmail.com',
  //       to: mockEmail,
  //       subject: 'Welcome to TheVimeagen',
  //       html: mockEmailHtml
  //     }),
  //     mockCb
  //   )
  // })
  // it('should handle errors when sending email', async () => {
  //   const mockEmail = 'test@example.com'
  //   const mockOTP = '123456'
  //   const mockCb = vi.fn()
  //   const mockEmailHtml = '<html>email content</html>'
  //
  //   ;(renderEmail as Mock).mockReturnValue(mockEmailHtml)
  //   ;(mailOptions as Mock).mockReturnValue({
  //     from: 'wezonaser50@gmail.com',
  //     to: mockEmail,
  //     subject: 'Welcome to TheVimeagen',
  //     html: mockEmailHtml
  //   })
  //   const sendMailMock = (
  //     nodemailer.createTransport as Mock
  //   ).mockImplementation((options, callback) => {
  //     callback(new Error('Failed to send email'), null)
  //   })
  //
  //   console.log(sendMailMock)
  //
  //   await User.sendEmail({
  //     email: mockEmail,
  //     otp: mockOTP,
  //     cb: mockCb
  //   } as unknown as SendEmailType)
  //
  //   // expect(mockCb).toHaveBeenCalledWith(new Error('Failed to send email'), null)
  // })
  it('should verify OTP and delete the record if valid', async () => {
    const mockUserId = 'user-123'
    const mockOTP = '123456'
    const mockOTPRecord = {
      id: 'otp-123',
      userId: mockUserId,
      otp: mockOTP,
      expiresAt: new Date(Date.now() + 60000)
    }
    const mockDeleteResult = {
      id: 'otp-123',
      userId: mockUserId,
      otp: mockOTP,
      expiresAt: mockOTPRecord.expiresAt
    }

    ;(prisma.otp.findFirst as Mock).mockResolvedValue(mockOTPRecord)
    ;(prisma.otp.delete as Mock).mockResolvedValue(mockDeleteResult)

    const result = await User.verifyOTP(mockUserId, mockOTP)

    expect(prisma.otp.findFirst).toHaveBeenCalledWith({
      where: {
        userId: mockUserId,
        otp: mockOTP,
        expiresAt: {
          gt: expect.any(Date)
        }
      }
    })
    expect(prisma.otp.delete).toHaveBeenCalledWith({
      where: {
        id: mockOTPRecord.id,
        otp: mockOTP
      }
    })
    expect(result).toEqual(mockDeleteResult)
  })
})
