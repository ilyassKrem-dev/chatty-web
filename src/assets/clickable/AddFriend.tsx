"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { requestSent } from "@/lib/actions/friends.action";
import { sendRequest } from "@/lib/actions/friends.action";

export default  function AddFriend({userId}:{userId:string|undefined
}) {
    const [show,setShow] = useState<boolean>(false)
    const [added,setAdded] = useState<any>(null)
    const {data:session} = useSession()
    useEffect(() => {
        const id = setTimeout(() => {
            setShow(true)
        },100)

        return () => clearTimeout(id)
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
    },[show])
    const handleSend = async() => {
        await sendRequest({
            currentUserEmail:session?.user?.email,
            userId:userId
        })
        setAdded(true)
    }
    return (
        <>
            {added!== null&&<div>
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