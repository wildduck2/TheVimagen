import { z } from 'zod'
import bcrypt from 'bcrypt'
import type {
  CheckUserExistInDbType,
  ZodCredentialsValidationType,
  GenerateOTPType,
  SendEmailType,
  CreateNewUserType,
  FindSesssionIfNotCreateOneType,
  CompleteUserInfoSignupStep3Type
} from './User.types'
import otpGenerator from 'otp-generator'
import { WelcomeEmail, renderEmail } from '../../veiws'
import { mailOptions, prisma, transporter } from '../../utils'
import { Prisma } from '@prisma/client'
import { warn } from 'console'

export class User {
  constructor() {}

  static zodCredentialsValidation = async ({
    email,
    password
  }: ZodCredentialsValidationType) => {
    const emailSchema = z.string().email()
    const passwordSchema = z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(32, { message: 'Password cannot be longer than 32 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter'
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter'
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[\W_]/, {
        message: 'Password must contain at least one special character'
      })

    const validEmail = emailSchema.parse(email)
    const validPassword = passwordSchema.parse(password)

    return { validEmail, validPassword } as const
  }

  static async checkUserExistInDb({
    validEmail,
    userName,
    userID
  }: CheckUserExistInDbType) {
    if (userName && validEmail) {
      return await prisma.user.findFirst({
        where: {
          AND: [{ email: validEmail }, { userName: userName }]
        }
      })
    }

    if (userID) {
      return await prisma.user.findUnique({
        where: { id: userID }
      })
    }

    if (validEmail) {
      return await prisma.user.findUnique({
        where: { email: validEmail }
      })
    }
  }

  static async createNewUser({
    validPassword,
    sessionId,
    session,
    expiresAt,
    userName,
    validEmail
  }: CreateNewUserType) {
    const hashedPassword = await bcrypt.hash(validPassword, 10)

    // NOTE: Create a new user in the database
    const user = await prisma.user.create({
      data: {
        userName,
        password: hashedPassword,
        email: validEmail,
        sessions: {
          create: {
            sid: sessionId,
            expiresAt: expiresAt,
            data: JSON.stringify(session)
          }
        }
      }
    })

    return user
  }

  static async generateOTP({
    userId
  }: GenerateOTPType): Promise<{ otp: string; expiresAt: Date }> {
    try {
      const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
      })
      const expiresAt = new Date(Date.now() + 60000 * 10) // Expires after 10 minutes

      const tp = await prisma.otp.create({
        data: {
          userId,
          otp: OTP,
          expiresAt
        }
      })

      if (!tp) return { otp: OTP, expiresAt }

      return { otp: OTP, expiresAt }
    } catch (error) {
      console.error(error)
      throw new Error('Error occurred during OTP generation.')
    }
  }

  static async sendEmail({ email, otp, cb }: SendEmailType) {
    const emailHtml = renderEmail(WelcomeEmail, {
      code: otp,
      type: 'comfirmEmail'
    })

    transporter.sendMail(
      mailOptions(email, 'Welcome to TheVimeagen', emailHtml),
      cb
    )
  }

  static async findSesssionIfNotCreateOne({
    sessionId,
    userId,
    expiresAt,
    session
  }: FindSesssionIfNotCreateOneType) {
    const sessionDoExist = await prisma.session.findUnique({
      where: { sid: sessionId }
    })

    console.log(sessionId, sessionDoExist)

    if (sessionDoExist !== null) {
      await prisma.session.create({
        data: {
          sid: sessionId,
          userId: userId,
          expiresAt: expiresAt,
          data: JSON.stringify(session)
        }
      })
    }
  }

  static async verifyOTP(userId: string, otp: string) {
    const otpRecord = await prisma.otp.findFirst({
      where: {
        userId: userId,
        otp: otp,
        expiresAt: {
          gt: new Date()
        }
      }
    })

    if (!otpRecord) {
      return otpRecord
    }

    //NOTE: Delete the OTP record after successful verification
    const deleteResult = await prisma.otp.delete({
      where: {
        id: otpRecord.id,
        otp
      }
    })

    return deleteResult
  }

  static async completeUserInfoSignupStep3({
    userID,
    age,
    bio,
    lastName,
    firstName,
    pronounce,
    yearsOfExprience,
    profession
  }: CompleteUserInfoSignupStep3Type) {
    try {
      //NOTE: updating user data but user id
      const userUpdated = await prisma.user.update({
        where: {
          id: userID
        },
        data: {
          firstName,
          lastName,
          age,
          bio,
          pronounce,
          yearsOfExprience,
          profession
        }
      })

      if (!userUpdated)
        return { user: null, error: 'User Data Has not updated!!' }

      return { user: userUpdated, error: null }
    } catch (error) {
      console.log(error)
    }
  }
}
