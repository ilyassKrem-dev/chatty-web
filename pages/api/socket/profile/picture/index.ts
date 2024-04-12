import { NextRequest } from "next/server";
import { NextApiResponseServerIo } from "@/lib/utils";
import { ConnectDb } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import { utapi } from "@/lib/actions/uploadthing.action";
export default async function handler(req:NextRequest,res:NextApiResponseServerIo) {
    if(req.method !== "PATCH") {
        return res.status(402).json('Method not allowed')
    }
    const {userId,imageUrl,type} = req.body as any
    try {
        await ConnectDb()
        let user:any
        let key:string
        let pictureProfile:string
        if(!type) {
            const exsite = await User.findById(userId)
            if(exsite.image && exsite.image.includes('utfs')) {
                const profile = exsite.image.split("/f/")[1]
                await utapi.deleteFiles(profile)
            }
            user = await User.findByIdAndUpdate(userId,{
                image:imageUrl
            })
            key = `User:${user._id}:profileImage`
            pictureProfile = user.image
        } else {
            const exsite = await User.findById(userId)
            
            if(exsite.coverImage) {
                const cover = exsite.coverImage.split("/f/")[1]
                await utapi.deleteFiles(cover)
            }
            user = await User.findByIdAndUpdate(userId,{
                coverImage:imageUrl
            })
            key = `User:${user._id}:CoverImage`
            pictureProfile = user.coverImage
        }
        res?.socket?.server?.io?.emit(key,pictureProfile)
        return res.status(200).json({success:true})
    } catch (error:any) {
        res.status(500).json({error:`Internal server error ${error.message}`})
    }

}