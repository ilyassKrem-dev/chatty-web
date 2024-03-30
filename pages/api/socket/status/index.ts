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
        const {email,state} = req.body as any
        await ConnectDb()
        const user = await User.findOneAndUpdate({email},{
            $set:{
                status:state,
                lastStatus:state
            }
        },{new:true})
        const userStatus = `User:${user._id}`
        const changedState = user.status
        res?.socket?.server?.io?.emit(userStatus,changedState)
        return res.status(200).json({success:true})
    } catch (error:any) {
        throw new Error(`Failed to change status ${error.message}`)
    }
}