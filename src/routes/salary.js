const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const cors = require('cors')
const { addSalary, getSalary } = require('../controllers/salary')

const router = express.Router()

// router.use(
//   cors({
//     credentials: true,
//     origin: 'https://ems-frontend-delta.vercel.app'
//   })
// )

router.post('/add', verifyToken, addSalary)
router.get('/:id/:role', verifyToken, getSalary)


module.exports = router