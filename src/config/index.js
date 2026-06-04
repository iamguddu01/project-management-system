import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
export const initDB = async () => {
    try{
        await mongoose.connect(process.env.DB_STRING)
        console.log("Database connected successfully");
    }catch(error){
        console.log("Error while connecting to database", error);
    }
}