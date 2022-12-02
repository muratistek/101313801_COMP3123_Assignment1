const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Accessing routes objects
const userRoutes = require('./routes/users')
const employeeRoutes = require('./routes/employee')

const app = express()

const DB_URL = "mongodb+srv://murat96:123456murka@cluster0.okt8nyq.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
  origin: "*",
}))


// Connecting to the mongoDB database
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// Using custom routes
app.use("/api/user/", userRoutes)
app.use("/api/emp/", employeeRoutes)

app.listen(8082, () => {
  console.log("Server is listening on port 8082")
})