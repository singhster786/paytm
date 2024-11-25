import mongoose from 'mongoose'
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

const User = mongoose.model('User', UserSchema)

export { User }
