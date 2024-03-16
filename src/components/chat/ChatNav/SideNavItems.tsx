import { useEffect, useState } from "react"

import { useSession } from "next-auth/react"
import { fetchConvos } from "@/lib/actions/chat.action"
import Image from "next/image"
import Link from "next/link"
export default function SideNavItems() {
    const [chats,setChats] = useState<any[]>([])
    const {data:session} = useSession()
    useEffect(() =>{
        const chatsfetch = async() => {
            const response = await fetchConvos(session?.user?.email)
            setChats(response)
        }
        chatsfetch()
    },[])

    return (
        <>
            {chats.length !==0&&
            <div>
                {chats.map(chat => {
                    return (
                        <Link href={{ pathname: `/chat/${chat._id}`}} key={chat._id} className="flex items-center justify-between p-2 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out bg-white dark:bg-black hover:opacity-55 dark:border-black">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-10 h-10">
                            <Image 
                              src={chat.participants[0].image} 
                              alt="user profile pic"
                              priority
                              fill
                              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"
                              className="rounded-full bg-white"
                            />
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-black dark:text-white cursor-pointer">{chat.participants[0].name}</p>
                            <p className=" truncate text-gray-1 text-sm">{chat.lastMessage.content?chat.lastMessage.content:"Start chatting now"}</p>
                          </div>
                        </div>
                        
                      </Link>
                    )
                })}
            </div>}
        </>
       
    )
}