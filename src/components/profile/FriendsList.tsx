import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import Image from "next/image"
import { usePathname,useRouter } from "next/navigation"
import { fetchFriends } from "@/lib/actions/friends.action"
import { fetchConvoId } from "@/lib/actions/chat.action"
import { removeFriend } from "@/lib/actions/friends.action"
import FriendInputs from "./FriendsInputs"
import Status from "@/components/shared/Status"
export default  function FriendsList() {
    const [friends,setFriends] = useState<any[]>([])
    const [showMore , setShowMore] = useState<number>(10)
    const pathname = usePathname() as string
    const router = useRouter()
    const {data:session} = useSession()
    useEffect(() => {
        if(!session) return
        const fetchRe = async() => {
            const friends = await fetchFriends(session?.user?.email,showMore)
            setFriends(friends)
        }
        fetchRe()
    } ,[session])
    const handleChat = async(id:string) => {
        const convoId = await fetchConvoId({
            email:session?.user?.email,
            friendId:id
        })
        router.push(`/chat/${convoId}`)
        
       
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
            <div className="flex flex-col gap-5 mt-5 lg:mx-8">
                {friends.map((friend) => {
                    const loaderProp =({ src }:any) => {
                        return src;
                    }
                    return (
                        <div key={friend._id} className="flex items-center justify-between p-2 rounded-xl    hover:shadow-lg transition ">
                          <div className="flex items-center space-x-4 duration-300 ease-in-out  hover:opacity-70  hover:bg-gray-300 dark:hover:bg-dark">
                            <div className="relative w-10 h-10">
                              <Image 
                                src={friend.image ||"/user.png"} 
                                alt="user profile pic"
                                priority
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"
                                className="rounded-full bg-white"
                                loader={loaderProp}
                                unoptimized
                              />
                            </div>
                            <div className="flex flex-col items-start">
                              <p className="sm:text-lg font-semibold text-black dark:text-white truncate max-[300px]:w-[60px] w-[80px] text-start sm:w-[100px] md:w-[200px]">{friend.name}</p>
                              <Status status={friend.status} className="max-[300px]:text-xs"/>
                            </div>
                          </div>
                          <FriendInputs 
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