const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const cors = require('cors')
const { changePassword } = require('../controllers/setting')

const router = express.Router()

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

router.put('/change-password', verifyToken, changePassword )


module.exports = router