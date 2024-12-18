const express = require("express")
const dotenv = require("dotenv").config({path: __dirname+'/.env'})
const db = require('./src/config/db')
const cors = require('cors')
const userRegister = require('./userSeed')

const verifyToken = require("./src/middleware/authMiddleware")
const authRoutes = require('./src/routes/authRoutes')
const departmentRoutes = require('./src/routes/department')
const employeeRoutes = require('./src/routes/employee')
const salaryRoutes = require('./src/routes/salary')
const leaveRoutes = require('./src/routes/leave')
const settingRoutes = require('./src/routes/setting')
const dashboardRoutes = require('./src/routes/dashboard')

db();

const app = express()

// Middleware
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

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