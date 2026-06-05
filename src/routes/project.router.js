import express from "express"
import { createProject, getAllProject } from "../controllers/projectController.js";

const router = express.Router()

router.get("/get-projects", getAllProject)
router.post("/create-project", createProject)

export default router;