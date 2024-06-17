import { Router } from "express"
import { postSigninAuthHandler, postSignupAuthStep1Handler, postSignupAuthStep2Handler } from "../../controlers"

const authRouter = Router()

authRouter.post('/auth/signin-email', postSigninAuthHandler)
authRouter.post('/auth/signup-email-step1', postSignupAuthStep1Handler)
authRouter.post('/auth/signup-email-step2', postSignupAuthStep2Handler)


export { authRouter }
