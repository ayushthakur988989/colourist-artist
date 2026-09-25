import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { submitContact } from '../controllers/contactController.js'

const router = Router()

// Rate limiting: max 10 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: 'Too many contact submissions from this IP. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

router.post('/', contactLimiter, submitContact)

export default router
