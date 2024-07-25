import { EncodedMessagesType } from '../postThreadDraftCreateHanlder'

export type PostThreadReplyType = {
  encodedMessages: EncodedMessagesType[]
}
export type EncodedMessagessType = {
  email: string
  encodedMessage: string
}
