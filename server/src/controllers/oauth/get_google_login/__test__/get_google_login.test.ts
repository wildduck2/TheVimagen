import request from 'supertest'
import { describe, expect, it, Mock, vi } from 'vitest'
import { getGoogleOAuthURL } from '../../../../utils/getGoogleOAuthURL/getGoogleOAuthURL'
import express, { Express } from 'express'
import { get_google_login } from '../get_google_login'

const app: Express = express()
app.use(express.json())

app.get('/oauth/signin-google', get_google_login)

vi.mock('../../../../utils/getGoogleOAuthURL/getGoogleOAuthURL', () => ({
  getGoogleOAuthURL: vi.fn()
}))

describe('get_google_login', () => {
  it('should return url', async () => {
    ;(getGoogleOAuthURL as Mock).mockResolvedValue({ url: 'url' })
    const response = await request(app).get('/oauth/signin-google')

    expect(response.body).toEqual({ url: {} })
  })
})
