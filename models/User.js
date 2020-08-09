const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  profileId: String,
  displayName: String
})

mongoose.model('User', userSchema)
