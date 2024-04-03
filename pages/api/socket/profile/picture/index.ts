import { NextRequest } from "next/server";
import { NextApiResponseServerIo } from "@/lib/utils";
import { ConnectDb } from "@/lib/mongoose";
import User from "@/lib/models/user.model";


export default async function handler(req:NextRequest,res:NextApiResponseServerIo) {
    if(req.method !== "PATCH") {
        return res.status(402).json('Method not allowed')
    }
    const {userId,imageUrl} = req.body as any
    try {
        await ConnectDb()
        const user = await User.findByIdAndUpdate(userId,{
            image:imageUrl
        })

        const key = `User:${user._id}:profile`
        const pictureProfile = user.image
        res?.socket?.server?.io?.emit(key,pictureProfile)
        return res.status(200).json({success:true})
    } catch (error:any) {
        res.status(500).json({error:`Internal server error ${error.message}`})
    }

}