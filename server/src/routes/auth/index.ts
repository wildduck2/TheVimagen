import { Router } from "express"
import { postSigninAuthHandler, postSignupAuthStep1Handler } from "../../controlers"

const authRouter = Router()

authRouter.post('/auth/signup-email-step1', postSignupAuthStep1Handler)
authRouter.post('/auth/signin-email', postSigninAuthHandler)


export { authRouter }
