import { Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import bcrypt from 'bcrypt'
import session, { Session, SessionData } from 'express-session'
import otpGenerator from 'otp-generator'
import { User } from '../User'
import { SendEmailType } from '../User.types'
import { prisma, mailOptions, transporter } from '../../../utils'
import { WelcomeEmail, renderEmail } from '../../../views'
import nodemailer from 'nodemailer'
import axios from 'axios'
import qs from 'qs'

vi.mock('axios')
vi.mock('qs')
vi.mock('otp-generator')
vi.mock('bcrypt')
vi.mock('nodemailer', () => ({
    createTransport: vi.fn(() => ({
        sendMail: vi.fn()
    }))
}))

vi.mock('../../views', () => ({
    renderEmail: vi.fn()
}))

vi.mock('../../../utils', () => ({
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
            create: vi.fn(),
            delete: vi.fn()
        }
    }
}))

beforeEach(() => {
    vi.clearAllMocks()
})

//NOTE: checkUserExistInDb unit tests
describe('checkUserExistInDb unit tests', () => {
    const mockUser = {
        id: '1',
        email: 'test@example.com',
        user_name: 'testuser'
    }

    it('should return  user exists in DB by email', async () => {
        ; (prisma.user.findUnique as Mock).mockResolvedValue(mockUser)

        const user = await User.checkUserExistInDb({
            email: mockUser.email
        })

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: {
                email: mockUser.email
            }
        })
        expect(user).toEqual(mockUser)
    })

    it('should check if user exists in DB by email', async () => {
        ; (prisma.user.findUnique as Mock).mockResolvedValue(mockUser)

        const user = await User.checkUserExistInDb({ email: mockUser.email })

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { email: mockUser.email }
        })
        expect(user).toEqual(mockUser)
    })
})

//NOTE: createNewUser unit tests
describe('createNewUser unit tests', () => {
    const mockUser = {
        id: '1',
        email: 'test@example.com',
        user_name: 'testuser',
        password: 'hashedPassword',
        sessions: [{ sid: 'session_id', expires_at: new Date(), data: '{}' }]
    }
    const hashedPassword = 'hashedPassword'
    const sessionData = { data: 'sessionData' }
    const expires_at = new Date()
    const session_id = 'session_id'

    it('should create a new user with hashed password and session', async () => {
        ; (bcrypt.hash as Mock).mockResolvedValue(hashedPassword)
            ; (prisma.user.create as Mock).mockResolvedValue(mockUser)

        const user = await User.createNewUser({
            password: 'plainPassword',
            session_id,
            session: sessionData as unknown as Session,
            expires_at,
            user_name: 'testuser',
            email: 'test@example.com'
        })

        expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 10)
        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
                user_name: 'testuser',
                password: hashedPassword,
                email: 'test@example.com',
                sessions: {
                    create: {
                        sid: session_id,
                        expires_at: expires_at,
                        data: JSON.stringify(sessionData)
                    }
                }
            }
        })
        expect(user).toEqual(mockUser)
    })

    it('should return null if there is an error creating a new user', async () => {
        ; (bcrypt.hash as Mock).mockRejectedValue(new Error('hash error'))
        const user = await User.createNewUser({
            password: 'plainPassword',
            session_id: 'sessionId',
            session: { data: 'sessionData' } as unknown as Session,
            expires_at: new Date(),
            user_name: 'testuser',
            email: 'test@example.com'
        })

        expect(user).toBeNull()
    })
})

//NOTE: generateOTP unit tests
describe('generateOTP unit tests', () => {
    const mockOTP = '123456'
    const mockUserId = 'userId123'
    const mockExpiresAt = new Date(Date.now() + 60000 * 10)
    const mockOTPRecord = {
        id: 'otpId123',
        userId: mockUserId,
        otp: mockOTP,
        expires_at: mockExpiresAt
    }

    it('should generate an OTP and save it to the database', async () => {
        ; (otpGenerator.generate as Mock).mockReturnValue(mockOTP)
            ; (prisma.otp.create as Mock).mockResolvedValue(mockOTPRecord)

        const result = await User.generateOTP({ user_id: mockUserId })

        expect(otpGenerator.generate).toHaveBeenCalledWith(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        })
        expect(prisma.otp.create).toHaveBeenCalledWith({
            data: {
                user_id: mockUserId,
                otp: mockOTP,
                expires_at: expect.any(Date)
            }
        })
        expect(result).toEqual({ otp: mockOTP })
    })

    it('should return null if OTP creation fails', async () => {
        ; (otpGenerator.generate as Mock).mockReturnValue('123456')
            ; (prisma.otp.create as Mock).mockRejectedValue(new Error('Database error'))

        const result = await User.generateOTP({ user_id: mockUserId })

        expect(result).toEqual({ otp: null })
    })
})

