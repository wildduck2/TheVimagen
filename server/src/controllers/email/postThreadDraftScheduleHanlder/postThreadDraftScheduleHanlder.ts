import { RequestHandler } from 'express'

export type PostThreadDraftScheduleHanlderType = {}
export const postThreadDraftScheduleHanlder: RequestHandler = async (
  req,
  res
) => {
  try {
    const data = []

    if (!data)
      return res.json({ error: 'failed to schedule draft', data: null })
  } catch (error) {
    return res.json({ error: 'failed to schedule draft', data: null })
  }
}
