const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://agney:abcdefgh@cluster0.vryk9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
