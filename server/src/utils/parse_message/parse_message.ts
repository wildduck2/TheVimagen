import * as mime from 'mime' // For parsing MIME parts
import atob from 'atob' // For base64 decoding
import { GmailMessage, Message } from './parse_message.types'

function formatMessageToHtml(message: Message): string {
  const parts = message.payload.parts || [] // Use parts if available
  const htmlParts: string[] = []

  for (const part of parts) {
    const contentType = getContentType(part.headers)

    if (contentType?.startsWith('text/html')) {
      try {
        const decodedHtml = atob(part.body.data) // Assuming base64 encoding
        htmlParts.push(decodedHtml)
      } catch (error) {
        console.error(`Error decoding HTML part: ${error}`)
      }
    } else if (contentType?.startsWith('text/plain')) {
      try {
        const decodedText = atob(part.body.data) // Assuming base64 encoding
        htmlParts.push(`<pre>${decodedText}</pre>`) // Wrap plain text in pre tag
      } catch (error) {
        console.error(`Error decoding plain text part: ${error}`)
      }
    } else if (contentType?.startsWith('image/')) {
      // Handle images: Consider offering options to display or download
      console.log(`Image content found: ${contentType}`)
    } else {
      // Handle other content types (attachments, etc.) as needed
      console.log(`Unsupported content type: ${contentType}`)
    }

    // Handle nested message parts recursively (if applicable)
    if (part.parts) {
      const nestedHtml = formatMessageToHtml({ payload: part })
      htmlParts.push(nestedHtml)
    }
  }

  return htmlParts.join('\n') // Combine HTML parts
}

function getContentType(
  headers: Message['payload']['headers']
): string | undefined {
  for (const header of headers) {
    if (header.name.toLowerCase() === 'content-type') {
      return header.value
    }
  }
  return undefined
}
