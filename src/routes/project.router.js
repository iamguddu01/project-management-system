import express from "express"
import { createProject } from "../controllers/projectController.js";

const router = express.Router()

// router.get("/get-projects", )
router.post("/create-project", createProject)

export default router;