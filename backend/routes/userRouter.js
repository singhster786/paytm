const express = require('express')
import { zod } from 'zod'
import { User } from '../db'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
const router = express.Router()
const authMiddleware = require('../routes/middelware')

const signUpSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string()
})

router.post('/signup', async (req, res) => {
  const body = req.body
  const { sucess } = signUpSchema.safeParse(req.body)
  if (!sucess) {
    res.json({
      message: 'Invalid input'
    })
  }
  const user = User.findOne({ userName })
  if (user._id) {
    return res.json({
      message: 'Email already taken'
    })
  }
  const dbUser = await User.create(body)
  const token = JWT_SECRET.sign(
    {
      userId: dbUser._id
    },
    JWT_SECRET
  )
  res.json({
    message: 'User created',
    token: token
  })
})

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string()
})

router.post('/signin', async (req, res) => {
  const { sucess } = signinBody.safeParse(req.body)
  if (!sucess) {
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
      JWT_SECRET
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

router.post('/bulk', async (req, res) => {
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
      userName: user.userName,
      _id: user._id
    }))
  })
})

module.exports = router
