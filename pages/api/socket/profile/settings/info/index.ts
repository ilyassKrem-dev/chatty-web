
import { NextRequest } from "next/server";
import { NextApiResponseServerIo } from "@/lib/utils";
import { ConnectDb } from "@/lib/mongoose";
import User from "@/lib/models/user.model";


export default async function handler(req:NextRequest,res:NextApiResponseServerIo) {
    if(req.method !== "PATCH") {
        return res.status(402).json({error:"Method not allowed"})
    }
    const {name,password,oldPassword,userId} = req.body as any
    
    if(name&&name.length <= 3) return res.json({error:"Name must be more than 3 Characters"})
    if(password&&password.length < 8) return res.json(
        {error:"Password must be more than 8 Characters"}
    )
    try {
        await ConnectDb()
        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({error:"No user found with this id"})
        }
        if(name) {
            const findName = await User.findOne({name})
            if(findName) {
                return res.json({error:"Name is already taken"})
            }
            user.name = name
            await user.save()
            const nameKey = `User:${user._id}:name`
            res?.socket?.server?.io?.emit(nameKey,name)
            return res.status(200).json({message:"Name changed"})
        }
        if(password&&oldPassword) {
            const isValid = await user.comparePassword(oldPassword)
            
            if(!isValid) {
            return res.json({errorO:"Password incorrect"})
            }

            user.password = password
            await user.save()
            return res.status(200).json({message:"Password changed"})
        }
    } catch (error:any) {
        return res.status(500).json({error:`Internal server error ${error.message}`})
    }

}