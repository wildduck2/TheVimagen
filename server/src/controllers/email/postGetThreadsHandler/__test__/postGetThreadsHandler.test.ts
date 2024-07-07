import request from 'supertest'
import { describe, it, vi, beforeAll, Mock, expect } from 'vitest'
import express, { Express, Request, Response, NextFunction } from 'express'
import { postGetThreadsHandler } from '../postGetThreadsHandler'
import { Email } from '@services/Email'
import { ThreadsType } from '../postGetThreadsHandler.types'
import { MessageType, ThreadResType } from 'controllers/email'

vi.mock('../../../../services/Email', () => ({
  Email: {
    getMessagesIdsFromGmailAPI: vi.fn(),
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
app.post('/email/get/threads', postGetThreadsHandler)

describe('postGetThreadsHandler', () => {
  beforeAll(() => {
    vi.clearAllMocks()
  })

  const getMessagesIdsFromGmailAPIMockResolve = {
    threads: [{ id: 'thread1' }, { id: 'thread2' }],
    nextPageToken: 'nextPageToken'
  }
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
  const getMessagesIdsFromGmailAPIMockData = {
    access_token: 'access_token',
    maxResults: 30,
    distnation: `URL/threads/`,
    fields: 'threads(id),nextPageToken',
    pageToken: '',
    q: 'label:inbox'
  }
  const fetchEachOneWithIdMockData = {
    access_token: 'access_token',
    distnation: `URL/threads/`,
    fields: '',
    format: 'metadata'
  }

  it('should return threads and messages', async () => {
    ;(Email.getMessagesIdsFromGmailAPI as Mock).mockResolvedValue(
      getMessagesIdsFromGmailAPIMockResolve
    )
    ;(Email.fetchEachOneWithId as Mock).mockResolvedValue(
      fetchEachOneWithIdMockResolve
    )

    const data = await Email.getMessagesIdsFromGmailAPI<ThreadsType>(
      getMessagesIdsFromGmailAPIMockData
    )

    const finalData = await Email.fetchEachOneWithId<
      MessageType,
      ThreadResType
    >({
      ...fetchEachOneWithIdMockData,
      groupOfIds: data!.threads.map((thread) => thread.id)
    })

    const response = await request(app)
      .post('/email/get/threads')
      .send({
        user_id: 'test_user_id',
        maxResults: 10,
        q: 'label:CATEGORY_PRIMARY'
      })
      .expect('Content-Type', /json/)

    expect(data).toEqual(getMessagesIdsFromGmailAPIMockResolve)
    expect(finalData).toEqual(fetchEachOneWithIdMockResolve)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('messages')
    expect(response.body.data.messages.length).toBeGreaterThan(0)
  })

  it('should return error if the data fetching with id failed', async () => {
    ;(Email.getMessagesIdsFromGmailAPI as Mock).mockResolvedValue(null)

    const data = await Email.getMessagesIdsFromGmailAPI<ThreadsType>(
      getMessagesIdsFromGmailAPIMockData
    )

    const response = await request(app)
      .post('/email/get/threads')
      .send({
        user_id: 'test_user_id',
        maxResults: 10,
        q: 'label:CATEGORY_PRIMARY'
      })
      .expect('Content-Type', /json/)

    expect(data).toBeNull()
    expect(response.body).toEqual({
      error: `Error: failed to get threads`,
      data: null
    })
  })

  it('should return error if the data returned if it does not contains threads or a  nextPageToken', async () => {
    ;(Email.getMessagesIdsFromGmailAPI as Mock).mockResolvedValue({
      thread: 'thread'
    })

    const data = await Email.getMessagesIdsFromGmailAPI<ThreadsType>(
      getMessagesIdsFromGmailAPIMockData
    )

    const response = await request(app)
      .post('/email/get/threads')
      .send({
        user_id: 'test_user_id',
        maxResults: 10,
        q: 'label:CATEGORY_PRIMARY'
      })
      .expect('Content-Type', /json/)

    expect(data).toEqual({ thread: 'thread' })
    expect(response.body).toEqual({ error: 'No threads found.' })
  })

  it('should return error if the data fetched with ids failed', async () => {
    ;(Email.getMessagesIdsFromGmailAPI as Mock).mockResolvedValue(
      getMessagesIdsFromGmailAPIMockResolve
    )
    ;(Email.fetchEachOneWithId as Mock).mockResolvedValue(null)

    const data = await Email.getMessagesIdsFromGmailAPI<ThreadsType>(
      getMessagesIdsFromGmailAPIMockData
    )

    const finalData = await Email.fetchEachOneWithId<
      MessageType,
      ThreadResType
    >({
      ...fetchEachOneWithIdMockData,
      groupOfIds: data!.threads.map((thread) => thread.id)
    })

    const response = await request(app)
      .post('/email/get/threads')
      .send({
        user_id: 'test_user_id',
        maxResults: 10,
        q: 'label:CATEGORY_PRIMARY'
      })
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({
      error: 'Error: failed to fetch threads',
      data: null
    })
    expect(data).toEqual(getMessagesIdsFromGmailAPIMockResolve)
    expect(finalData).toBeNull()
  })

  it('should return error if the data fetched with ids failed', async () => {
    ;(Email.getMessagesIdsFromGmailAPI as Mock).mockRejectedValue({
      error: 'failed to get msgs',
      data: null
    })
    const response = await request(app)
      .post('/email/get/threads')
      .send({
        user_id: 'test_user_id',
        maxResults: 10,
        q: 'label:CATEGORY_PRIMARY'
      })
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ error: 'failed to get msgs', data: null })
  })

  it('should return error if the data fetched with ids failed', async () => {
    ;(Email.getMessagesIdsFromGmailAPI as Mock).mockResolvedValue(
      getMessagesIdsFromGmailAPIMockResolve
    )
    ;(Email.fetchEachOneWithId as Mock).mockResolvedValue({
      error: 'failed to get msgs',
      data: null
    })

    const data = await Email.getMessagesIdsFromGmailAPI<ThreadsType>(
      getMessagesIdsFromGmailAPIMockData
    )

    const finalData = await Email.fetchEachOneWithId<
      MessageType,
      ThreadResType
    >({
      ...fetchEachOneWithIdMockData,
      groupOfIds: data!.threads.map((thread) => thread.id)
    })

    const response = await request(app)
      .post('/email/get/threads')
      .send({
        user_id: 'test_user_id',
        maxResults: 10,
        q: 'label:CATEGORY_PRIMARY'
      })
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({
      data: {
        id: 'test_user_id',
        messages: {
          data: null,
          error: 'failed to get msgs'
        },
        nextPageToken: 'nextPageToken'
      },
      error: null
    })
    expect(data).toEqual(getMessagesIdsFromGmailAPIMockResolve)
    expect(finalData).toEqual({ error: 'failed to get msgs', data: null })
  })
})
