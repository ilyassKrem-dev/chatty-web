"use server"

import MessagesTypes from "@/components/chat/other/MessagesTypes";
import { Message } from "../models/chat.model";
import { Groups } from "../models/group.model";
import User from "../models/user.model";
import { ConnectDb } from "../mongoose"



export const createGroup = async(
    {
        email,
        idsArray,
        name
    }:{
        email:string|null|undefined;
        idsArray:string[];
        name:string
    }
) => {
    try {

        await ConnectDb()
        const user = await User.findOne({email})
        if(!user) {
             throw new Error(`Failed to find user`)
        }
        const group = await  Groups.create({
            name,
            participants:[
                {user:user._id,role:"admin"},
                ...idsArray.map(id =>({user:id,role:"member"}))
            ],
            messages:[],
            type:"group"
        })
        return {success:true,id:group._id}
    } catch (error:any) {
        throw new Error(`Failed to make group ${error.message}`)
    }
}

export const fetchGroupConvos = async(email:string|null|undefined) => {
    try {
        await ConnectDb()
        const user = await User.findOne({email})
        const groups =  await Groups.find({
            "participants.user":user._id,
            type:"group"
        })
            .populate(
                {
                    path:"participants.user",
                    model:User,
                    select:"-_id image"
                }
            )
            .populate(
                {
                    path:"messages",
                    model:Message,
                    select:"_id content sender",
                    populate:{
                        path:"sender",
                        model:User,
                        select:"-_id image name"
                    }
                }
            ).lean()
            const groupsLastMessage = groups.map(group => {
                return {...group,messages:group.messages[group.messages.length-1]}
            })
           
            
            return JSON.parse(JSON.stringify(groupsLastMessage))
    } catch (error:any) {
        throw new Error(`Failed to fetch Convos ${error.message}`)
    }
}

export const fetchGroupChat = async(groupId:string,email:string|null|undefined) => {
    try {
        await ConnectDb()
        const user = await User.findOne({email})
        const groupChat = await Groups.findById(groupId)
            .populate(
                {
                    path:"participants.user",
                    model:User,
                    select:"_id name bio image status"
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
                    }
                    
                }
            ).lean()
            //@ts-ignore
            
            const group = JSON.parse(JSON.stringify(groupChat))

            return {convoFull:group,userId:user._id.toString()}
    } catch (error:any) {
        throw new Error(`Failrd to fetch messages: ${error.message}`)
    }
}

export const leavingGroup = async(userId:string|undefined,convoId:string | undefined) => {
    try {
        
        await ConnectDb()
        const group = await Groups.findById(convoId)
        const index = group.participants.findIndex((participant:any) => participant.user === userId && participant.role === "member");
        if(index !==-1) {
            group.participants.splice(index,1)
            await group.save()
        }
        
    } catch (error:any) {
        throw new Error(`Failed to leave group ${error.message}`)
    }
}