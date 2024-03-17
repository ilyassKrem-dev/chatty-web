'use client'
import { NavIcons } from "@/assets/other/NavIcons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import Image from "next/image"
export default function RightNav() {
    const {data:session} = useSession()
    const pathname = usePathname()
    
    return (
        <nav className="hidden lg:flex sticky left-0 top-0 p-2 px-4 border-r dark:border-white bg-white z-30">
            <div className="flex justify-center  flex-col h-full gap-10 group">
                {NavIcons.map((icon,index) => {
                    return (
                        <Link key={index} href={icon.route} className={`  cursor-pointer ${pathname === icon.route ? "text-blue-400 ":"text-gray-1 dark:text-white"} hover:text-black/80 dark:hover:text-blue-400 transition-all duration-300 flex gap-2 items-center justify-start ${icon.label ==="Theme" &&"justify-center"}`}>
                            <div className="text-4xl">
                                {icon.label === "Profile" && session 
                                ?
                                <Image 
                                src={session?.user?.image|| ""} alt="Profile-icon"
                                width={36}
                                priority
                                height={40}
                                className="rounded-full hover:opacity-60 transition-all duration-200 w-auto h-auto" />
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


