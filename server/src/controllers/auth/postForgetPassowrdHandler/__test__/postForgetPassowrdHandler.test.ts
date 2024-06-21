import express, { Express } from 'express'
import { User } from '../../../../modles/User/User'
import { describe, it, vi, Mock, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { postForgetPassowrdHandler } from '../postForgetPassowrdHandler'

const app: Express = express()
app.use(express.json())
app.post('/forget-passowd', postForgetPassowrdHandler)

vi.mock('../../../../modles/User/User', () => ({
  User: {
    checkUserExistInDb: vi.fn()
  }
}))

describe('postForgetPassowrdHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return error if the email does not found', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue(null)

    const response = await request(app)
      .post('/forget-passowd')
      .send({ email: 'test@example.com' })

    expect(response.body).toEqual({
      error: 'The user does not exist',
      user: null
    })
  })

  it('should return error if the OTP generating fails', async () => {
    ;(User.checkUserExistInDb as Mock).mockResolvedValue({ id: '123' })
    ;(User.generateOTP as Mock).mockRejectedValue(null)

    const response = await request(app)
      .post('/forget-passowd')
      .send({ email: 'doexist@gmail.com' })

    console.log(response.body)
    // expect(response.body).toEqual({
    //   error: null
    // })
  })
})
