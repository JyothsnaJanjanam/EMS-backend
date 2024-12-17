const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const cors = require('cors')
const { addSalary, getSalary } = require('../controllers/salary')

const router = express.Router()

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

router.post('/add', verifyToken, addSalary)
router.get('/:id/:role', verifyToken, getSalary)


module.exports = router