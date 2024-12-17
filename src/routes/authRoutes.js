const { login, verify } = require('../controllers/authController')
const cors = require('cors')
const verifyToken = require('../middleware/authMiddleware')

const express = require('express');
const router = express.Router()


// middleware
router.use(
  cors({
    credentials: true,
    origin: 'https://ems-frontend-iota.vercel.app/'
  })
)

// router.post('/register', register)
router.post('/login', login)
router.get('/verify', verifyToken, verify)

module.exports = router;