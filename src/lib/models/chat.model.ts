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
    ]
})
export const Conversation = mongoose.models.Conversation || mongoose.model("Conversation",conversationSchema)


const messageShema = new mongoose.Schema({
    conversation:{
        type:mongoose.Types.ObjectId,
        ref:"Conversation"
    },
    sender:{
        type:mongoose.Types.ObjectId,
        reff:"User",
        required:true
    },
    receiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    content: { 
        type: String
    },
    timestamp: { 
        type: Date, 
        default: Date.now }
})

export const Message = mongoose.models.Message || mongoose.model('Message',messageShema)