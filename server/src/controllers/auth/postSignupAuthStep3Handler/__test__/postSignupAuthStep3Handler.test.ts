import express, { type Express } from 'express'
import session from 'express-session'
import { describe, it, vi, Mock, expect } from 'vitest'
import request from 'supertest'
import { User } from '../../../../services'
import { postSignupAuthStep3Handler } from '../postSignupAuthStep3Handler'

const app: Express = express()
app.use(express.json())
app.use(
    session({
        secret: 'testsecret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 70 * 60 * 1000, // 7 days
            httpOnly: true,
            secure: false
        }
    })
)
app.post('/auth/signup-email-step3', postSignupAuthStep3Handler)

vi.mock('../../../../services')

describe('postSignupAuthStep3Handler', () => {
    it('hsould return error if the data update to the user has failed', async () => {
        ; (User.completeUserInfoSignupStep3 as Mock).mockResolvedValue(null)

        const response = await request(app).post('/auth/signup-email-step3').send({
            age: '123',
            bio: 'bio',
            firstName: 'test',
            lastName: 'test2',
            profession: 'test',
            pronouce: 'test',
            userId: '123',
            yearsOfExprience: '2'
        })
        expect(response.body).toEqual({
            error: 'User Data Has not updated!!',
            user: null
        })
    })

    it('should return the user updated', async () => {
        ; (User.completeUserInfoSignupStep3 as Mock).mockResolvedValue({
            email: 'doexist@gmail.com',
            id: '123'
        })

        const response = await request(app).post('/auth/signup-email-step3').send({
            age: '123',
            bio: 'bio',
            firstName: 'test',
            lastName: 'test2',
            profession: 'test',
            pronouce: 'test',
            userId: '123',
            yearsOfExprience: '2'
        })
        expect(response.body).toEqual({
            error: null,
            user: {
                email: 'doexist@gmail.com',
                id: '123'
            }
        })
    })
})
