import express from "express"
import { configDotenv } from "dotenv";
import { initDB } from "./src/config/index.js";
configDotenv()
const app = express();

initDB() // DB connnection

app.listen(process.env.PORT, async()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}/`);
})