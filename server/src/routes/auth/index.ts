import { Router } from 'express'
import {
  postForgetPassowrdHandler,
  postSigninAuthHandler,
  postSignupAuthStep1Handler,
  postSignupAuthStep2Handler,
  postSignupAuthStep3Handler,
  postUserNameExist
} from '../../controllers'
import { sessionVerify } from '../../middlewares'
import {
  emailPasswordSchema,
  emailPasswordUserNameSchema,
  optUserIdSchema,
  userData,
  userNameShcema,
  validate
} from '../../constants'

const authRouter = Router()

authRouter.post(
  '/auth/signin-email',
  validate(emailPasswordSchema),
  postSigninAuthHandler
)
authRouter.post(
  '/auth/signup-email-step1',
  validate(emailPasswordUserNameSchema),
  postSignupAuthStep1Handler
)
authRouter.post(
  '/auth/signup-email-step2',
  validate(optUserIdSchema),
  sessionVerify,
  postSignupAuthStep2Handler
)
authRouter.post(
  '/auth/signup-email-step3',
  // sessionVerify,
  validate(userData),
  postSignupAuthStep3Handler
)
authRouter.post(
  '/auth/userNameExist',
  validate(userNameShcema),
  postUserNameExist
)
authRouter.post(
  '/auth/forgetPassword',
  validate(emailPasswordSchema),
  postForgetPassowrdHandler
)

export { authRouter }
