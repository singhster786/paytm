import mongoose from 'mongoose'
import { string } from 'zod'
mongoose.connect('mongodb://localhost:27017/paytm', {})

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 3
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    maxlength: 20,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
})


const AccountSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    
  },
  balance: {
    type: string,
    required: true
  }
})

const User = mongoose.model('User', UserSchema)
const Account = mongoose.model('Account', AccountSchema)

module.exports = {
  User,
  Account
}