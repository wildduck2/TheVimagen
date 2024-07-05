import bcrypt from 'bcrypt'
import qs from 'qs'
import type {
  CheckUserExistInDbType,
  GenerateOTPType,
  SendEmailType,
  CreateNewUserType,
  FindSesssionIfNotCreateOneType,
  CompleteUserInfoSignupStep3Type,
  getOauthDataType,
  DeleteSessionType,
  UpsertOauthDataType,
  GetGoogleUserInfoType,
  GetGoogleOAuthTokenType,
  UpsertUserOauthDataType,
  ZodCredentialsValidationType,
  verifyOTPType
} from './User.types'
import otpGenerator from 'otp-generator'
import { WelcomeEmail, renderEmail } from '../../views'
import { mailOptions, prisma, transporter } from '../../utils'
import axios from 'axios'
import generator from 'generate-password'

export class User {
  constructor() {}

  //NOTE: tested
  static async checkUserExistInDb({ email }: CheckUserExistInDbType) {
    return await prisma.user.findUnique({
      where: { email: email }
    })
  }

  //NOTE: tested
  static async createNewUser({
    password,
    session_id,
    session,
    expires_at,
    user_name,
    email
  }: CreateNewUserType) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      // NOTE: Create a new user in the database
      const user = await prisma.user.create({
        data: {
          user_name,
          password: hashedPassword,
          email: email,
          sessions: {
            create: {
              sid: session_id,
              expiresAt: expires_at,
              data: JSON.stringify(session)
            }
          }
        }
      })

      return user
    } catch (error) {
      return null
    }
  }

  //NOTE: tested
  static async generateOTP({
    user_id
  }: GenerateOTPType): Promise<{ otp: string | null }> {
    try {
      const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
      })
      const expires_at = new Date(Date.now() + 60000 * 10) // Expires after 10 minutes

      const tp = await prisma.otp.create({
        data: {
          user_id,
          otp: OTP,
          expires_at
        }
      })

      if (!tp) return { otp: null }

      return { otp: OTP }
    } catch (error) {
      return { otp: null }
    }
  }

  //NOTE: tested
  static async find_sesssion_if_not_create_one({
    session_id,
    user_id,
    expires_at,
    session
  }: FindSesssionIfNotCreateOneType) {
    try {
      const sessionDoExist = await prisma.session.upsert({
        where: { user_id },
        update: {},
        create: {
          sid: session_id,
          user_id,
          expiresAt: expires_at,
          data: JSON.stringify(session)
        }
      })
      if (!sessionDoExist) return null

      return sessionDoExist
    } catch (error) {
      return null
    }
  }

  //NOTE: tested
  static async sendEmail({ email, otp, cb, title }: SendEmailType) {
    try {
      const emailHtml = renderEmail(WelcomeEmail, {
        code: otp,
        type: 'comfirmEmail'
      })

      transporter.sendMail(mailOptions(email, title, emailHtml), cb)
    } catch (error) {
      return null
    }
  }

  //NOTE: tested
  static async verifyOTP({ otp, user_id }: verifyOTPType) {
    try {
      const otpRecord = await prisma.otp.findFirst({
        where: {
          user_id,
          otp: otp,
          expires_at: {
            gt: new Date()
          }
        }
      })

      if (!otpRecord) return null

      //NOTE: Delete the OTP record after successful verification
      const deleteResult = await prisma.otp.delete({
        where: {
          id: otpRecord.id,
          otp
        }
      })

      //NOTE: update the user isVerified
      if (!deleteResult) return null
      const user = await prisma.user.update({
        where: {
          id: user_id
        },
        data: {
          verified_email: true
        }
      })

      if (!user) return null
      return deleteResult
    } catch (error) {
      return null
    }
  }

  //NOTE: tested
  static async completeUserInfoSignupStep3({
    user_id,
    age,
    bio,
    last_name,
    first_name,
    pronounce,
    years_of_exprience,
    profession
  }: CompleteUserInfoSignupStep3Type) {
    try {
      //NOTE: updating user data but user id
      const userUpdated = await prisma.user.update({
        where: {
          id: user_id
        },
        data: {
          first_name,
          last_name,
          age,
          bio,
          pronounce,
          years_of_exprience,
          profession
        }
      })

      if (!userUpdated) return null

      return userUpdated
    } catch (error) {
      return null
    }
  }

  //NOTE: tested
  static async deleteSession({ user_id }: DeleteSessionType) {
    try {
      //NOTE: Checking the db for the session and delete it
      const session = await prisma.session.delete({
        where: { user_id }
      })

      if (!session) return null

      return session
    } catch (error) {
      return null
    }
  }

  //INFO : tested
  static async getGoogleOAuthToken({ code }: GetGoogleOAuthTokenType) {
    const url = 'https://oauth2.googleapis.com/token'

    const values = {
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL as string,
      grant_type: 'authorization_code'
    }
    try {
      const { data } = await axios.post(url, qs.stringify(values), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      return data
    } catch (error) {
      return null
    }
  }

  //INFO : tested
  static async getGoogleUserInfo({
    id_token,
    access_token
  }: GetGoogleUserInfoType) {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`
          }
        }
      )

      return data
    } catch (error) {
      return null
    }
  }

  //INFO : tested
  static async generatePasswordResetToken({
    user_id
  }: GenerateOTPType): Promise<string | null> {
    try {
      const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
      })
      const expires_at = new Date(Date.now() + 60000 * 10) // Expires after 10 minutes

      const user = await prisma.user.update({
        where: { id: user_id },
        data: {
          password_reset_token: OTP,
          password_reset_token_expiration: expires_at
        }
      })

      if (!user) return null

      return OTP
    } catch (error) {
      return null
    }
  }

  //NOTE: tested
  static async upsert_user_oauth_data({
    last_name,
    first_name,
    verified_email,
    email,
    picture
  }: UpsertUserOauthDataType) {
    const password = generator.generate({
      length: 10,
      numbers: true,
      uppercase: true,
      symbols: true
    })
    const hashed_password = await bcrypt.hash(password, 10)
    const data = {
      first_name: first_name.split(' ')[0],
      last_name,
      picture,
      user_name: first_name.split(' ').join('').toLowerCase(),
      verified_email
    }

    try {
      const user = await prisma.user.upsert({
        where: {
          email
        },
        update: {
          ...data,
          email
        },
        create: {
          email,
          password: hashed_password,
          ...data
        }
      })
      if (!user.id) return null

      return user
    } catch (error) {
      return null
    }
  }

  //NOTE: tested
  static async upsert_oauth_data({
    oauth_id,
    user_id,
    refresh_token,
    access_token,
    id_token,
    expire_in
  }: UpsertOauthDataType) {
    try {
      const oauth_data = await prisma.oAuthToken.upsert({
        where: {
          user_id: user_id
        },
        update: {
          access_token,
          expire_in,
          id_token
        },
        create: {
          oauth_id,
          user_id,
          refresh_token,
          access_token,
          expire_in,
          id_token
        }
      })
      if (!oauth_data) return null

      return oauth_data
    } catch (error) {
      return null
    }
  }

  static async get_oauth_data({ user_id }: getOauthDataType) {
    try {
      const oauth_user_data = await prisma.oAuthToken.findUnique({
        where: {
          user_id
        }
      })

      if (!oauth_user_data) return null
      return oauth_user_data
    } catch (error) {
      return null
    }
  }
}
