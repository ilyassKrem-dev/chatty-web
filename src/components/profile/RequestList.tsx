import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { fetchRequests } from "@/lib/actions/friends.action"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { addFriend } from "@/lib/actions/friends.action"
import { declineRequest } from "@/lib/actions/friends.action"
export default  function RequestList() {
    const [requests,setRequests] = useState<any[]>([])
    const pathname = usePathname() as string
    const {data:session} = useSession()
    useEffect(() => {
      if(!session) return
        const fetchRe = async() => {
            const requests = await fetchRequests(session?.user?.email)
            setRequests(requests)
        }
        fetchRe()
    } ,[session])
    
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
            {requests&&requests.length !== 0&&
            <div className="flex flex-col gap-5 mt-5 lg:mx-8">
                {requests.map((request) => {
                  const loaderProp =({ src }:any) => {
                    return src;
                  }
                    return (
                        <div key={request._id} className="flex items-center justify-between p-2 rounded-xl    hover:shadow-lg transition duration-300 ease-in-out   hover:opacity-70  hover:bg-gray-300 dark:hover:bg-dark">
                          <div className="flex items-center space-x-4">
                            <div className="relative w-10 h-10">
                              <Image 
                                src={request.image ||"/user.png"} 
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
                              <p className="text-lg font-semibold text-black dark:text-white">{request.name}</p>
                              <p className=" text-sm text-gray-500  truncate w-[60px] text-start">{request.bio}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-blue-500 hover:opacity-60  text-white py-2 px-2 sm:px-2 rounded-md transition duration-300 ease-in-out text-sm sm:text-lg"
                            onClick={() => handleClick(request._id)}>
                              Add
                            </button>
                            <button className="bg-accent hover:opacity-60  text-white py-2 px-2 sm:px-2 rounded-md transition duration-300 ease-in-out text-sm sm:text-lg"
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