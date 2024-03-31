import { useEffect, useState } from "react"
import { CiFileOn } from "react-icons/ci";

import { useSession } from "next-auth/react"

import { fetchGroupConvos } from "@/lib/actions/group.action";
import Image from "next/image"
import Link from "next/link"
import { useSocket } from "@/assets/other/providers/socket-provider";

export default function GroupSideItems() {
    const [groups,setGroups] = useState<any[]>([])
    const {data:session} = useSession()
    const {socket } = useSocket()
    
    useEffect(() =>{
        const chatsfetch = async() => {
            const response = await fetchGroupConvos(session?.user?.email)
            setGroups(response)
        }
        chatsfetch()
    },[])
    useEffect(() => {
      if(groups.length === 0 || !socket) return
      groups.forEach(group => {
        const key = `Convo:${group._id}:messages`
        socket.on(key,(data:any) => {
          
            setGroups(prev => {
            const newData = prev.map(msg => {
              if(key.split(":")[1] === msg._id) {
                
                return {...msg,messages:
                  {...msg.messages,
                    content:data.content,
                    _id:data._id,
                    sender:data.sender
                  }}
              } else {
                return msg
              }
              
            })
            return newData
          })
          
        })
        const key2 = `Convo:${group._id}:deleted`
        socket.on(key2,(data:any) => {
        
         
            setGroups(prev => {
            
            const newData = prev.map(msg => {
              
              if(data===msg.messages?._id) {
    
                return {...msg,messages:{...msg.messages,
                  content:{...msg.messages.content,text:"Message deleted"},
                  sender:""}}
              }
              return msg
            })
            return newData
          })
        })
      })
      


      
    },[groups,socket]) 
    
    return (
        <>
            {groups&&groups.length !==0&&
            <div>
                {groups.map(group => {
                    return (
                        <Link href={{ pathname: `/group/${group._id}`}} key={group._id} className="flex items-center justify-between p-2 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out bg-white dark:bg-black hover:opacity-55 dark:border-black">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-10 h-10">
                            <Image 
                              src={group.image || "/user.png"} 
                              alt="user profile pic"
                              priority
                              fill
                              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"
                              className="rounded-full bg-white"
                            />
                          </div>
                          <div>
                            <div className="flex gap-2 items-center">
                              <p className="text-lg font-semibold text-black dark:text-white cursor-pointer">{group.name}</p>
                            </div>
                            <div className=" truncate text-gray-1 text-sm flex gap-1">
                             {group.messages?.sender&&
                             <p>
                              {group.messages.sender.name + ":"}
                              </p>
                            }
                            {
                            group.messages?.content.text && group.messages?.content.urls.length === 0
                            ?
                            group.messages?.content.text
                            :
                            group.messages?.content.text && group.messages?.content.urls.length > 0
                            ?
                            <div className="flex gap-2">
                              {group.messages?.content.text}
                              <CiFileOn className="text-xl"/>
                            </div>
                            :
                            !group.messages?.content.text && group.messages?.content.urls.length > 0
                            ?
                            <div className="flex gap-2">
                              {group.messages?.content.urls.length  }
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