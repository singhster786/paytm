const express = require('express')
const cors = require('cors')
const userRouter = require('./userRouter.js')
const accountRouter = require('./accountRouter.js')
const router = express.Router()
router.use(cors())
router.use(express.json())
router.use('/user', userRouter)
router.use('/account', accountRouter)

module.exports = router
