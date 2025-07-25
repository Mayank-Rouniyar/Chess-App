import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()
app.use(cors({
        origin:process.env.CORS_ORIGIN||"http://localhost:5173",
        credentials:true,
    }))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
export {app}