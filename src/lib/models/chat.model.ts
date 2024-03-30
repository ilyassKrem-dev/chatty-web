import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    ],
    messages:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Message"
        }
    ],
    type:{
        type:String,
        enum: ['private', 'group']
    }
},{
    timestamps:{
        createdAt:true
    }
})
export const Conversation = mongoose.models.Conversation || mongoose.model("Conversation",conversationSchema)


const messageShema = new mongoose.Schema({
    conversation:{
        type:mongoose.Types.ObjectId,
        ref:"Conversation"
    },
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    content:{
        text:{type:String},
        urls:[
            {
                url:String,
                name:String,
                type:{
                    type:String,
                    enum: ['photo', 'video', 'file',"audio"]
                }
            }
        ]
    },
    timestamp: { 
        type: Date, 
        default: Date.now }
})

export const Message = mongoose.models.Message || mongoose.model('Message',messageShema)