export function submitContact(req, res, next) {
  try {
    const { name, email, projectType, timeline, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and project details.'
      })
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      })
    }

    const inquiry = {
      id: Date.now(),
      name,
      email,
      projectType: projectType || 'Feature Film',
      timeline: timeline || 'Not specified',
      message,
      receivedAt: new Date().toISOString()
    }

    console.log('[New Contact Inquiry Received]:', inquiry)

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully! Suraj Singh will review your project details.',
      data: {
        id: inquiry.id,
        name: inquiry.name,
        receivedAt: inquiry.receivedAt
      }
    })
  } catch (error) {
    next(error)
  }
}
