"use client"
import ChatInfo from "@/components/chat/ChatNav/ChatInfo"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { fetchConvoById } from "@/lib/actions/chat.action"
import ChatInput from "./allinputs/ChatInput"
import ChatMessages from "./ChatMessages"
import { useSocket } from "@/assets/other/providers/socket-provider"



export default function Chat({convoId}:{
    convoId:string
}) {
    const [convo,setConvo] = useState<any>()
    const {data:session} = useSession()
    const [userId,setUserId] = useState<string>("")
    const {socket} = useSocket()
    const key = `Convo:${convoId}:messages`

    
    useEffect(() => {
        const convoFetching = async() => {
            const response = await fetchConvoById({
                email:session?.user?.email,
                convoId:convoId
            })
            setConvo(response.convoFull)
            setUserId(response.userId)
           
        }

        convoFetching()
        
    },[])
   useEffect(() => {
        if(!socket) return
        socket.on(key,(message:any) => {
            setConvo((prev:any) => {
                return {...prev,messages:[...prev.messages,message]}
            })
        })


        return () => {
            socket.off(key)
        }
   },[socket])
      
    return (
        <div className="h-screen flex flex-col pb-[4.7rem] lg:pb-0">
            {convo&&
            <div className="flex flex-col h-full">
                <ChatInfo friendInfo={convo.participants[0]}/>
                <div className="flex-1 mb-6">
                    <ChatMessages messages={convo.messages} userId={userId}/>
                </div>
                <ChatInput 
                email={session?.user?.email} 
                convoId={convo._id}
                receiver={convo.participants[0]._id}/>
            </div> }   
        </div>
    )
}