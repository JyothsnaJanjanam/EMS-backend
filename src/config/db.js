const mongoose = require('mongoose')
require('dotenv').config()

const db = async () => {

  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connected : ${connect.connection.host}, ${connect.connection.name}`)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = db;