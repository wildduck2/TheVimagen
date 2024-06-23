import bcrypt from 'bcrypt'
import type {
  CheckUserExistInDbType,
  GenerateOTPType,
  SendEmailType,
  CreateNewUserType,
  FindSesssionIfNotCreateOneType,
  CompleteUserInfoSignupStep3Type
} from './User.types'
import otpGenerator from 'otp-generator'
import { WelcomeEmail, renderEmail } from '../../veiws'
import { mailOptions, prisma, transporter } from '../../utils'

export class User {
  constructor() {}

  static async checkUserExistInDb({ email, userName }: CheckUserExistInDbType) {
    if (userName && email) {
      return await prisma.user.findFirst({
        where: {
          AND: [{ email: email }, { userName: userName }]
        }
      })
    }

    if (email) {
      return await prisma.user.findUnique({
        where: { email: email }
      })
    }
  }

  static async createNewUser({
    password,
    sessionId,
    session,
    expiresAt,
    userName,
    email
  }: CreateNewUserType) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      // NOTE: Create a new user in the database
      const user = await prisma.user.create({
        data: {
          userName,
          password: hashedPassword,
          email: email,
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
    } catch (error) {
      console.log(error)
      return null
    }
  }

  static async generateOTP({
    userId
  }: GenerateOTPType): Promise<{ otp: string | null }> {
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

      if (!tp) return { otp: null }

      return { otp: OTP }
    } catch (error) {
      console.log(error)
      return { otp: null }
    }
  }

  static async sendEmail({ email, otp, cb }: SendEmailType) {
    try {
      const emailHtml = renderEmail(WelcomeEmail, {
        code: otp,
        type: 'comfirmEmail'
      })

      transporter.sendMail(
        mailOptions(email, 'Welcome to TheVimeagen', emailHtml),
        cb
      )
    } catch (error) {
      console.log(error)
    }
  }

  static async findSesssionIfNotCreateOne({
    sessionId,
    userId,
    expiresAt,
    session
  }: FindSesssionIfNotCreateOneType) {
    try {
      const sessionDoExist = await prisma.session.findUnique({
        where: { sid: sessionId }
      })

      if (sessionDoExist) return sessionDoExist

      return await prisma.session.create({
        data: {
          sid: sessionId,
          userId: userId,
          expiresAt: expiresAt,
          data: JSON.stringify(session)
        }
      })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  static async verifyOTP(userId: string, otp: string) {
    try {
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
    } catch (error) {
      console.log(error)
    }
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

      if (!userUpdated) return null

      return userUpdated
    } catch (error) {
      console.log(error)
    }
  }
}
