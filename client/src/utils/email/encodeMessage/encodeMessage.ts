import { EncodeMEssageType } from './encodeMessage.types'
import { Base64, EmailBuilder, ValueType } from '@ahmedayob/email-toolkit'

export const encodeMessage = ({ thread, htmlContent, to, replyStatus }: EncodeMEssageType) => {
  const { forward, replyAll } = replyStatus
  const { to: from, id, subject, cc } = thread

  const msg = new EmailBuilder()

  msg.addMessage({
    headers: {
      From: `${from[0].name} <${from[0].email as ValueType}>`,
      To: `${to.name} <${to.email as ValueType}>`,
      Subject: `${forward ? 'FWD' : 'RE'}: ${subject}`,
      Cc: `${cc[0].name} <${cc[0].email as ValueType}>`,
      'In-Reply-To': id,
      'Content-Transfer-Encoding': 'base64',
      'Content-Type': 'text/html',
    },
    charset: 'utf-8',
    contentType: 'text/html',
    data: 'asdfasdfasdlkasjdfklasdjf;asldkfj;',
  })

  return msg.asEncoded()
}
