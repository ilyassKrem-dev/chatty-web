"use client"

import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { fetchGroupChat } from "@/lib/actions/group.action"
import ChatInput from "@/components/chat/allinputs/ChatInput"
import ChatMessages from "@/components/chat/ChatMessages"
import { useSocket } from "@/assets/other/providers/socket-provider"
import Info from "./groupChat/info"
import NoIdFound from "../shared/NoidFound"
import OtherInfo from "../shared/OtherInfo"
export default function GroupChat({convoId}:{
    convoId:string
}) {
    const [convo,setConvo] = useState<any>()
    const {data:session} = useSession()
    const [userId,setUserId] = useState<string>("")
    const {socket} = useSocket()
    const [show,setShow] = useState<boolean>(false)
    const key = `Convo:${convoId}:messages`
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const deltKey = `Convo:${convoId}:deleted`
    useEffect(() => {
        if(!session) return
        const convoFetching = async() => {
            try {
                const response = await fetchGroupChat(
                    convoId,
                    session?.user?.email
                    
                )
            
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
        if(!userId) return
        const roleKey = `User:${userId}:RoleChanged`
        socket.on(roleKey,(data:any) => {
            console.log(data)
            if(Array.isArray(data)) {
                setConvo((prev:any) => {
                    return {...prev,participants:data}
                })
            } else {
                
                setConvo((prev:any) => {
                    const newData = prev.participants.map((particip:any) => {
                        if(data._id === particip._id) {
                            return {...particip,role:data.role}
                        }
                        return particip
                    })
                    return {...prev,participants:newData}
                })

            }
            
        })
        return () => {
            socket.off(key)
            socket.off(deltKey)
            socket.off(roleKey)
        }
   },[socket])

   useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [convo?.messages]);


    if(convo === null ) {
        return <NoIdFound />
    }
    return (
        <div className=" lg:pb-0 flex">
            {convo&&
            <div className="flex flex-col h-screen flex-1">
                <Info 
                name={convo.name} 
                img={convo.image} 
                chatId={convoId}
                members={convo.participants}
                setShowO={setShow}
                showO={show}/>

                <section className=" flex-1 ml-3 overflow-y-auto custom-scrollbar">
                    <ChatMessages messages={convo.messages} userId={userId} type="group"/>
                    
                    <div ref={messagesEndRef} />
                    
                </section>
                <div className="mb-[3.9rem] md:mb-[5.9rem] lg:mb-0">
                    <ChatInput 
                    email={session?.user?.email} 
                    convoId={convo._id}
                    receiver={convo.participants[0].user._id}
                    type="group"
                    />
                </div>
                
            </div> }  
            {show&&convo&&
            <OtherInfo 
            friendInfo={convo}
            messages={convo.messages}
            setShow={setShow}
            type={"group"}
            convoId={convo._id}
            userId={userId}
            isAdmin={convo.participants.some((parti:any) => parti.user._id === userId && parti.role=="admin")}
            members={convo.participants}/>}
        </div>
    )
}