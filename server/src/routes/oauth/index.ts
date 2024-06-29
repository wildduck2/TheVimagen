import { Router } from 'express'
import { get_google_gmail, post_google_login } from '../../controllers'
import { auth_credentials_about_to_expire } from 'middlewares/auth_credentials_about_to_expire'

const oauthRouter = Router()

oauthRouter.get('/oauth/signin-google', get_google_gmail)
oauthRouter.get('/oauth/google', post_google_login)
oauthRouter.get(
  '/oauth/google/get-drafts',
  auth_credentials_about_to_expire,
  get_google_gmail
)

export { oauthRouter }
