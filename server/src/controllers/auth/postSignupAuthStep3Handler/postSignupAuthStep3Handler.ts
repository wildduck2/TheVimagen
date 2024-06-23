import { RequestHandler } from 'express'
import { User } from '../../../modles'
import { Prisma } from '@prisma/client'
import { postSignupAuthStep3HandlerBodyValues } from './postSignupAuthStep3Handler.types'

export const postSignupAuthStep3Handler: RequestHandler = async (req, res) => {
  try {
    const {
      age,
      bio,
      firstName,
      lastName,
      profession,
      pronounce,
      email,
      yearsOfExprience
    }: postSignupAuthStep3HandlerBodyValues = req.body

    const user = await User.checkUserExistInDb({ email: email })

    if (!user)
      return res.json({ user: null, error: "This user Doesn't exist!!" })

    const updatedUser = await User.completeUserInfoSignupStep3({
      userID: user?.id,
      age: +age,
      bio,
      lastName,
      firstName,
      pronounce,
      yearsOfExprience: +yearsOfExprience,
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
