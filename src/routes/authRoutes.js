const { login, verify } = require('../controllers/authController')
const cors = require('cors')
const verifyToken = require('../middleware/authMiddleware')

const express = require('express');
const router = express.Router()


// middleware
// router.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://ems-frontend-iota.vercel.app')
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//   next()
// })

router.use(
  cors({
    credentials: true,
    Origin: 'https://ems-frontend-iota.vercel.app/'
  })
)


// router.post('/register', register)
router.post('/login', login)
router.get('/verify', verifyToken, verify)

module.exports = router;