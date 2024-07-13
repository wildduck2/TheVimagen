import DOMPurify from 'dompurify'

export const sanitizeEmailContent = (htmlContent: string) => {
  DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if ('target' in node) {
      node.setAttribute('target', '_blank')
    }
    if (!node.getAttribute('rel') || !node.getAttribute('rel').match(/^(noopener|noreferrer|nofollow)$/gi)) {
      node.setAttribute('rel', 'noopener noreferrer')
    }
  })

  const sanitizedContent = htmlContent // DOMPurify.sanitize(htmlContent)

  return sanitizedContent
}
