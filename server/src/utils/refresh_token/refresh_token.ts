import axios from 'axios'
import { getNewAccessTokenType, TokenResponse } from './refresh_token.types'

export async function get_new_access_token({
  clientSecret,
  refreshToken,
  clientId
}: getNewAccessTokenType): Promise<TokenResponse | null> {
  const tokenEndpoint = 'https://oauth2.googleapis.com/token'

  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('client_secret', clientSecret)
  params.append('refresh_token', refreshToken)
  params.append('grant_type', 'refresh_token')

  try {
    const response = await axios.post<TokenResponse>(tokenEndpoint, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error response:', error.response.data)
      return null
    }
    console.error('Failed to refresh access token', error)
    return null
  }
}
