import request from 'supertest'
import express, { Express } from 'express'
import { describe, it, expect, vi, Mock, beforeEach } from 'vitest'
import { auth_credentials_about_to_expire } from '../auth_credentials_about_to_expire' // Adjust the path accordingly
import { User } from '../../../services/User/User'
import { get_new_access_token } from '../../../utils'
import session from 'express-session'

vi.mock('../../../services/User/User', () => ({
  User: {
    get_oauth_data: vi.fn(),
    upsert_oauth_data: vi.fn()
  }
}))

vi.mock('../../../utils', () => ({
  prisma: {
    oAuthToken: {
      findUnique: vi.fn()
    }
  },
  get_new_access_token: vi.fn()
}))

const app: Express = express()
app.use(express.json())
app.use(
  session({
    secret: 'testsecret',
    resave: false,
    saveUninitialized: true
  })
)
app.post('/test', auth_credentials_about_to_expire, (req, res) => {
  res.json({ success: true })
})

describe('auth_credentials_about_to_expire middleware', () => {
  const oauth_user_data = {
    user_id: 'user_123',
    oauth_id: 'oauth_123',
    refresh_token: 'refresh_token_123',
    expire_in: 3600, // 1 hour
    updated_at: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  }

  const new_access_data = {
    access_token: 'new_access_token',
    id_token: 'new_id_token',
    expires_in: 3600 // 1 hour
  }
  const oauth_data_updated = {
    ...oauth_user_data,
    expire_in: new_access_data.expires_in,
    id_token: new_access_data.id_token,
    access_token: new_access_data.access_token
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should proceed to next middleware if credentials are not about to expire', async () => {
    ;(User.get_oauth_data as Mock).mockResolvedValue(oauth_user_data)

    const response = await request(app)
      .post('/test')
      .send({ user_id: 'user_123' })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toEqual({ success: true })
  })

  it('should refresh tokens if credentials are about to expire', async () => {
    ;(User.get_oauth_data as Mock).mockResolvedValue(oauth_user_data)
    ;(get_new_access_token as Mock).mockResolvedValue(new_access_data)
    ;(User.upsert_oauth_data as Mock).mockResolvedValue(oauth_data_updated)

    const response = await request(app)
      .post('/test')
      .send({ user_id: 'user_123' })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toEqual({ success: true })
  })

  it('should return error if user does not exist', async () => {
    ;(User.get_oauth_data as Mock).mockResolvedValue(null)

    const response = await request(app)
      .post('/test')
      .send({ user_id: 'user_123' })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toEqual({
      error: 'Error: user does not exist',
      data: null
    })
  })

  it('should return error if token refresh fails', async () => {
    const oauth_user_data = {
      user_id: 'user_123',
      oauth_id: 'oauth_123',
      refresh_token: 'refresh_token_123',
      expire_in: 3600, // 1 hour
      updated_at: new Date(Date.now() - 1000 * 60 * 55) // 55 minutes ago
    }

    ;(User.get_oauth_data as Mock).mockResolvedValue(oauth_user_data)
    ;(get_new_access_token as Mock).mockResolvedValue(null)

    const response = await request(app)
      .post('/test')
      .send({ user_id: 'user_123' })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toEqual({
      error: 'Error: oauth refresh token failed',
      data: null
    })
  })

  it('should return error if updating oauth data fails', async () => {
    const oauth_user_data = {
      user_id: 'user_123',
      oauth_id: 'oauth_123',
      refresh_token: 'refresh_token_123',
      expire_in: 3600, // 1 hour
      updated_at: new Date(Date.now() - 1000 * 60 * 55) // 55 minutes ago
    }
    const new_access_data = {
      access_token: 'new_access_token',
      id_token: 'new_id_token',
      expires_in: 3600 // 1 hour
    }

    ;(User.get_oauth_data as Mock).mockResolvedValue(oauth_user_data)
    ;(get_new_access_token as Mock).mockResolvedValue(new_access_data)
    ;(User.upsert_oauth_data as Mock).mockResolvedValue(null)

    const response = await request(app)
      .post('/test')
      .send({ user_id: 'user_123' })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toEqual({
      error: 'Error: failed to update the oauth user data',
      data: null
    })
  })

  it('should return error if an unexpected error occurs', async () => {
    ;(User.get_oauth_data as Mock).mockRejectedValue(
      new Error('Unexpected error')
    )

    const response = await request(app)
      .post('/test')
      .send({ user_id: 'user_123' })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toEqual({ error: 'failed to request neew tokens' })
  })
})
