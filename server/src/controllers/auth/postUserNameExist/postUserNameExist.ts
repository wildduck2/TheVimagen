import { RequestHandler } from 'express'
import { prisma } from '../../../utils'
import { postUserNameExistBodyProps } from './postUserNameExist.types'
import { Prisma } from '@prisma/client'

export const postUserNameExist: RequestHandler = async (req, res) => {
  const { userName }: postUserNameExistBodyProps = req.body

  try {
    const user = await prisma.user.findUnique({ where: { userName } })

    if (!user) {
      return res.json({
        user: null,
        error: 'User does not exist',
        valid: true
      })
    }

    return res.json({ user, error: null, valid: false })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({
          error:
            'Unique constraint failed on the fields: ' + error.meta?.target,
          user: null,
          valid: false
        })
      }
    }
    return res
      .status(500)
      .json({ user: null, error: 'Internal Server Error', valid: false })
  }
}
