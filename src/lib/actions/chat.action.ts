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

export const fetchConvos = async (email: string | null | undefined) => {
    try {
        await ConnectDb();
        const user = await User.findOne({ email });

        const convos = await Conversation.find({participants:{$in:[user._id]}})
            .populate(
                {
                    path:"participants",
                    model:User,
                    select:"_id name image"
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
            return {...convo,participants:convo.participants.filter((part:any) => part._id.toString() !== user._id.toString())}
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

