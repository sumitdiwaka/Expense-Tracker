const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{});
        console.log('MongoDB Connected:');
    }
    catch(err){
        console.error("Error Connecting To MongoDB",err);
    }
};

module.exports = connectDB;

