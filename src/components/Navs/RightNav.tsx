'use client'
import { NavIcons } from "@/assets/other/NavIcons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import Image from "next/image"

import { useSocket } from "@/assets/other/providers/socket-provider"
import { useEffect, useState } from "react"
import { userStatusFetch } from "@/lib/actions/user.action"
export default function RightNav() {
    const {data:session} = useSession()
    const pathname = usePathname()
    const [userStatus,setUserStatus] = useState<any>("")
    const {socket} = useSocket()

    useEffect(() => {
        if(!session )return
        const fetchStatus = async() => {
            const res = await userStatusFetch(session?.user?.email)
            //@ts-ignore
            if(res) setUserStatus(res)
            

        }
        fetchStatus()
    },[session])
    useEffect(() => {
        if(!socket) return
        const key = `User:${userStatus._id}:status`
        socket.on(key,(status:string) => {
            setUserStatus(status)
        })

        return () => socket.off(key)
    },[])
    

    const loaderProp =({ src }:any) => {
        return src;
    }
    return (
        <nav className="hidden lg:flex sticky left-0 top-0 p-2 px-3 border-r   z-30 dark:bg-darker dark:border-r-0 bg-light">
            <div className="flex justify-center  flex-col h-full gap-10 group">
                  
                {NavIcons.map((icon,index) => {
                    return (
                        <Link key={index} href={icon.route} className={`  cursor-pointer ${pathname?.includes(icon.route) && icon.label !=="Signout" ? "text-dark   bg-gray-300":"text-gray-1 dark:text-white"} p-1 rounded-lg hover:text-black/80 dark:hover:text-blue-400 transition-all duration-300 flex gap-2 items-center justify-start hover:bg-gray-300`}>
                            <div className="text-3xl">
                                {icon.label === "Profile" && session 
                                ?
                                <div className={`w-full relative border  rounded-full ${userStatus.status==="online"?"border-green-500" : userStatus.status==="away"?" border-orange-400":"border-accent"}`}>
                                    <Image 
                                    src={session?.user?.image||"/user.png"} alt="Profile-icon"
                                    width={30}
                                    priority
                                    height={30}
                                    className="rounded-full hover:opacity-60 transition-all duration-200 bg-white w-[30px] h-[30px] object-contain  border-2 border-gray-300"
                                    loader={loaderProp}
                                    unoptimized />
                                    <div className={`absolute p-[0.2rem] rounded-full bottom-1 right-0
                                    ${userStatus.status==="online"?"bg-green-500" : userStatus.status==="away"?" bg-orange-400":"bg-accent"}
                                    `} /> 
                                </div>
                                :
                                icon.icon}
                            </div>
                            <p className={`cursor-pointer  text-sm hidden xl:group-hover:block`}>{icon.label}</p>
                        </Link>
                       
                    )
                })}
            </div>
        </nav>
    )
}


