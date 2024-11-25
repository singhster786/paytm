const express = require('express');
const authMiddleware = require('./middelware');

const router = express.Router();


router.post("/balance",authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userID: req.userId });
    res.json({
        balance: account.balance
    })
})

router.post("transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const {accountFrom, accountTo} =req.body;

    const accountFrmData = await Account.findOne({userID: accountFrom}).session(session);
    const accountTooData = await Account.findOne({userID: accountTo}).session(session);
    if(accountFrmData.balance < req.body.amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    if (!accountTooData){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Account not found"
        })
    }
    await Account.updateOne({userID: accountFrom}, {$set: {balance: accountFrmData.balance - req.body.amount}}).session(session)
    await Account.updateOne({userID: accountTo}, {$set: {balance: accountTooData.balance + req.body.amount}}).session(session)

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
    
})




module.exports = router
