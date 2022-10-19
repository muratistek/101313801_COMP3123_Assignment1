const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, 'Must be at least 3, got {VALUE}'],
    maxLength: 100
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    minLength: [3, 'Must be at least 3, got {VALUE}'],
    maxLength: 50,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Use a valid email address']
  },
  password: {
    type: String,
    required: true,
    minLength: [3, 'Must be at least 3, got {VALUE}'],
    maxLength: 50
  }
})

const Users = mongoose.model("Users", UsersSchema, "Users")
module.exports = Users