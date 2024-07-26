import {
  getGetSizeEsitmatedHandler,
  postGetThreadHandler,
  postGetThreadsHandler,
  postThreadDraftCreateHanlder,
  postThreadDraftScheduleHanlder,
  postThreadModify,
  postThreadReply,
  postThreadTrash
} from '../../controllers'
import { Router } from 'express'
import { auth_credentials_about_to_expire } from '../../middlewares'

const email_router = Router()

email_router.post(
  '/email/get/threads',
  // doubleCsrfProtection,
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
  '/email/modify/thread',
  auth_credentials_about_to_expire,
  postThreadModify
)

email_router.post(
  '/email/trash/thread',
  auth_credentials_about_to_expire,
  postThreadTrash
)

email_router.post(
  '/email/reply/thread',
  auth_credentials_about_to_expire,
  postThreadReply
)

email_router.post(
  '/email/draft/thread',
  auth_credentials_about_to_expire,
  postThreadDraftCreateHanlder
)

email_router.post(
  '/email/schedule/thread',
  auth_credentials_about_to_expire,
  postThreadDraftScheduleHanlder
)

export { email_router }
