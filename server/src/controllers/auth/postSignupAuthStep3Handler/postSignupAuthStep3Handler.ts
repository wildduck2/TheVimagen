import { RequestHandler } from 'express'
import { User } from '../../../services'
import { Prisma } from '@prisma/client'
import { postSignupAuthStep3HandlerBodyValues } from './postSignupAuthStep3Handler.types'

export const postSignupAuthStep3Handler: RequestHandler = async (req, res) => {
  try {
    const {
      age,
      bio,
      first_name,
      last_name,
      profession,
      pronounce,
      user_id,
      years_of_exprience
    }: postSignupAuthStep3HandlerBodyValues = req.body

    const updatedUser = await User.completeUserInfoSignupStep3({
      user_id,
      age: age,
      bio,
      last_name,
      first_name,
      pronounce,
      years_of_exprience,
      profession
    })

    if (!updatedUser)
      return res.json({ error: 'User Data Has not updated!!', user: null })

    return res.json({ error: null, user: updatedUser })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.json({
          error: 'User creation failed with error!! try again!',
          user: null
        })
      }
    }
    console.log(error)
    return res.json({ error: error })
  }
}
