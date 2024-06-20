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

const authRouter = Router()

authRouter.post('/auth/signin-email', postSigninAuthHandler)
authRouter.post('/auth/signup-email-step1', postSignupAuthStep1Handler)
authRouter.post(
  '/auth/signup-email-step2',
  sessionVerify,
  postSignupAuthStep2Handler
)
authRouter.post(
  '/auth/signup-email-step3',
  // sessionVerify,
  postSignupAuthStep3Handler
)
authRouter.post('/auth/userNameExist', postUserNameExist)
authRouter.post('/auth/forgetPassword', postForgetPassowrdHandler)

export { authRouter }
