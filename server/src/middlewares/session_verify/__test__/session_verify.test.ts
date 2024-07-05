import express, { Express, Request, Response, NextFunction } from 'express'
import request from 'supertest'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { session_verify } from '../session_verify'
const app: Express = express()
app.use(express.json())

app.get('/test-no-session', session_verify, (req: Request, res: Response) => {
  res.json({ success: true })
})

const appWithSession: Express = express()
appWithSession.use(express.json())
appWithSession.use((req: Request, res: Response, next: NextFunction) => {
  req.sessionID = 'test_session_id'
  next()
})
appWithSession.get(
  '/test-with-session',
  session_verify,
  (req: Request, res: Response) => {
    res.json({ success: true })
  }
)

beforeAll(() => {
  vi.clearAllMocks()
})
describe('session_verify middleware', () => {
  it('should return error if sessionID is not present', async () => {
    const response = await request(app)
      .get('/test-no-session')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toEqual({ error: "you're not signed in" })
  })

  it('should call next if sessionID is present', async () => {
    const response = await request(appWithSession)
      .get('/test-with-session')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toEqual({ success: true })
  })
})
