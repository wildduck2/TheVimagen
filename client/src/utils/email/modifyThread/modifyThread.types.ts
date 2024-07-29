export type StarThreadType = {
  addLabelIds?: string[]
  removeLabelIds?: string[]
  threadIds: string[]
  snoozeUntil?: Date
}

export type ModifyThreadType = {
  id: string
  threadId: string
  labelIds: string[]
}

export type ModifyThreadRsponse = {
  id: string
  messages: ModifyThreadType[]
}
