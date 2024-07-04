import request from 'supertest'
import { describe, it, vi, beforeAll, Mock, expect } from 'vitest'
import express, { Express, Request, Response, NextFunction } from 'express'
import { Email } from '@services/Email'
import { postGetThreadHandler } from '../postGetThreadHandler'

vi.mock('../../../../services/Email', () => ({
  Email: {
    fetchEachOneWithId: vi.fn().mockResolvedValue([
      {
        id: 'thread1',
        messages: [{ id: 'message1', threadId: 'thread1' }]
      },
      {
        id: 'thread2',
        messages: [{ id: 'message2', threadId: 'thread2' }]
      }
    ])
  }
}))

const app: Express = express()
app.use(express.json())
app.use((req: Request, res: Response, next: NextFunction) => {
  req.session = {
    oauth_user_data: {
      access_token: 'test_access_token',
      oauth_id: 'test_oauth_id',
      user_id: 'test_user_id'
    }
  }
  next()
})
app.post('/email/get/thread', postGetThreadHandler)

describe('postGetThreadHandler', () => {
  beforeAll(() => {
    vi.clearAllMocks()
  })

  const fetchEachOneWithIdMockResolve = [
    {
      id: 'thread1',
      messages: [{ id: 'message1', threadId: 'thread1' }]
    },
    {
      id: 'thread2',
      messages: [{ id: 'message2', threadId: 'thread2' }]
    }
  ]

  const fetchEachOneWithIdMockData = {
    groupOfIds: ['123'],
    access_token: 'access_token',
    distnation: `URL/threads/`,
    fields: '',
    format: 'full'
  }

  it('should return threads and messages', async () => {
    ;(Email.fetchEachOneWithId as Mock).mockResolvedValue(
      fetchEachOneWithIdMockResolve
    )

    const data = await Email.fetchEachOneWithId(fetchEachOneWithIdMockData)

    const response = await request(app)
      .post('/email/get/thread')
      .send({
        threads_id: ['thread1', 'thread2']
      })
      .expect('Content-Type', /json/)

    expect(data).toEqual(fetchEachOneWithIdMockResolve)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data.length).toBeGreaterThan(0)
    expect(response.body.data[0]).toHaveProperty('id', 'thread1')
    expect(data![0]).toHaveProperty('messages')
  })

  it('should handle error if fetching threads fails', async () => {
    ;(Email.fetchEachOneWithId as Mock).mockResolvedValue(null)

    const data = await Email.fetchEachOneWithId(fetchEachOneWithIdMockData)

    const response = await request(app)
      .post('/email/get/thread')
      .send({
        threads_id: ['thread1', 'thread2']
      })
      .expect('Content-Type', /json/)

    expect(data).toBeNull()
    expect(response.body).toEqual({
      error: 'Error: failed to get threads',
      data: null
    })
  })

  it('should handle error if the request rejected', async () => {
    ;(Email.fetchEachOneWithId as Mock).mockRejectedValue({
      error: 'failed to get msgs',
      data: null
    })

    const response = await request(app)
      .post('/email/get/thread')
      .send({
        threads_id: ['thread1', 'thread2']
      })
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ error: 'failed to get msgs', data: null })
  })
})
