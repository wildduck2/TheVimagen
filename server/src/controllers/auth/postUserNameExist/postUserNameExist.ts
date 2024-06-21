import { RequestHandler } from 'express'
import { prisma } from '../../../utils'
import { postUserNameExistBodyProps } from './postUserNameExist.types'

export const postUserNameExist: RequestHandler = async (req, res) => {
  const { userName }: postUserNameExistBodyProps = req.body

  try {
    const user = await prisma.user.findUnique({ where: { userName } })

    if (user)
      return res.json({ user: null, error: 'userDo exist', valid: false })

    return res.json({ user: req.session.user, error: null, valid: true })
  } catch (error) {
    res.json({ user: null, error: error, valid: false })
  }
}
