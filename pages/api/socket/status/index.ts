import { NextRequest } from "next/server";

import { NextApiResponseServerIo } from "@/lib/utils";
import { ConnectDb } from "@/lib/mongoose";
import User from "@/lib/models/user.model";

export default async function handler(
    req:NextRequest,
    res:NextApiResponseServerIo
) {
    if(req.method !=="POST") {
        res.status(500).json({error:"Method not allowed"})
    }
    try {
        const {email,state,type} = req.body as any
        await ConnectDb()
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({error:"User not found"})
        }
        if(type) {
            if(!user.lastStatus) {
                user.status=state
                await user.save()
            } else {
                user.status = user.lastStatus
                await user.save()
            }
        } else {
            user.status = state
            user.lastStatus = state
            await user.save()
        }
        const userStatus = `User:${user._id}:status`
        const changedState = user.status
        res?.socket?.server?.io?.emit(userStatus,changedState)
        return res.status(200).json({success:true})
    } catch (error:any) {
        throw new Error(`Failed to change status ${error.message}`)
    }
}