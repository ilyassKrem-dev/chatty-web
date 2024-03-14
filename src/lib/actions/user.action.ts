"use server"

import { ConnectDb } from "../mongoose";
import User from "../models/user.model";
import { FilterQuery } from "mongoose";

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

export const fetchUser = async(email:string|null|undefined) => {
    try {
        await ConnectDb()
        const user = await User.findOne({email})
            .select('-_id name email image bio status ').lean()
        
        return user
    } catch (error:any) {
        throw new Error(`Failed to fetch user ${error.message}`)
    }
}

export const onlineStatus = async(email:string|null|undefined,status:string) => {
    try {
        await ConnectDb()
        const user = await User.findOneAndUpdate({email} ,{$set:{lastLogin:new Date(),status:status}})
    } catch (error:any) {
        throw new Error(`Failed to change status ${error.message}`)
    }
}

export const fetchUsers = async(
    {
        searchString,
        toShow=10,
        sortBy="desc"
    }
    :{
        searchString:string;
        toShow?:number;
        sortBy?: "desc";
    }
    ) => {

    try {
        await ConnectDb()
        const regex = new RegExp(searchString,"i")
        const query: FilterQuery<typeof User> = {}
        if (searchString.trim() !== '') {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ];
        }
    
        let usersQuery;
    
        if (Object.keys(query).length === 0) {
           
            usersQuery = User.aggregate([
                { $sample: { size: toShow } },
                { $project: { _id: 1, name: 1, image: 1 }}
            ]);
        } else {
            
            const sortOptions = {
                createdAt: sortBy
            };
            usersQuery = User.find(query).sort(sortOptions).limit(toShow).select('_id name image').lean();
        }
    
        const users = await usersQuery.exec();

        const usersData = users.map(user => {
            return {...user,_id:user._id.toString()}
        });
        return usersData
    } catch (error:any) {
        throw new Error(`Failed to fetch users ${error.message}`)
    }
}

export const fetchUserById = async(userId:string) => {
    try {
        await ConnectDb()
        const user = await User.findById(userId)
            .select('-id name image bio').lean()

        return user
    } catch (error:any) {
        throw new Error(`Error fetching user ${error.message}`)
    }
}