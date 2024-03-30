import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        enum: ['admin', 'member']
    }
});

const groupsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"/user.png"
    },
    participants:[
        participantSchema
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
export const Groups = mongoose.models.Groups || mongoose.model("Groups",groupsSchema)


