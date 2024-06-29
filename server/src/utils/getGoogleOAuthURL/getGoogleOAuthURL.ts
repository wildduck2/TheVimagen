export const getGoogleOAuthURL = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

  const options = {
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL as string,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.send'
    ].join(' ')
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}
