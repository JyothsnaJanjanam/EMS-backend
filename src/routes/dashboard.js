const express = require('express');
const router = express.Router()
const cors = require('cors')
const verifyToken = require('../middleware/authMiddleware');
const { getSummary } = require('../controllers/dashboard');


// middleware
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ems-frontend-iota.vercel.app')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

router.get('/summary', verifyToken, getSummary)

module.exports = router;