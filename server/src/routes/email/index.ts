import { post_thread, post_threads } from 'controllers'
import { Router } from 'express'
import { auth_credentials_about_to_expire } from 'middlewares'

const email_router = Router()

email_router.post(
  '/email/get/threads',
  auth_credentials_about_to_expire,
  post_threads
)
email_router.post(
  '/email/get/thread',
  auth_credentials_about_to_expire,
  post_thread
)

export { email_router }