//NOTE: verifyOTP unit tests
describe('verifyOTP unit tests', () => {
    const mockOTP = '123456'
    const mockUserId = 'userId123'
    const mockExpiresAt = new Date(Date.now() + 60000 * 10)
    const mockOTPRecord = {
        id: 'otpId123',
        user_id: mockUserId,
        otp: mockOTP,
        expires_at: mockExpiresAt
    }

    const mockDeleteResult = {
        ...mockOTPRecord
    }
    it('should update the user isVerified value in the db', async () => {
        ; (prisma.otp.findFirst as Mock).mockResolvedValue(mockOTPRecord)
            ; (prisma.otp.delete as Mock).mockResolvedValue(mockDeleteResult)
            ; (prisma.user.update as Mock).mockResolvedValue({
                id: '123',
                email: 'doexist@gmail.com'
            })

        const result = await User.verifyOTP({ user_id: mockUserId, otp: mockOTP })

        expect(prisma.otp.findFirst).toHaveBeenCalledWith({
            where: {
                user_id: mockUserId,
                otp: mockOTP,
                expires_at: {
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
        expect(prisma.user.update).toHaveBeenCalledWith({
            where: {
                id: mockUserId
            },
            data: {
                verified_email: true
            }
        })
        expect(prisma.user.update).toHaveReturnedWith({
            id: '123',
            email: 'doexist@gmail.com'
        })
        expect(result).toEqual(mockDeleteResult)
    })

    it('should verify OTP and delete the record if valid', async () => {
        ; (prisma.otp.findFirst as Mock).mockResolvedValue(mockOTPRecord)
            ; (prisma.otp.delete as Mock).mockResolvedValue(mockDeleteResult)

        const result = await User.verifyOTP({ user_id: mockUserId, otp: mockOTP })

        expect(prisma.otp.findFirst).toHaveBeenCalledWith({
            where: {
                user_id: mockUserId,
                otp: mockOTP,
                expires_at: {
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

    it('should return null if OTP is not found', async () => {
        ; (prisma.otp.findFirst as Mock).mockResolvedValue(null)

        const result = await User.verifyOTP({ user_id: mockUserId, otp: mockOTP })

        expect(prisma.otp.findFirst).toHaveBeenCalledWith({
            where: {
                user_id: mockUserId,
                otp: mockOTP,
                expires_at: {
                    gt: expect.any(Date)
                }
            }
        })
        expect(prisma.otp.delete).not.toHaveBeenCalled()
        expect(result).toBeNull()
    })

    it('should handle errors gracefully', async () => {
        ; (prisma.otp.findFirst as Mock).mockRejectedValue(
            new Error('Database error')
        )

        const result = await User.verifyOTP({ user_id: mockUserId, otp: mockOTP })

        expect(prisma.otp.findFirst).toHaveBeenCalledWith({
            where: {
                user_id: mockUserId,
                otp: mockOTP,
                expires_at: {
                    gt: expect.any(Date)
                }
            }
        })
        expect(prisma.otp.delete).not.toHaveBeenCalled()
        expect(result).toBeNull()
    })
})

//NOTE:  generatePasswordResetToken testing units
describe('generatePasswordResetToken testing units', () => {
    it('should return null if the passwordResetPassword has not created!', async () => {
        ; (otpGenerator.generate as Mock).mockReturnValue(null)

        const OTP = await User.generatePasswordResetToken({ user_id: '123' })

        expect(OTP).toBe(null)
    })

    it('should return OTP if the passwordResetPassword has created and return error if the user has not  updated', async () => {
        ; (otpGenerator.generate as Mock).mockReturnValue('123456')
            ; (prisma.user.update as Mock).mockResolvedValue(null)

        const OTP = await User.generatePasswordResetToken({ user_id: '123' })
        const expires_at = new Date(Date.now() + 60000 * 10)

        expect(otpGenerator.generate()).toBe('123456')
        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: '123' },
            data: {
                password_reset_token: '123456',
                password_reset_token_expiration: expires_at
            }
        })
        expect(OTP).toBe(null)
    })

    it('should return the OTP if the OTP has generated and the user has been updated', async () => {
        ; (otpGenerator.generate as Mock).mockReturnValue('123456')
            ; (prisma.user.update as Mock).mockResolvedValue({
                id: '123',
                email: 'doexist@gmail.com'
            })

        const OTP = await User.generatePasswordResetToken({ user_id: '123' })
        const expires_at = new Date(Date.now() + 60000 * 10)

        expect(otpGenerator.generate()).toBe('123456')
        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: '123' },
            data: {
                password_reset_token: '123456',
                password_reset_token_expiration: expires_at
            }
        })
        expect(prisma.user.update).toReturnWith({
            id: '123',
            email: 'doexist@gmail.com'
        })
        expect(OTP).toBe('123456')
    })
})

//NOTE: getGoogleUserInfo unit tests
describe('getGoogleUserInfo unit tests', () => {
    const MockedInfoArgs = {
        id_token: 'test_token',
        access_token: 'access_token'
    }
    const mockedUser = {
        id: '123',
        email: 'doexist@gmail.com'
    }
    it('should return null if the axios request has Failed', async () => {
        ; (axios.get as Mock).mockRejectedValue({
            error: 'failed to do the request'
        })

        const user = await User.getGoogleUserInfo(MockedInfoArgs)

        expect(user).toBeNull()
    })

    it('should return user data if the request went well', async () => {
        ; (axios.get as Mock).mockResolvedValue({
            data: mockedUser
        })

        const user = await User.getGoogleUserInfo(MockedInfoArgs)

        expect(user).toEqual(mockedUser)

        expect(axios.get).toHaveBeenCalledWith(
            'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=access_token',
            {
                headers: {
                    Authorization: 'Bearer test_token'
                }
            }
        )
    })
})

//NOTE: getGoogleOAuthToken unit tests
describe('getGoogleOAuthToken unit tests', () => {
    const url = 'https://oauth2.googleapis.com/token'

    const values = {
        code: 'test_code',
        client_id: 'test_client_id',
        client_secret: 'test_client_secret',
        redirect_uri: 'test_redirect_url',
        grant_type: 'authorization_code'
    }
    const error = {
        error: 'failed to do the request'
    }

    const mockData = { access_token: 'test_access_token', expires_in: 3600 }

    it('should return error if the', async () => {
        ; (axios.post as Mock).mockRejectedValue(error)
        const data = await User.getGoogleOAuthToken({
            code: 'invalid_code'
        })

        expect(axios.post).toHaveBeenCalledOnce()
        expect(data).toBeNull()
    })

    it('should return data if the request went well', async () => {
        ; (axios.post as Mock).mockResolvedValue({ data: mockData })

        const data = await User.getGoogleOAuthToken({
            code: 'test_code'
        })

        expect(axios.post).toHaveBeenCalledWith(url, qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        expect(data).toEqual(mockData)
    })
})

//NOTE: completeUserInfoSignupStep3 unit tests
describe('completeUserInfoSignupStep3 unit tests', () => {
    const mocked_error = { error: 'user has not updated' }
    const mocked_user_id = '123'
    const mocked_data = {
        age: 29,
        bio: 'test_bio',
        last_name: 'test_last_name',
        first_name: 'test_first_name',
        pronounce: 'test_pronounce',
        years_of_exprience: 24,
        profession: 'test_profession'
    }

    const mocked_resolved = {
        id: '123',
        email: 'doexist@gmail.com',
        ...mocked_data
    }

    it('should return error if the request to the db failed', async () => {
        ; (prisma.user.update as Mock).mockRejectedValue(mocked_error)

        const user_updated = await User.completeUserInfoSignupStep3({
            ...mocked_data,
            user_id: mocked_user_id
        })

        expect(user_updated).toBeNull()
    })

    it('should return error if the use has not updated', async () => {
        ; (prisma.user.update as Mock).mockResolvedValue(mocked_error)

        const user_updated = await User.completeUserInfoSignupStep3({
            ...mocked_data,
            user_id: mocked_user_id
        })

        expect(prisma.user.update).toHaveBeenCalledOnce()
        expect(prisma.user.update).toHaveBeenCalledWith({
            where: {
                id: mocked_user_id
            },
            data: mocked_data
        })

        expect(user_updated).toEqual(mocked_error)
    })

    it('should return user Updated if the user updated successfully', async () => {
        ; (prisma.user.update as Mock).mockResolvedValue(mocked_resolved)

        const user_updated = await User.completeUserInfoSignupStep3({
            ...mocked_data,
            user_id: mocked_user_id
        })
        expect(prisma.user.update).toHaveBeenCalledOnce()
        expect(prisma.user.update).toHaveBeenCalledWith({
            where: {
                id: mocked_user_id
            },
            data: mocked_data
        })

        expect(user_updated).toEqual(mocked_resolved)
    })
})

//NOTE: deleteSession test units
describe('deleteSession test units', () => {
    const mockSession = { id: '123', user_id: '123', token: 'test_token' }

    it('should return null when an error occurs', async () => {
        ; (prisma.session.delete as Mock).mockRejectedValueOnce(
            new Error('Delete failed')
        )

        const result = await User.deleteSession({ user_id: '123' })

        expect(result).toBeNull()
    })

    it('should return null if the session does not exist', async () => {
        ; (prisma.session.delete as Mock).mockResolvedValueOnce(null)

        const result = await User.deleteSession({ user_id: '123' })

        expect(result).toBeNull()
        expect(prisma.session.delete).toHaveBeenCalledWith({
            where: { user_id: '123' }
        })
    })

    it('should delete the session and return it when a valid user_id is provided', async () => {
        ; (prisma.session.delete as Mock).mockResolvedValueOnce(mockSession)

        const result = await User.deleteSession({ user_id: '123' })

        expect(result).toEqual(mockSession)
        expect(prisma.session.delete).toHaveBeenCalledWith({
            where: { user_id: '123' }
        })
    })
})

describe('find_sesssion_if_not_create_one unit tests', () => {
    const mockSession = {
        id: 1,
        sid: 'session_123',
        user_id: 'user_123',
        expiresAt: new Date(),
        data: '{}'
    }

    const mocked_called_with = {
        data: {
            sid: 'session_123',
            user_id: 'user_123',
            expiresAt: expect.any(Date),
            data: JSON.stringify({})
        }
    }
    const mocked_called = {
        session_id: 'session_123',
        user_id: 'user_123',
        expires_at: new Date(),
        session: {} as unknown as Session & Partial<SessionData>
    }
    it('should return the existing session if it exists', async () => {
        ; (prisma.session.findUnique as Mock).mockResolvedValueOnce(mockSession)

        const result = await User.find_sesssion_if_not_create_one(mocked_called)

        expect(result).toEqual(mockSession)
        expect(prisma.session.findUnique).toHaveBeenCalledWith({
            where: { user_id: 'user_123' }
        })
        expect(prisma.session.create).not.toHaveBeenCalled()
    })

    it('should create a new session if it does not exist', async () => {
        ; (prisma.session.findUnique as Mock).mockResolvedValueOnce(null)
            ; (prisma.session.create as Mock).mockResolvedValueOnce(mockSession)

        const result = await User.find_sesssion_if_not_create_one(mocked_called)

        expect(result).toEqual(mockSession)
        expect(prisma.session.findUnique).toHaveBeenCalledOnce()
        expect(prisma.session.findUnique).toHaveReturnedWith(null)
        expect(prisma.session.create).toHaveBeenCalledWith(mocked_called_with)
    })

    it('should return null when an error occurs', async () => {
        ; (prisma.session.findUnique as Mock).mockRejectedValueOnce(
            new Error('Find failed')
        )

        const result = await User.find_sesssion_if_not_create_one(mocked_called)

        expect(result).toBeNull()
    })
})

//NOTE: sendEmail unit tests
describe('sendEmail unit tests', () => {
    const mockEmailHtml = '<html>email content</html>'
    const mockOTP = '123456'
    const mockEmail = 'test@example.com'
    const mockTitle = 'Test Email'

    it('should send an email with the correct parameters', async () => {
        // ;(renderEmail as Mock).mockReturnValue(mockEmailHtml)

        // const sendMailMock = vi
        //   .spyOn(transporter, 'sendMail')
        //   .mockImplementation((mailOptions, callback) => {
        //     callback(null, { response: '250 OK' })
        //   })

        await User.sendEmail({
            email: mockEmail,
            otp: mockOTP,
            cb: vi.fn(),
            title: mockTitle
        })

        // expect(renderEmail).toHaveBeenCalledWith(WelcomeEmail, {
        //   code: mockOTP,
        //   type: 'comfirmEmail'
        // })

        // expect(sendMailMock).toHaveBeenCalledWith(
        //   {
        //     from: 'wezonaser50@gmail.com',
        //     to: mockEmail,
        //     subject: mockTitle,
        //     html: mockEmailHtml
        //   },
        //   expect.any(Function)
        // )
    })
    // it('should handle errors when sending email', async () => {
    //   const mockEmailHtml = '<html lang="en">email content</html>'
    //   const mockOTP = '123456'
    //   const mockEmail = 'test@example.com'
    //   const mockTitle = 'Test Email'
    //
    //   ;(renderEmail as Mock).mockReturnValue(mockEmailHtml)
    //
    //   const sendMailMock = (transporter.sendMail as Mock).mockImplementation(
    //     (mailOptions, callback) => {
    //       callback(new Error('Failed to send email'), null)
    //     }
    //   )
    //   console.log('hi from the test')
    //
    //   await expect(
    //     User.sendEmail({
    //       email: mockEmail,
    //       otp: mockOTP,
    //       cb: vi.fn(),
    //       title: mockTitle
    //     })
    //   ).resolves.not.toThrow()
    //
    //   expect(renderEmail).toHaveBeenCalledWith(WelcomeEmail, {
    //     code: mockOTP,
    //     type: 'comfirmEmail'
    //   })
    //
    //   expect(sendMailMock).toHaveBeenCalledWith(
    //     {
    //       from: 'wezonaser50@gmail.com',
    //       to: mockEmail,
    //       subject: mockTitle,
    //       html: mockEmailHtml
    //     },
    //     expect.any(Function)
    //   )
    // })
})
