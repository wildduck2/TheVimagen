import { Base64 } from 'js-base64'
import { EncodeMEssageType } from './encodeMessage.types'

export const encodeMessage = ({ thread, htmlContent }: EncodeMEssageType) => {
  const { from, id, to, subject } = thread

  const rawMessage = [
    `From: ${to[0].email}`,
    `To: ${from.email}`,
    `Subject: RE: ${subject}`,
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

  return Base64.encode(rawMessage)
}
