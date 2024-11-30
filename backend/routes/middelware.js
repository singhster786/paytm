const { JWT_SECRET } = require('./config.js')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({})
    }

    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, 'test123')
    if (decoded.userId) {
      req.userId = decoded.userId
      next()
    } else {
      res.status(403).json({})
    }
  } catch (error) {
    res.json({
      message: 'Invalid token'
    })
  }
}

module.exports = authMiddleware
