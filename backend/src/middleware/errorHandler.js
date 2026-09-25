export function errorHandler(err, req, res, next) {
  console.error('[API Error]:', err.stack || err.message)
  
  const status = err.statusCode || 500
  const message = err.message || 'Internal server error'

  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}
