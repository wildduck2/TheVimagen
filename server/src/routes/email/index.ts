import {
  getGetSizeEsitmatedHandler,
  postGetThreadHandler,
  postGetThreadsHandler,
  postThreadModify
} from '../../controllers'
import { Router } from 'express'
import { auth_credentials_about_to_expire } from '../../middlewares'
import { postThreadTrash } from 'controllers/email/postThreadTrash'

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
  '/email/get/time-estimated',
  auth_credentials_about_to_expire,
  getGetSizeEsitmatedHandler
)

email_router.post(
  '/email/moify/thread',
  auth_credentials_about_to_expire,
  postThreadModify
)

email_router.post(
  '/email/trash/thread',
  auth_credentials_about_to_expire,
  postThreadTrash
)

export { email_router }
