import mongoose from "mongoose"
const messageSchema=new mongoose.Schema({
    gameId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Game",
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    senderUsername:{
        type:String,
        required:true,
    },
    receiverUsername:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    }
},{timestamps:true})
export const Message=mongoose.model("Message",messageSchema)