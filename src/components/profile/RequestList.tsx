import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { fetchRequests } from "@/lib/actions/friends.action"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { addFriend } from "@/lib/actions/friends.action"
import { declineRequest } from "@/lib/actions/friends.action"
export default  function RequestList() {
    const [requests,setRequests] = useState<any[]>([])
    const pathname = usePathname()
    const {data:session} = useSession()
    useEffect(() => {
        const fetchRe = async() => {
            const requests = await fetchRequests(session?.user?.email)
            setRequests(requests)
        }
        fetchRe()
    } ,[])
    
    const handleClick = async(id:string) => {
        await addFriend({
            email:session?.user?.email,
            otherId:id,
            path:pathname
        })
        const updatedRequests = await fetchRequests(session?.user?.email)
        setRequests(updatedRequests)
    }
    const handleDecline = async(id:string) => {
      await declineRequest({
        email:session?.user?.email,
        otherId:id,
        path:pathname
      })
      const updatedRequests = await fetchRequests(session?.user?.email)
      setRequests(updatedRequests)
    }
    return (
        <>
            {requests.length !== 0&&
            <div className="flex flex-col gap-5 mt-10 lg:mx-10">
                {requests.map((request) => {
                    return (
                        <div key={request._id} className="flex items-center justify-between p-2 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 ease-in-out bg-white dark:bg-black  dark:border-black">
                          <div className="flex items-center space-x-4">
                            <div className="relative w-10 h-10">
                              <Image 
                                src={request.image} 
                                alt="user profile pic"
                                priority
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"
                                className="rounded-full bg-white"
                              />
                            </div>
                            <div className="flex flex-col items-start">
                              <p className="text-lg font-semibold text-black dark:text-white">{request.name}</p>
                              <p className=" truncate text-sm text-gray-500  max-w-52">{request.bio}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-blue-500 hover:opacity-60 dark:bg-accent text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            onClick={() => handleClick(request._id)}>
                              Add friend
                            </button>
                            <button className="bg-accent hover:opacity-60  text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            onClick={() => handleDecline(request._id)}>
                              Decline
                            </button>
                          </div>
                      </div>
                    )
                })}
            </div>}
        </>
            
    )
}