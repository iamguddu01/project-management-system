import express from "express"
import { createTask, deleteTask, getAllTask, updateTask } from "../controllers/taskController.js";

const router = express.Router()

router.get("/get-task", getAllTask)
router.post("/create-task", createTask)
router.put("/update/task/:id", updateTask)
router.delete("/delete/task/:id", deleteTask)

export default router;