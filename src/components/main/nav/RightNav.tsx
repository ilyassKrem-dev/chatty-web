'use client'
import { NavIcons } from "@/assets/other/NavIcons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { SocketIndicator } from "@/assets/other/socket-indicator"

export default function RightNav() {
    const {data:session} = useSession()
    const pathname = usePathname()
    
    return (
        <nav className="hidden lg:flex sticky left-0 top-0 p-2 px-4 border-r dark:border-white  z-30 dark:bg-dark dark:border-0 bg-white">
            <div className="flex justify-center  flex-col h-full gap-10 group">
                <div className="self-center">
                    <SocketIndicator />
                </div>
                {NavIcons.map((icon,index) => {
                    return (
                        <Link key={index} href={icon.route} className={`  cursor-pointer ${pathname === icon.route ? "text-blue-400 ":"text-gray-1 dark:text-white"} hover:text-black/80 dark:hover:text-blue-400 transition-all duration-300 flex gap-2 items-center justify-start ${icon.label ==="Theme" &&"justify-center"}`}>
                            <div className="text-4xl">
                                {icon.label === "Profile" && session 
                                ?
                                <Image 
                                src={session?.user?.image||"/user.png"} alt="Profile-icon"
                                width={36}
                                priority
                                height={36}
                                className="rounded-full hover:opacity-60 transition-all duration-200 bg-white w-[40px] h-[40px] object-contain border-2 border-gray-300" />
                                :
                                icon.icon}
                            </div>
                            <p className={`cursor-pointer  text-sm ${icon.label ==="Theme" ?"hidden":"hidden xl:group-hover:block"}`}>{icon.label}</p>
                        </Link>
                       
                    )
                })}
            </div>
        </nav>
    )
}


