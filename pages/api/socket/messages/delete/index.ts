
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/lib/utils";
import { ConnectDb } from "@/lib/mongoose";
import { Conversation, Message } from "@/lib/models/chat.model";
import { Groups } from "@/lib/models/group.model";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponseServerIo
) {
    if(req.method!=="DELETE") {
        return res.status(408).json({
            error:"Method not allowed"
        })
    }

    try {
        await ConnectDb()
        const {messageId,type} = req.body
        const message = await Message.findByIdAndDelete(messageId)
        let convoMessage 
        if(type==="group") {
            convoMessage = await Groups.findOneAndUpdate(
                {messages:{$in:[message._id]}},
                {$pull:{messages:message._id}}
                )
        } else {
            convoMessage = await Conversation.findOneAndUpdate(
            {messages:{$in:[message._id]}},
            {$pull:{messages:message._id}}
            )
        }
        const key = `Convo:${convoMessage._id}:deleted`
        res?.socket?.server?.io?.emit(key,message._id)
        return res.status(200).json({success:true})
       
    } catch(error) {
        throw new Error(`Failed to delete message`)
    }
}
