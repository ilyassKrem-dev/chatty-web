
"use client"
import { useSession } from "next-auth/react"
import { fetchUser } from "@/lib/actions/user.action"
import { useEffect, useState } from "react"

import ProfileHeader from "@/components/shared/ProfileHeader"
import ProfileTabs from "./ProfileTabs"
import { useSocket } from "@/assets/other/providers/socket-provider"
interface Params {
    _id?:string
    name:string;
    email:string;
    image:string;
    coverImage?:string;
    bio:string;
    status:string;
}
export default function ProfilePage() {
    const {data:session} = useSession()
    const [user,setUser] = useState<Params>()
    const {socket} = useSocket()
    useEffect(() => {
        const userFetch = async() => {
            try {
                const response = await fetchUser(session?.user?.email)
                // @ts-ignore
                if(response) setUser(response)
            } catch (error) {
                console.error(error)
            }
        }
        userFetch()
    },[session])
    useEffect(() => {
        if(!socket) return
        const key = `User:${user?._id}`
        socket.on(key,(data:string) => {
            setUser((prev:any) => {
                return {...prev,status:data}
            })
        })
        const key2 = `User:${user?._id}:profile`
        socket.on(key2,(data:string) => {
            setUser((prev:any) => {
                return {...prev,image:data}
            })
        })
    },[socket,user])
    
    return (
        <>
            {user&&<section className="flex flex-col w-full">
                <div className="flex flex-col overflow-y-scroll h-screen [&::-webkit-scrollbar]:hidden">
                    <ProfileHeader user={user} type="profile" userId={user._id}/>
                    <ProfileTabs /> 

                </div>
            </section>}
        
        </>
    )
}