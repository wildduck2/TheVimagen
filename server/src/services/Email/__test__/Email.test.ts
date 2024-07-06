import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import axios from 'axios'
import { Email } from '../Email'
import { ThreadsType } from '../../../controllers'

vi.mock('axios')

beforeEach(() => {
  vi.clearAllMocks()
})
//NOTE: getMessagesIdsFromGmailAPI unit tests
describe('getMessagesIdsFromGmailAPI unit tests', () => {
  const mockedUserID = {
    q: 'test_q',
    fields: 'test_fields',
    distnation: 'test_distnation',
    maxResults: 1,
    access_token: 'test_access_token'
  }

  const getMessagesIdsFromGmailAPIMockResolve = {
    threads: [{ id: 'thread1' }, { id: 'thread2' }],
    nextPageToken: 'nextPageToken'
  }

  it('should return null if the reqest data whent good but the data does not exist', async () => {
    ;(axios.get as Mock).mockResolvedValue(null)

    const data =
      await Email.getMessagesIdsFromGmailAPI<ThreadsType>(mockedUserID)

    expect(data).toBeNull()
  })

  it('should return null if the reqest failed', async () => {
    ;(axios.get as Mock).mockRejectedValue({
      data: null
    })

    const data =
      await Email.getMessagesIdsFromGmailAPI<ThreadsType>(mockedUserID)
    expect(data).toBeNull()
  })

  it('should return data if the request went okay', async () => {
    ;(axios.get as Mock).mockResolvedValue({
      data: getMessagesIdsFromGmailAPIMockResolve
    })

    const data =
      await Email.getMessagesIdsFromGmailAPI<ThreadsType>(mockedUserID)

    expect(data).toEqual(getMessagesIdsFromGmailAPIMockResolve)
  })
})

//NOTE: fetchEachOneWithId unit tests
describe('fetchEachOneWithId unit tests', () => {
  const mockedUserID = {
    access_token: 'test_access_token',
    distnation: 'test_distnation',
    fields: 'test_fields',
    format: 'full',
    groupOfIds: ['123']
  }

  const fetchEachOneWithIdMockResolve = [
    {
      id: 'thread1',
      historyId: 'test',
      messages: [{ id: 'message1', threadId: 'thread1' }]
    }
  ]

  it('should return null if the data does not exist ', async () => {
    ;(axios.get as Mock).mockResolvedValue(null)

    const data = await Email.fetchEachOneWithId(mockedUserID)

    expect(data).toEqual([])
  })
  it('should return error if the reqest failed', async () => {
    ;(axios.get as Mock).mockRejectedValue({
      data: null
    })

    const data = await Email.fetchEachOneWithId(mockedUserID)
    expect(data).toEqual([])
  })

  it('should return daat if the request  went all okay', async () => {
    ;(axios.get as Mock).mockResolvedValue({
      data: fetchEachOneWithIdMockResolve[0]
    })

    const data = await Email.fetchEachOneWithId(mockedUserID)
    expect(data).toEqual([{ id: 'message1', threadId: 'thread1' }])
  })
})
