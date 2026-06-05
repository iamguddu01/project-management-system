import express from "express"
import { createProject, deleteProject, getAllProject, updateProject } from "../controllers/projectController.js";

const router = express.Router()

router.get("/get-projects", getAllProject)
router.post("/create-project", createProject)
router.put("/update/project/:id", updateProject)
router.delete("/delete/project/:id", deleteProject)

export default router;