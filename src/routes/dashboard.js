const express = require('express');
const router = express.Router()
const cors = require('cors')
const verifyToken = require('../middleware/authMiddleware');
const { getSummary } = require('../controllers/dashboard');


// middleware
router.use(
  cors({
    credentials: true,
    origin: 'https://ems-frontend-iota.vercel.app/'
  })
)

router.get('/summary', verifyToken, getSummary)

module.exports = router;