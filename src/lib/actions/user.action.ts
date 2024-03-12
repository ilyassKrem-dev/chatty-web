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
        
        if(!user) {
            return {completed:false}
        }
        return user
    } catch (error:any) {
        throw new Error('Failed to find user '+error.message)
    }
}

export const addGoogleAccount = async(
    {name,
    email,
    image,
    password}:{
        name:string|null|undefined;
        email:string|null|undefined;
        image:string|null|undefined;
        password:string;
    }) => {
    try {
        await ConnectDb()
        await User.create({
            name,
            email,
            password,
            image
            
        })
    } catch (error:any) {
        throw new Error('Failed to Add user'+error.message)
    }
}