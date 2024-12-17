const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const cors = require('cors')
const { addSalary, getSalary } = require('../controllers/salary')

const router = express.Router()

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ems-frontend-iota.vercel.app')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

router.post('/add', verifyToken, addSalary)
router.get('/:id/:role', verifyToken, getSalary)


module.exports = router