export type StarThreadType = {
  addLabelIds?: string[]
  removeLabelIds?: string[]
  threadIds: string[]
  snoozeUntil?: Date
}

export type ModifyThreadRsponse = {
  id: string
  messages: [
    {
      id: string
      threadId: string
      labelIds: string[]
    },
  ]
}
