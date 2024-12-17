const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const { addDepartment, getDepartments, getSingleDepartment, updateDepartment, deleteDepartment } = require('../controllers/department')
const cors = require('cors')

const router = express.Router()

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ems-frontend-iota.vercel.app')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

router.get('/', verifyToken, getDepartments)
router.post('/add', verifyToken, addDepartment)
router.get('/:id', verifyToken, getSingleDepartment)
router.put('/:id', verifyToken, updateDepartment)
router.delete('/:id', verifyToken, deleteDepartment)


module.exports = router