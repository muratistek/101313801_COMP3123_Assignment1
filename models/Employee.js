const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 100
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 50
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
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: '{VALUE} is not supported. Choose between Male/Female/Other'
    },
    default: 'Other',
    maxLength: 25
  },
  salary: {
    type: Number,
    required: true
  }
})

const Employee = mongoose.model("Employee", EmployeeSchema, "Employee")
module.exports = Employee