import { useEffect, useState } from "react"
import { CiFileOn } from "react-icons/ci";

import { useSession } from "next-auth/react"
import { fetchConvos } from "@/lib/actions/chat.action"
import Image from "next/image"
import Link from "next/link"
import { useSocket } from "@/assets/other/providers/socket-provider";
import { usePathname } from "next/navigation";
export default function SideNavItems() {
    const [chats,setChats] = useState<any[]>([])
    const {data:session} = useSession()
    const {socket } = useSocket()
    const pathname = usePathname()?.split('/')[2]
    
    useEffect(() =>{
      if(!session) return
        const chatsfetch = async() => {
            const response = await fetchConvos(session?.user?.email,"private")
            setChats(response)
        }
        chatsfetch()
    },[session])
    useEffect(() => {
      if(chats.length === 0 || !socket) return
      chats.forEach(chat => {
        const key = `Convo:${chat._id}:messages`
        socket.on(key,(data:any) => {
          
          setChats(prev => {
            const newData = prev.map(msg => {
              if(key.split(":")[1] === msg._id) {
                
                return {...msg,messages:{...msg.messages,content:data.content,_id:data._id}}
              } else {
                return msg
              }
              
            })
            return newData
          })
          
        })
        const key2 = `Convo:${chat._id}:deleted`
        socket.on(key2,(data:any) => {
        
         
          setChats(prev => {
            
            const newData = prev.map(msg => {
              
              if(data===msg.messages?._id) {
    
                return {...msg,messages:{...msg.messages,content:{...msg.messages.content,text:"Message deleted"}}}
              }
              return msg
            })
            return newData
          })
        })
      })
      


      
    },[chats,socket]) 
   
    return (
        <>
            {chats&&chats.length !==0&&
            <div className="flex flex-col gap-2 ">
                {chats.map(chat => {
                    const loaderProp =({ src }:any) => {
                      return src;
                  }
                    return (
                        <Link href={{ pathname: `/chat/${chat._id}`}} key={chat._id} className={`flex items-center justify-between p-2 rounded-xl
                        hover:bg-gray-300
                        dark:hover:bg-dark  hover:shadow-lg transition duration-300 ease-in-out  hover:opacity-55  ${pathname === chat._id && "bg-gray-200 dark:bg-dark"}
                        group `}>
                          <div className="flex items-center space-x-2">
                            <div className="relative w-12 h-12">
                              <Image 
                                src={chat.participants[0].image ||"/user.png"} 
                                alt="user profile pic"
                                priority
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"
                                className="rounded-full bg-white border-2 dark:border-dark"
                                loader={loaderProp}
                                unoptimized
                              />
                            </div>
                            <div>
                              <div className="flex gap-2 items-center">
                                <p className={`text-lg font-semibold text-black dark:text-white cursor-pointer  `}>{chat.participants[0].name}</p>
                                <div className={`p-1 rounded-full 
                              ${
                                chat.participants[0].status==="online"?"bg-green-500":
                                chat.participants[0].status==="away"?"bg-orange-400":
                                "bg-accent"
                              } `} /> 
                              
                              </div>
                              <div className=" truncate text-gray-1 text-sm">{
                              chat.messages?.content.text && chat.messages?.content.urls.length === 0
                              ?
                              chat.messages?.content.text
                              :
                              chat.messages?.content.text && chat.messages?.content.urls.length > 0
                              ?
                              <div className="flex gap-2">
                                {chat.messages?.content.text}
                                <CiFileOn className="text-xl"/>
                              </div>
                              :
                              !chat.messages?.content.text && chat.messages?.content.urls.length > 0
                              ?
                              <div className="flex gap-2">
                                {chat.messages?.content.urls.length  }
                                <CiFileOn className="text-xl"/>
                                
                              </div>
                              :
                              "Start chatting now"}
                              </div>
                            </div>
                          </div>
                        
                      </Link>
                    )
                })}
            </div>}
        </>
       
    )
}