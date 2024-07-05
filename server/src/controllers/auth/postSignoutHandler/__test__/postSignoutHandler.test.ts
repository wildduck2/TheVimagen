import request from 'supertest'
import express, { Express } from 'express'
import { postSignoutHandler } from '../postSignoutHandler' // Adjust path as needed
import { User } from '../../../../services/User/User' // Adjust path as needed
import { afterEach, describe, expect, it, Mock, vi } from 'vitest'

vi.mock('../../../../services/User/User', () => ({
  User: {
    deleteSession: vi.fn()
  }
}))

const app: Express = express()
app.use(express.json())

app.post('/auth/signout', postSignoutHandler)

describe('postSignoutHandler', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  const resolvedMocked = {
    id: 'test_user_id'
  }

  it('should sign out successfully', async () => {
    ;(User.deleteSession as Mock).mockResolvedValue(resolvedMocked)

    const response = await request(app)
      .post('/auth/signout')
      .send({ user_id: 'test_user_id' })

    expect(response.body).toEqual({ error: null, signedOut: true })
  })

  it('should handle session not found', async () => {
    ;(User.deleteSession as Mock).mockResolvedValue(null)

    const response = await request(app)
      .post('/auth/signout')
      .send({ user_id: 'test_user_id' })
    const result = await User.deleteSession({ user_id: 'test_user_id' })

    expect(response.body).toEqual({
      error: 'session delete failed',
      signedOut: false
    })
    expect(result).toBe(null)
  })

  it('should handle deletion error', async () => {
    ;(User.deleteSession as Mock).mockRejectedValue({
      error: 'signout filed with errors',
      signedOut: false
    })

    const response = await request(app)
      .post('/auth/signout')
      .send({ user_id: 'test_user_id' })

    expect(response.body).toEqual({
      error: 'signout filed with errors',
      signedOut: false
    })
  })
})
