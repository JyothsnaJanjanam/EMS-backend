const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const cors = require('cors')
const { changePassword } = require('../controllers/setting')

const router = express.Router()

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ems-frontend-iota.vercel.app')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

router.put('/change-password', verifyToken, changePassword )


module.exports = router