import express from "express"
import { configDotenv } from "dotenv";
import { initDB } from "./src/config/index.js";
import userRoutes from "./src/routes/user.route.js"

configDotenv()
const app = express();
app.use(express.json())

initDB() // DB connnection
app.use("/user", userRoutes)


app.listen(process.env.PORT, async()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}/`);
})