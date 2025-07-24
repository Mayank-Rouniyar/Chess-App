import mongoose from "mongoose"
const FEN_STARTING_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const gameSchema=new mongoose.Schema({
players:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
}],
whitePlayer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
},
blackPlayer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
},
fen:{
    type:String,
    default:FEN_STARTING_POSITION
},
pgn:{
    type:String,
    default:"",
},
status:{
    type:String,
    enum:["waiting","inProgress","completed","aborted"],
    default:"waiting"
},
winner:{
    type:String,
    enum:["white","black","draw",null],
    default:null
},
endReason:{
    type:String,
    enum:["checkmate","stalemate","resignation","aborted","draw_by_three_fold_repetition","draw_by_fifty_move_rule",
        "agreement",null],
    default:null
}
},{timestamps:true})
export const Game=mongoose.model("Game",gameSchema)