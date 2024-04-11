'use client'
import { NavIcons } from "@/assets/other/NavIcons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { userStatusFetch } from "@/lib/actions/user.action"
import { useSocket } from "@/assets/other/providers/socket-provider"
export default function BottomNav() {
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
            setUserStatus((prev:any) => {
                return {...prev,status:status}
            })
        })

        return () => socket.off(key)
    },[])

    const loaderProp =({ src }:any) => {
        return src;
    }
    
    return (
        <nav className="fixed lg:hidden bottom-0 left-0 right-0 p-2 py-4  dark:bg-dark bg-white">
            <div className="flex justify-center h-full gap-10 group md:gap-20 max-[400px]:gap-5">
                {NavIcons.map((icon,index) => {
                    return (
                        <Link key={index} href={icon.route} className={`  cursor-pointer ${pathname?.includes(icon.route) && icon.label !=="Signout" ? "text-dark   bg-gray-300":"text-gray-1 dark:text-white"} p-1 rounded-lg hover:text-black/80 dark:hover:text-blue-400 transition-all duration-300 flex gap-2 items-center justify-start  hover:bg-gray-200 flex-col`}>
                            <div className="max-[300px]:text-2xl text-3xl sm:text-4xl rounded-full">
                                {icon.label === "Profile" && session 
                                ?
                                <div className={`w-full relative border  rounded-full ${userStatus.status==="online"?"border-green-500" : userStatus.status==="away"?" border-orange-400":"border-accent"}`}>
                                    <Image 
                                    src={session?.user?.image||"/user.png"} alt="Profile-icon"
                                    width={40}
                                    priority
                                    height={40}
                                    className="rounded-full hover:opacity-60 transition-all duration-200 bg-white max-[300px]:w-[26px] max-[300px]:h-[26px] w-[30px] h-[30px] sm:w-[36px] sm:h-[36px] object-contain  border-2 border-gray-300"
                                    loader={loaderProp}
                                    unoptimized />
                                    <div className={`absolute sm:p-[0.4rem] p-[0.3rem] max-[300px]:p-[0.2rem] rounded-full bottom-0 right-0
                                    ${userStatus.status==="online"?"bg-green-500" : userStatus.status==="away"?" bg-orange-400":"bg-accent"}
                                    `} /> 
                                </div>
                                :
                                icon.icon}
                            </div>
                            <p className={`cursor-pointer  hidden md:block text-sm`}>{icon.label}</p>
                        </Link>
                       
                    )
                })}
            </div>
        </nav>
    )
}


