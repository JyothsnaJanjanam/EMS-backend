const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const cors = require('cors')
const { changePassword } = require('../controllers/setting')

const router = express.Router()

router.use(
  cors({
    credentials: true,
    origin: 'https://ems-frontend-iota.vercel.app/'
  })
)

router.put('/change-password', verifyToken, changePassword )


module.exports = router