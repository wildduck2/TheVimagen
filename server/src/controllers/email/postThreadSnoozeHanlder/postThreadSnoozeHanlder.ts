import { OAuthToken } from '@prisma/client'
import { Email } from '@services/Email'
import { RequestHandler } from 'express'

export type PostThreadSnoozeBodyType = {
  snoozed_until: string
  thread_ids: string[]
  addLabelIds: string[]
  removeLabelIds: string[]
}

export const postThreadSnoozeHanlder: RequestHandler = async (req, res) => {
  const { access_token, oauth_id } = req.session.oauth_user_data as OAuthToken
  const {
    snoozed_until,
    thread_ids,
    addLabelIds,
    removeLabelIds
  }: PostThreadSnoozeBodyType = req.body

  try {
    const labels = await Email.ensureLabelExists({
      access_token,
      label_name: 'SNOOZED'
    })

    if (!labels)
      return res.json({ error: 'Failed to create snoozed label', data: null })

    const data = await Email.threadModifyGroupLabel({
      removeLabelIds,
      addLabelIds: [labels],
      access_token,
      distnation: `${oauth_id}/threads/`,
      threadIds: thread_ids,
      actionType: '/modify'
    })

    if (!data) return res.json({ error: 'failed to modify thread', data: null })

    // const data = await Email.scheduleEmail({
    //   access_token,
    //   addLabelIds,
    //   thread_ids,
    //   distnation: `${oauth_id}/threads/`,
    //   removeLabelIds,
    //   snoozed_until
    // })
    //
    // if (!data) return res.json({ error: 'Failed to snooze thread', data: null })
    return res.json({ error: null, data: data })
  } catch (error) {
    console.log(error)

    return res.json({ error: 'Failed to snooze thread', data: null })
  }
}
