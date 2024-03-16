"use server"
import mongoose from "mongoose";
import User from "../models/user.model";
import { ConnectDb } from "../mongoose"
import Request from "../models/requests.model";
import Friend from "../models/friends.model";
import { revalidatePath } from "next/cache";
import { Conversation } from "../models/chat.model";

export const sendRequest = async(
    {currentUserEmail,userId}:
    {currentUserEmail:string|null|undefined;
    userId:string | undefined}) => {
    try {
        const idToObjectId = new mongoose.Types.ObjectId(userId)
        await ConnectDb()
        const currentUser = await User.findOne({email:currentUserEmail})

        const findUser = await User.findById(idToObjectId)

        if (!findUser) {
            throw new Error('user not found');
        }
        let requestFind = await Request.findOne({user:findUser._id})
        if (!requestFind) {
            requestFind = await Request.create({ user: findUser._id, requests: [] });
        }
        await Request.findOneAndUpdate(
            { user: findUser._id },
            { $addToSet: { requests: currentUser._id } }
        );
        return 'Request sent succefully'
    } catch (error:any) {
        throw new Error(`Failed to send request ${error.message}`)
    }
}

export const requestSent = async (
    {currentUserEmail,userId}:{
        currentUserEmail:string|null|undefined;userId:string | undefined}) => {
    try {
        const idToObjectId = new mongoose.Types.ObjectId(userId)
        await ConnectDb()
        const user = await User.findOne({email:currentUserEmail})
        const findRequest = await Request.findOne({
            user:user._id,
            requests:{$in:idToObjectId}
        })
        if(findRequest) {
            return {found:true}
        }
        return {found:false}
        
    } catch (error:any) {
        throw new Error(`Error in server ${error.message}`)
    }
}

export const fetchRequests = async(email:string|null|undefined) => {
    try {
        await ConnectDb()
        const user = await User.findOne({email})
        const friendRequests = await Request.findOne({user:user._id})
            .populate(
                {
                    path:"requests",
                    model:User,
                    select:"_id name image bio"
                }
            ).lean()
            // @ts-ignore
            const requestsData = friendRequests?.requests?.map((request) => {
                return {...request,_id:request._id.toString()}
            })
                
            return requestsData

    } catch (error:any) {
        throw new Error(`Failed to fetch requests ${error.message}`)
    }
}

export const addFriend = async(
    {
        email,
        otherId,
        path
    }:{
        email:string|null|undefined,
        otherId:string,
        path:string
    }
) => {
    try {
        const idToObjectId = new mongoose.Types.ObjectId(otherId)
        await ConnectDb()
        const user = await User.findOne({email})
        const request = await Request.findOne({user:user._id})
        if(request) {
            await Request.findOneAndUpdate(
                {user:user._id},
                {
                    $pull:{requests:idToObjectId},
                }
                )
        }

        

        await Friend.create({
            user:user._id,
            friend:idToObjectId
        })
        await Friend.create({
            user:idToObjectId,
            friend:user._id
        })
        await Conversation.create({
            participants: [user._id, idToObjectId],
            messages: [] 
        });

        revalidatePath(path)
        return {succes:true}
    } catch (error:any) {
        throw new Error(`Failed to add ${error.message}`)
    }
}

export const declineRequest = async(
    {
        email,
        otherId,
        path
    }:{
        email:string|null|undefined,
        otherId:string,
        path:string
    }
) => {
    try {
        const idToObjectId = new mongoose.Types.ObjectId(otherId)
        await ConnectDb()
        const user = await User.findOne({email})
        await Request.findOneAndUpdate({user:user._id},{
            $pull:{requests:idToObjectId}
        })
        revalidatePath(path)
    } catch (error:any) {
        throw new Error(`Failed to decline ${error.message}`)
    }
}

export const fetchFriends = async(email:string|null|undefined,toShow=10) => {
    try {
        await ConnectDb()
        const user = await User.findOne({email})
        const friends = await Friend.find({user:user._id})
            .limit(toShow)
            .select("-_id friend")
            .populate({
                path:"friend",
                model:User,
                select:"_id name bio image status"
            }).lean()
        const friendsData = friends.map((friend) => {
            return {...friend.friend,_id:friend.friend._id.toString()}
        })
        return friendsData
        
    } catch (error:any) {
        throw new Error(`Failed to fetch friends ${error.message}`)
    }
}

export const removeFriend = async(
    {
        email,
        friendId,
        path
    }:{
        email:string|null|undefined,
        friendId:string,
        path:string
    }
) => {
    try {
        const idToObjectId = new mongoose.Types.ObjectId(friendId)
        await ConnectDb()
        const user = await User.findOne({email})
        await Friend.findOneAndDelete({
            user:user._id,
            friend:idToObjectId
        })
        await Friend.findOneAndDelete({
            user:idToObjectId,
            friend:user._id
        })
        revalidatePath(path)
    } catch (error:any) {
        throw new Error(`Failed to delete Friend ${error.message}`)
    }
}
