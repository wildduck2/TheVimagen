export type StartThreadType = {
  addLabelIds: string[]
  removeLabelIds: string[]
}

export type StartThreadRsponse = {
  id: string
  messages: [
    {
      id: string
      threadId: string
      labelIds: string[]
    },
  ]
}
