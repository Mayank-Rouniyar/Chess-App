import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHander.js";
const generateAccessAndRefreshToken=asyncHandler(async(userId)=>{
try {
    const user=await User.findById(userId)
    const accessToken=user.accessToken()
    const refreshToken=user.refreshToken()
    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})
    return {accessToken,refreshToken}
} catch (error) {
    throw new ApiError(500,"Something went wrong while generating access and refreshToken")
}
})
const registerUser=asyncHandler(async(req,res)=>{
const [fullName,username,email,password]=req.body
if(!username||!email||!password||!fullName)
{
    throw new ApiError(401,"All fields are required")
}
const isUserPresent=await User.findOne({
    $or:["username","email"]
})
if(isUserPresent)
{
    throw new ApiError(409,"User Already Existed")
}
const user=await User.create({
    fullName,
    username,
    email,
    password,
})
if(!user)
{
    throw new ApiError(500,"Something went wrong while creating the User")
}
const createdUser=await User.findById(user._id).select("-password -refreshToken")
return res
.status(200)
.json(new ApiResponse(200,createdUser,"User Successfully Created"))
})
export {
    generateAccessAndRefreshToken,
    registerUser
}