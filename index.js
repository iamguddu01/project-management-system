import express from "express"
import { configDotenv } from "dotenv";
import { initDB } from "./src/config/index.js";
import userRoutes from "./src/routes/user.route.js"
import projectRoutes from "./src/routes/project.router.js"

configDotenv()
const app = express();
app.use(express.json())

initDB() // DB connnection
app.use("/user", userRoutes)
app.use(projectRoutes)


app.listen(process.env.PORT, async()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}/`);
})