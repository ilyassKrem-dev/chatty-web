
"use client"
import { useSession } from "next-auth/react"
import { fetchUser } from "@/lib/actions/user.action"
import { useEffect, useState } from "react"

import ProfileHeader from "@/components/shared/ProfileHeader"
import ProfileTabs from "./ProfileTabs"
import { useSocket } from "@/assets/other/providers/socket-provider"
import LoadingAnimation from "@/assets/other/spinner"
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
        const key = `User:${user?._id}:status`
        socket.on(key,(data:string) => {
            setUser((prev:any) => {
                return {...prev,status:data}
            })
        })
        const key2 = `User:${user?._id}:profileImage`
        socket.on(key2,(data:string) => {
            setUser((prev:any) => {
                return {...prev,image:data}
            })
        })
        const key3 = `User:${user?._id}:CoverImage`
        socket.on(key3,(data:string) => {
            setUser((prev:any) => {
                return {...prev,coverImage:data}
            })
        })
    },[socket,user])
    if(!user) {
        return (
            <div className="h-screen justify-center items-center flex">
                <LoadingAnimation />
            </div>
        )
    }
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