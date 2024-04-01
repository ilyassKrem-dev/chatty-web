import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import Image from "next/image"
import { usePathname,useRouter } from "next/navigation"
import { fetchFriends } from "@/lib/actions/friends.action"
import { fetchConvoId } from "@/lib/actions/chat.action"
import { removeFriend } from "@/lib/actions/friends.action"
import RemoveFriend from "./RemoveFriend"
import Status from "@/assets/clickable/Status"
export default  function FriendsList() {
    const [friends,setFriends] = useState<any[]>([])
    const [showMore , setShowMore] = useState<number>(10)
    const pathname = usePathname() as string
    const router = useRouter()
    const {data:session} = useSession()
    useEffect(() => {
        const fetchRe = async() => {
            const friends = await fetchFriends(session?.user?.email,showMore)
            setFriends(friends)
        }
        fetchRe()
    } ,[])
    const handleChat = async(id:string) => {
        const convoId = await fetchConvoId({
            email:session?.user?.email,
            friendId:id
        })
        router.push(`/chat/${convoId}`)
        console.log(convoId)
       
    }
    const handleRemove = async(id:string) => {
        await removeFriend({
            email:session?.user?.email,
            friendId:id,
            path:pathname
        })
      
    }
    return (
        <>
            {friends.length !== 0&&
            <div className="flex flex-col gap-5 mt-10 lg:mx-10">
                {friends.map((friend) => {
                    return (
                        <div key={friend._id} className="flex items-center justify-between p-1 sm:p-2 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out bg-white dark:bg-black  dark:border-black">
                          <div className="flex items-center space-x-4">
                            <div className="relative w-10 h-10">
                              <Image 
                                src={friend.image} 
                                alt="user profile pic"
                                priority
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"
                                className="rounded-full bg-white"
                              />
                            </div>
                            <div className="flex flex-col items-start">
                              <p className="sm:text-lg font-semibold text-black dark:text-white truncate w-[60px] text-start sm:w-[100px] md:w-[200px]">{friend.name}</p>
                              <Status status={friend.status}/>
                            </div>
                          </div>
                          <RemoveFriend 
                            friendId={friend._id}
                            handleRemove={handleRemove}
                            handleChat={handleChat}/>
                          
                      </div>
                    )
                })}
            </div>}
        </>
            
    )
}