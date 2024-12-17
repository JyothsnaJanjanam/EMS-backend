const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const db = require('./config/db')

const userRegister = async () => {
  db();
  try {
    const hashedPassword = await bcrypt.hash('admin', 10)
    const newUser = new User({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin'
    })
    await newUser.save()
  } catch (error) {
    console.log(error)
  }
}

userRegister();