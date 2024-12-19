const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const { addEmployee, upload, getEmployees, getSingleEmployee, updateEmployee, fetchEmployeesByDepId } = require('../controllers/employee')
const cors = require('cors')

const router = express.Router()

router.use(
  cors({
    credentials: true,
    origin: 'https://ems-frontend-delta.vercel.app'
  })
)

router.get('/', verifyToken, getEmployees)

router.post('/add', verifyToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: `File upload error: ${err.message}` });
      }
      return res.status(400).json({ success: false, message: `Error: ${err.message}` });
    }
    next();
  });
},, addEmployee)

router.get('/:id', verifyToken, getSingleEmployee)
router.put('/:id', verifyToken, updateEmployee)
router.get('/department/:id', verifyToken, fetchEmployeesByDepId)


module.exports = router
