import { NextResponse,NextRequest } from "next/server";
import { ConnectDb } from "@/lib/mongoose";
import { compare } from "bcrypt";
import User from "@/lib/models/user.model";
import { verifyCaptcha } from "@/lib/utils"
export async function POST(req:NextRequest) {

    try {
        
        const data =  await req.json()
        const {email,password,token,from} = data
        if(from !== "/signup") {
            const isValidCaptcha = await verifyCaptcha(token)
            
            if(!isValidCaptcha) {
                return NextResponse.json({error:"Invalid captcha,try again"})
            }
        }
        
        await ConnectDb();
        const user = await User.findOne({email})
        
        if(!user) {
            return NextResponse.json({error:"No email found"},{status:400})
        }
        const match = await compare(password,user.password)
        if(!match) return NextResponse.json({error:"Wrong password"},{status:400})
         
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({error:"Internal server error"},{status:501})
    }
}