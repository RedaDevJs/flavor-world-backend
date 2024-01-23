const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

const userModel = mongoose.model('User', userschema)
module.exports = userModel
