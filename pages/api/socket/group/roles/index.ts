
import { NextRequest } from "next/server";
import { NextApiResponseServerIo } from "@/lib/utils";
import { ConnectDb } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import { Groups } from "@/lib/models/group.model";


export default async function handler(req:NextRequest,res:NextApiResponseServerIo) {
    if(req.method !== "PATCH") {
        return res.status(402).json({error:"Method not allowed"})
    }

    const {role,userId,memberId,groupId} = req.body as any

    try {
        await ConnectDb()
        
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json({error:"No user found with this id"})
        }
        const group =await Groups.findById(groupId)
            .populate({
                path:"participants.user",
                model:User,
                select:"_id name"
            })
        if(!group) {
            return res.status(404).json({error:"No group found with this id"})
        }

        const findUserId = group.participants.find((particip:any) => particip.user._id.toString() === userId)
        if(findUserId.role !=="admin") {
            return res.status(400).json({error:"The user is not admin"})
        }
        const memberFind:any = group.participants.find((particip:any) => particip._id.toString() === memberId)
        if(role==="delete") {
            const filteredMembers = group.participants.filter((participant:any) => participant._id.toString() !==memberId)
            group.participants = filteredMembers
            await group.save()
            const key = `User:${userId}:RoleChanged`
            res?.socket?.server?.io?.emit(key,filteredMembers)
            return res.status(200).json({data:{
                user:user.name,
                member:memberFind.user.name,
                status:"deleted"
            }})
        }
        

        if(!memberFind) {
            return res.status(404).json({error:"User not found"})
        }
        if(memberFind.role === role) {
            return  res.status(200).json({message:`User is already a ${role}`})
        }
        memberFind.role=role
        await group.save()
        
        const key = `User:${userId}:RoleChanged`
        
        res?.socket?.server?.io?.emit(key,memberFind)
        
        return res.status(200).json({data:{
            user:user.name,
            member:memberFind.user.name,
            status:"changed"
            
        }})
    } catch (error) {
        return res.status(500).json({error:error})
    }
}