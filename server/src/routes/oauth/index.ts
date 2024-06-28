import { Router } from 'express'
import { getGoogleLogin, postGoogleLogin } from '../../controllers'

const oauthRouter = Router()

oauthRouter.get('/oauth/signin-google', getGoogleLogin)
oauthRouter.get('/oauth/google', postGoogleLogin)

export { oauthRouter }
