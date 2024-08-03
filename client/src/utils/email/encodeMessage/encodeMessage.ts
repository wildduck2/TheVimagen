import { EncodeMEssageType } from './encodeMessage.types'
import { Base64, EmailBuilder, ValueType } from '@ahmedayob/email-toolkit'

export const encodeMessage = ({ thread, htmlContent, to, replyStatus }: EncodeMEssageType) => {
  const { forward, replyAll } = replyStatus
  const { to: from, id, subject, cc } = thread

  const msg = new EmailBuilder()

  // msg.addMessage({
  //   data: '<p> trhat s ahmed ayob asudf</p>',
  //   charset: 'UTF-8',
  //   headers: {
  //     Date: 'Wed, 31 Jul 2024 13:39:10 GMT',
  //     From: 'wildduck2/email-builder <email-builder@noreply.github.com>',
  //     To: 'Ahmed Ayob <notifications@github.com>',
  //     Subject: 'RE: [wildduck2email-builder] Run failed: CI - main (b682de3)',
  //     'In-Reply-To': '19108cbf60f51f1a',
  //     'Content-Type': 'text/html',
  //     'Content-Transfer-Encoding': 'base64',
  //   },
  //   encoding: '7bit',
  //   contentType: 'text/plain',
  // })
  //
  // return msg.asEncoded()
  // const emlContent = Base64.encodeToBase64(htmlContent)
  // const boundary = 'boundary123'
  //
  // let email = [
  //   `To: ${to}`,
  //   `From: ${from}`,
  //   `Subject: ${subject}`,
  //   'Content-Type: multipart/mixed; boundary="' + boundary + '"',
  //   '',
  //   '--' + boundary,
  //   'Content-Type: text/plain; charset="UTF-8"',
  //   'Content-Transfer-Encoding: 7bit',
  //   '',
  //   'This is a multi-part message in MIME format.',
  //   '',
  //   '--' + boundary,
  //   'Content-Type: text/html; charset="UTF-8"',
  //   'Content-Transfer-Encoding: base64',
  //   `Content-Disposition: attachment; filename="message.eml"`,
  //   '',
  //   emlContent,
  //   '--' + boundary + '--',
  // ].join('\n')
  //
  // return Base64.encodeToBase64(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  //
  const rawMessage = [
    `From: wezonaser50@gmail.com`,
    `To: wezonaser50@gmail.com`,
    `In-Reply-To: ${id}`,
    `Subject: ${subject}`,
    '',
    '--boundary',
    'Content-Type: text/html; charset=UTF-8',
    'MIME-Version: 1.0',
    '',
    htmlContent,
    '',
    '--boundary',
    'Content-Type: application/pdf; name="attachment.pdf"',
    'Content-Transfer-Encoding: base64',
    'Content-Disposition: attachment; filename="attachment.pdf"',
    '',
    'JVBERi0xLjcKCjE5MDwzCjI3MjQKPDwKc3RhY2s+CiAgPGh0bWw+Cjxob3N0Pgo8Zm9udCB4bWxuczp4bXBuaWZpw6FzPC9oZWFkPgo8L2h0bWw+CjwvZm9udD4KPC9odG1sPg==',
  ].join('\r\n')

  return Base64.encodeToBase64(rawMessage)
}
