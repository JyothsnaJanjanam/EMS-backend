const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const cors = require('cors')
const { addLeave, getSingleLeave, getLeaves, getLeaveDetails, updateLeave } = require('../controllers/leave')

const router = express.Router()

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ems-frontend-iota.vercel.app')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

router.post('/add', verifyToken, addLeave)
router.get('/details/:id', verifyToken, getLeaveDetails)
router.get('/:id/:role', verifyToken, getSingleLeave)
router.get('/', verifyToken, getLeaves)
router.put('/:id', verifyToken, updateLeave)


module.exports = router