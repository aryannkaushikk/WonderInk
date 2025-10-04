const mongoURI = process.env.MONGO_URI;

const mongoose = require('mongoose');

async function connectDB() {
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Successfully");
    }catch(err){
        console.error("Error Connecting to MongoDB", err);
    }
}

module.exports = connectDB;