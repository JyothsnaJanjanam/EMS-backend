const express = require('express');
const router = express.Router()
const cors = require('cors')
const verifyToken = require('../middleware/authMiddleware');
const { getSummary } = require('../controllers/dashboard');


// middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

router.get('/summary', verifyToken, getSummary)

module.exports = router;