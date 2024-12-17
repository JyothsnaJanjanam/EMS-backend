const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const cors = require('cors')
const { addLeave, getSingleLeave, getLeaves, getLeaveDetails, updateLeave } = require('../controllers/leave')

const router = express.Router()

router.use(
  cors({
    credentials: true,
    'Access-Control-Allow-Origin': 'https://ems-frontend-iota.vercel.app/'
  })
)

router.post('/add', verifyToken, addLeave)
router.get('/details/:id', verifyToken, getLeaveDetails)
router.get('/:id/:role', verifyToken, getSingleLeave)
router.get('/', verifyToken, getLeaves)
router.put('/:id', verifyToken, updateLeave)


module.exports = router