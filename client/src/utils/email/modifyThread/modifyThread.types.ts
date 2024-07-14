export type StarThreadType = {
  addLabelIds?: string[]
  removeLabelIds?: string[]
  threadIds: string[]
}

export type StarThreadRsponse = {
  id: string
  messages: [
    {
      id: string
      threadId: string
      labelIds: string[]
    },
  ]
}
