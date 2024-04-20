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
        if(!user) {
            return {message:"Failed to find user"}
        }
        let convo = await Conversation.findOne({
            participants:{
                $all:[user._id,idToObjectId]
            },
            type:"private"
        })
        if(!convo) {
            convo = await Conversation.create({
                participants:[user._id,idToObjectId],
                messages:[],
                type:"private"
            })
        }
        const convoId = convo._id.toString()
        return convoId
    } catch (error:any) {
        throw new Error(`Failed to fetch ${error.message}`)
    }
}

export const fetchConvos = async (email: string | null | undefined,type:string) => {
    try {
        await ConnectDb();
        const user = await User.findOne({ email });
        if(!user) {
            return {message:"Failed to find user"}
        }
        const convos = await Conversation.find({participants:{$in:[user._id]},type})
            .populate(
                {
                    path:"participants",
                    model:User,
                    select:"_id name image status"
                }
            )
            .populate(
                {
                    path:"messages",
                    model:Message,
                    select:"_id content"
                }
            ).lean()
        
            const convosfilter = convos.map((convo) => {
                const participantIds = new Set();
              
                if (convo.participants[0]._id === convo.participants[1]._id) {
                    return {
                        ...convo,
                        participants: convo.participants.filter((part:any) => {
                            if (!participantIds.has(part._id.toString())) {
                                participantIds.add(part._id.toString());
                                return true;
                            }
                            return false;
                        })
                    };
                } else {
                    return {
                        ...convo,
                        participants: convo.participants.filter((part:any) => part._id.toString() !== user._id.toString())
                    };
                }
            });
        const convoLastMessage = convosfilter.map((convo:any) => {
            return {...convo,messages:convo.messages[convo.messages.length - 1]}
        })
        
        return JSON.parse(JSON.stringify(convoLastMessage));
    } catch (error: any) {
        throw new Error(`Failed to fetch chats ${error.message}`);
    }
}


export const fetchConvoById = async(
    {
        email,
        convoId,
        
    }:{
        email:string|null|undefined,
        convoId:string;
        toShow?:number
    }
) => {
    try {
        await ConnectDb()
        const user = await User.findOne({email})
        if(!user) {
            return {message:"Failed to find user"}
        }
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
                            sort:{timestamp:1},
                            
                            },
                            populate:{
                                path:"sender",
                                model:User,
                                select:"_id image name"
                            },
                            
                        }
                    )
                    .lean()         
        if(!convo) {
            return {error:"No convo found"}
        }
        let convoFiltered:any
        // @ts-ignore
        if(convo?.participants[0]._id === convo?.participants[1]._id) {
            //@ts-ignore
            convoFiltered = [convo?.participants[0]]
        } else {
            // @ts-ignore
           convoFiltered = convo?.participants.filter((parti:any) => parti._id.toString() !== user._id.toString());
        }
        const convoData:any = {
            ...convo,
            participants: convoFiltered
        };
        const convoFull = JSON.parse(JSON.stringify(convoData))
        
        return {convoFull,userId:user._id.toString()}
    } catch (error:any) {
        throw new Error(`Failed to fetch conversation ${error.message}`)
    }
}

export const removeConvo = async(userId:string|undefined,convoId:string | undefined) => {
    
    try {
        await ConnectDb()
        const convo = await Conversation.findById(convoId)
        if(!convo) {
            return {error:"Convo not found"}
        }
        if(convo.participants.includes(userId)) {
            convo.participants = convo.participants.filter((part:any) => part.toString() !== userId);
            await convo.save()
        }
    } catch (error:any) {
        throw new Error(`Failed to delete convo ${error.message}`)
    }
}
