const express = require('express');
const cors = require('cors');
const userRouter = require('./userRouter.js')
const accountRouter = require('./accountRouter.js')
const router = express.Router();
app.use(cors())
app.use(express.json())
app.use("/user", userRouter)
app.use("/account", accountRouter)


module.exports = router