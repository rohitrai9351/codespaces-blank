const mongoose = require('mongoose');
require('dotenv').config()

const mongoUri = process.env.MONGODB

const initializeDatabase = async () => {
    try{
        await mongoose.connect(mongoUri);
        console.log("mongoDb Database connected")
    }
    catch(error){
        console.log('Mongodb Data base not connected' , error.message)
    }
}

module.exports = {initializeDatabase}