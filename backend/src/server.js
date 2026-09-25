import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './config/index.js'
import projectsRouter from './routes/projects.js'
import contactRouter from './routes/contact.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

// Security Headers
app.use(helmet())

// CORS setup
app.use(
  cors({
    origin: '*', // Allows local dev and cross-origin previews
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

// Body parser
app.use(express.json())

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Suraj Singh Portfolio API',
    timestamp: new Date().toISOString()
  })
})

// Mount API routes
app.use('/api/projects', projectsRouter)
app.use('/api/contact', contactRouter)

// Error Handler
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`🎬 Suraj Singh Portfolio API running on port ${config.port}`)
})

export default app
