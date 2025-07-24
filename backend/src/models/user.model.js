import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gamesPlayed:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:100,
    },
    wins:{
        type:Number,
        default:0,
    },
    losses:{
        type:Number,
        default:0,
    },
    draws:{
        type:Number,
        default:0,
    }
},{timestamps: true})
userSchema.pre("save",async function (next){
    try {
        if(this.isModified("password"))
        {
            this.password=await bcrypt.hash(this.password,10)
            next()
        }
    } catch (error) {
        next(error)
    }
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
return jwt.sign({
    _id:this._id,
    username:this.username,
    email:this.email,
},
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
}
)
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
    _id:this._id,
},
    process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
}
)
}
export const User=mongoose.model("User",userSchema)