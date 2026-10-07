import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();

const express = express();
const app = express;
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`listening at ${PORT}`);
})