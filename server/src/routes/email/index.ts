import {
  getGetSizeEsitmatedHandler,
  getLabels,
  postGetThreadHandler,
  postGetThreadsHandler,
  postThreadDraftCreateHanlder,
  postThreadDraftScheduleHanlder,
  postThreadModify,
  postThreadReply,
  postThreadSnoozeHanlder,
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
  '/email/snooze/thread',
  auth_credentials_about_to_expire,
  postThreadSnoozeHanlder
)

email_router.get(
  '/email/get/labels',
  auth_credentials_about_to_expire,
  getLabels
)

export { email_router }
