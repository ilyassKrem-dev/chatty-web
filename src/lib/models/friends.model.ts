import mongoose from "mongoose";


const FreindsShcema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    friend:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})


const Friend = mongoose.models.Friend || mongoose.model('Friend',FreindsShcema)


export default Friend