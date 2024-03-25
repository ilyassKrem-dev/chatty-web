"use server"

import mongoose from "mongoose";
import { Conversation,Message } from "../models/chat.model";
import User from "../models/user.model";
import { ConnectDb } from "../mongoose"


export const fetchConvoId = async(
    {
        email,
        friendId,
    }:{
        email:string|null|undefined;
        friendId:string
    }
) => {
    try {
        const idToObjectId = new mongoose.Types.ObjectId(friendId)
        await ConnectDb()
        const user = await User.findOne({email})
        let convo = await Conversation.findOne({
            participants:{
                $all:[user._id,idToObjectId],
                $size:2
            }
        })
        if(!convo) {
            convo = await Conversation.create({
                participants:[user._id,idToObjectId],
                messages:[]
            })
        }
        const convoId = convo._id.toString()
        return convoId
    } catch (error:any) {
        throw new Error(`Failed to fetch ${error.message}`)
    }
}

export const fetchConvos = async(email:string|null|undefined) => {
    try {
        await ConnectDb()
        const user = await User.findOne({email})
        const convos = await Conversation.aggregate([
            { $match: { participants: user._id } },
            {
                $lookup: {
                    from: 'messages',
                    localField: 'messages',
                    foreignField: '_id',
                    as: 'messageObjects'
                }
            },
            {
                $addFields: {
                    lastMessage: {
                        $cond: {
                            if: { $eq: [{ $size: "$messageObjects" }, 0] }, 
                            then: null, 
                            else: { $arrayElemAt: ["$messageObjects", -1] } 
                        }
                    }
                }
            },
            {
                $project: {
                    participants: {
                        $filter: {
                            input: "$participants",
                            as: "participant",
                            cond: { $ne: ["$$participant", user._id] }
                        }
                    },
                    lastMessage: 1
                }
            },
            {
                $addFields: {
                    lastMessage: { $arrayElemAt: ["$lastMessageDetails", 0] }
                }
            },
            {
                $project: {
                    participants: 1,
                    lastMessage: {
                        _id: "$lastMessage._id",
                        text: "$lastMessage.text",
                        
                    }
                }
            },
            
        ]);
        const convosData =await Conversation.populate(convos, {
            path: 'participants',
            model: User,
            select: '-_id name image'
        });
        const convosString = convosData.map((convo) => {
            return {...convo,_id:convo._id.toString()}
        })
        
        return JSON.parse(JSON.stringify(convosString))
    } catch (error:any) {
        throw new Error(`Faild to fetch chats ${error.message}`)
    }
}

export const fetchConvoById = async(
    {
        email,
        convoId,
        toShow=10
    }:{
        email:string|null|undefined,
        convoId:string;
        toShow?:number
    }
) => {
    try {
        await ConnectDb()
        const user = await User.findOne({email})
        const convo = await Conversation.findById(convoId)
                    .populate(
                        {
                            path:"participants",
                            model:User,
                            select:"_id name bio image"
                        }
                    )
                    .populate(
                        {
                            path:"messages",
                            model:Message,
                            options:{
                            sort:{timestamp:1}
                            },
                            populate:{
                                path:"sender",
                                model:User,
                                select:"_id image name"
                            },
                            
                        }
                    )
                    .lean()
        // @ts-ignore         
        
        // @ts-ignore
        const convoFiltered = convo?.participants.filter((parti:any) => parti._id.toString() !== user._id.toString());
        const convoData:any = {
            ...convo,
            participants: convoFiltered
        };
        const convoFull = JSON.parse(JSON.stringify(convoData))
        //console.log(convoData)
        return {convoFull,userId:user._id.toString()}
    } catch (error:any) {
        throw new Error(`Failed to fetch conversation ${error.message}`)
    }
}

