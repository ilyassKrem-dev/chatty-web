import mongoose from "mongoose";


const requestShema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    requests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{
    timestamps:{
        createdAt:true
    }
})

const Request = mongoose.models.Request || mongoose.model('Request',requestShema)

export default Request


