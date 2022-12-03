const express = require('express')
const UserModel = require("../models/Users")

const routes = express.Router()

// Create a new account
routes.post("/signup", async (req, res) => {
  // Validation if request body is empty
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Cannot pass an empty object"
    })
  }

  // Saving the new user into the database
  try {
    const newUser = new UserModel(req.body)
    const user = await newUser.save()
    // Prevent CORS policy error
    res.header("Access-Control-Allow-Origin", "*");
    res.status(201).send(user)
  }
  catch (error) {
    res.status(400).send(error)
  }
})

// Allow user to enter the system
routes.post("/login", async (req, res) => {
  // Validation if request body is empty
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Cannot pass an empty object"
    })
  }


  try {
    // Searching for matching records in the database using email/username and password
    const usernameCheck = await UserModel.findOne({ username: req.body.username, password: req.body.password }).exec()
    const emailCheck = await UserModel.findOne({ email: req.body.email, password: req.body.password }).exec()


    // Checking if we have one matching record 
    if (usernameCheck != null) {
      // Prevent CORS policy error
      res.header("Access-Control-Allow-Origin", "*");
      res.status(200).send({
        status: true,
        username: req.body.username,
        message: "User logged in successfully"
      })
    }
    else if (emailCheck != null) {
      // Prevent CORS policy error
      res.header("Access-Control-Allow-Origin", "*");
      res.status(200).send({
        status: true,
        email: req.body.email,
        message: "User logged in successfully"
      })
    }
    else {
      // If none of the records match
      res.status(400).send({
        status: false,
        message: "Such username/email and password does not exist"
      })
    }
  }
  catch (error) {
    res.status(400).send(error)
  }
})

module.exports = routes