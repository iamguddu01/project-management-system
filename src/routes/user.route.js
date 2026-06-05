import express from "express"
import { createUserController, getAllUsers } from "../controllers/userController.js";
const router = express.Router()

router.get("/get-users", getAllUsers)
router.post("/create-user", createUserController)

export default router;