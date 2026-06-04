import express from "express"
import { configDotenv } from "dotenv";
configDotenv()
const app = express();

app.listen(process.env.PORT, async()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}/`);
})