export type StarThreadType = {
  addLabelIds?: string[]
  removeLabelIds?: string[]
  threadId: string
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
