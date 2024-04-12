import { useEffect, useState } from "react"
import { CiFileOn } from "react-icons/ci";

import { useSession } from "next-auth/react"
import { usePathname,useRouter } from "next/navigation"
import { fetchGroupConvos } from "@/lib/actions/group.action";
import Image from "next/image"
import Link from "next/link"
import { useSocket } from "@/assets/other/providers/socket-provider";

export default function GroupSideItems() {
    const [groups,setGroups] = useState<any[]>([])
    const {data:session} = useSession()
    const {socket } = useSocket()
    const router = useRouter()
    const pathname = usePathname()?.split('/')[2]
    const [windowWidth,setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        function changeWidth() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize',changeWidth)
        
        return () => window.removeEventListener('resize',changeWidth)
    },[windowWidth])
    useEffect(() =>{
      if(!session) return
        const chatsfetch = async() => {
            const response = await fetchGroupConvos(session?.user?.email)
            setGroups(response)
        }
        chatsfetch()
    },[session])
    useEffect(() => {
      if(groups.length === 0 ||windowWidth<768) return
      router.push(`/group/${groups[0]?._id}`)
    },[groups])
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
                    const loaderProp =({ src }:any) => {
                      return src;
                  }
                    return (
                        <Link href={{ pathname: `/group/${group._id}`}} key={group._id} className={`flex items-center justify-between p-2 rounded-xl    hover:shadow-lg transition duration-300 ease-in-out  hover:opacity-55  ${pathname === group._id && "bg-gray-200 dark:bg-dark"} hover:bg-gray-300
                        dark:hover:bg-dark`}>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-12 h-12">
                            <Image 
                              src={group.image || "/user.png"} 
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
                              <p className="text-base font-semibold text-black dark:text-white cursor-pointer">{group.name}</p>
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