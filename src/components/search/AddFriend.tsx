"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchIsFriends, requestSent } from "@/lib/actions/friends.action";
import { sendRequest } from "@/lib/actions/friends.action";

export default  function AddFriend({userId}:{userId:string|undefined
}) {
    const [added,setAdded] = useState<any>(null)
    const [alreadyFriends,setAlreadyFriends] = useState<boolean|null>(null)
    const {data:session} = useSession()
    useEffect(() => {
        const isFriends = async() => {
            const res = await fetchIsFriends(
                {
                    email:session?.user?.email,
                    otherId:userId
                }
            )
            setAlreadyFriends(res.friends)
        }
        isFriends()
    },[])
    
    useEffect(() => {
        
        const sent = async() => {
            const request = await requestSent({
                currentUserEmail:session?.user?.email,
                userId:userId
            })
            setAdded(request.found)
        }
        sent()
    },[])
    const handleSend = async() => {
        await sendRequest({
            currentUserEmail:session?.user?.email,
            userId:userId
        })
        setAdded(true)
    }
    return (
        <>
            {!alreadyFriends&&added!== null&&<div>
                {!added?
                <button className="bg-blue-400 text-white rounded-xl p-1 flex items-center gap-2 hover:opacity-70 transition-all duration-300 px-3" onClick={handleSend}>
                    <span className="text-2xl">+</span> Add Friend
                </button>
                :
                <div className="bg-blue-400 text-white rounded-xl p-1 flex items-center gap-2 hover:opacity-70 transition-all duration-300 px-3">
                    Request sent
                </div>}
            </div>}
        </>
    )
}