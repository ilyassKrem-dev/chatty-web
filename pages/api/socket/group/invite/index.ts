import { NextRequest } from "next/server";

import { NextApiResponseServerIo } from "@/lib/utils";
import { ConnectDb } from "@/lib/mongoose";
import { Groups } from "@/lib/models/group.model";
import User from "@/lib/models/user.model";


export default async function handler(req:NextRequest,res:NextApiResponseServerIo) {
    if(req.method !== "POST") {
        return res.status(402).json({error:"Method not allowed"})
    }
    const {userId,invitedId,groupId} = req.body as any
    try {
        await ConnectDb()
        const member = await User.findById(invitedId)
            .select("_id name")
        const group = await Groups.findById(groupId)
                .populate({
                    path:"participants.user",
                    model:User,
                    select:"_id name"
                })
        if(!group) {
            return res.status(404).json({error:"No group ith this id"})
        }
        const findUser = group?.participants.find((participant:any) => participant.user._id.toString() === userId)
        if(findUser.role !=="admin") {
            return res.status(400).json({error:"User is not admin"})
        }
        const updatedGroup = await Groups.findByIdAndUpdate(group._id,{
            $push: {
                participants:{user:member._id,role:"member"}
            }
        },{new:true})
            
        const emittedParticipant = updatedGroup.participants.find(
            (participant:any) => participant.user.equals(member._id)
          );
        const key = `User:${userId}:invited`
        console.log(emittedParticipant)
        res?.socket?.server?.io?.emit(key,emittedParticipant)
        return res.status(200).json({data:{
            user:findUser.user.name,
            member:member.name
        }})
    } catch (error:any) {
        return res.status(500).json({error:`Server error ${error.message}`})
    }
}