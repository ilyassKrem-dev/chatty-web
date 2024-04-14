"use client"
import ChatInfo from "@/components/chat/ChatNav/ChatInfo"
import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { fetchConvoById } from "@/lib/actions/chat.action"
import ChatInput from "@/components/chat/allinputs/ChatInput"
import ChatMessages from "@/components/chat/ChatMessages"
import { useSocket } from "@/assets/other/providers/socket-provider"
import NoIdFound from "../shared/NoidFound"
import OtherInfo from "../shared/OtherInfo"

export default function Chat({convoId}:{
    convoId:string
}) {
    const [convo,setConvo] = useState<any>()
    const {data:session} = useSession()
    const [userId,setUserId] = useState<string>("")
    const [show,setShow] = useState<boolean>(false)
    const {socket} = useSocket()
    const key = `Convo:${convoId}:messages`
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const deltKey = `Convo:${convoId}:deleted`
    useEffect(() => {
        if(!session) return
        const convoFetching = async() => {
            try {
                const response = await fetchConvoById({
                    email:session?.user?.email,
                    convoId:convoId
                })
                
                if(!response?.convoFull?.messages) {
                    return setConvo(null)
                }
                setConvo(response.convoFull)
                setUserId(response.userId)
                
            } catch (error:any) {
               
                setConvo(null)
            }
           
        }

        convoFetching()
        
    },[session])
    
   useEffect(() => {
        if(!socket) return
        socket.on(key,(message:any) => {
            
            setConvo((prev:any) => {
                return {...prev,messages:[...prev.messages,message]}
            })
        })
        socket.on(deltKey,(messageId:string) => {
            setConvo((prev:any) => {
                return {...prev,messages:prev.messages.filter((message:any) => message._id !== messageId)}
            })
        })

        return () => {
            socket.off(key)
            socket.off(deltKey)
        }
   },[socket])

   useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [convo?.messages]);

    if(convo === null) {
        return <NoIdFound />
    }
    
    return (
        <div className=" lg:pb-0 flex">
            {convo&&
            <div className="flex flex-col h-screen flex-1">
                <ChatInfo friendInfo={convo.participants[0]} userId={userId} setShow={setShow} show={show}/>

                <section className=" flex-1 ml-3 overflow-y-auto custom-scrollbar">
                    <ChatMessages messages={convo.messages} userId={userId}/>
                    
                    <div ref={messagesEndRef} />
                    
                </section>
                <div className="mb-[3.9rem] md:mb-[5.9rem] lg:mb-0">
                    <ChatInput 
                    email={session?.user?.email} 
                    convoId={convo._id}
                    receiver={convo.participants[0]?._id}
                    type="private"/>
                </div>
                
            </div> }
            {show&&convo&&
            <OtherInfo 
            friendInfo={convo.participants[0]}
            messages={convo.messages}
            setShow={setShow}
            convoId={convo._id}
            userId={userId}/>}
        </div>
    )
}