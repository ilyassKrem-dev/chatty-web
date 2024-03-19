import { Conversation, Message } from "@/lib/models/chat.model";
import User from "@/lib/models/user.model";
import { ConnectDb } from "@/lib/mongoose";
import { NextApiResponseServerIo } from "@/lib/utils";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";


export  async function POST(
    req:NextRequest,
    res:NextApiResponseServerIo
) {
    if(req.method !== "POST") {
        return res.status(405).json({error:"Method not allowed"})
    }
    const data = await req.json()
    const {content,email,convoId,receiver} = data
    
    try {
        await ConnectDb()
        /*const {content,email,convoId,receiver} = req.body
        console.log(content)*/
        const user = await User.findOne({email})
        
        /*const message = await Message.create({
            conversation:convoId,
            sender:user._id,
            receiver:receiver,
            content 
        })
        await Conversation.findByIdAndUpdate(convoId,{
            $push:{messages:message._id}
        })
        if(!message) return res.status(404).json({success:false})*/

        const converstaionId = `Convo:${convoId}:messages`
        console.log(res?.socket)
        res?.socket?.server?.io?.emit(converstaionId,user)
        
        return res.status(200).json({success:true})
    } catch (error) {
        throw new Error(`Failed to add user`)
    }
}