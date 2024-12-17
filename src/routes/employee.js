const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const { addEmployee, upload, getEmployees, getSingleEmployee, updateEmployee, fetchEmployeesByDepId } = require('../controllers/employee')
const cors = require('cors')

const router = express.Router()

router.use(
  cors({
    credentials: true,
    'Access-Control-Allow-Origin': 'https://ems-frontend-iota.vercel.app/'
  })
)

router.get('/', verifyToken, getEmployees)
router.post('/add', verifyToken, upload.single('image'), addEmployee)
router.get('/:id', verifyToken, getSingleEmployee)
router.put('/:id', verifyToken, updateEmployee)
router.get('/department/:id', verifyToken, fetchEmployeesByDepId)


module.exports = router