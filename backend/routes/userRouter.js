const express = require('express')
const zod = require('zod')
const { User, Account } = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config.js')
const router = express.Router()
const authMiddleware = require('../routes/middelware')

const signUpSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string()
})

router.post('/signup', async (req, res) => {
  const { success } = signUpSchema.safeParse(req.body)
  if (!success) {
    return res.status(411).json({
      message: 'Email already taken / Incorrect inputs'
    })
  }

  // Validate username presence
  if (!req.body.username) {
    return res.status(400).json({ message: 'Username is required' })
  }

  const existingUser = await User.findOne({
    username: { $regex: new RegExp(`^${req.body.username}$`, 'i') } // Case-insensitive
  })

  if (existingUser) {
    return res.status(411).json({
      message: 'Username already taken'
    })
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  const userId = user._id

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000
  })

  const token = jwt.sign({ userId }, 'test123')

  res.json({
    message: 'User created successfully',
    token: token
  })
})

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string()
})

router.post('/signin', async (req, res) => {
  const { success } = signinBody.safeParse(req.body)
  if (!success) {
    return res.status(411).json({
      message: 'Email already taken / Incorrect inputs'
    })
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  })
  if (!user) {
    return res.status(411).json({
      message: 'Email Not found'
    })
  }
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id
      },
      'test123'
    )

    res.json({
      token: token
    })
    return
  }

  res.status(411).json({
    message: 'Error while logging in'
  })
})

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
})

router.post('/', authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body)
  if (!success) {
    return res.status(411).json({
      message: 'Invalid input'
    })
  }
  const user = await User.findById(req.userId)
  if (!user) {
    return res.status(411).json({
      message: 'User not found'
    })
  }
  await user.updateOne(req.body, {
    id: req.userId
  })
  res.json({
    message: 'User updated'
  })
})

router.get('/bulk', async (req, res) => {
  const filter = req.body.filter || ''
  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter },
        lastName: { $regex: filter }
      }
    ]
  })

  res.json({
    user: users.map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      _id: user._id
    }))
  })
})

module.exports = router
