import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import links from "./routes/link.js"
import cors from "cors"
const app =express()
dotenv.config()
app.use(cors())

const connect = async () => {
    try {
      await mongoose.connect(process.env.mongo)
    } catch (error) {
      throw error
    }
  };
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });
  mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!");
  });
  app.use(express.json())
  app.use("/api/",links)
  app.listen(8500,async()=>{ 
    await connect()
   console.log("hello")
})