
import { NextResponse,NextRequest } from "next/server"
import { ConnectDb } from "@/lib/mongoose"
import User from "@/lib/models/user.model"
import { verifyCaptcha } from "@/lib/utils"
export  async function POST(req:NextRequest) {
    
    if(req.method !== "POST"){
        return NextResponse.json({message:"Methode Not Allowed"},{status:405})
    }
    const data = await req.json()
    const {name,email,password,token} = data

    try {
        const isValidCaptcha = await verifyCaptcha(token)
        if(!isValidCaptcha) {
            return NextResponse.json({error:"Invalid captcha,try again"})
        }
        await ConnectDb();

        const existeUser = await User.findOne({email})
        if(existeUser) {
            return NextResponse.json({message:"Email already exists"},{status:400})
        }
        await User.create({
            name,
            email,
            password
        })
        return NextResponse.json({succes:true,message:"User registered successfuly"})
    } catch (error) {
        return NextResponse.json({message:'Internal Server Error'},{status:501})
    }
}

