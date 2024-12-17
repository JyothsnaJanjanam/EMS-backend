const express = require("express")
const mongoose = require('mongoose');

const db = async () => {

  try {
    // mongoose.connect(process.env.MONGO_URL)
    //   .then(() => console.log('Database Connected'))
    //   .catch((err) => console.log('Database not connected', err))
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connected : ${connect.connection.host}, ${connect.connection.name}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = db;