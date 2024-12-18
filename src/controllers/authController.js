const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

const login = async (req, res) => {
  try {
    console.log('hey')
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ success: false, message: `User not found` })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: `Invalid Credentials` })
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2d' })

    console.log(token)

    res
      .status(200)
      .json({ success: true, token, user: { _id: user._id, name: user.name, role: user.role } })

  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ success: false, error: error.message })
  }
}

const verify = (req, res) => {
  return res.status(200).json({success: true, user: req.user})
}

module.exports = {
  login,
  verify
}