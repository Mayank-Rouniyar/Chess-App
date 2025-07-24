import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHander.js";
const registerUser=asyncHandler(async(req,res)=>{
const [username,email,password]=req.body
if(!username||!email||!password)
{
    throw new ApiError()
}
})
export {
    registerUser
}