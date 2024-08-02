export const corsOptions = {
  origin: process.env.CORS_PATH, // Replace with your actual domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you need to support credentials
}

export const GMAIL_URL = `https://gmail.googleapis.com/gmail/v1/users/`
export * from './zodSchemas'
