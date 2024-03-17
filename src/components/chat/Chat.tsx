"use client"
import ChatInfo from "@/components/chat/ChatNav/ChatInfo"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { fetchConvoById } from "@/lib/actions/chat.action"
import ChatInput from "./allinputs/ChatInput"
export default function Chat({convoId}:{
    convoId:string
}) {
    const [convo,setConvo] = useState<any>()
    const {data:session} = useSession()
    useEffect(() => {
        const convoFetching = async() => {
            const response = await fetchConvoById({
                email:session?.user?.email,
                convoId:convoId
            })
            setConvo(response)
        }

        convoFetching()
    },[])
    return (
        <div className="h-screen flex flex-col pb-[4.7rem] lg:pb-0">
            {convo&&
            <div className="flex flex-col h-full">
                <ChatInfo friendInfo={convo.participants[0]}/>
                <div className="flex-1">
                    
                </div>
                <ChatInput />
            </div> }   
        </div>
    )
}