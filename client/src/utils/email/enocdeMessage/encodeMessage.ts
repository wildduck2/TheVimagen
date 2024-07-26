import { Base64 } from 'js-base64'
import { EncodeMEssageType } from './encodeMessage.types'

export const encodeMessage = ({ thread, htmlContent, to, replyStatus }: EncodeMEssageType) => {
  const { forward, replyAll } = replyStatus
  const { to: from, id, subject, cc } = thread

  const rawMessage = [
    `From: ${from.map((item) => item.email).join(', ') || ''}`,
    `To: ${to.name} <${to.email}>`,
    replyAll ? `Cc: ${cc?.map((item) => item.email).join(', ') || ''}` : '',
    `Subject: ${forward ? 'FWD' : 'RE'}: ${subject}`,
    `In-Reply-To: ${id}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    htmlContent,
    `</div>`,
    `<div style="margin: 1rem">`,
    `---------------------------------`,
    `<p>This email was sent from ${thread.from.name} by <a style="color: blue" href="https://github.com/wildduck2/" target="_blank">TheVimagen</a> app</p>`,
    `---------------------------------`,
    `</div>`,
  ].join('\r\n')

  console.log(rawMessage)

  return Base64.encode(rawMessage)
}
