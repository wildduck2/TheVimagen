export const corsOptions = {
  origin: process.env.CORS_PATH, // Replace with your actual domain
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // if you need to support credentials
}
export * from './zodSchemas'
