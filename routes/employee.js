const express = require('express')
const EmployeeModel = require("../models/Employee")

const routes = express.Router()

// Get the employee list
routes.get("/employees", async (req, res) => {
  try {
    const employee = await EmployeeModel.find()
    res.status(200).send(employee)
  }
  catch (error) {
    res.status(400).send({ message: "No record exists" })
  }
})

// Create a new employee
routes.post("/employees", async (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Content of the request cannot be empty"
    });
  }

  try {
    const newEmployee = new EmployeeModel(req.body)
    const employee = await newEmployee.save()
    res.status(201).send(employee)
  }
  catch (error) {
    res.status(400).send(error)
  }
})

// Get one employee details by using employee ID
routes.get("/employees/:eid", async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.eid)

    // Checking if the the object was returned
    if (!employee) {
      res.status(404).send({ message: "No employee found" })
    }
    else {
      res.status(200).send(employee)
    }
  }
  catch (error) {
    res.status(400).send(error)
  }
})

routes.put("/employees/:eid", async (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Employee content can not be empty"
    });
  }

  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(req.params.eid, req.body)



    // Checking if the the object was returned
    if (!updatedEmployee) {
      res.status(400).send({ message: "Such Employee ID does not exist" })
    }
    else {
      const newEmployee = await updatedEmployee.save()
      res.status(200).send(newEmployee)
    }
  }
  catch (error) {
    res.status(401).send(error)
  }
})

// Delete an employee by employee ID
routes.delete("/employees", async (req, res) => {
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.query.eid)

    // Checking if the the object was returned
    if (!deletedEmployee) {
      res.status(400).send({ message: "Such Employee ID does not exist" })
    }
    else {
      res.status(204).send(deletedEmployee)
    }
  }
  catch (error) {
    res.status(401).send(error)
  }
})

module.exports = routes