require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected")
    } catch (error) {
        console.error("Failed to connect to DB")
        
    }
}

module.exports = connectDb;