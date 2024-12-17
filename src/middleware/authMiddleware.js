const jwt = require('jsonwebtoken')
const User = require('../models/authModel')

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    if(!token) {
      return res.status(404).json({success: false, message: 'No token, Authorization denied'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded) {
      return res.status(404).json({success: false, message: 'Token Not Valid'})
    }

    const user = await User.findById({_id: decoded.id}).select('-password')

    if(!user) {
      return res.status(404).json({success: false, message: 'User Not Found'})
    }
    req.user = user
    next()
    
  } catch (error) {
    console.log('Error in verifyToken middleware', error.message)
    return res.status(500).json({success: false, message: 'Internal Server Error'})
  }
  
}

module.exports = verifyToken