const mongoose= require('mongoose');
require('dotenv').config();

const connectDB= async()=>{
    console.log("MONGO_URI from .env:", process.env.MONGO_URI); // בדיקה האם המשתנה נטען

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongoDB is connected');
    }
    catch(error){
        console.error(' error with connecting mongoDB');
        process.exit(1);
    }
};

module.exports= connectDB;