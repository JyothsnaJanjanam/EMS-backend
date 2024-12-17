const User = require('../models/authModel')
const bcrypt = require('bcrypt')

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body

    const user = await User.findById({_id: userId})
    if(!user) {
      return res.status(404).json({success: false, message: 'user not found'})
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if(!isMatch) {
      return res.status(404).json({success: false, message: 'wrong password'})
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)

    const newUser = await User.findByIdAndUpdate({_id: userId}, {password: hashPassword})

    return res.status(200).json({success: true})

  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: 'setting error'})
  } 
}

module.exports = { changePassword }