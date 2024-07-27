import { OAuthToken } from '@prisma/client'
import { Email } from '@services/Email'
import { RequestHandler } from 'express'

export type PostThreadSnoozeBodyType = {
  snooze_until: Date
  thread_ids: string[]
}

export const postThreadSnoozeHanlder: RequestHandler = async (req, res) => {
  const { access_token, oauth_id, user_id } = req.session
    .oauth_user_data as OAuthToken
  const { snooze_until, thread_ids }: PostThreadSnoozeBodyType = req.body

  try {
    const labels = await Email.ensureLabelExists({
      access_token,
      label_name: 'SNOOZED'
    })
    if (!labels)
      return res.json({ error: 'Failed to create snoozed label', data: null })

    const thread = await Email.threadModifyGroupLabel({
      removeLabelIds: ['INBOX'],
      addLabelIds: [labels],
      access_token,
      distnation: `${oauth_id}/threads/`,
      threadIds: thread_ids,
      actionType: '/modify'
    })
    if (!thread)
      return res.json({ error: 'failed to modify thread', data: null })

    const snooze = await Email.scheduleEmail({
      snooze_until,
      thread_id: thread_ids[0],
      user_id
    })
    if (!snooze)
      return res.json({ error: 'Failed to snooze thread', data: null })

    return res.json({ error: null, data: snooze })
  } catch (error) {
    console.log(error)
    return res.json({ error: 'Failed to snooze thread', data: null })
  }
}
