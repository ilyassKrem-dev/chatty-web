import { Conversation, Message } from "@/lib/models/chat.model";
import User from "@/lib/models/user.model";
import { ConnectDb } from "@/lib/mongoose";
import { NextApiResponseServerIo } from "@/lib/utils";
import { NextApiRequest } from "next";


export default async function handler(
    req:NextApiRequest,
    res:NextApiResponseServerIo
) {
    if(req.method !== "POST") {
        return res.status(405).json({error:"Method not allowed"})
    }

    
    try {
        await ConnectDb()
        const {content,email,convoId,receiver} = req.body
        
        const user = await User.findOne({email})
        
        const message = await Message.create({
            conversation:convoId,
            sender:user._id,
            receiver:receiver,
            content 
        })
        if(!message) return res.status(404).json({success:false})
        
        await Conversation.findByIdAndUpdate(convoId,{
            $push:{messages:message._id}
        })
        const messageFound = await Message.findById(message._id)
            .populate({
                path:"receiver",
                model:User,
                select:"_id image"
        })


        const converstaionId = `Convo:${convoId}:messages`
        
        res?.socket?.server?.io?.emit(converstaionId,messageFound)
        
        return res.status(200).json({message:true})
    } catch (error) {
        throw new Error(`Failed to add user`)
    }
}