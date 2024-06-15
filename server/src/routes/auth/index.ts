import { Router } from "express"
import { postSignupAuthStep1Handler } from "../../controlers"

const authRouter = Router()

authRouter.post('/auth/signup-step1', postSignupAuthStep1Handler)


export { authRouter }
