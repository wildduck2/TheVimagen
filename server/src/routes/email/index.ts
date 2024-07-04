import {
  postGetHistoryHandler,
  postGetThreadHandler,
  postGetThreadsHandler
} from '../../controllers'
import { Router } from 'express'
import { auth_credentials_about_to_expire } from '../../middlewares'

const email_router = Router()

email_router.post(
  '/email/get/threads',
  auth_credentials_about_to_expire,
  postGetThreadsHandler
)
email_router.post(
  '/email/get/thread',
  auth_credentials_about_to_expire,
  postGetThreadHandler
)

email_router.post(
  '/email/get/history',
  auth_credentials_about_to_expire,
  postGetHistoryHandler
)

export { email_router }
