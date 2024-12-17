const express = require("express")
const dotenv = require("dotenv").config({path: __dirname+'/.env'})
const db = require('./config/db')
const cors = require('cors')
const verifyToken = require("./middleware/authMiddleware")
const authRoutes = require('./routes/authRoutes')
const departmentRoutes = require('./routes/department')
const employeeRoutes = require('./routes/employee')
const salaryRoutes = require('./routes/salary')
const leaveRoutes = require('./routes/leave')
const settingRoutes = require('./routes/setting')
const dashboardRoutes = require('./routes/dashboard')

db();

const app = express()

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ems-frontend-iota.vercel.app')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(express.json())
app.use(express.static('public/uploads'))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/department", departmentRoutes)
app.use("/api/employee", employeeRoutes)
app.use('/api/salary', salaryRoutes)
app.use('/api/leave', leaveRoutes)
app.use('/api/setting', settingRoutes)
app.use('/api/dashboard', dashboardRoutes)


// Start the Server
const  PORT = process.env.PORT || 7002

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running at port ${PORT}`);
  } else {
    console.log("Error: ", error)
  }
})