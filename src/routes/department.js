const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const { addDepartment, getDepartments, getSingleDepartment, updateDepartment, deleteDepartment } = require('../controllers/department')
const cors = require('cors')

const router = express.Router()

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

router.get('/', verifyToken, getDepartments)
router.post('/add', verifyToken, addDepartment)
router.get('/:id', verifyToken, getSingleDepartment)
router.put('/:id', verifyToken, updateDepartment)
router.delete('/:id', verifyToken, deleteDepartment)


module.exports = router