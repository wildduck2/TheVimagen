import { Router } from 'express'
import {
    postForgetPassowrdHandler,
    postSigninAuthHandler,
    postSignoutHandler,
    postSignupAuthStep1Handler,
    postSignupAuthStep2Handler,
    postSignupAuthStep3Handler,
    postUserNameExist
} from '../../controllers'
import { session_verify } from '../../middlewares'
import {
    emailPasswordSchema,
    emailPasswordUserNameSchema,
    emailShcema,
    optUserIdSchema,
    userData,
    userNameShcema,
    validate
} from '../../constants'

const auth_router = Router()

auth_router.post(
    '/auth/signin-email',
    validate(emailPasswordSchema),
    postSigninAuthHandler
)
auth_router.post(
    '/auth/signup-email-step1',
    validate(emailPasswordUserNameSchema),
    postSignupAuthStep1Handler
)
auth_router.post(
    '/auth/signup-email-step2',
    validate(optUserIdSchema),
    session_verify,
    postSignupAuthStep2Handler
)
auth_router.post(
    '/auth/signup-email-step3',
    session_verify,
    validate(userData),
    postSignupAuthStep3Handler
)
auth_router.post(
    '/auth/userNameExist',
    validate(userNameShcema),
    postUserNameExist
)
auth_router.post(
    '/auth/forgetPassword',
    validate(emailShcema),
    postForgetPassowrdHandler
)
auth_router.post('/auth/signout', postSignoutHandler)

export { auth_router }
