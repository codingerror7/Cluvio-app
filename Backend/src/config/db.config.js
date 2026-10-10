import mongoose from "mongoose";
import dotenv from "dotenv";


const connectDB = async () => {
    if(!process.env.MONGO_URL){
        throw new Error("mongo url missing.");
    }
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB successfully");

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectDB;