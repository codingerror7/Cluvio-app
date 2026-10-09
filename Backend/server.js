import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`listening at ${PORT}`);
    connectDB();
})