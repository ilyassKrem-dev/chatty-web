"use server"

import { ConnectDb } from "../mongoose";
import User from "../models/user.model";

interface Params {
    name:string;
    email:string|null | undefined;
    image:string;
    bio:string;
}

export const AddUser = async ({
    name,
    email,
    image,
    bio
    }:Params) => {

    try {
        await ConnectDb()
        const findUser =await  User.findOne({email})
        if(!findUser) {
            const findName = await User.findOne({name})
            if(findName&&findName.name === name) {
                return {
                    message:"Name already exsite"
                }
            }
            return await User.create({
                name,
                email,
                image,
                bio,
                completed:true
            })
        }
        const findName = await User.findOne({name,_id:{
            $ne:findUser._id
        }})
        
        if(findName&&findName.name === name) {
            return {
                message:"Name already exsite"
            }
        }
        
        await User.findByIdAndUpdate(
            {_id:findUser._id},
            {
                name:name,
                image:image,
                bio:bio,
                completed:true
            },
            {upsert:true}
        )
    } catch (error:any) {
        throw new Error('Failed to add user '+error.message)
    }

}

export const fetchUserCompletion = async(email:string)  => {
    try {
        await ConnectDb()
        const user = await User.findOne({email})
            .select('-_id completed').lean()
        console.log(user)
        if(!user) {
            return {completed:false}
        }
        return user
    } catch (error:any) {
        throw new Error('Failed to find user '+error.message)
    }
}
