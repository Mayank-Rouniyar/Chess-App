import Router from "express"
import {
    registerUser

 } from "../controllers/user.controller.js"
const router=Router()
router.post("/registerUser",registerUser)
export default router